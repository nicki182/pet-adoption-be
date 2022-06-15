import PrismaServices from "@prismaAPI/services";
import PrismaClient from "@prisma/client";
import UserServices from "@user/services";
import Animal from "./class";
import { AnimalClass } from "@animal/interfaces";
class AnimalServices {
  private prisma = new PrismaServices("animal");
  public async getAnimalByField(
    field: string,
    value: string,
    select?: unknown
  ): Promise<Animal> {
    const animalData: PrismaClient.Animal = (await this.prisma.getByField(
      field,
      value,
      select
    )) as PrismaClient.Animal;
    const user = await UserServices.getUserByField(
      "id",
      String(animalData.userId)
    );
    return new Animal({
      id: animalData.cuid,
      name: animalData.name,
      age: animalData.age,
      breed: animalData.breed,
      heigth: animalData.height,
      weight: animalData.weigth,
      dietaryRestrictions: animalData.dieteryRestrictions,
      description: animalData.description,
      image: animalData.profilePic,
      user: user,
      state: animalData.state,
      type: animalData.type,
    });
  }
  public getAnimalByCuid(cuid: string, select?: unknown): Promise<Animal> {
    return this.getAnimalByField("cuid", cuid, select);
  }

  public async getAnimalById(
    id: number,
    select: unknown = { id: true, cuid: true }
  ): Promise<Animal> {
    return this.getAnimalByField("id", String(id), select);
  }
  public async updateAnimal(
    cuid: string,
    animalData: AnimalClass
  ): Promise<Animal> {
    const updatedAnimal = await this.prisma.updateBy("cuid", cuid, animalData);
    const user = await UserServices.getUserByField(
      "id",
      String(updatedAnimal.userId)
    );
    return new Animal({
      id: updatedAnimal.cuid,
      name: updatedAnimal.name,
      age: updatedAnimal.age,
      breed: updatedAnimal.breed,
      heigth: updatedAnimal.height,
      weight: updatedAnimal.weigth,
      dietaryRestrictions: updatedAnimal.dieteryRestrictions,
      description: updatedAnimal.description,
      image: updatedAnimal.profilePic,
      user,
      state: updatedAnimal.state,
      type: updatedAnimal.type,
    });
  }
  public async createAnimal(animalData: AnimalClass): Promise<Animal> {
    const createdAnimal = await this.prisma.create(animalData);
    const user = await UserServices.getUserByField(
      "id",
      String(createdAnimal.userId)
    );
    return new Animal({
      id: createdAnimal.cuid,
      name: createdAnimal.name,
      age: createdAnimal.age,
      breed: createdAnimal.breed,
      heigth: createdAnimal.height,
      weight: createdAnimal.weigth,
      dietaryRestrictions: createdAnimal.dieteryRestrictions,
      description: createdAnimal.description,
      image: createdAnimal.profilePic,
      user,
      state: createdAnimal.state,
      type: createdAnimal.type,
    });
  }
  public async deleteAnimal(cuid: string): Promise<boolean> {
    return await this.prisma.deleteByField("cuid", cuid);
  }
  public async getAllAnimals(select?: unknown): Promise<Animal[]> {
    const animals: PrismaClient.Animal[] = await this.prisma.getAll(select);
    return Promise.all(
      animals.map(async (animal: PrismaClient.Animal) => {
        const user = await UserServices.getUserByField(
          "id",
          String(animal.userId)
        );
        return new Animal({
          id: animal.cuid,
          name: animal.name,
          age: animal.age,
          breed: animal.breed,
          heigth: animal.height,
          weight: animal.weigth,
          dietaryRestrictions: animal.dieteryRestrictions,
          description: animal.description,
          image: animal.profilePic,
          user,
          state: animal.state,
          type: animal.type,
        });
      })
    );
  }
}
export default new AnimalServices();
