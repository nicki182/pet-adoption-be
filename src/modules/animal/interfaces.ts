import User from "@user/class";
import { State, Type } from "@prisma/client";
export interface AnimalClass {
  id: string;
  name: string;
  age?: number | null;
  breed?: string | null;
  heigth: number;
  weight: number;
  dietaryRestrictions?: string | null;
  description: string;
  image?: string | null;
  user: User;
  state: State;
  type: Type;
}
