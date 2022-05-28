import { InferType, ObjectSchema } from "yup";
//Cache crud services interface
export interface GenericCacheServicesI {
  get(key: string): Promise<string>;
  set(key: string, value: string): Promise<void>;
  del(key: string): Promise<void>;
  setToExpire(key: string, value: string, expire: number): Promise<void>;
  deleteAll(): Promise<void>;
}
//Data base crud services interface
export interface GenericCrudServicesI<TypeModel = any, TypeSelect = any> {
  getByField: (field: string, value: string, select?: TypeSelect) => Promise<TypeModel>
  getAll: (select?: TypeSelect) => Promise<TypeModel[]>
  create: (data: TypeModel, select?: TypeSelect) => Promise<TypeModel>
  update: (id: number, data: TypeModel) => Promise<TypeModel>
  updateBy: (field: string, value: string, data: TypeModel) => Promise<TypeModel>
  deleteById: (id: number) => Promise<TypeModel>
  deleteByField: (field: string, value: string) => Promise<TypeModel>
  createMany: (data: TypeModel[]) => Promise<TypeModel[]>
  deleteMany: () => Promise<TypeModel[]>
}
export interface IValidationSchema {
  [key: string]: any;
}

export type SchemaType<T extends IValidationSchema> = InferType<
  ObjectSchema<T>
>;
