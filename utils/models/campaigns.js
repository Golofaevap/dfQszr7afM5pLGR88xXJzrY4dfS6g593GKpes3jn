import mongoose from "mongoose";
var Schema = mongoose.Schema;

var campaign = new Schema(
    {
        campaignId: { type: String, unique: true, required: true },
        name: String,
        // campaigns links
        account: {
            type: mongoose.Types.ObjectId,
            ref: "Account",
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

var Campaign = mongoose.model("Campaign", campaign);

export default Campaign;
