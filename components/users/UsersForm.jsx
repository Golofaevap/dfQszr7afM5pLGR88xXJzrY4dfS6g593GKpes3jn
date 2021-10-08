import { Button, Chip, Grid, MenuItem, Select, TextField } from "@material-ui/core";
// import ChipInput from "material-ui-chip-input";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useEffect } from "react";
import { useState } from "react";
import getPhonesInfo from "../../utils/enums/phones";
import { getPhonesTags } from "../../utils/enums/tags";
const phonesInfo = getPhonesInfo();
const defaultTags = getPhonesTags();

const cellStyle = {
    marginTop: 10,
};
// ======================================================================================
// ======================================================================================
export function UsersFormGeneralBlock({ usersForm, handleChangePhoneUsedStatus, handleChipChange }) {
    return (
        <>
            <Grid item xs={4} style={cellStyle}>
                Is used?
            </Grid>
            <Grid item xs={8} style={cellStyle}>
                <Select
                    value={usersForm.used}
                    defaultValue={false}
                    onChange={handleChangePhoneUsedStatus}
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
export function UsersFormEmptyUser({ usersForm, handleChangeText }) {
    return (
        <>
            <Grid item xs={8} style={cellStyle}>
                Just empty user
            </Grid>
            <Grid item xs={12} style={cellStyle}>
                <div>You are adding ampty user.</div>
                <div>it is ok if you just working with LOGS, not FARM</div>
            </Grid>
            <Grid item xs={12} style={cellStyle} style={{ color: "red" }}>
                <div>DO NOT FORGET TO CLICK </div>
                <div>[ ADD ]</div>
                <div> and then </div>
                <div>[ SAVE ]</div>
            </Grid>
        </>
    );
}
// ======================================================================================
// ======================================================================================
export function UsersFormMassInput({ usersForm, handleMassTextField }) {
    return (
        <>
            <Grid item xs={8} style={cellStyle}>
                <Grid container>
                    <Grid item xs={6} style={cellStyle}>
                        <div>Bulk Adding</div>
                    </Grid>
                    <Grid item xs={6} style={cellStyle}>
                        <div>phone number : country code | +3715681279:lv</div>
                        <div>Only such format is supported</div>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} style={cellStyle}>
                <TextField
                    multiline
                    rowsMax={10}
                    fullWidth
                    rows={5}
                    variant="outlined"
                    value={usersForm.mass}
                    onChange={handleMassTextField}
                />
            </Grid>
        </>
    );
}
// ======================================================================================
export function UsersFromFields({
    usersForm,
    phonesTypes,
    // defaultTags,
    handleChangeText,
    handleChangePhoneType,
    handleChangePhoneStatus,
    handleChipChange,
    handleChangePhoneUsedStatus,
    handleMassTextField,
    newUsers,
    setNewUsers,
    setUsersForm,
    initUsersFormState,
}) {
    // const [usersForm.empty, setusersForm.empty] = useState(true);
    return (
        <>
            <Grid item xs={4} style={cellStyle}>
                <Button
                    variant={usersForm.empty === 1 ? "contained" : "outlined"}
                    color={usersForm.empty === 1 ? "secondary" : "default"}
                    style={{ marginRight: 10 }}
                    onClick={() => setUsersForm({ ...usersForm, empty: 1 })}
                >
                    Empty
                </Button>
                <Button
                    variant={usersForm.empty === 0 ? "contained" : "outlined"}
                    color={usersForm.empty === 0 ? "secondary" : "default"}
                    style={{ marginRight: 10 }}
                    onClick={() => setUsersForm({ ...usersForm, empty: 0 })}
                    // onClick={() => setusersForm.empty(!usersForm.empty)}
                >
                    Fill
                </Button>
            </Grid>
            {usersForm.empty === 1 ? (
                <UsersFormEmptyUser usersForm={usersForm} />
            ) : usersForm.empty === 0 ? (
                <UsersFormMassInput
                    usersForm={usersForm}
                    handleMassTextField={handleMassTextField}
                    phonesTypes={phonesTypes}
                    // defaultTags={defaultTags}
                />
            ) : (
                <Grid item xs={12} style={cellStyle}>
                    Select option above
                </Grid>
            )}
            <usersFormGeneralBlock
                usersForm={usersForm}
                handleChangePhoneType={handleChangePhoneType}
                handleChangePhoneStatus={handleChangePhoneStatus}
                handleChangePhoneUsedStatus={handleChangePhoneUsedStatus}
                handleChipChange={handleChipChange}
            />
            {usersForm.empty ? (
                <Grid item xs={12} style={cellStyle}>
                    <Button
                        variant="contained"
                        color="primary"
                        // disabled={!usersForm.empty}
                        style={{ marginRight: 10 }}
                        onClick={() => {
                            {
                                if (usersForm.empty === -1) {
                                    alert("Select Empty or Fill option");
                                    return;
                                }
                                if (usersForm.empty === 1) {
                                    setNewUsers([{ ...usersForm }]);
                                    // newUsers2.push(usersForm);
                                    setUsersForm(initUsersFormState);
                                }
                            }
                        }}
                    >
                        Add
                    </Button>
                </Grid>
            ) : (
                <Button
                    variant="contained"
                    color="primary"
                    style={{ marginRight: 10 }}
                    onClick={() => {
                        if (usersForm.empty === -1) {
                            alert("Select Empty or Fill option");
                            return;
                        }
                        if (usersForm.empty === 0) {
                            setNewUsers([...userForm]);
                            // newUsers2.push(usersForm);
                            setUsersForm(initUsersFormState);
                        }
                    }}
                >
                    Parse
                </Button>
            )}
        </>
    );
}

// ======================================================================================
// ======================================================================================
export function UsersFromAddDraft2({ newUsers, setNewUsers }) {
    const initUsersFormState = {
        empty: -1,
        country: "",
        firstName: "",
        lastName: "",
        tags: [new Date().toISOString().slice(0, 10)],
    };
    // const [usersForm, setUsersForm] = useState(changePhone ? changePhone : initUsersFormState);
    const [usersForm, setUsersForm] = useState(initUsersFormState);

    // const [bulkPhones, setBulkPhones] = useState("");

    const handleMassTextField = (e) => {
        setUsersForm({ ...usersForm, ["mass"]: event.target.value });
    };
    const handleChangeText = (prop) => (event) => {
        setUsersForm({ ...usersForm, [prop]: event.target.value });
    };
    const handleChangePhoneType = (event) => {
        setUsersForm({ ...usersForm, phoneType: event.target.value });
    };
    const handleChangePhoneStatus = (event) => {
        setUsersForm({ ...usersForm, statusLive: event.target.value });
    };
    const handleChangePhoneUsedStatus = (event) => {
        setUsersForm({ ...usersForm, used: event.target.value });
    };

    const handleChipChange = (event, values) => {
        setUsersForm({ ...usersForm, tags: values });
    };
    return (
        <>
            <UsersFromFields
                usersForm={usersForm}
                handleChangeText={handleChangeText}
                handleChangePhoneType={handleChangePhoneType}
                handleChangePhoneStatus={handleChangePhoneStatus}
                handleChipChange={handleChipChange}
                handleChangePhoneUsedStatus={handleChangePhoneUsedStatus}
                handleMassTextField={handleMassTextField}
                newUsers={newUsers}
                setNewUsers={setNewUsers}
                setUsersForm={setUsersForm}
                initUsersFormState={initUsersFormState}
            />
        </>
    );
}
// ======================================================================================
// ======================================================================================
export function UsersFromAdd({ changePhone }) {
    const [newUsers, setNewUsers] = useState([]);
    // const newUsers2 = [];
    // console.log(newUsers);
    console.log("newUsers:", newUsers);
    return (
        <Grid container style={{ padding: 10 }}>
            <UsersFromAddDraft2 newUsers={newUsers} setNewUsers={setNewUsers} />
            <Grid item xs={12} style={cellStyle}>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={async () => {
                        if (!newUsers) return;
                        console.log(123, newUsers);
                        const response = await fetch("/api/users/adduser", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(newUsers),
                        });
                        const rJson = await response.json();
                        console.log(rJson);
                        if (rJson.ok) {
                            setNewUsers([]);
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
                    {newUsers.length ? (
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
                            Всего добавлено: {newUsers.length}
                        </Grid>
                    ) : null}
                    {newUsers &&
                        // newUsers.map &&
                        newUsers.map((user, index) => {
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
                                    {index + 1} : {user.empty ? "EMPTY_USER" : `${user.firstName} ${user.lastName}`}
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
export function UsersFromEdit({ changeUser }) {
    // const initUsersFormState = {
    //     empty: -1,
    //     country: "",
    //     firstName: "",
    //     lastName: "",
    //     tags: [new Date().toISOString().slice(0, 10)],
    // };
    const [user, setUser] = useState(changeUser);
    const [unsavedUser, setUnsavedUser] = useState({ ...changeUser });

    // const handleMassTextField = (e) => {
    //     setUser({ ...setUser, ["mass"]: event.target.value });
    // };
    const handleChangeText = (prop) => (event) => {
        setUser({ ...setUser, [prop]: event.target.value });
    };
    const handleChangePhoneType = (event) => {
        setUser({ ...setUser, phoneType: event.target.value });
    };
    const handleChangePhoneStatus = (event) => {
        setUser({ ...setUser, statusLive: event.target.value });
    };
    const handleChangePhoneUsedStatus = (event) => {
        setUser({ ...setUser, used: event.target.value });
    };

    const handleChipChange = (event, values) => {
        setUser({ ...setUser, tags: values });
    };
    return (
        <>
            <UsersFromFieldsEdit
                usersForm={usersForm}
                handleChangeText={handleChangeText}
                handleChangePhoneType={handleChangePhoneType}
                handleChangePhoneStatus={handleChangePhoneStatus}
                handleChipChange={handleChipChange}
                handleChangePhoneUsedStatus={handleChangePhoneUsedStatus}
                handleMassTextField={handleMassTextField}
                newUsers={newUsers}
                setNewUsers={setNewUsers}
                setUsersForm={setUsersForm}
                initUsersFormState={initUsersFormState}
            />
        </>
    );
}

export function UsersFromFieldsEdit({
    usersForm,
    phonesTypes,
    // defaultTags,
    handleChangeText,
    handleChangePhoneType,
    handleChangePhoneStatus,
    handleChipChange,
    handleChangePhoneUsedStatus,
    // handleMassTextField,
    newUsers,
    setNewUsers,
    setUsersForm,
    initUsersFormState,
}) {
    // const [usersForm.empty, setusersForm.empty] = useState(true);
    return (
        <>
            <Grid item xs={4} style={cellStyle}>
                
            </Grid>
            {usersForm.empty === 1 ? (
                <UsersFormEmptyUser usersForm={usersForm} />
            ) : usersForm.empty === 0 ? (
                <UsersFormMassInput
                    usersForm={usersForm}
                    handleMassTextField={handleMassTextField}
                    phonesTypes={phonesTypes}
                    // defaultTags={defaultTags}
                />
            ) : (
                <Grid item xs={12} style={cellStyle}>
                    Select option above
                </Grid>
            )}
            <usersFormGeneralBlock
                usersForm={usersForm}
                handleChangePhoneType={handleChangePhoneType}
                handleChangePhoneStatus={handleChangePhoneStatus}
                handleChangePhoneUsedStatus={handleChangePhoneUsedStatus}
                handleChipChange={handleChipChange}
            />
            {usersForm.empty ? (
                <Grid item xs={12} style={cellStyle}>
                    <Button
                        variant="contained"
                        color="primary"
                        // disabled={!usersForm.empty}
                        style={{ marginRight: 10 }}
                        onClick={() => {
                            {
                                if (usersForm.empty === -1) {
                                    alert("Select Empty or Fill option");
                                    return;
                                }
                                if (usersForm.empty === 1) {
                                    setNewUsers([{ ...usersForm }]);
                                    // newUsers2.push(usersForm);
                                    setUsersForm(initUsersFormState);
                                }
                            }
                        }}
                    >
                        Add
                    </Button>
                </Grid>
            ) : (
                <Button
                    variant="contained"
                    color="primary"
                    style={{ marginRight: 10 }}
                    onClick={() => {
                        if (usersForm.empty === -1) {
                            alert("Select Empty or Fill option");
                            return;
                        }
                        if (usersForm.empty === 0) {
                            setNewUsers([...userForm]);
                            // newUsers2.push(usersForm);
                            setUsersForm(initUsersFormState);
                        }
                    }}
                >
                    Parse
                </Button>
            )}
        </>
    );
}
