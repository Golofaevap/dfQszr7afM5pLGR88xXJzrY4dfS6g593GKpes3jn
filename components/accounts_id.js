import Grid from "@material-ui/core/Grid";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Button, makeStyles } from "@material-ui/core";

export function PerformanceForPeriod({ title, clicks, cost }) {
    return (
        <>
            <Grid
                item
                xs={12}
                style={{
                    fontSize: "70%",
                }}
            >
                <strong>{title}</strong>
            </Grid>
            <Grid
                item
                xs={12}
                style={{
                    fontSize: "70%",
                }}
            >
                Clicks: {clicks ? clicks : "0"}
            </Grid>
            <Grid
                item
                xs={12}
                style={{
                    fontSize: "70%",
                }}
            >
                Cost: {cost ? cost : "0"}
            </Grid>
        </>
    );
}

export function Ad({ ad, classes }) {
    return (
        <Accordion style={{ backgroundColor: "rgb(230,230,230)" }}>
            <AccordionSummary
                style={{ backgroundColor: "rgb(220,220,220)" }}
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography className={classes.heading}>
                    Ad : {ad.adId}
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <pre>{JSON.stringify(ad, 0, 5)}</pre>
            </AccordionDetails>
        </Accordion>
    );
}

export function AdGroup({ adGroup, classes }) {
    return (
        <Accordion style={{ backgroundColor: "rgb(240,240,240)" }}>
            <AccordionSummary
                style={{ backgroundColor: "rgb(235,235,235)" }}
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography className={classes.heading}>
                    Ad Group : {adGroup.adGroupId}
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography>{adGroup.adGroupId}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        {adGroup.ads &&
                            adGroup.ads.map((ad) => {
                                return (
                                    <Ad
                                        key={ad.adId}
                                        ad={ad}
                                        classes={classes}
                                    />
                                );
                            })}
                    </Grid>
                </Grid>
            </AccordionDetails>
        </Accordion>
    );
}

export function Campaign({ campaign, classes }) {
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
                        <Grid container xs={12}>
                            <Grid item xs={3}>
                                <Typography
                                    className={classes.heading}
                                    style={{ color: "gray" }}
                                >
                                    status
                                </Typography>
                                <Typography
                                    className={classes.heading}
                                    style={{ color: "gray" }}
                                >
                                    {campaign.budget} {campaign.currency}
                                </Typography>
                            </Grid>
                            <Grid item xs={9}>
                                <Typography
                                    className={classes.heading}
                                    style={{ color: "gray" }}
                                >
                                    Campaign
                                </Typography>
                                <Typography variant="h6">
                                    {campaign.name}
                                </Typography>
                                {campaign.campaignId}
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={3}>
                        <Grid container xs={12}>
                            <PerformanceForPeriod
                                title="All Time"
                                clicks={campaign.totalClicks}
                                cost={campaign.totalCost}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={3}>
                        <Grid container>
                            <PerformanceForPeriod
                                title="Today"
                                clicks={campaign.todayClicks}
                                cost={campaign.todayCost}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={3}>
                        <Grid container>
                            <PerformanceForPeriod
                                title="Yesterday"
                                clicks={campaign.yesterdayClicks}
                                cost={campaign.yesterdayCost}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </AccordionSummary>
            <AccordionDetails>
                <Grid container>
                    <Grid item xs={12}>
                        <Grid container xs={12}>
                            <Grid item xs={12}>
                                <Typography>CreateTasks</Typography>
                                <Button variant="outlined">
                                    Enable Campaign
                                </Button>
                                <Button variant="outlined">
                                    Pause Campaign
                                </Button>
                                <Button variant="outlined">
                                    Change Budget
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container xs={12}>
                            <Grid item xs={12}></Grid>
                        </Grid>
                        {campaign.adGroups &&
                            campaign.adGroups.map((adGroup) => {
                                return (
                                    <AdGroup
                                        key={adGroup.adGroupId}
                                        adGroup={adGroup}
                                        classes={classes}
                                    />
                                );
                            })}
                    </Grid>
                </Grid>
            </AccordionDetails>
        </Accordion>
    );
}
