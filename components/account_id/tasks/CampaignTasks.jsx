import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Button, makeStyles, TextField } from "@material-ui/core";
import { useEffect, useState } from "react";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import getLocations from "../../../utils/enums/locations";

// *******************************************************************
import { TaskWrapper } from "./TaskWrapper";
import { NavButton, TasksList } from "./utils";
// *******************************************************************

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexWrap: "wrap",
    },
    margin: {
        margin: theme.spacing(1),
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    textField: {
        width: "25ch",
    },
    buttonDiv: {
        marginTop: 10,
    },
}));
/** */
const useStyles2 = makeStyles((theme) => ({
    formDivs: {
        marginTop: 10,
        width: "100%",
    },
}));

const locations = getLocations();

export function CapmaignTasks({ campaign, tasks }) {
    const cls = useStyles();
    const [menuItem, setMenuItem] = useState("");
    if (tasks) tasks = tasks.filter((task) => task.entityData.campaignId === campaign.campaignId);
    return (
        <TaskWrapper>
            <Grid container>
                <Grid item xs={3}>
                    <NavButton cls={cls} menuItem={menuItem} setMenuItem={setMenuItem} title="Show Tasks" code="" />
                    <NavButton cls={cls} menuItem={menuItem} setMenuItem={setMenuItem} title="Change Budget" code="CHANGE_BUDGET" />
                    <NavButton cls={cls} menuItem={menuItem} setMenuItem={setMenuItem} title="Enable / Pause" code="ENABLE_PAUSE" />
                    <NavButton cls={cls} menuItem={menuItem} setMenuItem={setMenuItem} title="Add / Exclude Locations" code="LOCATIONS" />
                    <NavButton cls={cls} menuItem={menuItem} setMenuItem={setMenuItem} title="Create Ad Group Only" code="CREATE_AD_GROUP" />
                </Grid>
                <Grid
                    item
                    xs={9}
                    style={{
                        padding: 10,
                        backgroundColor: "rgb(243,243,243)",
                    }}
                >
                    <Grid container>
                        {menuItem === "" && <TasksList tasks={tasks} />}
                        {menuItem === "ENABLE_PAUSE" && <ChangeStatusCampaign campaign={campaign} classes={cls} />}
                        {menuItem === "CHANGE_BUDGET" && <ChangeBudgetCampaign campaign={campaign} classes={cls} />}
                        {menuItem === "LOCATIONS" && <AddLocationOptionsCampaign campaign={campaign} classes={cls} />}
                        {menuItem === "CREATE_AD_GROUP" && <CreateAdGroup campaign={campaign} classes={cls} />}
                    </Grid>
                </Grid>
            </Grid>
        </TaskWrapper>
    );
}

export function ChangeStatusCampaign({ campaign, classes }) {
    // , newCampaignStatus, setNewCampaignStatus, setShowDialog
    const [message, setMessage] = useState("You can change status");
    const [newCampaignStatus, setNewCampaignStatus] = useState("NONE");
    const [showDialog, setShowDialog] = useState(false);

    if (!showDialog) {
        return (
            <Grid item xs={12}>
                <Typography style={{ color: "red" }}>{message}</Typography>
                <Button
                    onClick={() => {
                        setShowDialog(true);
                        setMessage("You can change status");
                    }}
                >
                    Add Task
                </Button>
            </Grid>
        );
    } else
        return (
            <Grid item xs={12}>
                <Typography className={classes.heading} style={{ color: "black" }}>
                    Change Status
                </Typography>

                <Typography className={classes.heading} style={{ color: "red" }}>
                    {message}
                </Typography>
                <Grid container>
                    <Grid item xs={4}>
                        <Typography className={classes.heading} style={{ color: "gray" }}>
                            Current status
                        </Typography>
                        {campaign.isEnabled ? "Enabled" : campaign.isPaused ? "Paused" : campaign.isRemoved ? "Removed" : "Unknown"}
                    </Grid>
                    <Grid item xs={4}>
                        <Button
                            variant={newCampaignStatus === "PAUSED" ? "contained" : "outlined"}
                            color="secondary"
                            onClick={() => {
                                setNewCampaignStatus("PAUSED");
                            }}
                        >
                            Pause
                        </Button>
                        <Button
                            variant={newCampaignStatus === "ENABLED" ? "contained" : "outlined"}
                            color="secondary"
                            onClick={() => {
                                setNewCampaignStatus("ENABLED");
                            }}
                        >
                            Enable
                        </Button>
                    </Grid>
                    <Grid item xs={4}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={async () => {
                                if (newCampaignStatus !== "PAUSED" && newCampaignStatus !== "ENABLED") {
                                    alert("Select status! " + newCampaignStatus);
                                    return;
                                }
                                const resp = await fetch("/api/tasks/settask", {
                                    method: "POST",
                                    body: JSON.stringify({
                                        accountId: campaign.accountId,
                                        campaignId: campaign.campaignId,
                                        anyJey: 123,
                                        entityType: "CAMAPAIGN_CHANGE_STATUS",
                                        newStatus: newCampaignStatus,
                                    }),
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                });
                                const respJSON = await resp.json();
                                setMessage(respJSON.message);
                                setShowDialog(false);
                                setNewCampaignStatus("NONE");
                            }}
                        >
                            Setup Task
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        );
}

export function ChangeBudgetCampaign({ campaign, classes }) {
    // , newCampaignBudget, setNewCampaignBudget, setShowDialog
    const [message, setMessage] = useState("You can change Budget");
    const [newCampaignBudget, setNewCampaignBudget] = useState(0);
    const [showDialog, setShowDialog] = useState(false);

    const classes2 = useStyles();
    const [newCampaignBudgetChangeType, setNewCampaignBudgetChangeType] = useState("INCREASE");

    const [values, setValues] = useState({
        amount: "",
        maxAmount: "200",
    });
    useEffect(() => {
        if (newCampaignBudgetChangeType) {
            const _amount = 1 + Number(values.amount) / 100;
            let _newBudget = campaign.budget * _amount;
            if (_newBudget > values.maxAmount) {
                _newBudget = values.maxAmount;
            }
            _newBudget = Number("" + Math.round(_newBudget * 100)) * 0.01;
            console.log("_newBudget", _newBudget);
            setNewCampaignBudget(_newBudget);
        }
    }, [values.amount, values.maxAmount, newCampaignBudgetChangeType]);
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    if (!showDialog) {
        return (
            <Grid item xs={12}>
                <Typography style={{ color: "red" }}>{message}</Typography>
                <Button
                    onClick={() => {
                        setShowDialog(true);
                        setMessage("You can change Budget");
                    }}
                >
                    Add Task
                </Button>
            </Grid>
        );
    } else
        return (
            <Grid item xs={12}>
                <Typography className={classes.heading} style={{ color: "black" }}>
                    Change Budget
                </Typography>
                <Typography style={{ color: "red" }}>{message}</Typography>
                <Grid container>
                    <Grid item xs={4}>
                        <Typography className={classes.heading} style={{ color: "gray" }}>
                            Current budget
                        </Typography>
                        {campaign.budget} {campaign.currency}
                    </Grid>
                    <Grid item xs={4}>
                        <Button
                            variant={newCampaignBudgetChangeType === "INCREASE" ? "contained" : "outlined"}
                            color="secondary"
                            onClick={() => {
                                setNewCampaignBudgetChangeType("INCREASE");
                                setNewCampaignBudget(0);
                            }}
                        >
                            INCREASE by %
                        </Button>
                        <Button
                            variant={newCampaignBudgetChangeType === "EXACT" ? "contained" : "outlined"}
                            color="secondary"
                            onClick={() => {
                                setNewCampaignBudgetChangeType("EXACT");
                                setNewCampaignBudget(0);
                            }}
                        >
                            EXACT AMOUNT
                        </Button>
                        {newCampaignBudgetChangeType === "INCREASE" && (
                            <div>
                                by %
                                <FormControl fullWidth className={classes2.margin} variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-amount"
                                        type="number"
                                        value={values.amount}
                                        onChange={handleChange("amount")}
                                        startAdornment={<InputAdornment position="start">%</InputAdornment>}
                                        labelWidth={60}
                                    />
                                </FormControl>
                                <FormControl fullWidth className={classes2.margin} variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-amount">Max Amount</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-amount"
                                        type="number"
                                        value={values.maxAmount}
                                        onChange={handleChange("maxAmount")}
                                        startAdornment={<InputAdornment position="start">{campaign.currency}</InputAdornment>}
                                        labelWidth={160}
                                    />
                                </FormControl>
                            </div>
                        )}
                        {newCampaignBudgetChangeType === "EXACT" && (
                            <div>
                                <FormControl fullWidth className={classes2.margin} variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-amount">New budget</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-amount"
                                        type="number"
                                        value={newCampaignBudget}
                                        onChange={(e) => {
                                            setNewCampaignBudget(e.target.value);
                                            setValues({ ...values, amount: 0 });
                                        }}
                                        startAdornment={<InputAdornment position="start">{campaign.currency}</InputAdornment>}
                                        labelWidth={160}
                                    />
                                </FormControl>
                            </div>
                        )}
                        {newCampaignBudget !== campaign.budget && (
                            <FormControl fullWidth className={classes2.margin} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-amount">New budget</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-amount"
                                    type="number"
                                    value={newCampaignBudget}
                                    startAdornment={<InputAdornment position="start">{campaign.currency}</InputAdornment>}
                                    labelWidth={160}
                                />
                            </FormControl>
                        )}
                    </Grid>
                    <Grid item xs={4}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={async () => {
                                if (!newCampaignBudget || campaign.budget === newCampaignBudget) {
                                    alert("Set up new budget! " + newCampaignBudget);
                                    return;
                                }
                                const resp = await fetch("/api/tasks/settask", {
                                    method: "POST",
                                    body: JSON.stringify({
                                        accountId: campaign.accountId,
                                        campaignId: campaign.campaignId,
                                        entityType: "CAMPAIGN_CHANGE_BUDGET",
                                        newBudget: newCampaignBudget,
                                    }),
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                });
                                const respJSON = await resp.json();
                                setMessage(respJSON.message);
                                setShowDialog(false);
                                setNewCampaignBudget(0);
                            }}
                        >
                            Setup Task
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        );
}

export function AddLocationOptionsCampaign({ campaign, classes }) {
    // , newCampaignStatus, setNewCampaignStatus, setShowDialog
    const initialForm = { inLoc: [], exLoc: [], deletePrev: false, deleteEnable: "" };
    const [message, setMessage] = useState("You can add and exclude locations");
    const [form, setForm] = useState(initialForm);
    // const [exLoc, setExLoc] = useState([]);
    const [showDialog, setShowDialog] = useState(false);
    const classes2 = useStyles2();

    const handleChangeText = (prop) => (event) => {
        console.log("handleChangeText", prop, event.target.value);
        setForm({ ...form, [prop]: event.target.value });
    };

    if (!showDialog) {
        return (
            <Grid item xs={12}>
                <Typography style={{ color: "red" }}>{message}</Typography>
                <Button
                    onClick={() => {
                        setShowDialog(true);
                        setMessage("You can add and exclude locations");
                    }}
                >
                    Add Task
                </Button>
            </Grid>
        );
    } else
        return (
            <Grid item xs={12}>
                <Typography className={classes.heading} style={{ color: "black" }}>
                    Change Status
                </Typography>
                <Typography className={classes.heading} style={{ color: "red" }}>
                    {message}
                </Typography>
                <Grid container>
                    <Grid item xs={12}>
                        <div
                            className={classes2.formDivs}
                            style={{
                                backgroundColor: "white",
                                borderRadius: 5,
                                padding: 10,
                                boxSizing: "border-box",
                            }}
                        >
                            <p>Include locations (in development.....)</p>
                            {locations &&
                                locations.map((loc) => {
                                    return (
                                        <Button
                                            key={loc.code}
                                            onClick={() => {
                                                const inLoc = form.inLoc ? form.inLoc : [];
                                                const index = inLoc.indexOf(loc.code);
                                                if (index === -1) {
                                                    inLoc.push(loc.code);
                                                } else {
                                                    inLoc.splice(index, 1);
                                                }
                                                setForm({ ...form, inLoc: inLoc });
                                            }}
                                            variant={form.inLoc.includes(loc.code) ? "contained" : "text"}
                                            color={form.inLoc.includes(loc.code) ? "secondary" : "default"}
                                            disabled={form.exLoc.includes(loc.code)}
                                        >
                                            {loc.name}
                                        </Button>
                                    );
                                })}
                        </div>

                        <div
                            className={classes2.formDivs}
                            style={{
                                backgroundColor: "white",
                                borderRadius: 5,
                                padding: 10,
                                boxSizing: "border-box",
                            }}
                        >
                            <p>Exclude locations (in development.....)</p>
                            {locations &&
                                locations.map((loc) => {
                                    return (
                                        <Button
                                            key={loc.code}
                                            onClick={() => {
                                                const exLoc = form.exLoc ? form.exLoc : [];
                                                const index = exLoc.indexOf(loc.code);
                                                if (index === -1) {
                                                    exLoc.push(loc.code);
                                                } else {
                                                    exLoc.splice(index, 1);
                                                }
                                                setForm({ ...form, exLoc: exLoc });
                                            }}
                                            variant={form.exLoc.includes(loc.code) ? "contained" : "text"}
                                            color={form.exLoc.includes(loc.code) ? "secondary" : "default"}
                                            disabled={form.inLoc.includes(loc.code)}
                                        >
                                            {loc.name}
                                        </Button>
                                    );
                                })}
                        </div>
                        <div>
                            <p>Delete Previous Preferences?</p>
                            <p>Type "delete" to enble button below</p>
                            <TextField
                                value={form.deleteEnable}
                                onChange={handleChangeText("deleteEnable")}
                                fullWidth
                                label="Type to unlock button"
                                variant="outlined"
                            />

                            <Button
                                onClick={() => {
                                    if (form.deleteEnable === "delete") {
                                        setForm({ ...form, deletePrev: !form.deletePrev });
                                    } else {
                                        setForm({ ...form, deletePrev: false });
                                    }
                                }}
                                variant={form.deletePrev ? "contained" : "text"}
                                color={form.deletePrev ? "secondary" : "default"}
                            >
                                Delete
                            </Button>
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={async () => {
                                // if (newCampaignStatus !== "PAUSED" && newCampaignStatus !== "ENABLED") {
                                //     alert("Select status! " + newCampaignStatus);
                                //     return;
                                // }
                                const resp = await fetch("/api/tasks/settask", {
                                    method: "POST",
                                    body: JSON.stringify({
                                        accountId: campaign.accountId,
                                        campaignId: campaign.campaignId,
                                        entityType: "CAMPAIGN_SET_LOCATION",
                                        inLoc: form.inLoc,
                                        exLoc: form.exLoc,
                                        deletePrev: form.deletePrev,
                                    }),
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                });
                                const respJSON = await resp.json();
                                setMessage(respJSON.message);
                                setShowDialog(false);
                                setForm(initialForm);
                            }}
                        >
                            Setup Task
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        );
    // CAMPAIGN_SET_LOCATION
}

export function CreateAdGroup({ campaign, classes }) {
    // , newCampaignStatus, setNewCampaignStatus, setShowDialog
    const initialForm = {
        name: "Ad Group - 1.",
        cpc: 1.0,
    };
    const defaultMessage = "You add an AD GROUP to the campaign";
    const [message, setMessage] = useState(defaultMessage);
    const [form, setForm] = useState(initialForm);
    const [showDialog, setShowDialog] = useState(false);

    const handleChangeText = (prop) => (event) => {
        console.log("handleChangeText", prop, event.target.value);
        setForm({ ...form, [prop]: event.target.value });
    };

    if (!showDialog) {
        return (
            <Grid item xs={12}>
                <Typography style={{ color: "red" }}>{message}</Typography>
                <Button
                    onClick={() => {
                        setShowDialog(true);
                        setMessage(defaultMessage);
                    }}
                >
                    Add Task
                </Button>
            </Grid>
        );
    } else
        return (
            <Grid item xs={12}>
                <Typography type="h5">New Ad Group</Typography>

                <Typography className={classes.heading} style={{ color: "red" }}>
                    {message}
                </Typography>
                <Grid container>
                    <Grid item xs={9} className={classes.buttonDiv}>
                        <TextField value={form.name} onChange={handleChangeText("name")} fullWidth label="Group Name" variant="outlined" />
                    </Grid>
                    <Grid item xs={9} className={classes.buttonDiv}>
                        <TextField value={form.cpc} /*onChange={handleChangeText("cpc")}*/ fullWidth label="CPC" variant="outlined" />
                    </Grid>

                    <Grid item xs={9} className={classes.buttonDiv}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={async () => {
                                if (form.name === "") {
                                    alert("Enter adGroup name ! " + form.name);
                                    return;
                                }
                                const resp = await fetch("/api/tasks/settask", {
                                    method: "POST",
                                    body: JSON.stringify({
                                        accountId: campaign.accountId,
                                        campaignId: campaign.campaignId,
                                        entityType: "CAMPAIGN_ADD_AD_GROUP",
                                        adGroupName: form.name,
                                        adGoupCpc: form.cpc,
                                    }),
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                });
                                const respJSON = await resp.json();
                                setMessage(respJSON.message);
                                setShowDialog(false);
                                setForm(initialForm);
                                // setNewCampaignStatus("NONE");
                            }}
                        >
                            Setup Task
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        );
}
