// import connectDB from "../../utils/mongodb";
import createHandler from "../../../utils/middleware";
// import bcrypt from '../../middleware/bcrypt';
import accountModel from "../../../utils/models/accounts";
import campaign from "../../../utils/models/campaigns";
import taskModel from "../../../utils/models/tasks";
// import log from "../../utils/models/logs";

const handler = createHandler();
handler.get(async (req, res) => {
    return res.json({ ok: "get" });
});

handler.post(async (req, res) => {
    try {
        const body = req.body;
        console.log("body", body);
        const { accountId, entityType } = body;
        // entityType [CAMAPAIGN_CHANGE_STATUS, CAMPAIGN_CHANGE_BUDGET, CAMPAIGN_CREATE_ONLY, CAMPAIGN_ADD_AD_GROUP, CAMPAIGN_SET_LOCATION]
        console.log("step1");
        const acc = await accountModel
            .findOne({ accountId: accountId })
            .populate({ path: "campaigns", model: campaign });
        console.log("step2");
        if (!acc) {
            return res
                .status(404)
                .json({ ok: false, message: "account do not found" });
        }
        const searchPatern = {
            accountId: accountId,
            entityType: entityType,
            status: "TO_EXECUTE",
        };
        if (body.campaignId) {
            searchPatern["entityData.campaignId"] = body.campaignId;
        }
        const doesSameTaskAlreadyExist = await taskModel.findOne(searchPatern);
        // console.log("doesSameTaskAlreadyExist", doesSameTaskAlreadyExist);
        // console.log("searchPatern", searchPatern);
        // console.log("body", body);
        if (doesSameTaskAlreadyExist) {
            return res.status(401).json({
                ok: false,
                message:
                    "Non executed task with similar parameters already exists",
            });
        }
        // console.log(acc);
        const _task = new taskModel({
            accountId: accountId,
            entityType: entityType,
            entityData: body,
            status: "TO_EXECUTE",
        });
        console.log("step3");

        const saveResults = await _task.save();
        console.log(saveResults);
        res.status(200).json({ ok: true, message: "task setup successfully" });
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ ok: false, message: "internal error", error: error });
    }
});

export default handler;
