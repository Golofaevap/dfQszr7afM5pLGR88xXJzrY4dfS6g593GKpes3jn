import connectDB from "../../utils/mongodb";
// import bcrypt from '../../middleware/bcrypt';
import account from "../../utils/models/accounts";
import log from "../../utils/models/logs";
// utils
import { accountCreate, accountUpdate } from "../../utils/mongoose/account.js";
import {
    campaignCreate,
    campaignsSave,
} from "../../utils/mongoose/campaign.js";

// console.log(accountCreate);
const version = 101;

const handler = async (req, res) => {
    console.log("req.body");
    console.log(req.body);
    const errors = {};
    if (req.method !== "POST") {
        return res.json({
            ok: false,
            version,
            reason: "if(req.method!== 'POST')",
        });
    }
    try {
        const data = req.body;

        if (data.type !== "getreport") {
            return res.json({
                ok: false,
                reason: "if(data.type !== 'getreport')",
            });
        }
        // console.log(req);
        const log__ = new log({ log: JSON.stringify(data, null, 5) });
        await log__.save();
        const accountId = data.accountId;
        let accEntity = null;
        console.log(" - = step = - 1");
        accEntity = await account.findOne({ accountId: accountId });
        console.log(" - = step = - 2", accEntity);
        if (!accEntity) {
            accEntity = await accountCreate(data.accountInfo);
            if (accEntity === -1) {
                errors.accountCreate = "Problem to create account";
            }
        }

        console.log(" - = step = - 3");
        const campaignsIdsList = await campaignsSave(accEntity, data.campaigns);

        console.log(" - = step = - 4");
        console.log("campaignsIdsList 2", campaignsIdsList);

        await accountUpdate(accEntity._id, data.accountInfo, campaignsIdsList);
        return res.json({ ok: true, version: 781 });
    } catch (error) {
        console.log(error);
        const log__ = new log({ log: JSON.stringify(error, null, 5) });
        await log__.save();
        return res.json({ ok: false, reason: error });
    }
};

export default connectDB(handler);
