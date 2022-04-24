import "mocha";
import { expect } from "chai";
import Controller from "@session/controller";
import SessionService from "@session/services";
import RedisClient from "@redis/index";
import prisma from "@prismaAPI/index";
import { DataRequest, SessionI } from "@session/interfaces";
import _ from "lodash";
import UserServices from "@user/services";
import Session from "@session/class";
import { UserCreate } from "@user/interfaces";

const controllerLogIn = async (session: Session) => {
  const sessionGet = await SessionService.getSession(session.getUserId());
  const user = await UserServices.getUserByCuid(sessionGet.getUserId());
  return user;
};
afterEach(() => {
  UserServices.deleteMany();
});

describe("Session Controller tests", () => {
  it("Session is logged in", () => {
    const data: UserCreate = {
      email: "d66666@yopmail.com",
      password: "123456",
      name: "test",
    };
    Controller.signUpSession(data).then((session) => {
      controllerLogIn(session).then((user) => {
        expect(user).to.be.a("object");
      });
    });
  }),
    it("Session is logged out", () => {
      const data: UserCreate = {
        email: "d66666@yopmail.com",
        password: "123456",
        name: "test",
      };
      Controller.signUpSession(data).then((session) => {
        Controller.logOutSession(session.getUserId()).then((session) => {
          expect(session).to.be.a("null");
        });
      });
    }),
    it("Session is logged out by expiration time", () => {
      const data: UserCreate = {
        email: "d66666@yopmail.com",
        password: "123456",
        name: "test",
      };
      Controller.signUpSession(data).then((session) => {
        setTimeout(() => {
          SessionService.getSession(session.getUserId()).then((session) => {
            expect(session).to.be.a("null");
          });
        }, 200);
      });
    }),
    it("Session refresh token", () => {
      const data: UserCreate = {
        email: "deeeeeee@yopmail.com",
        password: "123456",
        name: "test",
      };
      Controller.signUpSession(data).then((session) => {
        setTimeout(() => {
          SessionService.getSession(session.getUserId()).then((session) => {
            Controller.refreshAccessToken(
              session.getUserId(),
              session.getRefreshToken()
            ).then((session) => {
              expect(session).to.be.a("object");
            });
          });
        }, 100);
      });
    }),
    it("Session is not logged out by refresh token", () => {
      const data: UserCreate = {
        email: "djklajfsdl@yopmail.coom",
        password: "123456",
        name: "test",
      };
      Controller.signUpSession(data).then((session) => {
        setTimeout(() => {
          SessionService.getSession(session.getUserId()).then((session) => {
            Controller.refreshAccessToken(
              session.getUserId(),
              session.getRefreshToken()
            );
          });
        }, 100);
        setTimeout(() => {
          SessionService.getSession(session.getUserId()).then((session) => {
            expect(session).to.be.a("null");
          });
        }, 200);
      });
    }),
    it("Session is not logged in", () => {
      const data = {
        email: "dasdasdsadasa@yopmail.com",
        password: "123456",
        id: "dasas",
      };
      SessionService.getSession(data.id).then((session) => {
        expect(session).to.be.a("null");
      });
    }),
    it("Session log in", () => {
      const data = {
        email: "dsaddddddddd@yopmail.com",
        password: "123456",
        name: "test",
      };
      UserServices.createUser(data, { cuid: true }).then(() => {
        Controller.logInSession({
          email: data.email,
          password: data.password,
        }).then((session) => {
          expect(session).to.be.a("object");
        });
      });
    });
});
