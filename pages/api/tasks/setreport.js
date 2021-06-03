// import connectDB from "../../utils/mongodb";
import createHandler from "../../../utils/middleware";
// import bcrypt from '../../middleware/bcrypt';
import account from "../../../utils/models/accounts";
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
        task.execStatus = statusCode;
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
