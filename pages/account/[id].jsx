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
import { Button, IconButton, LinearProgress } from "@material-ui/core";
import { TaskAccordion } from "../../components/account_id/tasks/AccountTasks.jsx";
import { useEffect, useState } from "react";
import { StickyContainer, Sticky } from "react-sticky";
import { AccountHistory } from "../../components/account_id/AccountHistory.jsx";
// import "react-sticky-header/styles.css";
// import StickyHeader from "react-sticky-header";
// ******************************
import StarBorderIcon from "@material-ui/icons/StarBorder";
import StarIcon from "@material-ui/icons/Star";
import RefreshIcon from "@material-ui/icons/Refresh";
// ******************************
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
    const _account = props.account;
    const classes = useStyles();
    const [tasks, setTasks] = useState();
    const [account, setAccount] = useState(_account);
    const [loading, setLoading] = useState(false);

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
                                {loading && (
                                    <Grid item xs={12}>
                                        <LinearProgress />
                                    </Grid>
                                )}
                                <Grid item xs={3}>
                                    <h2>{account.accountId}</h2>
                                </Grid>
                                <Grid item xs={3}>
                                    <p>User: {account.user}</p>
                                </Grid>
                                <Grid item xs={3}>
                                    <p>
                                        Limits: {account.limitAPI} / {account.limitManual} {account.currency}
                                    </p>
                                </Grid>
                                <Grid item xs={2}>
                                    <p>Offer: {account.offer}</p>
                                </Grid>
                                <Grid item xs={1}>
                                    <IconButton
                                        color="primary"
                                        aria-label="upload picture"
                                        component="span"
                                        onClick={async () => {
                                            try {
                                                setLoading(true);
                                                const resp = await fetch("http://localhost:3000/api/accounts/getbyid", {
                                                    method: "POST",
                                                    body: JSON.stringify({
                                                        id: account._id,
                                                    }),
                                                    headers: {
                                                        "Content-Type": "application/json",
                                                    },
                                                });

                                                const respJson = await resp.json();
                                                const acc = JSON.parse(JSON.stringify(respJson));
                                                setAccount(acc);
                                                setLoading(false);
                                            } catch (error) {
                                                setLoading(false);
                                            }
                                        }}
                                    >
                                        <RefreshIcon />
                                    </IconButton>
                                </Grid>
                                <Grid item xs={3}>
                                    {account.stars >= 1 ? <StarIcon color="secondary" /> : <StarBorderIcon color="secondary" />}
                                    {account.stars >= 2 ? <StarIcon color="secondary" /> : <StarBorderIcon color="secondary" />}
                                    {account.stars >= 3 ? <StarIcon color="secondary" /> : <StarBorderIcon color="secondary" />}
                                    {account.stars >= 4 ? <StarIcon color="secondary" /> : <StarBorderIcon color="secondary" />}
                                    {account.stars >= 5 ? <StarIcon color="secondary" /> : <StarBorderIcon color="secondary" />}
                                </Grid>
                            </Grid>
                        </header>
                    )}
                </Sticky>

                <div className={classes.root}>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel3a-content" id="panel3a-header">
                            <Typography className={classes.heading}>History</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <AccountHistory accountId={account._id} notes={account.notes} />
                        </AccordionDetails>
                    </Accordion>
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
