// import Link from "next/link";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
// ******************************
import {
    Campaign,
    AdGroup,
    Ad,
    PerformanceForPeriod,
} from "../../components/accounts_id.js";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
    },
    heading: {
        fontSize: theme.typography.pxToRem(13),
        margin: 0,
        fontWeight: theme.typography.fontWeightRegular,
    },
    subheading: {
        fontSize: theme.typography.pxToRem(11),
        color: "lightgray",
        margin: 0,
        fontWeight: theme.typography.fontWeightRegular,
    },
}));

export async function getServerSideProps(ctx) {
    console.log(ctx.query);
    const { id } = ctx.query;

    const resp = await fetch("http://localhost:3000/api/accounts/getbyid", {
        method: "POST",
        body: JSON.stringify({
            id,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    });

    const respJson = await resp.json();
    const acc = JSON.parse(JSON.stringify(respJson));

    return {
        props: {
            account: acc,
        },
    };
}

export default function Index(props) {
    // console.log(props);
    const { account } = props;
    const classes = useStyles();
    return (
        <div>
            <h1>{account.accountId}</h1>
            <div className={classes.root}>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Grid container>
                            <Grid item xs={3}>
                                <Typography className={classes.heading}>
                                    <strong>Account Info</strong>
                                </Typography>
                                <Typography
                                    variant="h6"
                                    className={classes.subheading}
                                >
                                    {account._id}
                                </Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <PerformanceForPeriod
                                    title="ALL TIME"
                                    clicks={account.totalClicks}
                                    cost={account.totalCost}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <Grid container>
                                    <PerformanceForPeriod
                                        title="TODAY"
                                        clicks={account.todayClicks}
                                        cost={account.todayCost}
                                    />
                                </Grid>
                            </Grid>
                            <Grid item xs={3}>
                                <Grid container>
                                    <PerformanceForPeriod
                                        title="YESTERDAY"
                                        clicks={account.yesterdayClicks}
                                        cost={account.yesterdayCost}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </AccordionSummary>
                    <AccordionDetails style={{ backgroundColor: "whitesmoke" }}>
                        <Grid container>
                            <Grid item xs={3}>
                                BUTTONS
                            </Grid>
                            <Grid item xs={3}>
                                <Grid container xs={12}>
                                    <Grid item xs={12}>
                                        Days in work: {account.daysInWork}
                                    </Grid>
                                    <Grid item xs={12}>
                                        Check Limit Days:{" "}
                                        {account.checkLimitDays}
                                    </Grid>
                                    <Grid item xs={12}>
                                        {account.daysInWork <
                                        account.checkLimitDays
                                            ? "Ok"
                                            : "Stopped"}
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={3}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        Days in work: {account.daysInWork}
                                    </Grid>
                                    <Grid item xs={12}>
                                        Check Limit Days:{" "}
                                        {account.checkLimitDays}
                                    </Grid>
                                    <Grid item xs={12}>
                                        {account.daysInWork <
                                        account.checkLimitDays
                                            ? "Ok"
                                            : "Stopped"}
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={3}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        YESTERDAY
                                    </Grid>
                                    <Grid item xs={12}>
                                        Clicks:{" "}
                                        {account.totalClicks
                                            ? account.totalClicks
                                            : "0"}
                                    </Grid>
                                    <Grid item xs={12}>
                                        Cost:{" "}
                                        {account.totalCost
                                            ? account.totalCost
                                            : "0"}
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
                {account.campaigns &&
                    account.campaigns.map((campaign) => {
                        return (
                            <Campaign
                                key={campaign.campaignId}
                                campaign={campaign}
                                classes={classes}
                            />
                        );
                    })}

                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3a-content"
                        id="panel3a-header"
                    >
                        <Typography className={classes.heading}>
                            Full JSON
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <pre>{JSON.stringify(props, 0, 5)}</pre>
                    </AccordionDetails>
                </Accordion>
            </div>
            {/* <Link href="/bydate">All account by date</Link> */}
        </div>
    );
}
