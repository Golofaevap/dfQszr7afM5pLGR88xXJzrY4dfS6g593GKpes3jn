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
            budget: oneCamp.budget,
            adGroups: oneCamp.adGroups,
        });
        await isCamp.save();
    }
    console.log("campaignsIdsList", campaignsIdsList);
    return campaignsIdsList;
};

const campaignCreate = async (account, campaignInfo) => {
    try {
        const newCampaign = new campaign({
            account: account._id,
            name: "custom name I added",
            campaignId: campaignInfo.campaignId,
        });
        return await newCampaign.save();
    } catch (error) {
        console.log(error);
        return 0;
    }
};

exports.campaignCreate = campaignCreate;
exports.campaignsSave = campaignsSave;
