import AnimalServices from './services';
import Animal from './class';
import CustomError from '@error/index';
import  ServerError  from '@error/ServerError';
import  {AnimalClass}  from '@animal/interfaces';
class Controller{
    public async getAllAnimals(): Promise<Animal[]> {
        try {
            return AnimalServices.getAllAnimals();
        } catch (error) {
            throw new ServerError(500,{message:String(error),status:500})
        }
    }
    public async getAnimalById(id: string): Promise<Animal> {
        try {
            return AnimalServices.getAnimalByCuid(id);
        } catch (error) {
            throw new ServerError(500,{message:String(error),status:500})
        }
    }
    public async createAnimal(animal: AnimalClass): Promise<Animal> {
        try {
            return AnimalServices.createAnimal(animal);
        } catch (error) {
            throw new ServerError(500,{message:String(error),status:500});
        }
    }
    public async updateAnimal(animal: AnimalClass): Promise<Animal> {
        try {
            return AnimalServices.updateAnimal(animal.id,animal);
        } catch (error) {
            throw new ServerError(500,{message:String(error),status:500})
        }
    }
}
export default new Controller();