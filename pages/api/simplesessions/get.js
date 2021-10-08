// import connectDB from "../../utils/mongodb";
import createHandler from "../../../utils/middleware";
// import bcrypt from '../../middleware/bcrypt';
// import campaign from "../../../utils/models/campaigns";
import simpleSessionsModel from "../../../utils/models/simplesessions";
// import log from "../../utils/models/logs";

const handler = createHandler();
handler.get(async (req, res) => {
    console.log("get");
    try {
        const simplesessions = await simpleSessionsModel.find().limit(50);
        return res.json({ ok: true, result: simplesessions, message: "Sessions are found" });
    } catch (error) {
        console.log(error);
        return res.json({ ok: false, message: error });
    }
    return res.json({ ok: "get" });
});

handler.post(async (req, res) => {
    const { body } = req;
    console.log("post ----- - -- - -- - - ", body);
    if (!body.id) {
        return res.status(500).json({ ok: false, message: "id is not found", error: error });
    }

    try {
        const session = await simpleSessionsModel.findOne({ _id: body.id });
        console.log(session);
        res.status(200).json({ ok: true, result: session, message: "Session is found successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok: false, message: "internal error", error: error });
    }
});

export default handler;
