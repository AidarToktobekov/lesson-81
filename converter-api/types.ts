import {ObjectId} from "mongoose";

export interface ConverterUrl {
    _id: ObjectId;
    shortUrl: string;
    originalUrl: string;
}

export type UrlMutation = Omit<ConverterUrl, '_id'>;