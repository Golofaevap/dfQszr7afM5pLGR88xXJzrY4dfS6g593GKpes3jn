import createHandler from "../../../utils/middleware";
// import bcrypt from '../../middleware/bcrypt';
import accountModel from "../../../utils/models/accounts";
// import campaignModel from "../../../utils/models/campaigns";
// import logModel from "../../../utils/models/logs";
// const moment = require("moment");
const _ = require("lodash");

// const today = moment().startOf('day')
const handler = createHandler();

handler.post(async (req, res) => {
    try {
        console.log("POST edit");
        const { accId, newValue, operation } = JSON.parse(req.body);
        console.log(accId, req.body, newValue, operation);
        let acc = await accountModel.findOne({ _id: accId });
        if (!acc) {
            res.status(400).json({ ok: false, error: "account not found" });
        }
        if (operation === "user") {
            acc = _.extend(acc, { user: newValue });

            res.status(200).json({ ok: true, message: "Saved successfully!" });
        }
        res.status(400).json({ ok: false, error: "operation not found" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, error: error });
    }
});

export default handler;
