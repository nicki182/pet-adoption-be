import "mocha"
import { expect, request, use } from 'chai';
import chaihttp from 'chai-http';
import server, {app} from '../../src/index';
import  UserServices  from '@user/services';
import  SessionService  from '@session/services';
before(() =>{ 
    use(chaihttp)
    server.start()
      UserServices.createUser({email:"email1@yopmail.com",password:"123456",name:"name"},{cuid:true}).then((user) => {
        SessionService.createSession(user.getId())
        //done()
    })
});
after(() =>{
  return Promise.all([
    //RedisClient.stop(),
      SessionService.deleteAll(),
      UserServices.deleteMany()
  ])
})
describe("Routes tests",()=>{
    it("should return a 200 status code signup",(done)=>{
      request(app).post("/auth/signup").send({email:"email@yopmail.com",password:"123456",name:"name"}).end(function(err, res) {
        //console.log(res.body)
        expect(res).to.have.status(200);    // <= Test completes before this runs
        done()
      });
    }),
    it("should return a 200 status code login",(done)=>{
      //TODO:Create user before
        request(app).post("/auth/login").send({email:"email1@yopmail.com",password:"123456"}).end(function(err, res) {
          expect(res).to.have.status(200);   
          done()
        })
      }),
      it("should return a validation error status code",(done)=>{
        request(app).post("/auth/login").send({}).end(function(err, res) {
          expect(res).to.have.status(500);    
          done()
        })
      }),
      it("should return a route error status code",(done)=>{
        request(app).post("/auth/dasadsads").send({}).end(function(err, res) {
          expect(res).to.have.status(404);    
          done()
        })
      })
})