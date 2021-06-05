const _ = require("lodash");
const { default: campaign } = require("../models/campaigns.js");

// console.log("account = ", account);
const campaignsSave = async (account, campaigns) => {
    const campaignsIdsList = [];
    for (let i in campaigns) {
        const oneCamp = campaigns[i];
        let isCamp = await campaign.findOne({
            campaignId: oneCamp.campaignId,
            account: account._id,
        });
        if (!isCamp) {
            // campaign update
            // campaing create
            isCamp = await campaignCreate(account, oneCamp);
            if (isCamp) campaignsIdsList.push(isCamp._id);
            else return 0;
        }
        isCamp = _.extend(isCamp, {
            name: oneCamp.name,
            //
            // budget: oneCamp.budget,
            isEnabled: oneCamp.isEnabled,
            budget: oneCamp.budget,

            // total
            totalCost: oneCamp.totalCost,
            totalImpressions: oneCamp.totalImpressions,
            totalClicks: oneCamp.totalClicks,
            totalConversions: oneCamp.totalConversions,
            totalViesw: oneCamp.totalViesw,
            // total
            todayCost: oneCamp.todayCost,
            todayImpressions: oneCamp.todayImpressions,
            todayClicks: oneCamp.todayClicks,
            todayConversions: oneCamp.todayConversions,
            todayViesw: oneCamp.todayViesw,
            // total
            yesterdayCost: oneCamp.yesterdayCost,
            yesterdayImpressions: oneCamp.yesterdayImpressions,
            yesterdayClicks: oneCamp.yesterdayClicks,
            yesterdayConversions: oneCamp.yesterdayConversions,
            yesterdayViesw: oneCamp.yesterdayViesw,

            adGroups: oneCamp.adGroups,
        });
        await isCamp.save();
    }
    console.log("campaignsIdsList", campaignsIdsList);
    return campaignsIdsList;
};

const campaignCreate = async (account, campaignInfo) => {
    console.log("CAMAPIGN INFO", campaignInfo);
    try {
        const newCampaign = new campaign({
            account: account._id,
            name: "custom name I added",
            campaignId: campaignInfo.campaignId,
            type: campaignInfo.type,
        });
        return await newCampaign.save();
    } catch (error) {
        console.log(error);
        return 0;
    }
};

exports.campaignCreate = campaignCreate;
exports.campaignsSave = campaignsSave;
