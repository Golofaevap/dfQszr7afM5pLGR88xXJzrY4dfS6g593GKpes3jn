import mongoose from "mongoose";
var Schema = mongoose.Schema;

const MODEL_NAME = "SimpleSessions";
const COLLECTION_NAME = "simplesessions";

var simpleSessionsSchema = new Schema(
    {
        samaraId: String,
        gadsId: String,
        phone: String,
        address: String,
        city: String,
        state: String,
        zip: String,
        gmail: String,
        recoveryEmail: String,
        password: String,
        dob: String,
        offerCountry: String,
        lang: String,
        paymentMethod: String,
        note: String,
        googlePhones: String,
        googleBackupCodes: String,
        color: String,
        workFakeEmail: String,
        billingCountry: String,
        bic_short_routing: String,
        iban_account: String,
        card: String,
        bankName: String,
        bank_logpass: String,
        questions: String,

        // used: { type: Boolean, default: false },
        // statusLive: { type: String, default: "ALIVE" },
        // proxyType: String,
        // ip: String,
        // port: String,
        // login: String,
        // password: String,
        // session: {
        //     type: Schema.Types.ObjectId,
        //     ref: "account",
        // },
        tags: [{ type: String }],

        dateOfCreation: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

// mongoose.models = {};

var NewModel = mongoose.models[MODEL_NAME] || mongoose.model(MODEL_NAME, simpleSessionsSchema, COLLECTION_NAME);

export default NewModel;
