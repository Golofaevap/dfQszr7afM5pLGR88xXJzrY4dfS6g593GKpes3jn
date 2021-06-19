// import Link from "next/link";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
// ******************************
import { Campaign } from "../../components/accounts_id.js";
import { PerformanceForPeriod } from "../../components/account_id/StatElements.jsx";
import { Button } from "@material-ui/core";
import { TaskAccordion } from "../../components/account_id/tasks/AccountTasks.jsx";
import { useEffect, useState } from "react";
import { StickyContainer, Sticky } from "react-sticky";
// import "react-sticky-header/styles.css";
// import StickyHeader from "react-sticky-header";

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
    const [tasks, setTasks] = useState();

    useEffect(async () => {
        if (account.accountId) {
            const resp = await fetch("/api/tasks/gettasksbyid", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ accountId: account.accountId }),
            });
            const _tasks = await resp.json();
            console.log(_tasks);
            setTasks(_tasks);
        }
    }, [account.accountId]);
    return (
        <div>
            <StickyContainer>
                {/* Other elements can be in between `StickyContainer` and `Sticky`,
        but certain styles can break the positioning logic used. */}
                <Sticky>
                    {({
                        style,

                        // the following are also available but unused in this example
                        isSticky,
                        wasSticky,
                        distanceFromTop,
                        distanceFromBottom,
                        calculatedHeight,
                    }) => (
                        <header style={{ ...style, zIndex: 1000, backgroundColor: "white", borderBottom: "1px solid black" }}>
                            <Grid container>
                                <Grid item xs={4}>
                                    <h1>{account.accountId}</h1>
                                </Grid>
                                <Grid item xs={4}>
                                    <p>User: {account.user}</p>
                                </Grid>
                                <Grid item xs={4}>
                                    <p>
                                        Limits: {account.limitAPI} / {account.limitManual} {account.currency}
                                    </p>
                                </Grid>
                            </Grid>
                        </header>
                    )}
                </Sticky>

                <div className={classes.root}>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                            <Grid container>
                                <Grid item xs={3}>
                                    <Typography className={classes.heading}>
                                        <strong>Account Info</strong>
                                    </Typography>
                                    <Typography variant="h6" className={classes.subheading}>
                                        {account._id}
                                    </Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <PerformanceForPeriod title="ALL TIME" clicks={account.totalClicks} cost={account.totalCost} />
                                </Grid>
                                <Grid item xs={3}>
                                    <Grid container>
                                        <PerformanceForPeriod title="TODAY" clicks={account.todayClicks} cost={account.todayCost} />
                                    </Grid>
                                </Grid>
                                <Grid item xs={3}>
                                    <Grid container>
                                        <PerformanceForPeriod title="YESTERDAY" clicks={account.yesterdayClicks} cost={account.yesterdayCost} />
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
                                    <Grid container>
                                        <Grid item xs={12}>
                                            Days in work: {account.daysInWork}
                                        </Grid>
                                        <Grid item xs={12}>
                                            Check Limit Days: {account.checkLimitDays}
                                        </Grid>
                                        <Grid item xs={12}>
                                            {account.daysInWork < account.checkLimitDays ? "Ok" : "Stopped"}
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={3}>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            Days in work: {account.daysInWork}
                                        </Grid>
                                        <Grid item xs={12}>
                                            Check Limit Days: {account.checkLimitDays}
                                        </Grid>
                                        <Grid item xs={12}>
                                            {account.daysInWork < account.checkLimitDays ? "Ok" : "Stopped"}
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={3}>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            YESTERDAY
                                        </Grid>
                                        <Grid item xs={12}>
                                            Clicks: {account.totalClicks ? account.totalClicks : "0"}
                                        </Grid>
                                        <Grid item xs={12}>
                                            Cost: {account.totalCost ? account.totalCost : "0"}
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                    <TaskAccordion classes={classes} account={account} tasks={tasks} />
                    {account.campaigns &&
                        account.campaigns.map((campaign) => {
                            campaign.currency = account.currency;
                            campaign.accountId = account.accountId;

                            return <Campaign key={campaign.campaignId} campaign={campaign} classes={classes} tasks={tasks} />;
                        })}

                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel3a-content" id="panel3a-header">
                            <Typography className={classes.heading}>Full JSON</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <pre>{JSON.stringify(props, 0, 5)}</pre>
                        </AccordionDetails>
                    </Accordion>
                </div>
                {/* <Link href="/bydate">All account by date</Link> */}
            </StickyContainer>
        </div>
    );
}
