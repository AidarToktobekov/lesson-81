import express from 'express';
import converterRouter from './routers/converter';
import cors from 'cors';
import * as mongoose from 'mongoose';
import config from "./config";
import Converter from "./models/Converter";
import {ConverterUrl} from "./types";

const app = express();
const port = 8000;

app.use(cors(config.corsOptions));
app.use(express.json());
app.use(express.static('converter'));
app.use('/converter', converterRouter);
// app.get('/my-link/:shortUrl', async (req, res) => {
//     const url = await Converter.findById(req.params.shortUrl);
//     if (url){
//         return res.status(301).redirect(url.originalUrl);
//     }else {
//         return res.send('Not Found');
//     }
// })

const run = async () => {
    await mongoose.connect('mongodb://localhost/shop');
    app.listen(port, () => {

        console.log(`Server started on ${port} port!`);
    });

    process.on('exit', () => {
        mongoose.disconnect();
    });
};

run().catch(console.error);