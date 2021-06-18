// import connectDB from "../../utils/mongodb";
import createHandler from "../../../utils/middleware";
// import bcrypt from '../../middleware/bcrypt';
import account from "../../../utils/models/accounts";
import campaign from "../../../utils/models/campaigns";
import task from "../../../utils/models/tasks";
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
        const tasks = await task.find({
            accountId: accountId,
        });

        res.status(200).json(tasks);
    } catch (error) {
        console.log(error);
    }
});

export default handler;
