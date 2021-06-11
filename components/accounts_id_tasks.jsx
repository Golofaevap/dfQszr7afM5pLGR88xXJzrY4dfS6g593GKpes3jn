// https://developers.google.com/google-ads/scripts/docs/features/bulk-upload-entities#campaigns

import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    FormControl,
    Grid,
    Input,
    InputAdornment,
    InputLabel,
    makeStyles,
    OutlinedInput,
    TextField,
    Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useState } from "react";

const useStyles2 = makeStyles((theme) => ({
    formDivs: {
        marginTop: 10,
        width: "100%",
    },
}));

const locations = [
    { code: "2040", name: "Austria", shortCode: "AT" },
    { code: "2196", name: "Cyprus", shortCode: "CY" },
    { code: "2203", name: "Czechia", shortCode: "CZ" },
    { code: "2276", name: "Germany", shortCode: "DE" },
    { code: "2300", name: "Greece", shortCode: "GR" },
    { code: "2348", name: "Hungary", shortCode: "HU" },
    { code: "2380", name: "Italy", shortCode: "IT" },
    { code: "2616", name: "Poland", shortCode: "PL" },
    { code: "2620", name: "Portugal", shortCode: "PT" },
    { code: "2642", name: "Romania", shortCode: "RO" },
    { code: "2703", name: "Slovakia", shortCode: "SK" },
    { code: "2724", name: "Spain", shortCode: "ES" },
    { code: "20277", name: "Canary Islands", shortCode: "ES" },
    { code: "2643", name: "Russia", shortCode: "RU" },
    { code: "2840", name: "United States", shortCode: "US" },
];

export function TaskAccordion({ classes, account }) {
    const [view, setView] = useState({});
    return (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                <Grid container>
                    <Grid item xs={3}>
                        <Typography className={classes.heading}>
                            <strong>Tasks</strong>
                        </Typography>
                    </Grid>
                </Grid>
            </AccordionSummary>
            <AccordionDetails style={{ backgroundColor: "whitesmoke" }}>
                <Grid container>
                    <Grid item xs={3}>
                        <div>
                            <Button variant="outlined" color="primary" onClick={() => setView({ createCampaign: true })}>
                                Create Campaign Only
                            </Button>
                        </div>
                    </Grid>
                    <Grid item xs={9}>
                        {view.createCampaign ? (
                            <div>
                                <CreateCampaignOnlyForm classes={classes} account={account} setView={setView} />
                                <div>
                                    <Button onClick={() => setView({})}>Cancel</Button>
                                </div>
                            </div>
                        ) : (
                            <div>Task List</div>
                        )}
                        {/* Task List / New Task Form */}
                    </Grid>
                </Grid>
            </AccordionDetails>
        </Accordion>
    );
}

export function CreateCampaignOnlyForm({ account, setView }) {
    const classes2 = useStyles2();

    const [form, setForm] = useState({
        name: "Campaign - 1.",
        budget: Math.random() + 0.2,
        langs: [],
        strategy: "Maximize conversions",
        status: "Paused",
        inLoc: [],
        exLoc: [],
    });
    const handleChangeText = (prop) => (event) => {
        console.log("handleChangeText", prop, event.target.value);
        setForm({ ...form, [prop]: event.target.value });
    };
    return (
        <Grid container style={{ paddingLeft: 10 }}>
            <Grid item xs={12}>
                <Typography variant="h6">
                    <strong>Create new campaign only</strong>
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <div className={classes2.formDivs}>
                    <TextField value={account.accountId} fullWidth label="Account ID" variant="outlined" />
                </div>
                <div className={classes2.formDivs}>
                    <TextField value={form.name} onChange={handleChangeText("name")} fullWidth label="Camapign Name" variant="outlined" />
                    <Button
                        onClick={() => {
                            setForm({ ...form, ["name"]: "Campaign - 1." });
                        }}
                    >
                        Campaign - 1.
                    </Button>
                </div>
                <div className={classes2.formDivs}>
                    <FormControl fullWidth className={classes2.margin} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-amount">Budget</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-amount"
                            type="number"
                            value={form.budget}
                            onChange={handleChangeText("budget")}
                            startAdornment={<InputAdornment position="start">{account.currency}</InputAdornment>}
                            labelWidth={60}
                        />
                    </FormControl>
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
                    <p>Campaign Type</p>
                    <Button
                        onClick={() => setForm({ ...form, type: "Display" })}
                        variant={form.type === "Display" ? "contained" : "text"}
                        color={form.type === "Display" ? "secondary" : "default"}
                    >
                        Display
                    </Button>
                    <Button
                        onClick={() => setForm({ ...form, type: "Search" })}
                        variant={form.type === "Search" ? "contained" : "text"}
                        color={form.type === "Search" ? "secondary" : "default"}
                    >
                        Search
                    </Button>
                    {/* <Button
                        onClick={() => setForm({ ...form, type: "AUC" })}
                        variant={form.type === "AUC" ? "contained" : "text"}
                        color={form.type === "AUC" ? "secondary" : "default"}
                        disabled
                    >
                        AUC
                    </Button> */}
                    <Button
                        onClick={() => setForm({ ...form, type: "Video" })}
                        variant={form.type === "Video" ? "contained" : "text"}
                        color={form.type === "Video" ? "secondary" : "default"}
                        disabled
                    >
                        Video
                    </Button>
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
                    <p>Languages</p>
                    <Button
                        onClick={() => {
                            const langs = form.langs ? form.langs : [];
                            const index = langs.indexOf("en");
                            if (index === -1) {
                                langs.push("en");
                            } else {
                                langs.splice(index, 1);
                            }
                            setForm({ ...form, langs: langs });
                        }}
                        variant={form.langs.includes("en") ? "contained" : "text"}
                        color={form.langs.includes("en") ? "secondary" : "default"}
                    >
                        en
                    </Button>
                    <Button
                        onClick={() => {
                            const langs = form.langs ? form.langs : [];
                            const index = langs.indexOf("ru");
                            if (index === -1) {
                                langs.push("ru");
                            } else {
                                langs.splice(index, 1);
                            }
                            setForm({ ...form, langs: langs });
                        }}
                        variant={form.langs.includes("ru") ? "contained" : "text"}
                        color={form.langs.includes("ru") ? "secondary" : "default"}
                    >
                        ru
                    </Button>
                    <Button
                        onClick={() => {
                            const langs = form.langs ? form.langs : [];
                            const index = langs.indexOf("de");
                            if (index === -1) {
                                langs.push("de");
                            } else {
                                langs.splice(index, 1);
                            }
                            setForm({ ...form, langs: langs });
                        }}
                        variant={form.langs.includes("de") ? "contained" : "text"}
                        color={form.langs.includes("de") ? "secondary" : "default"}
                    >
                        de
                    </Button>
                    <Button
                        onClick={() => {
                            const langs = form.langs ? form.langs : [];
                            const index = langs.indexOf("it");
                            if (index === -1) {
                                langs.push("it");
                            } else {
                                langs.splice(index, 1);
                            }
                            setForm({ ...form, langs: langs });
                        }}
                        variant={form.langs.includes("it") ? "contained" : "text"}
                        color={form.langs.includes("it") ? "secondary" : "default"}
                    >
                        it
                    </Button>
                    <Button
                        onClick={() => {
                            const langs = form.langs ? form.langs : [];
                            const index = langs.indexOf("es");
                            if (index === -1) {
                                langs.push("es");
                            } else {
                                langs.splice(index, 1);
                            }
                            setForm({ ...form, langs: langs });
                        }}
                        variant={form.langs.includes("es") ? "contained" : "text"}
                        color={form.langs.includes("es") ? "secondary" : "default"}
                    >
                        es
                    </Button>
                    <Button
                        onClick={() => {
                            const langs = form.langs ? form.langs : [];
                            const index = langs.indexOf("ca");
                            if (index === -1) {
                                langs.push("ca");
                            } else {
                                langs.splice(index, 1);
                            }
                            setForm({ ...form, langs: langs });
                        }}
                        variant={form.langs.includes("ca") ? "contained" : "text"}
                        color={form.langs.includes("ca") ? "secondary" : "default"}
                    >
                        ca
                    </Button>
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
                    <p>Strategy</p>
                    <Button
                        onClick={() =>
                            setForm({
                                ...form,
                                strategy: "Maximize conversions",
                            })
                        }
                        variant={form.strategy === "Maximize conversions" ? "contained" : "text"}
                        color={form.strategy === "Maximize conversions" ? "secondary" : "default"}
                        disabled
                    >
                        Maximize conversions
                    </Button>
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
                    <p>Status</p>
                    <Button
                        onClick={() =>
                            setForm({
                                ...form,
                                status: "Paused",
                            })
                        }
                        variant={form.status === "Paused" ? "contained" : "text"}
                        color={form.status === "Paused" ? "secondary" : "default"}
                        // disabled
                    >
                        Paused
                    </Button>
                    <Button
                        onClick={() =>
                            setForm({
                                ...form,
                                status: "Enabled",
                            })
                        }
                        variant={form.status === "Enabled" ? "contained" : "text"}
                        color={form.status === "Enabled" ? "secondary" : "default"}
                        // disabled
                    >
                        Enabled
                    </Button>
                </div>

                {/* <div
                    className={classes2.formDivs}
                    style={{
                        backgroundColor: "white",
                        borderRadius: 5,
                        padding: 10,
                        boxSizing: "border-box",
                    }}
                >
                    <p>Include locations</p>
                    {locations &&
                        locations.map((loc) => {
                            return (
                                <Button
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
                    <p>Exclude locations</p>
                    {locations &&
                        locations.map((loc) => {
                            return (
                                <Button
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
                </div> */}

                <div className={classes2.formDivs}>
                    <Button
                        onClick={async () => {
                            console.log(form);
                            if (!form.langs.length) {
                                alert("select at least 1 language");
                                return;
                            }
                            if (!form.type) {
                                alert("select campaign type");
                                return;
                            }

                            let lang = "";
                            for (let i in form.langs) {
                                lang += form.langs[i] + ";";
                            }
                            lang = lang.substring(0, lang.length - 1);
                            const resp = await fetch("/api/tasks/settask", {
                                method: "POST",
                                body: JSON.stringify({
                                    accountId: account.accountId,
                                    entityType: "CAMPAIGN_CREATE_ONLY",
                                    name: form.name,
                                    budget: Math.round(form.budget * 100) / 100,
                                    lang: lang,
                                    type: form.type,
                                    strategy: form.strategy,
                                    status: form.status,
                                    inLoc: form.inLoc,
                                    exLoc: form.exLoc,
                                }),
                                headers: {
                                    "Content-Type": "application/json",
                                },
                            });
                            const data = await resp.json();
                            if (data.ok) {
                                console.log(data);
                                setView({});
                            } else {
                                alert(data.message);
                            }
                        }}
                        variant="contained"
                        color="primary"
                        fullWidth
                    >
                        Set task
                    </Button>
                </div>
            </Grid>
        </Grid>
    );
}

export function AddLocationToCampaign({ account, campaign, setView }) {}
