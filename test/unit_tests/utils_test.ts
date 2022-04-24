import "mocha";
import { expect } from "chai";
import * as yup from "yup";
import {
  generateToken,
  verifyToken,
  validateSchema,
  hashPassword,
  comparePassword,
  decodeToken,
} from "../../src/utils/authentication";
import _ from "lodash";

// runs before all tests in this block
describe("Utils tests", () => {
  it("token is generated", () => {
    const userId = "312321";
    const token = generateToken(userId, 10000);
    expect(token).to.a("string");
  }),
    it("Token is verified", () => {
      const userId = "3213";
      const token = generateToken(userId, 10000);
      expect(verifyToken(token)).to.a("object");
    }),
    it("Token is expired", (done) => {
      const userId = "3213";
      const token = generateToken(userId, "1second");
      setTimeout(async () => {
        try {
          await verifyToken(token);
        } catch (error) {
          expect(_.get(error, "message")).to.equal("jwt expired");
        }
        done();
      }, 2000);
    }),
    it("Token is decoded", () => {
      const userId = "3213";
      const token = generateToken(userId, 10000);
      expect(decodeToken(token)).to.be.a("object");
    }),
    it("Validate data is true", async () => {
      const schema = yup.object().shape({
        name: yup.string().required("Name"),
      });
      const data = {
        name: "test",
      };
      expect(await await validateSchema(schema, data)).to.deep.equal({
        errors: [],
        values: data,
      });
    }),
    it("Validate data is false", async () => {
      const schema = yup.object().shape({
        name: yup.string().nullable().required("Name"),
      });
      const data = {};
      expect(await await validateSchema(schema, data)).to.deep.equal({
        errors: ["Name"],
        values: data,
      });
    });
  it("Password is hashed", async () => {
    const password = "test";
    const hash = await hashPassword(password);
    expect(hash).to.not.be.equal(password);
  });
  it("Password is compared to be true", async () => {
    const password = "test";
    const hash = await hashPassword(password);
    expect(await comparePassword(password, hash)).to.be.true;
  }),
    it("Password is compared to be false", async () => {
      const password = "test";
      const hash = await hashPassword(password);
      expect(await comparePassword("test1", hash)).to.be.false;
    });
});
