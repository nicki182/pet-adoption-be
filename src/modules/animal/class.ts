import User from "@user/class";
import { State, Type } from "@prisma/client";
import { AnimalClass } from "./interfaces";
class Animal {
  private id: string;
  private name: string;
  private type: Type;
  private age: number | undefined | null;
  private breed: string | undefined | null;
  private heigth: number;
  private weight: number;
  private dietaryRestrictions: string | undefined | null;
  private description: string;
  private image: string | undefined | null;
  private user: User;
  private state: State;
  constructor(animalData: AnimalClass) {
    this.id = animalData.id;
    this.name = animalData.name;
    this.type = animalData.type;
    this.age = animalData.age;
    this.breed = animalData.breed;
    this.heigth = animalData.heigth;
    this.weight = animalData.weight;
    this.dietaryRestrictions = animalData.dietaryRestrictions;
    this.description = animalData.description;
    this.image = animalData.image;
    this.user = animalData.user;
    this.state = animalData.state;
  }
  public getId(): string {
    return this.id;
  }
  public getName(): string {
    return this.name;
  }
  public getType(): Type {
    return this.type;
  }
  public getAge() {
    return this.age;
  }
  public getBreed() {
    return this.breed;
  }
  public getHeigth(): number {
    return this.heigth;
  }
  public getWeight(): number {
    return this.weight;
  }
  public getDietaryRestrictions() {
    return this.dietaryRestrictions;
  }
  public getDescription(): string {
    return this.description;
  }
  public getImage() {
    return this.image;
  }
  public getUser(): User {
    return this.user;
  }
  public getState(): State {
    return this.state;
  }
  public setName(newName: string) {
    this.name = newName;
  }
  public setAge(newAge: number) {
    this.age = newAge;
  }
  public setBreed(newBreed: string) {
    this.breed = newBreed;
  }
  public setHeigth(newHeigth: number) {
    this.heigth = newHeigth;
  }
  public setWeight(newWeight: number) {
    this.weight = newWeight;
  }
  public setDietaryRestrictions(newDietaryRestrictions: string) {
    this.dietaryRestrictions = newDietaryRestrictions;
  }
  public setDescription(newDescription: string) {
    this.description = newDescription;
  }
  public setImage(newImage: string) {
    this.image = newImage;
  }
  public setUser(newUser: User) {
    this.user = newUser;
  }
  public setState(newState: State) {
    this.state = newState;
  }
  public setType(newType: Type) {
    this.type = newType;
  }
}
export default Animal;
