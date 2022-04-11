import {config} from 'dotenv'
import { expect } from "chai"
beforeEach(()=>config())
describe("Session tests", () => {
    it("Session is created",()=>{
        const userId = "312321"
        const token = null
        expect(token).to.a('string')
    })

})