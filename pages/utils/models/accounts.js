import mongoose from "mongoose";
var Schema = mongoose.Schema;

var account = new Schema({
    name: String,
});

mongoose.models = {};

var Account = mongoose.model("Account", account);

export default Account;
