import {ObjectId} from "mongoose";

export interface ConverterUrl {
    _id: ObjectId;
    shortUrl: string;
    originalUrl: string;
}

export interface UrlMutation {
    originalUrl: string;
}