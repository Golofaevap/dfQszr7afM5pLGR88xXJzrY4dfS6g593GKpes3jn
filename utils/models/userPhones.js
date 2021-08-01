import mongoose from "mongoose";
var Schema = mongoose.Schema;

const MODEL_NAME = "Phone";
const COLLECTION_NAME = "phones";

var accountSchema = new Schema(
    {
        used: { type: Boolean, default: false },
        phoneNumber: String,
        numbersOnly: String,

        note: String,
        tag: [{ type: String }],
        used: { type: Boolean, default: false },

        dateOfCreation: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

// mongoose.models = {};

var NewModel = mongoose.models[MODEL_NAME] || mongoose.model(MODEL_NAME, accountSchema, COLLECTION_NAME);

export default NewModel;
