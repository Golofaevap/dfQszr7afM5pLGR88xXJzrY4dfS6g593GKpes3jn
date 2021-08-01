import mongoose from "mongoose";
var Schema = mongoose.Schema;

const MODEL_NAME = "Session";
const COLLECTION_NAME = "sessions";

var accountSchema = new Schema(
    {
        name: String,
        user: {
            type: Schema.Types.ObjectId,
            ref: "users",
        },

        tags: [{ type: String }],
        gAccounts: [
            {
                type: Schema.Types.ObjectId,
                ref: "accounts",
            },
        ],
        proxies: [
            {
                type: Schema.Types.ObjectId,
                ref: "proxies",
            },
        ],
        emails: [{ type: String }],

        dateOfCreation: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

// mongoose.models = {};

var NewModel = mongoose.models[MODEL_NAME] || mongoose.model(MODEL_NAME, accountSchema, COLLECTION_NAME);

export default NewModel;
