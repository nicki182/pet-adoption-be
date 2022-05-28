import { UserClass, UserI } from "./interfaces";
import { Role } from '@prisma/client';
class User {
  private id;
  private name;
  private email;
  private phoneNumber;
  private role:Role;
  private password:string
  constructor(userData: UserClass) {
    this.id = userData.id;
    this.name = userData.name;
    this.email = userData.email;
    this.phoneNumber = userData.phoneNumber;
    this.role = userData.role
    this.password = userData.password
  }
  public getId(): string {
    return this.id;
  }
  public getName(): string {
    return this.name;
  }
  public getEmail(): string {
    return this.email;
  }
  public setName(newName: string) {
    this.name = newName;
  }
  public setEmail(newEmail: string) {
    this.email = newEmail;
  }
  public setPhoneNumber(newPhoneNumber: string) {
    this.phoneNumber = newPhoneNumber;
  }
  public getPassword(): string {
    return this.password
  }
  public getPhoneNumber(): string {
    return this.phoneNumber;
  }
  public validatePassword(password: string): boolean {
    return true;
  }
  public getRole(): Role {
    return this.role
  }
}
export default User;
