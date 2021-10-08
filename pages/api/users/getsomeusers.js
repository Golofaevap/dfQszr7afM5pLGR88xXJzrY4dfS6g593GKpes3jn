// import connectDB from "../../utils/mongodb";
import createHandler from "../../../utils/middleware";
// import bcrypt from '../../middleware/bcrypt';
// import campaign from "../../../utils/models/campaigns";
import usersModel from "../../../utils/models/users";
// import log from "../../utils/models/logs";

const handler = createHandler();
handler.get(async (req, res) => {
    console.log("get");
    try {
        const users = await usersModel.find().limit(50);
        return res.json({ ok: true, result: users, message: "Users are found" });
    } catch (error) {
        console.log(error);
        return res.json({ ok: false, message: error });
    }
    return res.json({ ok: "get" });
});

handler.post(async (req, res) => {
    const { body } = req;
    console.log("post ----- - -- - -- - - ", body);
    if (!body.userId) {
        return res.status(500).json({ ok: false, message: "userId is not found", error: error });
    }

    try {
        const user = await usersModel.findOne({ _id: body.userId });
        console.log(user);
        res.status(200).json({ ok: true, result: user, message: "all proxies are added successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok: false, message: "internal error", error: error });
    }
});

export default handler;
