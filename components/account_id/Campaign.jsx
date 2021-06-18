import Grid from "@material-ui/core/Grid";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Button, makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react";

// import { makeStyles } from '@material-ui/core/styles';
// import IconButton from '@material-ui/core/IconButton';
// import Input from '@material-ui/core/Input';
// import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
// import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from "@material-ui/core/FormControl";
// import TextField from '@material-ui/core/TextField';
// import Visibility from '@material-ui/icons/Visibility';
// import VisibilityOff from '@material-ui/icons/VisibilityOff';

// *******************************************************************
import { PerformanceForPeriod } from "./StatElements.jsx";
import { AdGroup } from "./AdGroup.jsx";
import { ChangeStatusCampaign, ChangeBudgetCampaign, CapmaignTasks } from "./tasks/CampaignTasks";
import { TaskWrapper } from "./tasks/TaskWrapper.jsx";
// *******************************************************************
// export function Campaign({ campaign, classes }) {
//     return <div>YEs</div>
// }

export function Campaign({ campaign, classes, tasks }) {
    const [showStatusChangeDialog, setShowStatusChangeDialog] = useState(false);
    const [showBudgetChangeDialog, setShowBudgetChangeDialog] = useState(false);
    const [newCampaignStatus, setNewCampaignStatus] = useState("NONE");
    const [newCampaignBudget, setNewCampaignBudget] = useState(0);
    return (
        <Accordion style={{ backgroundColor: "rgb(250,250,250)" }}>
            <AccordionSummary
                style={{ backgroundColor: "rgb(245,245,245)" }}
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
            >
                <Grid container>
                    <Grid item xs={3}>
                        <Grid container>
                            <Grid item xs={3}>
                                <Typography className={classes.heading} style={{ color: "gray" }}>
                                    status
                                </Typography>
                                <Typography className={classes.heading} style={{ color: "gray" }}>
                                    {campaign.budget} {campaign.currency}
                                </Typography>
                            </Grid>
                            <Grid item xs={9}>
                                <Typography className={classes.heading} style={{ color: "gray" }}>
                                    Campaign
                                </Typography>
                                <Typography variant="h6">{campaign.name}</Typography>
                                {campaign.campaignId}
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={3}>
                        <Grid container>
                            <PerformanceForPeriod title="All Time" clicks={campaign.totalClicks} cost={campaign.totalCost} />
                        </Grid>
                    </Grid>
                    <Grid item xs={3}>
                        <Grid container>
                            <PerformanceForPeriod title="Today" clicks={campaign.todayClicks} cost={campaign.todayCost} />
                        </Grid>
                    </Grid>
                    <Grid item xs={3}>
                        <Grid container>
                            <PerformanceForPeriod title="Yesterday" clicks={campaign.yesterdayClicks} cost={campaign.yesterdayCost} />
                        </Grid>
                    </Grid>
                </Grid>
            </AccordionSummary>
            <AccordionDetails>
                <Grid container>
                    <Grid item xs={12}>
                        <CapmaignTasks campaign={campaign} tasks={tasks} />
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container>
                            <Grid item xs={12}></Grid>
                        </Grid>
                        {campaign.adGroups &&
                            campaign.adGroups.map((adGroup) => {
                                adGroup.accountId = campaign.accountId;
                                return <AdGroup key={adGroup.adGroupId} adGroup={adGroup} classes={classes} tasks={tasks} />;
                            })}
                    </Grid>
                </Grid>
            </AccordionDetails>
        </Accordion>
    );
}
