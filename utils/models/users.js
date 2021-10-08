import mongoose from "mongoose";
var Schema = mongoose.Schema;

const MODEL_NAME = "User";
const COLLECTION_NAME = "users";

var accountSchema = new Schema(
    {
        firstName: String,
        lastName: String,
        empty: Number,
        adresses: [
            {
                type: Schema.Types.ObjectId,
                ref: "adresses",
            },
        ],
        phoneNumber: [
            {
                type: Schema.Types.ObjectId,
                ref: "sessions",
            },
        ],

        tags: [{ type: String }],

        session: {
            type: Schema.Types.ObjectId,
            ref: "sessions",
        },

        emails: [{ type: String }],

        dateOfCreation: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

// mongoose.models = {};

var NewModel = mongoose.models[MODEL_NAME] || mongoose.model(MODEL_NAME, accountSchema, COLLECTION_NAME);

export default NewModel;
