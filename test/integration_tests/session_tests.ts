import { config } from "dotenv";
import { expect } from "chai";
import _ from 'lodash'
import SessionService from "@session/services";
import RedisClient from "@redis/index";
const start = async () => {
    await RedisClient.start();
    SessionService.setClient();
    await SessionService.createSession("31231");
    await SessionService.createSession("31232");
    await SessionService.createSession("777777");

}
const stop = async () => {
    await SessionService.deleteAll();
    await RedisClient.stop();
}
// runs before all tests in this block
beforeEach((done) => {
config(); 
start().then(()=>done())
});
// runs after all tests in this block
afterEach((done) => {
stop().then(()=>done())
});

describe("Session tests", () => {
it("Session is created",() => {
    const userId = "666666";
    SessionService.createSession(userId).then(session => {expect(session).to.be.a("object")});
});
    it("Session is getted",() => {
        const userId = "777777";
        SessionService.getSession(userId).then(session => {
        expect(session).to.be.a("object");
        });
}),
    it("Session is deleted",(done) => {
        const userId = "666666";
        SessionService.deleteSession(userId).then(()=>{
        SessionService.getSession(userId)}).catch(error => {
            expect(String(_.get(error,'message'))).to.be.a("Sesssion not found");
            done()
    }).then(()=>done())
})
    });
