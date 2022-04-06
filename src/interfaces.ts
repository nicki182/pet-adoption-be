//Crud services interface to implement in crud services of any services
//Cannot be done yet with object
//SEE A WORKAOURND TO IMPLEMENT IT
export interface GenericCrudServicesI<C, I, ID> {
  getByField: (field: string, value: string, select?: any) => Promise<C>;
  getAll: (select?: object) => Promise<C[]>;
  create: (data: I) => Promise<C>;
  update: (id: ID, data: I) => Promise<C>;
  delete: (id: ID) => Promise<C>;
}
