import mongoose from "mongoose";
var Schema = mongoose.Schema;

const MODEL_NAME = "Address";
const COLLECTION_NAME = "addresses";

var accountSchema = new Schema(
    {
        firstLineAddress: String,
        city: String,
        zip: String,
        state: String,
        
        tag: [{ type: String }],
        used: { type: Boolean, default: false },

        dateOfCreation: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

// mongoose.models = {};

var NewModel = mongoose.models[MODEL_NAME] || mongoose.model(MODEL_NAME, accountSchema, COLLECTION_NAME);

export default NewModel;
