import mongoose from "mongoose";
var Schema = mongoose.Schema;

const MODEL_NAME = "Campaign";
const COLLECTION_NAME = "campaigns";

var campaignSchema = new Schema(
    {
        campaignId: { type: String, unique: true, required: true },
        name: String,
        // campaigns links
        account: {
            type: Schema.Types.ObjectId,
            ref: "account",
        },
        type: String,
        isEnabled: {
            type: Boolean,
        },
        isPaused: {
            type: Boolean,
        },
        isRemoved: {
            type: Boolean,
        },
        budget: Number,
        adGroups: [
            {
                adGroupId: String,
                name: String,
                ads: [
                    {
                        type: Object,
                    },
                ],
            },
        ],
        // ------ total
        totalCost: Number,
        totalImpressions: Number,
        totalClicks: Number,
        totalConversions: Number,
        totalViesw: Number,
        // ------ today
        todayCost: Number,
        todayImpressions: Number,
        todayClicks: Number,
        todayConversions: Number,
        todayViesw: Number,
        // ------ yesterday
        yesterdayCost: Number,
        yesterdayImpressions: Number,
        yesterdayClicks: Number,
        yesterdayConversions: Number,
        yesterdayViesw: Number,
        // meta
        dateOfCreation: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

// mongoose.models = {};

var Campaign = mongoose.models[MODEL_NAME] || mongoose.model(MODEL_NAME, campaignSchema, COLLECTION_NAME);

export default Campaign;
