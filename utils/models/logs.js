import mongoose from "mongoose";
var Schema = mongoose.Schema;

const MODEL_NAME = "Log";

var logSchema = new Schema({
    log: String,
});

// mongoose.models = {};

var Log =
    mongoose.models[MODEL_NAME] ||
    mongoose.model(MODEL_NAME, logSchema, "logs");

export default Log;
