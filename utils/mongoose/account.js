const _ = require("lodash");

const { default: account } = require("../models/accounts.js");

// console.log("account = ", account);

const accountCreate = async (accountInfo) => {
    console.log("account.create");
    try {
        const newAccount = new account({
            accountId: accountInfo.accountId,
            customName: "custom name I added",
        });
        return await newAccount.save();
    } catch (error) {
        console.log(error);
        return -1;
    }
};
const accountUpdate = async (accountId, accountInfo, campaignsIdsList) => {
    console.log("account.update");
    try {
        const accEntity = await account.findOne({ _id: accountId });
        if (!accEntity) return -1;
        // let changeWasMade = false;
        for (let i in campaignsIdsList) {
            const campId = campaignsIdsList[i];
            if (!accEntity.campaigns.includes(campId)) {
                accEntity.campaigns.push(campId);
                changeWasMade = true;
            }
        }
        const updtdEntity = _.extend(accEntity, {
            daysInWork: accountInfo.daysInWork,
            checkLimitDays: accountInfo.checkLimitDays,
            // total
            totalCost: accountInfo.totalCost,
            totalImpressions: accountInfo.totalImpressions,
            totalClicks: accountInfo.totalClicks,
            totalConversions: accountInfo.totalConversions,
            totalViesw: accountInfo.totalViesw,
            // total
            todayCost: accountInfo.todayCost,
            todayImpressions: accountInfo.todayImpressions,
            todayClicks: accountInfo.todayClicks,
            todayConversions: accountInfo.todayConversions,
            todayViesw: accountInfo.todayViesw,
            // total
            yesterdayCost: accountInfo.yesterdayCost,
            yesterdayImpressions: accountInfo.yesterdayImpressions,
            yesterdayClicks: accountInfo.yesterdayClicks,
            yesterdayConversions: accountInfo.yesterdayConversions,
            yesterdayViesw: accountInfo.yesterdayViesw,
        });
        // changeWasMade = updateField(
        //     accEntity,
        //     "daysInWork",
        //     accountInfo.daysInWork,
        //     changeWasMade
        // );

        // accEntity.daysInWork = accountInfo.daysInWork;
        // if (changeWasMade) await accEntity.save();
        return await updtdEntity.save();
        // return accEntity;
    } catch (error) {
        console.log(error);
        return -1;
    }
};

const updateField = (accEntity, fieldName, value, changeWasMade) => {
    if (accEntity[fieldName] !== value) {
        accEntity[fieldName] = value;
        changeWasMade = true;
    }
    return changeWasMade;
};

exports.accountCreate = accountCreate;
exports.accountUpdate = accountUpdate;
