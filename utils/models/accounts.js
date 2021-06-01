import mongoose from "mongoose";
var Schema = mongoose.Schema;

var account = new Schema(
    {
        accountId: { type: String, unique: true, required: true },
        name: String,
        // campaigns links
        campaigns: [
            {
                type: mongoose.Types.ObjectId,
                ref: "Campaign",
            },
        ],
        // quick info
        // ------ total
        totalCost: String,
        totalImpressions: String,
        totalClicks: String,
        totalConversions: String,
        totalViesw: String,
        // ------ today
        todayCost: String,
        todayImpressions: String,
        todayClicks: String,
        todayConversions: String,
        todayViesw: String,
        // ------ yesterday
        yesterdayCost: String,
        yesterdayImpressions: String,
        yesterdayClicks: String,
        yesterdayConversions: String,
        yesterdayViesw: String,
        // system
        daysInWork: {
            type: Number,
        },
        checkLimitDays: {
            type: Number,
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

var Account = mongoose.model("Account", account);

export default Account;
