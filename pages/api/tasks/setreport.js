// import connectDB from "../../utils/mongodb";
import createHandler from "../../../utils/middleware";
// import bcrypt from '../../middleware/bcrypt';
import account from "../../../utils/models/googleAdsAccounts";
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
        console.log(body, body);
        const { taskId, statusCode } = body;

        const task = await taskModel.findOne({ _id: taskId });
        if (statusCode === 1) {
            task.status = "COMPLETED";
            task.execStatus = statusCode;
        }
        if (statusCode === -1) {
            task.status = "AUTO_REPEAT";
            task.execStatus += statusCode;
            if (task.execStatus < -3) {
                task.status = "AUTO_REPEAT_FAILED";
            }
        }
        if (statusCode === 0) {
            task.status = "NEED_REVIEW";
            task.execStatus = statusCode;
            
        }

        if (!task.execLogs) {
            task.execLogs = [];
        }
        task.execLogs.push(body);
        await task.save();

        res.status(200).json({ ok: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, error: error });
    }
});

export default handler;
