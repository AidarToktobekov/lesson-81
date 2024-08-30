import mongoose, { mongo } from 'mongoose';

const Schema = mongoose.Schema;

const ConverterSchema = new Schema({
    shortUrl: {
        type: String,
        required: true,
    },
    originalUrl: {
        type: String,
        required: true,
    }
});

const Converter = mongoose.model('Converter', ConverterSchema);

export default Converter;