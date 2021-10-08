// import connectDB from "../../utils/mongodb";
import createHandler from "../../../utils/middleware";
// import bcrypt from '../../middleware/bcrypt';
// import campaign from "../../../utils/models/campaigns";
import simpleSessionsModel from "../../../utils/models/simplesessions";
// import log from "../../utils/models/logs";

const handler = createHandler();
handler.get(async (req, res) => {
    console.log("get");
    // try {
    //     // const simplesessions = await simpleSessionsModel.find().limit(50);
    //     return res.json({ ok: true, result: simplesessions, message: "Sessions are found" });
    // } catch (error) {
    //     console.log(error);
    //     return res.json({ ok: false, message: error });
    // }
    return res.json({ ok: "get" });
});

handler.post(async (req, res) => {
    const { body } = req;
    console.log("post ----- - -- - -- - - ", body);
    if (!body) {
        return res.status(500).json({ ok: false, message: "filter is empty", error: error });
    }

    try {
        const filterCond = {};
        if (body.samaraId) {
            filterCond.samaraId = { $regex: body.samaraId };
        }
        if (body.tags) {
            filterCond.tags = { $in: body.tags.split(",").map((el) => el.trim()) };
        }
        console.log(filterCond);
        const sessions = await simpleSessionsModel.find(filterCond);
        console.log(sessions);
        res.status(200).json({ ok: true, result: sessions, message: "Sessions are found successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok: false, message: "internal error", error: error });
    }
});

export default handler;
