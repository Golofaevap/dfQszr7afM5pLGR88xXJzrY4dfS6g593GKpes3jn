import mongoose from "mongoose";
var Schema = mongoose.Schema;

const MODEL_NAME = "GoogleAccount";
const COLLECTION_NAME = "googleaccounts";

var accountSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "user",
        },
        firstEmail: String,
        otherEmails: Array,
        password: String,
        recoveryCodes: [{ type: String }],
        gads: [
            {
                type: Schema.Types.ObjectId,
                ref: "googleadsaccounts",
            },
        ],

        // stages
        gmailsFilterAdded: { status: { type: String, default: "FALSE" }, comment: [{ type: String }] },
        gpayCardAdded: { status: { type: String, default: "FALSE" }, comment: [{ type: String }] },
        gpayBAAdded: { status: { type: String, default: "FALSE" }, comment: [{ type: String }] },
        gpayAddressAdded: { status: { type: String, default: "FALSE" }, comment: [{ type: String }] },
        googleAdsCreated: { status: { type: Number, default: 0 }, comment: [{ type: String }] },
        googleAdsDeleted: { status: { type: Number, default: 0 }, comment: [{ type: String }] },
        googleAnalyticsCreated: { status: { type: String, default: "FALSE" }, comment: [{ type: String }] },
        googleCloudConsoleCreated: { status: { type: String, default: "FALSE" }, comment: [{ type: String }] },
        googleFirebaseCreated: { status: { type: String, default: "FALSE" }, comment: [{ type: String }] },
        googleFirebaseUpgraded: { status: { type: String, default: "FALSE" }, comment: [{ type: String }] },
        googleCBusinessCreated: { status: { type: String, default: "FALSE" }, comment: [{ type: String }] },

        dateOfCreation: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

// mongoose.models = {};

var NewModel = mongoose.models[MODEL_NAME] || mongoose.model(MODEL_NAME, accountSchema, COLLECTION_NAME);

export default NewModel;
