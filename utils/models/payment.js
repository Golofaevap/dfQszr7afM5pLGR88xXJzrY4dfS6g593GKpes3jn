import mongoose from "mongoose";
var Schema = mongoose.Schema;

const MODEL_NAME = "Payment";
const COLLECTION_NAME = "Payments";

var accountSchema = new Schema(
    {
        paymentType: { type: String },

        rawInfo: { type: String },

        cardNumber: { type: String },
        cardDate: { type: String },
        cardCVC: { type: String },

        baRouting: { type: String },
        baAccount: { type: String },
        baLogin: { type: String },
        baPassword: { type: String },

        emailLogin: { type: String },
        emailPassword: { type: String },

        paypalLogin: { type: String },
        paypalPassword: { type: String },

        notes: { type: String },

        dateOfCreation: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

// mongoose.models = {};

var NewModel = mongoose.models[MODEL_NAME] || mongoose.model(MODEL_NAME, accountSchema, COLLECTION_NAME);

export default NewModel;
