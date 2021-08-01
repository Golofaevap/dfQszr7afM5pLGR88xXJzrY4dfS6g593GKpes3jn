import { Button, Chip, Grid, MenuItem, Select, TextField } from "@material-ui/core";
// import ChipInput from "material-ui-chip-input";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useState } from "react";
// // import getProxiesType from "../../utils/enums/phoneTypes";
import { getPhonesTags } from "../../utils/enums/tags";
// const proxiesTypes = getProxiesType();
const defaultTags = getPhonesTags();
// const defaultStatuses = getProxiesStatus();

const cellStyle = {
    marginTop: 10,
};
// ======================================================================================
export function SessionFromFields({
    sessionForm,
    defaultTags,
    handleChangeText,
    handleChipChange,
    handleChangeSessionUsedStatus,
}) {
    return (
        <>
            <Grid item xs={12} style={cellStyle}>
                <TextField
                    fullWidth
                    label="Name"
                    value={sessionForm.name}
                    variant="outlined"
                    onChange={handleChangeText("name")}
                />
            </Grid>
            {/* <Grid item xs={12} style={cellStyle}>
                <TextField
                    fullWidth
                    label="Note"
                    value={sessionForm.note}
                    variant="outlined"
                    onChange={handleChangeText("note")}
                />
            </Grid> */}
            <Grid item xs={12} style={cellStyle}>
                <Select
                    value={sessionForm.used}
                    defaultValue={false}
                    onChange={handleChangeSessionUsedStatus}
                    fullWidth
                    label="Is used"
                    variant="outlined"
                >
                    <MenuItem value={true}>TRUE</MenuItem>
                    <MenuItem value={false}>FALSE</MenuItem>
                </Select>
            </Grid>
            <Grid item xs={12} style={cellStyle}>
                <Autocomplete
                    multiple
                    options={defaultTags.map((option) => option)}
                    defaultValue={[new Date().toISOString().slice(0, 10)]}
                    onChange={handleChipChange}
                    freeSolo
                    renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                            <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                        ))
                    }
                    renderInput={(params) => (
                        <TextField {...params} variant="outlined" label="Tags" placeholder="Add tag.." />
                    )}
                />
            </Grid>
        </>
    );
}
// ======================================================================================
// ======================================================================================

export function SessionFormAdd({ changeSession }) {
    const initSessionFormState = {
        name: "",
        user: {},
        gAccounts: [],
        proxies: [],
        emails: [],
        used: false,
        tags: [new Date().toISOString().slice(0, 10)],
    };
    const [newSessions, setNewSessions] = useState([]);
    // const newSessions2 = [];
    // console.log(newSessions);
    const [sessionForm, setSessionForm] = useState(changeSession ? changeSession : initSessionFormState);

    const handleChangeText = (prop) => (event) => {
        setSessionForm({ ...sessionForm, [prop]: event.target.value });
    };

    const handleChangeSessionUsedStatus = (event) => {
        setSessionForm({ ...sessionForm, used: event.target.value });
    };

    const handleChipChange = (event, values) => {
        setSessionForm({ ...sessionForm, tags: values });
    };
    return (
        <Grid container style={{ padding: 10 }}>
            <SessionFromFields
                sessionForm={sessionForm}
                defaultTags={defaultTags}
                handleChangeText={handleChangeText}
                handleChipChange={handleChipChange}
                handleChangeSessionUsedStatus={handleChangeSessionUsedStatus}
            />
            <Grid item xs={12} style={cellStyle}>
                <Button
                    variant="contained"
                    color="primary"
                    style={{ marginRight: 10 }}
                    onClick={() => {
                        {
                            if (sessionForm.name.length < 8) {
                                alert("Check name. (minimum 8 symbols)");
                                return;
                            }
                            const _np = [...newSessions];
                            _np.push(sessionForm);
                            setNewSessions(_np);
                            // newSessions2.push(sessionForm);
                            setSessionForm(initSessionFormState);
                            console.log(newSessions);
                        }
                    }}
                >
                    Add
                </Button>

                <Button
                    variant="contained"
                    color="secondary"
                    onClick={async () => {
                        if (!newSessions) return;
                        console.log(123, newSessions);
                        const response = await fetch("/api/session/addsession", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(newSessions),
                        });
                        const rJson = await response.json();
                        console.log(rJson);
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
                        newSessions.map((phone, index) => {
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
                                    {index + 1} : {phone.name}
                                </Grid>
                            );
                        })}
                </Grid>
            </Grid>
        </Grid>
    );
}
