import mongoose from "mongoose";
var Schema = mongoose.Schema;

const MODEL_NAME = "Campaign";

var campaignSchema = new Schema(
    {
        campaignId: { type: String, unique: true, required: true },
        name: String,
        // campaigns links
        account: {
            type: Schema.Types.ObjectId,
            ref: "account",
        },
        budget: Number,
        adGroups: [
            {
                adGroupId: String,
                ads: [
                    {
                        type: Object,
                    },
                ],
            },
        ],
        // meta
        dateOfCreation: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

// mongoose.models = {};

var Campaign =
    mongoose.models[MODEL_NAME] ||
    mongoose.model(MODEL_NAME, campaignSchema, "campaigns");

export default Campaign;
