import UserServices from "@user/services";
import { UserCreate } from "@user/interfaces";
import prisma from  "@prismaAPI/index";
import "mocha";
import { expect } from "chai";
const prismaClient = prisma.getPrismaClient()
const userData = [{
    name: "Benita Monroe",
    email: "benitamonroe@eplosion.com",
    password: "348942309"
  },
  {
    name: "Virginia Mckay",
    email: "virginiamckay@zolar.com",
    password: "66666666666666"
  },
  {
    name: "Dennis Cochran",
    email: "denniscochran@grok.com",
    password: "312321"
  }]; 
beforeEach( () =>{
    return Promise.all(
        userData.map(element => {
            UserServices.createUser(element)
        }))

})
afterEach(()=>{
    return Promise.all(userData.map((element)=>{UserServices.deleteByField("email", element.email)}))
}) 
after(()=>{
    prismaClient.$disconnect()
})
describe("User Tests", () => {
  it("User is created", () => {
    const userData: UserCreate = {
      name: "test",
      email: "email@yopmail.com",
      password: "123456",
    };
    UserServices.createUser(userData).then((user) => {
      UserServices.getUserById(Number(user.getId())).then((user) => {
        expect(user).to.be.a("object");
      });
    })
  }),
    it("User is deleted", () => {
        const userData: UserCreate = {
            name: "test",
            email: "email5@yopmail.com",
            password: "123456",
        }
        UserServices.createUser(userData).then((user) => {
            UserServices.deleteByField("email", userData.email).then((user) => {
                UserServices.getUserByEmail(userData.email).then((user) => {
                    expect(user).to.be.a("null");
                })
            })
        })
    }),
    it("User is updated", () => {
        const userData: UserCreate = {
            name: "test",
            email: "dads@yopmail.com",
            password: "123456",
        }
        UserServices.createUser(userData).then((user) => {
            UserServices.updateUser({
                id: user.getId(),
                name: "test2",
                email: "dads@yopmail.com"
            }).then((user) => {
                UserServices.getUserById(Number(user.getId())).then((user) => {
                    expect(user.getName()).to.be.equal("test2");
                })
            })
        })
    })
});
