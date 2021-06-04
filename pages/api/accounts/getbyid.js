import createHandler from "../../../utils/middleware";
// import bcrypt from '../../middleware/bcrypt';
import accountModel from "../../../utils/models/accounts";
import campaignModel from "../../../utils/models/campaigns";
// import logModel from "../../../utils/models/logs";
// const moment = require("moment");

// const today = moment().startOf('day')
const handler = createHandler();

handler.post(async (req, res) => {
    try {
        console.log("POST getbyid");
        const { id } = req.body;
        console.log(id);
        const accs = await accountModel
            .findOne({
                _id: id,
            })
            .populate({ path: "campaigns", model: campaignModel });
        console.log(accs);
        console.log("response above");
        res.status(200).json(accs);
    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, error: error });
    }
});

export default handler;
