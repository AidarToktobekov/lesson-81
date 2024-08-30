import express from 'express';
import { UrlMutation } from '../types';
import Converter from '../models/Converter';
import mongoose from 'mongoose';

const converterRouter = express.Router();

converterRouter.get('/converter', async (req, res, next) => {
    try {
        const converter = await Converter.find();
        return res.send(converter);
    } catch (error) {
        next(error);
    }
});

converterRouter.get('/:shortUrl', async (req, res, next) => {
    try {
        const url = await Converter.findOne({shortUrl: req.params.shortUrl});
        if (url){
            return res.status(301).redirect(url.originalUrl);
        }else {
            return res.send('Not Found');
        }
    } catch (error) {
        next(error);
    }
});

converterRouter.post('/converter', async (req, res, next) => {
    try {

        const urlMutation: UrlMutation = {
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