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
import { Campaign as _campaign }  from "./account_id/Campaign.jsx";
// *******************************************************************
/** */
// const useStyles = makeStyles((theme) => ({
//     root: {
//         display: "flex",
//         flexWrap: "wrap",
//     },
//     margin: {
//         margin: theme.spacing(1),
//     },
//     withoutLabel: {
//         marginTop: theme.spacing(3),
//     },
//     textField: {
//         width: "25ch",
//     },
// }));
/** */
// export function ChangeBudgetCampaign({
//     campaign,
//     classes,
//     newCampaignBudget,
//     setNewCampaignBudget,
//     setShowBudgetChangeDialog,
// }) {
//     const classes2 = useStyles();
//     const [newCampaignBudgetChangeType, setNewCampaignBudgetChangeType] =
//         useState("INCREASE");

//     const [values, setValues] = useState({
//         amount: "",
//         maxAmount: "200",
//     });
//     useEffect(() => {
//         if (newCampaignBudgetChangeType) {
//             const _amount = 1 + Number(values.amount) / 100;
//             let _newBudget = campaign.budget * _amount;
//             if (_newBudget > values.maxAmount) {
//                 _newBudget = values.maxAmount;
//             }
//             _newBudget = Number("" + Math.round(_newBudget * 100)) * 0.01;
//             console.log("_newBudget", _newBudget);
//             setNewCampaignBudget(_newBudget);
//         }
//     }, [values.amount, values.maxAmount, newCampaignBudgetChangeType]);
//     const handleChange = (prop) => (event) => {
//         setValues({ ...values, [prop]: event.target.value });
//     };
//     return (
//         <Grid item xs={12}>
//             <Typography className={classes.heading} style={{ color: "black" }}>
//                 Change Budget
//             </Typography>
//             <Grid container xs={12}>
//                 <Grid item xs={4}>
//                     <Typography
//                         className={classes.heading}
//                         style={{ color: "gray" }}
//                     >
//                         Current budget
//                     </Typography>
//                     {campaign.budget} {campaign.currency}
//                 </Grid>
//                 <Grid item xs={4}>
//                     <Button
//                         variant={
//                             newCampaignBudgetChangeType === "INCREASE"
//                                 ? "contained"
//                                 : "outlined"
//                         }
//                         color="secondary"
//                         onClick={() => {
//                             setNewCampaignBudgetChangeType("INCREASE");
//                             setNewCampaignBudget(0);
//                         }}
//                     >
//                         INCREASE by %
//                     </Button>
//                     <Button
//                         variant={
//                             newCampaignBudgetChangeType === "EXACT"
//                                 ? "contained"
//                                 : "outlined"
//                         }
//                         color="secondary"
//                         onClick={() => {
//                             setNewCampaignBudgetChangeType("EXACT");
//                             setNewCampaignBudget(0);
//                         }}
//                     >
//                         EXACT AMOUNT
//                     </Button>
//                     {newCampaignBudgetChangeType === "INCREASE" && (
//                         <div>
//                             by %
//                             <FormControl
//                                 fullWidth
//                                 className={classes2.margin}
//                                 variant="outlined"
//                             >
//                                 <InputLabel htmlFor="outlined-adornment-amount">
//                                     Amount
//                                 </InputLabel>
//                                 <OutlinedInput
//                                     id="outlined-adornment-amount"
//                                     type="number"
//                                     value={values.amount}
//                                     onChange={handleChange("amount")}
//                                     startAdornment={
//                                         <InputAdornment position="start">
//                                             %
//                                         </InputAdornment>
//                                     }
//                                     labelWidth={60}
//                                 />
//                             </FormControl>
//                             <FormControl
//                                 fullWidth
//                                 className={classes2.margin}
//                                 variant="outlined"
//                             >
//                                 <InputLabel htmlFor="outlined-adornment-amount">
//                                     Max Amount
//                                 </InputLabel>
//                                 <OutlinedInput
//                                     id="outlined-adornment-amount"
//                                     type="number"
//                                     value={values.maxAmount}
//                                     onChange={handleChange("maxAmount")}
//                                     startAdornment={
//                                         <InputAdornment position="start">
//                                             {campaign.currency}
//                                         </InputAdornment>
//                                     }
//                                     labelWidth={160}
//                                 />
//                             </FormControl>
//                         </div>
//                     )}
//                     {newCampaignBudgetChangeType === "EXACT" && (
//                         <div>
//                             <FormControl
//                                 fullWidth
//                                 className={classes2.margin}
//                                 variant="outlined"
//                             >
//                                 <InputLabel htmlFor="outlined-adornment-amount">
//                                     New budget
//                                 </InputLabel>
//                                 <OutlinedInput
//                                     id="outlined-adornment-amount"
//                                     type="number"
//                                     value={newCampaignBudget}
//                                     onChange={(e) => {
//                                         setNewCampaignBudget(e.target.value);
//                                         setValues({ ...values, amount: 0 });
//                                     }}
//                                     startAdornment={
//                                         <InputAdornment position="start">
//                                             {campaign.currency}
//                                         </InputAdornment>
//                                     }
//                                     labelWidth={160}
//                                 />
//                             </FormControl>
//                         </div>
//                     )}
//                     {newCampaignBudget !== campaign.budget && (
//                         <FormControl
//                             fullWidth
//                             className={classes2.margin}
//                             variant="outlined"
//                         >
//                             <InputLabel htmlFor="outlined-adornment-amount">
//                                 New budget
//                             </InputLabel>
//                             <OutlinedInput
//                                 id="outlined-adornment-amount"
//                                 type="number"
//                                 value={newCampaignBudget}
//                                 startAdornment={
//                                     <InputAdornment position="start">
//                                         {campaign.currency}
//                                     </InputAdornment>
//                                 }
//                                 labelWidth={160}
//                             />
//                         </FormControl>
//                     )}
//                 </Grid>
//                 <Grid item xs={4}>
//                     <Button
//                         variant="contained"
//                         color="primary"
//                         onClick={async () => {
//                             if (!newCampaignBudget) {
//                                 alert(
//                                     "Set up new budget! " + newCampaignStatus
//                                 );
//                                 return;
//                             }
//                             const resp = await fetch("/api/tasks/settask", {
//                                 method: "POST",
//                                 body: JSON.stringify({
//                                     accountId: campaign.accountId,
//                                     campaignId: campaign.campaignId,
//                                     entityType: "CAMPAIGN_CHANGE_BUDGET",
//                                     newBudget: newCampaignBudget,
//                                 }),
//                                 headers: {
//                                     "Content-Type": "application/json",
//                                 },
//                             });
//                             const respJSON = await resp.json();
//                             alert(respJSON.message);
//                             setShowBudgetChangeDialog(false);
//                             setNewCampaignBudget(0);
//                         }}
//                     >
//                         Setup Task
//                     </Button>
//                 </Grid>
//             </Grid>
//         </Grid>
//     );
// }
/** */
// export function ChangeStatusCampaign({
//     campaign,
//     classes,
//     newCampaignStatus,
//     setNewCampaignStatus,
//     setShowStatusChangeDialog,
// }) {
//     return (
//         <Grid item xs={12}>
//             <Typography className={classes.heading} style={{ color: "black" }}>
//                 Change Status
//             </Typography>
//             <Grid container xs={12}>
//                 <Grid item xs={4}>
//                     <Typography
//                         className={classes.heading}
//                         style={{ color: "gray" }}
//                     >
//                         Current status
//                     </Typography>
//                     {campaign.isEnabled
//                         ? "Enabled"
//                         : campaign.isPaused
//                         ? "Paused"
//                         : campaign.isRemoved
//                         ? "Removed"
//                         : "Unknown"}
//                 </Grid>
//                 <Grid item xs={4}>
//                     <Button
//                         variant={
//                             newCampaignStatus === "PAUSED"
//                                 ? "contained"
//                                 : "outlined"
//                         }
//                         color="secondary"
//                         onClick={() => {
//                             setNewCampaignStatus("PAUSED");
//                         }}
//                     >
//                         Pause
//                     </Button>
//                     <Button
//                         variant={
//                             newCampaignStatus === "ENABLED"
//                                 ? "contained"
//                                 : "outlined"
//                         }
//                         color="secondary"
//                         onClick={() => {
//                             setNewCampaignStatus("ENABLED");
//                         }}
//                     >
//                         Enable
//                     </Button>
//                 </Grid>
//                 <Grid item xs={4}>
//                     <Button
//                         variant="contained"
//                         color="primary"
//                         onClick={async () => {
//                             if (
//                                 newCampaignStatus !== "PAUSED" &&
//                                 newCampaignStatus !== "ENABLED"
//                             ) {
//                                 alert("Select status!" + newCampaignStatus);
//                                 return;
//                             }
//                             const resp = await fetch("/api/tasks/settask", {
//                                 method: "POST",
//                                 body: JSON.stringify({
//                                     accountId: campaign.accountId,
//                                     campaignId: campaign.campaignId,
//                                     anyJey: 123,
//                                     entityType: "CAMAPAIGN_CHANGE_STATUS",
//                                     newStatus: newCampaignStatus,
//                                 }),
//                                 headers: {
//                                     "Content-Type": "application/json",
//                                 },
//                             });
//                             const respJSON = await resp.json();
//                             alert(respJSON.message);
//                             setShowStatusChangeDialog(false);
//                             setNewCampaignStatus("NONE");
//                         }}
//                     >
//                         Setup Task
//                     </Button>
//                 </Grid>
//             </Grid>
//         </Grid>
//     );
// }
/** */
// export function PerformanceForPeriod({ title, clicks, cost }) {
//     return (
//         <>
//             <Grid
//                 item
//                 xs={12}
//                 style={{
//                     fontSize: "70%",
//                 }}
//             >
//                 <strong>{title}</strong>
//             </Grid>
//             <Grid
//                 item
//                 xs={12}
//                 style={{
//                     fontSize: "70%",
//                 }}
//             >
//                 Clicks: {clicks ? clicks : "0"}
//             </Grid>
//             <Grid
//                 item
//                 xs={12}
//                 style={{
//                     fontSize: "70%",
//                 }}
//             >
//                 Cost: {cost ? cost : "0"}
//             </Grid>
//         </>
//     );
// }
/**123 */
// export function Ad({ ad, classes }) {
//     return (
//         <Accordion style={{ backgroundColor: "rgb(230,230,230)" }}>
//             <AccordionSummary
//                 style={{ backgroundColor: "rgb(220,220,220)" }}
//                 expandIcon={<ExpandMoreIcon />}
//                 aria-controls="panel1a-content"
//                 id="panel1a-header"
//             >
//                 <Typography className={classes.heading}>
//                     Ad : {ad.adId}
//                 </Typography>
//             </AccordionSummary>
//             <AccordionDetails>
//                 <pre>{JSON.stringify(ad, 0, 5)}</pre>
//             </AccordionDetails>
//         </Accordion>
//     );
// }

// export function AdGroup({ adGroup, classes }) {
//     return (
//         <Accordion style={{ backgroundColor: "rgb(240,240,240)" }}>
//             <AccordionSummary
//                 style={{ backgroundColor: "rgb(235,235,235)" }}
//                 expandIcon={<ExpandMoreIcon />}
//                 aria-controls="panel1a-content"
//                 id="panel1a-header"
//             >
//                 <Typography className={classes.heading}>
//                     Ad Group : {adGroup.adGroupId}
//                 </Typography>
//             </AccordionSummary>
//             <AccordionDetails>
//                 <Grid container>
//                     <Grid item xs={12}>
//                         <Typography>{adGroup.adGroupId}</Typography>
//                     </Grid>
//                     <Grid item xs={12}>
//                         {adGroup.ads &&
//                             adGroup.ads.map((ad) => {
//                                 return (
//                                     <Ad
//                                         key={ad.adId}
//                                         ad={ad}
//                                         classes={classes}
//                                     />
//                                 );
//                             })}
//                     </Grid>
//                 </Grid>
//             </AccordionDetails>
//         </Accordion>
//     );
// }
/** */
export const Campaign = _campaign;
// export function Campaign({ campaign, classes }) {
//     const [showStatusChangeDialog, setShowStatusChangeDialog] = useState(false);
//     const [showBudgetChangeDialog, setShowBudgetChangeDialog] = useState(false);
//     const [newCampaignStatus, setNewCampaignStatus] = useState("NONE");
//     const [newCampaignBudget, setNewCampaignBudget] = useState(0);
//     return (
//         <Accordion style={{ backgroundColor: "rgb(250,250,250)" }}>
//             <AccordionSummary
//                 style={{ backgroundColor: "rgb(245,245,245)" }}
//                 expandIcon={<ExpandMoreIcon />}
//                 aria-controls="panel2a-content"
//                 id="panel2a-header"
//             >
//                 <Grid container>
//                     <Grid item xs={3}>
//                         <Grid container xs={12}>
//                             <Grid item xs={3}>
//                                 <Typography
//                                     className={classes.heading}
//                                     style={{ color: "gray" }}
//                                 >
//                                     status
//                                 </Typography>
//                                 <Typography
//                                     className={classes.heading}
//                                     style={{ color: "gray" }}
//                                 >
//                                     {campaign.budget} {campaign.currency}
//                                 </Typography>
//                             </Grid>
//                             <Grid item xs={9}>
//                                 <Typography
//                                     className={classes.heading}
//                                     style={{ color: "gray" }}
//                                 >
//                                     Campaign
//                                 </Typography>
//                                 <Typography variant="h6">
//                                     {campaign.name}
//                                 </Typography>
//                                 {campaign.campaignId}
//                             </Grid>
//                         </Grid>
//                     </Grid>
//                     <Grid item xs={3}>
//                         <Grid container xs={12}>
//                             <PerformanceForPeriod
//                                 title="All Time"
//                                 clicks={campaign.totalClicks}
//                                 cost={campaign.totalCost}
//                             />
//                         </Grid>
//                     </Grid>
//                     <Grid item xs={3}>
//                         <Grid container>
//                             <PerformanceForPeriod
//                                 title="Today"
//                                 clicks={campaign.todayClicks}
//                                 cost={campaign.todayCost}
//                             />
//                         </Grid>
//                     </Grid>
//                     <Grid item xs={3}>
//                         <Grid container>
//                             <PerformanceForPeriod
//                                 title="Yesterday"
//                                 clicks={campaign.yesterdayClicks}
//                                 cost={campaign.yesterdayCost}
//                             />
//                         </Grid>
//                     </Grid>
//                 </Grid>
//             </AccordionSummary>
//             <AccordionDetails>
//                 <Grid container>
//                     <Grid item xs={12}>
//                         <Grid container xs={12}>
//                             <Grid item xs={12}>
//                                 <Accordion
//                                     style={{
//                                         backgroundColor: "rgb(250,250,250)",
//                                     }}
//                                 >
//                                     <AccordionSummary
//                                         style={{
//                                             backgroundColor: "rgb(245,245,245)",
//                                         }}
//                                         expandIcon={<ExpandMoreIcon />}
//                                         aria-controls="panel2a-content"
//                                         id="panel2a-header"
//                                     >
//                                         Create Tasks
//                                     </AccordionSummary>
//                                     <AccordionDetails>123</AccordionDetails>
//                                 </Accordion>
//                                 <Typography>CreateTasks</Typography>
//                                 <Button
//                                     variant="outlined"
//                                     onClick={() => {
//                                         setShowStatusChangeDialog(
//                                             !showStatusChangeDialog
//                                         );
//                                         setNewCampaignStatus("NONE");
//                                     }}
//                                 >
//                                     Enable / Pause
//                                 </Button>
//                                 <Button
//                                     variant="outlined"
//                                     onClick={() => {
//                                         setShowBudgetChangeDialog(
//                                             !showBudgetChangeDialog
//                                         );
//                                     }}
//                                 >
//                                     Change Budget
//                                 </Button>
//                             </Grid>
//                             {showStatusChangeDialog && (
//                                 <ChangeStatusCampaign
//                                     campaign={campaign}
//                                     classes={classes}
//                                     newCampaignStatus={newCampaignStatus}
//                                     setNewCampaignStatus={setNewCampaignStatus}
//                                     setShowStatusChangeDialog={
//                                         setShowStatusChangeDialog
//                                     }
//                                 />
//                             )}
//                             {showBudgetChangeDialog && (
//                                 <ChangeBudgetCampaign
//                                     campaign={campaign}
//                                     classes={classes}
//                                     newCampaignBudget={newCampaignBudget}
//                                     setNewCampaignBudget={setNewCampaignBudget}
//                                     setShowBudgetChangeDialog={
//                                         setShowBudgetChangeDialog
//                                     }
//                                 />
//                             )}
//                         </Grid>
//                     </Grid>
//                     <Grid item xs={12}>
//                         <Grid container xs={12}>
//                             <Grid item xs={12}></Grid>
//                         </Grid>
//                         {campaign.adGroups &&
//                             campaign.adGroups.map((adGroup) => {
//                                 return (
//                                     <AdGroup
//                                         key={adGroup.adGroupId}
//                                         adGroup={adGroup}
//                                         classes={classes}
//                                     />
//                                 );
//                             })}
//                     </Grid>
//                 </Grid>
//             </AccordionDetails>
//         </Accordion>
//     );
// }
