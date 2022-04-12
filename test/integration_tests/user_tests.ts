import UserServices from '@user/services';
import { UserCreate } from '@user/interfaces';
import "mocha"
import { expect } from 'chai';
describe("User Tests",()=>{
it("User is created",()=>{
    const userData: UserCreate = {
        name: "test",
        email: "email@yopmail.com",
        password: "123456",
    }
    UserServices.create(userData).then((user)=>{
        UserServices.getUserById(user.getId()).then((user)=>{
            expect(user).to.be.a("object");
            })
        })
    })
})