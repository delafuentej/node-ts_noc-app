import mongoose from "mongoose";
/* 
    message: string;
    level: LogSeverityLevel;
    createAt?: Date;
    origin: string;
*/
const logSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true,
    },
    level: {
        type: String,
        enum: ['low','medium','high'],
        default: 'low',
    },
    createAt: {
        type: Date,
        default: new Date(),
    },
    origin: {
        type: String,
    },
});

//model => how it will interact with mongo db
export const LogModel = mongoose.model('Log',logSchema);