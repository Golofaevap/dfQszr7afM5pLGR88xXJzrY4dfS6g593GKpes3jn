import connectDB from "../../utils/mongodb";
// import bcrypt from '../../middleware/bcrypt';
import account from "../../utils/models/accounts";
import log from "../../utils/models/logs";

const handler = async (req, res) => {
    console.log(req.body);
    // const log__ = new log({ log: JSON.stringify(req.body, null, 5) });
    // await log__.save();
    const acc = new account({ name: "first" });
    await acc.save();
    return res.json({ ok: true, version: 777 });
};

export default connectDB(handler);
