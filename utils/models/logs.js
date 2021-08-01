import mongoose from "mongoose";
var Schema = mongoose.Schema;

const MODEL_NAME = "Log";
const COLLECTION_NAME = "logs";

var logSchema = new Schema({
    log: String,
});

// mongoose.models = {};

var Log = mongoose.models[MODEL_NAME] || mongoose.model(MODEL_NAME, logSchema, COLLECTION_NAME);

export default Log;
