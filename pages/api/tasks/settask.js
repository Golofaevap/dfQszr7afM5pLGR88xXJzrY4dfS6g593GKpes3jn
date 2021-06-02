// import connectDB from "../../utils/mongodb";
import createHandler from "../../utils/middleware";
// import bcrypt from '../../middleware/bcrypt';
import account from "../../utils/models/accounts";
import campaign from "../../utils/models/campaigns";
import task from "../../utils/models/tasks";
// import log from "../../utils/models/logs";

const handler = createHandler();
handler.get(async (req, res) => {
    return res.json({ ok: "get" });
});

handler.post(async (req, res) => {
    try {
        const body = req.body;
        console.log(body, body);
        const { accountId } = body;
        console.log("step1");
        const acc = await account
            .findOne({ accountId: accountId })
            .populate({ path: "campaigns", model: campaign });
        console.log("step2");
        if (!acc) {
            return res
                .status(404)
                .json({ ok: false, message: "account do not found" });
        }
        console.log(acc);
        const _task = new task({
            accountId: accountId,
            entityType: "CAMPAIGN",
            entityData: body,
            status: "TO_EXECUTE",
        });
        console.log("step3");

        const saveResults = await _task.save();
        console.log(saveResults);
        res.status(200).json(accs);
    } catch (error) {
        console.log(error);
    }
});

export default handler;
