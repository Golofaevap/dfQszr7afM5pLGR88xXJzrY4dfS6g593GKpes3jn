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

export function GroupTasks({ adGroup, tasks }) {
    const cls = useStyles();
    const [menuItem, setMenuItem] = useState("");
    if (tasks) tasks = tasks.filter((task) => task.entityData.adGroupId === adGroup.adGroupId);
    return (
        <TaskWrapper>
            <Grid container>
                <Grid item xs={3}>
                    <NavButton cls={cls} menuItem={menuItem} setMenuItem={setMenuItem} title="Show Tasks" code="" />
                    {/* <NavButton cls={cls} menuItem={menuItem} setMenuItem={setMenuItem} title="Change Budget" code="CHANGE_BUDGET" />
                    <NavButton cls={cls} menuItem={menuItem} setMenuItem={setMenuItem} title="Enable / Pause" code="ENABLE_PAUSE" />
                    <NavButton cls={cls} menuItem={menuItem} setMenuItem={setMenuItem} title="Add / Exclude Locations" code="LOCATIONS" /> */}
                    <NavButton cls={cls} menuItem={menuItem} setMenuItem={setMenuItem} title="Create Ad Only" code="CREATE_AD" />
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
                        {/* {menuItem === "ENABLE_PAUSE" && <ChangeStatusCampaign campaign={campaign} classes={cls} />}
                        {menuItem === "CHANGE_BUDGET" && <ChangeBudgetCampaign campaign={campaign} classes={cls} />}
                        {menuItem === "LOCATIONS" && <AddLocationOptionsCampaign campaign={campaign} classes={cls} />} */}
                        {menuItem === "CREATE_AD" && <CreateAd adGroup={adGroup} classes={cls} />}
                    </Grid>
                </Grid>
            </Grid>
        </TaskWrapper>
    );
}

export function CreateAd({ adGroup, classes }) {
    // , newCampaignStatus, setNewCampaignStatus, setShowDialog
    const adTypes = ["EXPANDED_TEXT_AD", "type2"];
    const initialForm = {
        type: adTypes[0],
        name: "Ad  - 1.",
        expandedTextAd: {
            h1: "h1",
            h2: "h2",
            h3: "h3",
            d1: "d1",
            d2: "d2",
        },
        _url: "https://",
        url: "",

        cpc: 1.0,
    };
    const defaultMessage = "You add an AD to the group";
    const [message, setMessage] = useState(defaultMessage);
    const [form, setForm] = useState(initialForm);
    const [showDialog, setShowDialog] = useState(false);

    const handleChangeText = (prop) => (event) => {
        // console.log("handleChangeText", prop, event.target.value);
        setForm({ ...form, [prop]: event.target.value });
    };
    const handleChangeTextExTextAd = (prop) => (event) => {
        // console.log("handleChangeText", prop, event.target.value);
        setForm({ ...form, expandedTextAd: { ...form.expandedTextAd, [prop]: event.target.value } });
    };
    const handleChangeTextUrl = (prop) => (event) => {
        // console.log("handleChangeText", prop, event.target.value);
        let finalUrl = "https://";
        const splitedRowUrl = event.target.value.split("://");
        console.log(splitedRowUrl);
        if (splitedRowUrl.length === 1) {
            finalUrl += splitedRowUrl[0];
        }
        if (splitedRowUrl.length > 1) {
            finalUrl += splitedRowUrl[1];
        }
        setForm({ ...form, url: finalUrl, [prop]: event.target.value });
    };
    // useState(() => {
    //     setForm({ ...form, url: finalUrl });
    // }, [form._url]);

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
                <Typography type="h5">New Ad</Typography>

                <Typography className={classes.heading} style={{ color: "red" }}>
                    {message}
                </Typography>
                <Grid container>
                    <Grid item xs={9} className={classes.buttonDiv}>
                        {adTypes &&
                            adTypes.map((type) => {
                                return (
                                    <Button
                                        key={type}
                                        onClick={() => {
                                            setForm({ ...form, type: type });
                                        }}
                                        variant="contained"
                                        color={type === form.type ? "secondary" : "default"}
                                    >
                                        {type}
                                    </Button>
                                );
                            })}
                    </Grid>
                    {form.type === adTypes[0] && (
                        <>
                            <Grid item xs={9} className={classes.buttonDiv}>
                                <TextField
                                    value={form.expandedTextAd.h1}
                                    onChange={handleChangeTextExTextAd("h1")}
                                    fullWidth
                                    label="Header 1"
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={9} className={classes.buttonDiv}>
                                <TextField
                                    value={form.expandedTextAd.h2}
                                    onChange={handleChangeTextExTextAd("h2")}
                                    fullWidth
                                    label="Header 2"
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={9} className={classes.buttonDiv}>
                                <TextField
                                    value={form.expandedTextAd.h3}
                                    onChange={handleChangeTextExTextAd("h3")}
                                    fullWidth
                                    label="Header 3"
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={9} className={classes.buttonDiv}>
                                <TextField
                                    value={form.expandedTextAd.d1}
                                    onChange={handleChangeTextExTextAd("d1")}
                                    fullWidth
                                    label="Header 3"
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={9} className={classes.buttonDiv}>
                                <TextField
                                    value={form.expandedTextAd.d2}
                                    onChange={handleChangeTextExTextAd("d2")}
                                    fullWidth
                                    label="Header 3"
                                    variant="outlined"
                                />
                            </Grid>
                        </>
                    )}
                    <Grid item xs={9} className={classes.buttonDiv}>
                        <TextField value={form._url} onChange={handleChangeTextUrl("_url")} fullWidth label="URL" variant="outlined" />
                    </Grid>
                    <Grid item xs={9} className={classes.buttonDiv}>
                        <TextField value={form.url} fullWidth label="Final URL" variant="outlined" />
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
                                        ...form,
                                        accountId: adGroup.accountId,
                                        adGroupId: adGroup.adGroupId,
                                        entityType: "CAMPAIGN_ADD_AD",
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
