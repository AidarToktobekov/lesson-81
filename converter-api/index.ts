import express from 'express';
import converterRouter from './routers/converter';
import cors from 'cors';
import * as mongoose from 'mongoose';
import config from "./config";

const app = express();
const port = 8000;

app.use(cors(config.corsOptions));
app.use(express.json());
app.use(express.static('converter'));
app.use('/converter', converterRouter);

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