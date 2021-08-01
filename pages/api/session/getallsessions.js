// import connectDB from "../../utils/mongodb";
import createHandler from "../../../utils/middleware";
// import bcrypt from '../../middleware/bcrypt';
// import campaign from "../../../utils/models/campaigns";
// import sessionModel from "../../../utils/models/proxy";
import sessionModel from "../../../utils/models/sessions";
// import log from "../../utils/models/logs";

const handler = createHandler();
handler.get(async (req, res) => {
    console.log("get");
    try {
        const sessions = await sessionModel.find();
        return res.json({ ok: true, result: sessions, message: "sessions are found" });
    } catch (error) {
        console.log(error);
        return res.json({ ok: false, message: error });
    }
    return res.json({ ok: "get" });
});

handler.post(async (req, res) => {
    console.log("post ----- - -- - -- - - ");
    try {
        res.status(200).json({ ok: true, message: "all sessions are added successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok: false, message: "internal error", error: error });
    }
});

export default handler;
