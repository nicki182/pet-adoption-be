import "mocha";
import { expect } from "chai";
describe("User validation", () => {
  it("verifies if email haves is correct length", () => {
    const email1 = "nicki1@gmail.com";
    const email2 = "papa1()";
    expect(email1).to.equal(true);
    expect(email2).to.equal(false);
  });
  it("verifies if email haves 1 number and 1 sign", () => {
    const email1 = "nicki1@gmail.com";
    const email2 = "papafsdsfdfsfsdjfs";
    const email3 = "fdsjjkfkfsjklfd1";
    const email4 = "fsjkjfdskf)";
    expect(email1).to.equal(true);
    expect(email2).to.equal(false);
    expect(email3).to.equal(false);
    expect(email4).to.equal(false);
  });
  it("verifies if user is registered as Pending Verification once registered", async () => {
    const user1 = {
      name: "nicki",
      lastname: "1",
      email: "nicki1@gmail.com",
      password: "123456",
    };
    const user2 = {
      name: "BAHHHH",
      lastname: "BAHHHH",
      email: "BAHHH",
      password: "123456",
    };
    expect(user1).to.equal("Pending Verification");
    expect(user2).to.equal(null);
  }),
    it("verifies if user password is encrypted", async () => {
      const user1 = {
        name: "Michael Jordan",
        lastname: "1",
        email: "nicki1@gmail.com",
        password: "123456",
      };
      const user2 = false;
      expect(user1).to.equal(false);
      expect(user2).to.equal(true);
    });
});

describe("User CRUD services working", () => {
  it("Create a user", async () => {
    const users = [];
    expect(users).to.length(1);
  });
  it("Gets users", () => {
    const users = [];
    expect(users).to.length(1);
  }),
    it("Get user by ID", () => {
      const user = null;
      expect(user).to.equal(true);
    }),
    it("Update user", () => {
      const user = null;
      expect(user).to.equal(true);
    });
});
