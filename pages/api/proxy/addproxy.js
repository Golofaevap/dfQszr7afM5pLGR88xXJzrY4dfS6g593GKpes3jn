// import connectDB from "../../utils/mongodb";
import createHandler from "../../../utils/middleware";
// import bcrypt from '../../middleware/bcrypt';
import campaign from "../../../utils/models/campaigns";
import proxyModel from "../../../utils/models/proxy";
// import log from "../../utils/models/logs";

const handler = createHandler();
handler.get(async (req, res) => {
    return res.json({ ok: "get" });
});

handler.post(async (req, res) => {
    console.log("post ----- - -- - -- - - ");
    try {
        const body = req.body;
        console.log("body", body);
        // return res.json({ ok: "post" });
        // const { accountId, entityType } = body;
        // entityType [CAMAPAIGN_CHANGE_STATUS, CAMPAIGN_CHANGE_BUDGET, CAMPAIGN_CREATE_ONLY, CAMPAIGN_ADD_AD_GROUP, CAMPAIGN_SET_LOCATION]
        console.log("step1");
        const newProxies = await proxyModel.insertMany(body);
        // const acc = await accountModel
        //     .findOne({ accountId: accountId })
        //     .populate({ path: "campaigns", model: campaign });
        console.log("step2");
        console.log(newProxies);
        console.log("step3");

        // const saveResults = await _task.save();
        // console.log(saveResults);
        res.status(200).json({ ok: true, message: "all proxies are added successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok: false, message: "internal error", error: error });
    }
});

export default handler;
