import createHandler from "../../../utils/middleware";
// import bcrypt from '../../middleware/bcrypt';
import account from "../../../utils/models/accounts";
import campaign from "../../../utils/models/campaigns";
import log from "../../../utils/models/logs";
const moment = require("moment");

// const today = moment().startOf('day')
const handler = createHandler();

handler.post(async (req, res) => {
    const { startDate, endDate } = req.body;
    const _endDate = endDate ? endDate : startDate;
    const start = moment(startDate).startOf("day");
    const end = moment(_endDate).endOf("day");
    console.log(start, end);
    const accs = await account
        .find({
            createdAt: {
                $gte: start.toDate(),
                $lte: end.toDate(),
            },
        })
        .populate({ path: "campaigns", model: campaign });
    res.status(200).json(accs);
});

export default handler;
