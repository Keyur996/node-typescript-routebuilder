import { Model } from 'mongoose';
import { ReqTypes } from '../types/base.type';

export interface IEntity<M> {
    collection: string;
    model: Model<M>;
    types: ReqTypes;
}
