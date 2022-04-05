//Crud services interface to implement in crud services of any services
export type GenericCrudServicesI<T> = {
    getByField: (field: string, value: string, select?: any) => Promise<T>;
    getAll: (select?: object) => Promise<T[]>;
    create: (data: T) => Promise<T>;
    update: (id: number, data: T) => Promise<T>;
    delete: (id: number) => Promise<T>;
};