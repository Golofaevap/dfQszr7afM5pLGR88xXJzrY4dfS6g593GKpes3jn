import mongoose from "mongoose";
var Schema = mongoose.Schema;

var log = new Schema({
    log: String,
});

mongoose.models = {};

var Log = mongoose.model("Log", log);

export default Log;
