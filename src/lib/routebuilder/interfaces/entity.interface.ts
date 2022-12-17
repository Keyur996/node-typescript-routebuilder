import { Model } from 'mongoose';
import { ReqTypesObj } from '../types/base.type';

export interface IEntity<M> {
  collection: string;
  model: Model<M>;
  types: ReqTypesObj;
}
