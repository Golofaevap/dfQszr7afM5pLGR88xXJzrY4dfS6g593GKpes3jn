import connectDB from "../../utils/mongodb";
// import bcrypt from '../../middleware/bcrypt';
import account from "../../utils/models/accounts";

const handler = async (req, res) => {
    const acc = new account({ name: "first" });
    await acc.save();
    return res.json({ ok: true });
};

export default connectDB(handler);
