import createHandler from "../../../utils/middleware";
// import bcrypt from '../../middleware/bcrypt';
import accountModel from "../../../utils/models/googleAdsAccounts";
// import campaignModel from "../../../utils/models/campaigns";
// import logModel from "../../../utils/models/logs";
// const moment = require("moment");
const _ = require("lodash");

// const today = moment().startOf('day')
const handler = createHandler();

handler.post(async (req, res) => {
    try {
        console.log("POST edit");
        const { accId, newValue, operation } = req.body;
        console.log(accId, req.body, newValue, operation);
        let acc = await accountModel.findOne({ _id: accId });
        if (!acc) {
            res.status(400).json({ ok: false, error: "account not found" });
        }
        if (operation === "user") {
            acc = _.extend(acc, { user: newValue });
            await acc.save();

            return res.status(200).json({ ok: true, message: "Saved successfully!" });
        } else if (operation === "limit") {
            acc = _.extend(acc, { limitManual: Number(newValue) });
            await acc.save();

            return res.status(200).json({ ok: true, message: "Saved successfully!" });
        } else if (operation === "stars") {
            acc = _.extend(acc, { stars: Number(newValue) });
            await acc.save();

            return res.status(200).json({ ok: true, message: "Saved successfully! " + operation });
        } else if (operation === "offer") {
            acc = _.extend(acc, { offer: newValue });
            await acc.save();

            return res.status(200).json({ ok: true, message: "Saved successfully!" });
        } else if (operation === "historyPush") {
            console.log("historyPush");
            const pushDate = new Date();
            const { historyText, color, iconId } = req.body;
            // const history = acc.notes ? [...acc.notes] : [];
            // history.push({ date: pushDate, text: historyText, color, iconId });
            // console.log("historyhistory", acc, acc.notes, acc.checkLimitDays);
            // const newAcc = _.extend(acc, { notes: [...history] });
            // // acc.notes2 = [123];
            // const response = await newAcc.save();
            const updateObject = { dateOfNote: pushDate, textOfNote: historyText, colorOfNote: color, iconId: iconId };
            const response = await accountModel.findOneAndUpdate({ _id: accId }, { $push: { notes: updateObject } });
            console.log(response, updateObject);

            // const acc3 = await accountModel.findOne({ _id: accId });
            // console.log(acc3);

            return res.status(200).json({ ok: true, message: "Saved successfully!" });
        } else res.status(400).json({ ok: false, error: "operation not found" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, error: error });
    }
});

export default handler;
