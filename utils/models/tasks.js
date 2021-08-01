import mongoose from "mongoose";
var Schema = mongoose.Schema;

const MODEL_NAME = "Task";
const COLLECTION_NAME = "tasks";

var taskSchema = new Schema(
    {
        accountId: { type: String, required: true },

        entityType: String,
        entityData: Object,
        status: String,
        // meta
        dateOfCreation: { type: Date, default: Date.now },
        execStatus: { type: Number, default: 0 },
        execLogs: Array,
    },
    { timestamps: true }
);

// mongoose.models = {};

var Task = mongoose.models[MODEL_NAME] || mongoose.model(MODEL_NAME, taskSchema, COLLECTION_NAME);

export default Task;
