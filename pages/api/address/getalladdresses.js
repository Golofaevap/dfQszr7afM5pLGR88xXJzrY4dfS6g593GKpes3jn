// import connectDB from "../../utils/mongodb";
import createHandler from "../../../utils/middleware";
// import bcrypt from '../../middleware/bcrypt';
// import campaign from "../../../utils/models/campaigns";
// import addressModel from "../../../utils/models/proxy";
import addressModel from "../../../utils/models/userAddresses";
// import log from "../../utils/models/logs";

const handler = createHandler();
handler.get(async (req, res) => {
    console.log("get");
    try {
        const addresses = await addressModel.find();
        return res.json({ ok: true, result: addresses, message: "Addresses are found" });
    } catch (error) {
        console.log(error);
        return res.json({ ok: false, message: error });
    }
    return res.json({ ok: "get" });
});

handler.post(async (req, res) => {
    console.log("post ----- - -- - -- - - ");
    try {
        
        res.status(200).json({ ok: true, message: "all addresses are added successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok: false, message: "internal error", error: error });
    }
});

export default handler;
