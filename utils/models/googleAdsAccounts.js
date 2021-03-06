import mongoose from "mongoose";
var Schema = mongoose.Schema;

const MODEL_NAME = "GoogleAdsAccount";
const COLLECTION_NAME = "googleadsaccounts";
var accountSchema = new Schema(
    {
        accountId: { type: String, unique: true, required: true },
        name: String,
        // campaigns links
        limitManual: { type: Number, default: 0 },
        limitAPI: { type: Number, default: 0 },
        offer: { type: String, default: "" },
        // notes: Array,
        // historyLog2: Array,
        stars: { type: Number, default: 0 },
        session: {
            type: Schema.Types.ObjectId,
            ref: "account",
        },
        notes: [
            {
                dateOfNote: Date,
                textOfNote: String,
                colorOfNote: String,
                iconId: String,
            },
        ],
        campaigns: [
            {
                type: Schema.Types.ObjectId,
                ref: "campaign",
            },
        ],
        // quick info
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
        // system
        daysInWork: {
            type: Number,
        },
        checkLimitDays: {
            type: Number,
        },
        currency: {
            type: String,
        },
        timeZone: {
            type: String,
        },
        user: {
            type: String,
        },
        userSetManually: {
            type: String,
        },
        // meta
        dateOfCreation: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

// mongoose.models = {};

var Account = mongoose.models[MODEL_NAME] || mongoose.model(MODEL_NAME, accountSchema, COLLECTION_NAME);

export default Account;
