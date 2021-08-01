import mongoose from "mongoose";
var Schema = mongoose.Schema;

const MODEL_NAME = "Proxy";
const COLLECTION_NAME = "proxies";

var accountSchema = new Schema(
    {
        used: { type: Boolean, default: false },
        statusLive: { type: String, default: "ALIVE" },
        proxyType: String,
        ip: String,
        port: String,
        login: String,
        password: String,
        session: {
            type: Schema.Types.ObjectId,
            ref: "account",
        },
        tags: [{ type: String }],

        dateOfCreation: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

// mongoose.models = {};

var NewModel = mongoose.models[MODEL_NAME] || mongoose.model(MODEL_NAME, accountSchema, COLLECTION_NAME);

export default NewModel;
