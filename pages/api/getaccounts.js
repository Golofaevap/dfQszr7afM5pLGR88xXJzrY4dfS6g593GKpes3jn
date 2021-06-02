import createHandler from "../../utils/middleware";
// import bcrypt from '../../middleware/bcrypt';
import account from "../../utils/models/accounts";
import campaign from "../../utils/models/campaigns";
import log from "../../utils/models/logs";

const handler = createHandler();

handler.get(async (req, res) => {
    const accs = await account
        .find({})
        .populate({ path: "campaigns", model: campaign });
    res.status(200).json(accs);
});

export default handler;
