import AnimalServices from './services'
const resolvers = {
    Mutation:{
        createAnimal: async (parent, args, context) => {
            const animal = await AnimalServices.createAnimal(args.animal);
            return animal;
        },
        updateAnimal: async (parent, args, context) => {
            const animal = await AnimalServices.updateAnimal(args.id,args.animal);
            return animal;
        },
        deleteAnimal: async (parent, args, context) => {
            const animal = await AnimalServices.deleteAnimal(args.id);
            return animal;
        }
    },
    Query:{
        getAllAnimals: async (parent, args, context) => {
            const animals = await AnimalServices.getAllAnimals();
            return animals;
        }
    },
    Animal:{
        id: (parent, args, context) => {
            return parent.getId();
        }
    }
}