import { Button, Chip, Grid, MenuItem, Select, TextField } from "@material-ui/core";
// import ChipInput from "material-ui-chip-input";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useState } from "react";
import { TwitterPicker } from "react-color";
// import getProxiesType from "../../utils/enums/SessionTypes";
import { getProxiesTags, getProxiesStatus, getSimpleSessionsStatuses } from "../../utils/enums/tags";
// const proxiesTypes = getProxiesType();
const defaultTags = getSimpleSessionsStatuses();
const defaultStatuses = getSimpleSessionsStatuses();

const cellStyle = {
    marginTop: 10,
};
// ======================================================================================
// ======================================================================================
export function SessionFormGeneralBlock({
    sessionForm,
    handleChangeSessionType,
    handleChangeSessionStatus,
    handleChangeSessionUsedStatus,
    handleChipChange,
}) {
    return (
        <>
            <Grid item xs={4} style={cellStyle}>
                Session Type
            </Grid>
            <Grid item xs={4} style={cellStyle}>
                Session Status
            </Grid>
            <Grid item xs={8} style={cellStyle}>
                <Select
                    value={sessionForm.statusLive}
                    defaultValue={defaultStatuses[0]}
                    onChange={handleChangeSessionStatus}
                    fullWidth
                    label="Session Status"
                    variant="outlined"
                >
                    {defaultStatuses &&
                        defaultStatuses.map((status) => {
                            return (
                                <MenuItem key={status} value={status}>
                                    {status}
                                </MenuItem>
                            );
                        })}
                </Select>
            </Grid>

            <Grid item xs={12} style={cellStyle}>
                <Autocomplete
                    multiple
                    options={defaultTags.map((option) => option)}
                    defaultValue={!sessionForm.tags ? [new Date().toISOString().slice(0, 10)] : sessionForm.tags}
                    onChange={handleChipChange}
                    freeSolo
                    renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                            <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                        ))
                    }
                    renderInput={(params) => (
                        <TextField margin="dense" {...params} variant="outlined" label="Tags" placeholder="Add tag.." />
                    )}
                />
            </Grid>
        </>
    );
}
// ======================================================================================
// ======================================================================================
export function SessionFormSingleInput({ sessionForm, handleChangeText }) {
    return (
        <>
            <Grid item xs={12} style={cellStyle}>
                <TextField
                    margin="dense"
                    fullWidth
                    label="note"
                    value={sessionForm.note}
                    variant="outlined"
                    onChange={handleChangeText("note")}
                />
            </Grid>

            <Grid item xs={12} style={cellStyle}>
                -----
            </Grid>
            <Grid item xs={6} style={cellStyle}>
                <TextField
                    margin="dense"
                    fullWidth
                    label="samaraId"
                    value={sessionForm.samaraId}
                    variant="outlined"
                    onChange={handleChangeText("samaraId")}
                />
            </Grid>
            <Grid item xs={6} style={cellStyle}>
                <TextField
                    margin="dense"
                    fullWidth
                    label="Google Ads ID"
                    value={sessionForm.gadsId}
                    variant="outlined"
                    onChange={handleChangeText("gadsId")}
                />
            </Grid>
            <Grid item xs={12} style={cellStyle}>
                Contact INFO ------------------------
            </Grid>
            <Grid item xs={6} style={cellStyle}>
                <TextField
                    margin="dense"
                    fullWidth
                    label="Phone"
                    value={sessionForm.phone}
                    variant="outlined"
                    onChange={handleChangeText("phone")}
                />
            </Grid>
            <Grid item xs={6} style={cellStyle}>
                <TextField
                    margin="dense"
                    fullWidth
                    label="Address"
                    value={sessionForm.address}
                    variant="outlined"
                    onChange={handleChangeText("address")}
                />
            </Grid>
            <Grid item xs={6} style={cellStyle}>
                <TextField
                    margin="dense"
                    fullWidth
                    label="City"
                    value={sessionForm.city}
                    variant="outlined"
                    onChange={handleChangeText("city")}
                />
            </Grid>
            <Grid item xs={6} style={cellStyle}>
                <TextField
                    margin="dense"
                    fullWidth
                    label="ZIP"
                    value={sessionForm.zip}
                    variant="outlined"
                    onChange={handleChangeText("zip")}
                />
            </Grid>
            <Grid item xs={6} style={cellStyle}>
                <TextField
                    margin="dense"
                    fullWidth
                    label="state"
                    value={sessionForm.state}
                    variant="outlined"
                    onChange={handleChangeText("state")}
                />
            </Grid>

            <Grid item xs={6} style={cellStyle}>
                <TextField
                    margin="dense"
                    fullWidth
                    label="offerCountry"
                    value={sessionForm.offerCountry}
                    variant="outlined"
                    onChange={handleChangeText("offerCountry")}
                />
            </Grid>
            <Grid item xs={12} style={cellStyle}>
                Emails INFO ------------------------
            </Grid>
            <Grid item xs={6} style={cellStyle}>
                <TextField
                    margin="dense"
                    fullWidth
                    label="gmail"
                    value={sessionForm.gmail}
                    variant="outlined"
                    onChange={handleChangeText("gmail")}
                />
            </Grid>
            <Grid item xs={6} style={cellStyle}>
                <TextField
                    margin="dense"
                    fullWidth
                    label="recoveryEmail"
                    value={sessionForm.recoveryEmail}
                    variant="outlined"
                    onChange={handleChangeText("recoveryEmail")}
                />
            </Grid>
            <Grid item xs={6} style={cellStyle}>
                <TextField
                    margin="dense"
                    fullWidth
                    label="password"
                    value={sessionForm.password}
                    variant="outlined"
                    onChange={handleChangeText("password")}
                />
            </Grid>
            <Grid item xs={6} style={cellStyle}>
                <TextField
                    margin="dense"
                    fullWidth
                    label="workFakeEmail"
                    value={sessionForm.workFakeEmail}
                    variant="outlined"
                    onChange={handleChangeText("workFakeEmail")}
                />
            </Grid>
            <Grid item xs={12} style={cellStyle}>
                OTHER INFO ------------------------
            </Grid>
            <Grid item xs={6} style={cellStyle}>
                <TextField
                    margin="dense"
                    fullWidth
                    label="Date Of Birth"
                    value={sessionForm.dob}
                    variant="outlined"
                    onChange={handleChangeText("dob")}
                />
            </Grid>
            <Grid item xs={6} style={cellStyle}>
                <TextField
                    margin="dense"
                    fullWidth
                    label="lang"
                    value={sessionForm.lang}
                    variant="outlined"
                    onChange={handleChangeText("lang")}
                />
            </Grid>
            <Grid item xs={12} style={cellStyle}>
                Security ------------------------
            </Grid>
            <Grid item xs={6} style={cellStyle}>
                <TextField
                    margin="dense"
                    fullWidth
                    multiline
                    rows={2}
                    label="googlePhones"
                    value={sessionForm.googlePhones}
                    variant="outlined"
                    onChange={handleChangeText("googlePhones")}
                />
            </Grid>
            <Grid item xs={6} style={cellStyle}>
                <TextField
                    margin="dense"
                    fullWidth
                    multiline
                    rows={2}
                    label="googleBackupCodes"
                    value={sessionForm.googleBackupCodes}
                    variant="outlined"
                    onChange={handleChangeText("googleBackupCodes")}
                />
            </Grid>
            <Grid item xs={12} style={cellStyle}>
                TAGS INFO ------------------------
            </Grid>
        </>
    );
}
// ======================================================================================
// ======================================================================================
export function SessionFromFields({
    sessionForm,
    // proxiesTypes,
    // defaultStatuses,
    // defaultTags,
    handleChangeText,
    handleChangeSessionType,
    handleChangeSessionStatus,
    handleChipChange,
    handleChangeSessionUsedStatus,
    handleMassTextField,
    newSessions,
    setNewSessions,
    setSessionForm,
    initSessionFrormState,
}) {
    // const [showShort, setShowShort] = useState(true);
    return (
        <>
            <Grid item xs={12}>
                <h2>NEW SESSION</h2>
            </Grid>

            <SessionFormSingleInput sessionForm={sessionForm} handleChangeText={handleChangeText} />

            <SessionFormGeneralBlock
                sessionForm={sessionForm}
                handleChangeSessionType={handleChangeSessionType}
                handleChangeSessionStatus={handleChangeSessionStatus}
                handleChangeSessionUsedStatus={handleChangeSessionUsedStatus}
                handleChipChange={handleChipChange}
            />
            <Grid item xs={12} style={cellStyle}>
                <Button
                    variant="contained"
                    color="primary"
                    // disabled={!showShort}
                    style={{ marginRight: 10 }}
                    onClick={() => {
                        {
                            // if (sessionForm.ip.length < 8) {
                            //     alert("Проверьте IP. (Минимум 8 знаков)");
                            //     return;
                            // }
                            // const _np = [...newSessions];
                            // _np.push(sessionForm);
                            setNewSessions([{ ...sessionForm }]);
                            // newSessions2.push(sessionForm);
                            setSessionForm(initSessionFrormState);
                            console.log(newSessions);
                        }
                    }}
                >
                    Add
                </Button>
            </Grid>
        </>
    );
}

// ======================================================================================
// ======================================================================================
export function SessionFormAddDraft2({ newSessions, setNewSessions }) {
    const initSessionFrormState = {
        mass: "",
        ip: "",
        port: "",
        login: "",
        password: "",
        used: false,
        statusLive: defaultStatuses[0],
        // SessionType: proxiesTypes[0],
        tags: [new Date().toISOString().slice(0, 10)],
    };
    // const [sessionForm, setSessionForm] = useState(changeSession ? changeSession : initSessionFrormState);
    const [sessionForm, setSessionForm] = useState(initSessionFrormState);
    // const [bulkProxies, setBulkProxies] = useState("");

    const handleMassTextField = (e) => {
        setSessionForm({ ...sessionForm, ["mass"]: event.target.value });
    };
    const handleChangeText = (prop) => (event) => {
        setSessionForm({ ...sessionForm, [prop]: event.target.value });
    };
    const handleChangeSessionType = (event) => {
        setSessionForm({ ...sessionForm, SessionType: event.target.value });
    };
    const handleChangeSessionStatus = (event) => {
        setSessionForm({ ...sessionForm, statusLive: event.target.value });
    };
    const handleChangeSessionUsedStatus = (event) => {
        setSessionForm({ ...sessionForm, used: event.target.value });
    };

    const handleChipChange = (event, values) => {
        setSessionForm({ ...sessionForm, tags: values });
    };
    return (
        <>
            <SessionFromFields
                sessionForm={sessionForm}
                handleChangeText={handleChangeText}
                handleChangeSessionType={handleChangeSessionType}
                handleChangeSessionStatus={handleChangeSessionStatus}
                handleChipChange={handleChipChange}
                handleChangeSessionUsedStatus={handleChangeSessionUsedStatus}
                handleMassTextField={handleMassTextField}
                newSessions={newSessions}
                setNewSessions={setNewSessions}
                setSessionForm={setSessionForm}
                initSessionFrormState={initSessionFrormState}
            />
        </>
    );
}
// ======================================================================================
// ======================================================================================
export function SessionFormAdd({ changeSession }) {
    const [newSessions, setNewSessions] = useState([]);
    // const newSessions2 = [];
    // console.log(newSessions);

    return (
        <Grid container style={{ padding: 10 }}>
            <SessionFormAddDraft2 newSessions={newSessions} setNewSessions={setNewSessions} />
            <Grid item xs={12} style={cellStyle}>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={async () => {
                        if (!newSessions) return;
                        console.log(123, newSessions);
                        const response = await fetch("/api/simplesessions/addone", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(newSessions),
                        });
                        const rJson = await response.json();
                        console.log(rJson);
                        if (rJson.ok) {
                            setNewSessions([]);
                            console.log(rJson.message);
                        } else {
                            alert(rJson.message);
                        }
                    }}
                >
                    Save
                </Button>
            </Grid>
            <Grid item xs={12} style={cellStyle}>
                <Grid container>
                    {newSessions.length ? (
                        <Grid
                            item
                            xs={4}
                            style={{
                                width: "100%",
                                backgroundColor: "grey",
                                borderRadius: 10,
                                padding: 5,
                                marginTop: 3,
                            }}
                        >
                            Всего добавлено: {newSessions.length}
                        </Grid>
                    ) : null}
                    {newSessions &&
                        // newSessions.map &&
                        newSessions.map((session, index) => {
                            return (
                                <Grid
                                    item
                                    xs={4}
                                    key={index}
                                    style={{
                                        width: "100%",
                                        backgroundColor: "lightgrey",
                                        borderRadius: 10,
                                        padding: 5,
                                        marginTop: 3,
                                    }}
                                >
                                    {index + 1} : {session.samaraId}:{session.gadsId}
                                </Grid>
                            );
                        })}
                </Grid>
            </Grid>
        </Grid>
    );
}
// ======================================================================================
// ======================================================================================
export function SessionFormEdit({ loadedSession }) {
    // const [sessionForm, setSessionForm] = useState(changeSession ? changeSession : initSessionFrormState);
    const [sessionForm, setSessionForm] = useState(loadedSession);
    const [initSessionFrormState, setInitSessionFrormState] = useState(loadedSession);

    // const [bulkProxies, setBulkProxies] = useState("");
    const handleColorChange = (color) => {
        setSessionForm({ ...sessionForm, color: color.hex });
    };
    const updateWithImport = (impObj) => {
        setSessionForm({ ...sessionForm, ...impObj });
    };
    const handleMassTextField = (e) => {
        setSessionForm({ ...sessionForm, ["mass"]: event.target.value });
    };
    const handleChangeText = (prop) => (event) => {
        setSessionForm({ ...sessionForm, [prop]: event.target.value });
    };
    const handleChangeSessionType = (event) => {
        setSessionForm({ ...sessionForm, SessionType: event.target.value });
    };
    const handleChangeSessionStatus = (event) => {
        setSessionForm({ ...sessionForm, statusLive: event.target.value });
    };
    const handleChangeSessionUsedStatus = (event) => {
        setSessionForm({ ...sessionForm, used: event.target.value });
    };

    const handleChipChange = (event, values) => {
        setSessionForm({ ...sessionForm, tags: values });
    };

    const resetChanges = () => setSessionForm({ ...initSessionFrormState });
    if (!loadedSession) {
        return <div>Session does not found</div>;
    }
    return (
        <>
            <Grid container>
                <SessionFromFields2
                    sessionForm={sessionForm}
                    handleChangeText={handleChangeText}
                    handleChangeSessionType={handleChangeSessionType}
                    handleChangeSessionStatus={handleChangeSessionStatus}
                    handleChipChange={handleChipChange}
                    handleChangeSessionUsedStatus={handleChangeSessionUsedStatus}
                    handleMassTextField={handleMassTextField}
                    // newSessions={newSessions}
                    // setNewSessions={setNewSessions}
                    setSessionForm={setSessionForm}
                    initSessionFrormState={initSessionFrormState}
                    resetChanges={resetChanges}
                    setInitSessionFrormState={setInitSessionFrormState}
                    updateWithImport={updateWithImport}
                    handleColorChange={handleColorChange}
                />
            </Grid>
        </>
    );
}

// ======================================================================================
// ======================================================================================
export function SessionFromFields2({
    sessionForm,
    // proxiesTypes,
    // defaultStatuses,
    // defaultTags,
    handleChangeText,
    handleChangeSessionType,
    handleChangeSessionStatus,
    handleChipChange,
    handleChangeSessionUsedStatus,
    resetChanges,
    setInitSessionFrormState,
    updateWithImport,
    handleColorChange,
}) {
    console.log(sessionForm);
    const [showImport, setShowImport] = useState(false);
    const [importString, setImportString] = useState('{"ok":true}');
    const handleImportChange = (e) => {
        setImportString(e.target.value);
    };
    return (
        <>
            <Grid item xs={12} style={cellStyle}>
                <Button
                    variant="contained"
                    color="primary"
                    // disabled={!showShort}
                    style={{ marginRight: 10 }}
                    onClick={async () => {
                        {
                            const response = await fetch("/api/simplesessions/updateone", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify(sessionForm),
                            });
                            const rJson = await response.json();
                            console.log(rJson);
                            if (rJson.ok) {
                                // setNewSessions([]);
                                setInitSessionFrormState(rJson.result);
                                console.log(rJson.message);
                            } else {
                                alert(rJson.message);
                            }
                        }
                    }}
                >
                    Save
                </Button>
                <Button
                    variant="contained"
                    color="default"
                    // disabled={!showShort}
                    style={{ marginRight: 10 }}
                    onClick={() => {
                        {
                            resetChanges();
                        }
                    }}
                >
                    Reset
                </Button>
            </Grid>
            <Grid item xs={12} style={cellStyle}>
                <Button
                    variant="contained"
                    color="default"
                    // disabled={!showShort}
                    style={{ marginRight: 10 }}
                    onClick={() => setShowImport(!showImport)}
                >
                    Import (SHOW / HIDE)
                </Button>
            </Grid>
            {showImport ? (
                <>
                    <Grid item xs={12} style={cellStyle}>
                        Import
                    </Grid>
                    <Grid item xs={10} style={cellStyle}>
                        <TextField
                            margin="dense"
                            variant="outlined"
                            onChange={handleImportChange}
                            fullWidth
                            multiline
                            value={importString}
                        />
                    </Grid>
                    <Grid item xs={2} style={cellStyle}>
                        <Button
                            onClick={() => {
                                try {
                                    const impObj = JSON.parse(importString);
                                    console.log(impObj);
                                    updateWithImport(impObj);
                                    setImportString("");
                                } catch (error) {
                                    alert("Error in the JSON. Check it. Or ask Team Leader");
                                }
                            }}
                        >
                            PARSE
                        </Button>
                    </Grid>
                </>
            ) : null}
            <SessionFormSingleInput sessionForm={sessionForm} handleChangeText={handleChangeText} />

            <SessionFormGeneralBlock
                sessionForm={sessionForm}
                handleChangeSessionType={handleChangeSessionType}
                handleChangeSessionStatus={handleChangeSessionStatus}
                handleChangeSessionUsedStatus={handleChangeSessionUsedStatus}
                handleChipChange={handleChipChange}
            />

            <Grid item xs={6} style={cellStyle}>
                <TwitterPicker onChange={handleColorChange} color={sessionForm.color ? sessionForm.color : "#000000"} />
            </Grid>
            <Grid item xs={12} style={cellStyle}>
                <div>PAYMETS --- -- -- - - - - - - </div>
            </Grid>

            <Grid item xs={6} style={cellStyle}>
                <TextField
                    margin="dense"
                    fullWidth
                    label="billingCountry"
                    value={sessionForm.billingCountry}
                    variant="outlined"
                    onChange={handleChangeText("billingCountry")}
                />
            </Grid>
            <Grid item xs={6} style={cellStyle}>
                <TextField
                    margin="dense"
                    fullWidth
                    label="bic_short_routing"
                    value={sessionForm.bic_short_routing}
                    variant="outlined"
                    onChange={handleChangeText("bic_short_routing")}
                    // disabled=
                />
            </Grid>
            <Grid item xs={6} style={cellStyle}>
                <TextField
                    margin="dense"
                    fullWidth
                    label="iban_account"
                    value={sessionForm.iban_account}
                    variant="outlined"
                    onChange={handleChangeText("iban_account")}
                />
            </Grid>
            <Grid item xs={6} style={cellStyle}>
                <TextField
                    margin="dense"
                    fullWidth
                    label="iban_account"
                    value={sessionForm.iban_account}
                    variant="outlined"
                    onChange={handleChangeText("iban_account")}
                />
            </Grid>
            <Grid item xs={6} style={cellStyle}>
                <TextField
                    margin="dense"
                    fullWidth
                    label="card"
                    value={sessionForm.card}
                    variant="outlined"
                    onChange={handleChangeText("card")}
                />
            </Grid>
            <Grid item xs={6} style={cellStyle}>
                <TextField
                    margin="dense"
                    fullWidth
                    label="bankName"
                    multiline
                    rowsMax={3}
                    value={sessionForm.bankName}
                    variant="outlined"
                    onChange={handleChangeText("bankName")}
                />
            </Grid>
            <Grid item xs={6} style={cellStyle}>
                <TextField
                    margin="dense"
                    fullWidth
                    label="bank_logpass"
                    multiline
                    rowsMax={3}
                    value={sessionForm.bank_logpass}
                    variant="outlined"
                    onChange={handleChangeText("bank_logpass")}
                />
            </Grid>
            <Grid item xs={6} style={cellStyle}>
                <TextField
                    margin="dense"
                    fullWidth
                    multiline
                    rowsMax={3}
                    label="questions"
                    value={sessionForm.questions}
                    variant="outlined"
                    onChange={handleChangeText("questions")}
                />
            </Grid>
            <Grid item xs={6} style={cellStyle}></Grid>
            <Grid item xs={6} style={cellStyle}></Grid>
        </>
    );
}
