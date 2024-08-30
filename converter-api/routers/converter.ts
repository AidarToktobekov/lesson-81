import express from 'express';
import { UrlMutation } from '../types';
import Converter from '../models/Converter';
import mongoose from 'mongoose';

const converterRouter = express.Router();

converterRouter.get('/', async (req, res, next) => {
    try {
        const converter = await Converter.find();
        console.log(converter)
        return res.send(converter);
    } catch (error) {
        next(error);
    }
});

converterRouter.post('/', async (req, res, next) => {
    try {
        const urlMutation = {
            originalUrl: req.body.originalUrl,
            shortUrl: req.body.shortUrl,
        };

        const converter = new Converter(urlMutation);
        await converter.save();

        return res.send(converter);
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(error);
        }

        return next(error);
    }
});

export default converterRouter;