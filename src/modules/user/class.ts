import { UserI } from "./interfaces";
class User {
  private  id;
  private name;
  private email;
  constructor(userData: UserI) {
    this.id = userData.id;
    this.name = userData.name;
    this.email = userData.email;
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
  public validatePassword(password: string): boolean {
    return true;
  }
}
export default User;
