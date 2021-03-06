// https://developers.google.com/google-ads/scripts/docs/features/bulk-upload-entities#campaigns

import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    FormControl,
    Grid,
    IconButton,
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
import getLanguages from "../../../utils/enums/languages";
import getLocations from "../../../utils/enums/locations";
// *******************************************************************
import { TaskWrapper } from "./TaskWrapper";
import { EditSaveGroup, NavButton, TasksList } from "./utils";
// *******************************************************************
// ******************************
import StarBorderIcon from "@material-ui/icons/StarBorder";
import StarIcon from "@material-ui/icons/Star";
// ******************************
const useStyles2 = makeStyles((theme) => ({
    formDivs: {
        marginTop: 10,
        width: "100%",
    },
}));

const locations = getLocations();
const languages = getLanguages();

function LanguageButton({ form, setForm, code, name }) {
    return (
        <Button
            onClick={() => {
                const langs = form.langs ? form.langs : [];
                const index = langs.indexOf(code);
                if (index === -1) {
                    langs.push(code);
                } else {
                    langs.splice(index, 1);
                }
                setForm({ ...form, langs: langs });
            }}
            variant={form.langs.includes(code) ? "contained" : "text"}
            color={form.langs.includes(code) ? "secondary" : "default"}
        >
            {name} [{code}]
        </Button>
    );
}

export function TaskAccordion({ classes, account, tasks }) {
    const cls = useStyles2();
    const [menuItem, setMenuItem] = useState("");
    console.log(account);
    return (
        <TaskWrapper>
            <Grid container>
                <Grid item xs={3}>
                    <NavButton cls={cls} menuItem={menuItem} setMenuItem={setMenuItem} title="Show Tasks" code="" />
                    <NavButton cls={cls} menuItem={menuItem} setMenuItem={setMenuItem} title="Create Campaign" code="CREATE_CAMPAIGN" />
                    <NavButton cls={cls} menuItem={menuItem} setMenuItem={setMenuItem} title="Settings" code="SETTINGS" />
                    {/* <NavButton cls={cls} menuItem={menuItem} setMenuItem={setMenuItem} title="Add / Exclude Locations" code="LOCATIONS" />
                    <NavButton cls={cls} menuItem={menuItem} setMenuItem={setMenuItem} title="Create Add Group Only" code="CREATE_AD_GROUP" /> */}
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

                        {menuItem === "CREATE_CAMPAIGN" && <CreateCampaignOnlyForm classes={cls} account={account} />}
                        {menuItem === "SETTINGS" && <SetAddInfoToAccount account={account} />}
                        {/* {menuItem === "CHANGE_BUDGET" && <ChangeBudgetCampaign campaign={campaign} classes={cls} />}
                        {menuItem === "LOCATIONS" && <AddLocationOptionsCampaign campaign={campaign} classes={cls} />}
                        {menuItem === "CREATE_AD_GROUP" && <CreateAddGroup campaign={campaign} classes={cls} />} */}
                    </Grid>
                </Grid>
            </Grid>
        </TaskWrapper>
    );
}

export function CreateCampaignOnlyForm({ account, setView }) {
    const classes2 = useStyles2();

    const defaultMessage = "You can add campaign";
    const [message, setMessage] = useState(defaultMessage);

    const [form, setForm] = useState({
        name: "Campaign - 1.",
        budget: Math.random() + 0.2,
        langs: [],
        strategy: "Maximize conversions",
        status: "Paused",
        inLoc: [],
        exLoc: [],
    });
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
            <Grid container style={{ paddingLeft: 10 }}>
                <Grid item xs={12}>
                    <Typography variant="h6">
                        <strong>Create new campaign only</strong>
                    </Typography>
                    <Typography style={{ color: "red" }}>{message}</Typography>
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
                        {languages &&
                            languages.map((lang) => {
                                return <LanguageButton key={lang.code} form={form} setForm={setForm} code={lang.code} name={lang.name} />;
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
                                    setMessage(data.message);
                                    // setShowDialog(false);
                                    // setView({});
                                } else {
                                    setMessage(data.message);
                                }
                                setShowDialog(false);
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

export function SetAddInfoToAccount({ account }) {
    const accountId = account._id;
    const initialForm = {
        user: account.user ? account.user : "",
        limit: account.limitManual ? account.limitManual : 0,
        offer: account.offer ? account.offer : "",
        stars: account.stars ? account.stars : 0,
    };
    const [form, setForm] = useState(initialForm);
    const handleChangeText = (prop) => (event) => {
        setForm({ ...form, [prop]: event.target.value });
    };

    const OfferButton = ({ text, setForm, form }) => {
        return (
            <Button
                onClick={() => {
                    setForm({ ...form, offer: text });
                }}
            >
                {text}
            </Button>
        );
    };
    const StarsButton = ({ setFrom, form, index }) => {
        return (
            <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
                onClick={() => {
                    setForm({ ...form, stars: index });
                }}
            >
                {form.stars >= index ? <StarIcon /> : <StarBorderIcon />}
            </IconButton>
        );
    };
    return (
        <Grid item xs={12}>
            <h3>Settings</h3>
            <Grid container>
                <Grid item xs={12}>
                    <EditSaveGroup
                        value={form.user}
                        handleChangeText={handleChangeText}
                        fieldName="user"
                        label="Samara Session, Gmail User"
                        accountId={accountId}
                        type="text"
                    />
                    <EditSaveGroup
                        value={form.limit}
                        handleChangeText={handleChangeText}
                        fieldName="limit"
                        label="Budget Limit (Manual)"
                        accountId={accountId}
                        type="number"
                    />
                    <EditSaveGroup
                        value={form.offer}
                        handleChangeText={handleChangeText}
                        fieldName="offer"
                        label="Offer"
                        accountId={accountId}
                        type="text"
                    />
                    <div>
                        <OfferButton text="JUR-RU" form={form} setForm={setForm} />
                        <OfferButton text="AD-AT" form={form} setForm={setForm} />
                        <OfferButton text="AD-IT" form={form} setForm={setForm} />
                        <OfferButton text="AD-ES" form={form} setForm={setForm} />
                        <OfferButton text="CRD-IT" form={form} setForm={setForm} />
                    </div>
                    <div>
                        <h3>Stars count</h3>
                        <div>
                            <Grid container>
                                <Grid item xs={8}>
                                    <StarsButton index={1} form={form} setForm={setForm} />
                                    <StarsButton index={2} form={form} setForm={setForm} />
                                    <StarsButton index={3} form={form} setForm={setForm} />
                                    <StarsButton index={4} form={form} setForm={setForm} />
                                    <StarsButton index={5} form={form} setForm={setForm} />
                                </Grid>
                                <Grid item xs={4}>
                                    <Button
                                        style={{ height: "100%", width: "100%" }}
                                        variant="contained"
                                        color="primary"
                                        onClick={async () => {
                                            console.log("1");
                                            const resp = await fetch("/api/accounts/edit", {
                                                method: "POST",
                                                body: JSON.stringify({
                                                    operation: "stars",
                                                    newValue: form.stars,
                                                    accId: accountId,
                                                }),
                                                headers: {
                                                    "Content-Type": "application/json",
                                                },
                                            });
                                            const jsonBody = await resp.json();
                                            console.log(jsonBody);
                                        }}
                                    >
                                        Save
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </Grid>
    );
}
