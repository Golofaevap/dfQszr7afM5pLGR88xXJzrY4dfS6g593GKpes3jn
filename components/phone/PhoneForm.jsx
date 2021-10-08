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
export function PhoneFormGeneralBlock({ phoneForm, handleChangePhoneUsedStatus, handleChipChange }) {
    return (
        <>
            <Grid item xs={4} style={cellStyle}>
                Is used?
            </Grid>
            <Grid item xs={8} style={cellStyle}>
                <Select
                    value={phoneForm.used}
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
export function PhoneFormSingleInput({ phoneForm, handleChangeText }) {
    return (
        <>
            <Grid item xs={8} style={cellStyle}>
                <Grid container>
                    <Grid item xs={12} style={cellStyle}>
                        <div>Single Adding</div>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={6} style={cellStyle}>
                <TextField
                    fullWidth
                    label="Country code"
                    value={phoneForm.countryCode}
                    variant="outlined"
                    onChange={handleChangeText("countryCode")}
                />
            </Grid>
            <Grid item xs={6} style={cellStyle}>
                <TextField
                    fullWidth
                    label="Country code Explain"
                    value={phoneForm.countryExplain}
                    variant="outlined"
                    // onChange={handleChangeText("countryCode")}
                />
            </Grid>
            <Grid item xs={12} style={cellStyle}>
                <TextField
                    fullWidth
                    label="Phone Number"
                    value={phoneForm.phoneNumber}
                    variant="outlined"
                    onChange={handleChangeText("phoneNumber")}
                />
            </Grid>
            <Grid item xs={12} style={cellStyle}>
                <TextField
                    fullWidth
                    multiline
                    label="Note"
                    value={phoneForm.note}
                    variant="outlined"
                    onChange={handleChangeText("note")}
                />
            </Grid>
        </>
    );
}
// ======================================================================================
// ======================================================================================
export function PhoneFormMassInput({ phoneForm, handleMassTextField }) {
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
                    value={phoneForm.mass}
                    onChange={handleMassTextField}
                />
            </Grid>
        </>
    );
}
// ======================================================================================
export function PhoneFromFields({
    phoneForm,
    phonesTypes,
    // defaultTags,
    handleChangeText,
    handleChangePhoneType,
    handleChangePhoneStatus,
    handleChipChange,
    handleChangePhoneUsedStatus,
    handleMassTextField,
    newPhones,
    setNewPhones,
    setPhoneForm,
    initPhoneFormState,
}) {
    const [showShort, setShowShort] = useState(true);
    return (
        <>
            <Grid item xs={4} style={cellStyle}>
                <Button
                    variant="outlined"
                    color="default"
                    style={{ marginRight: 10 }}
                    onClick={() => setShowShort(!showShort)}
                >
                    Single / bulk
                </Button>
            </Grid>
            {showShort ? (
                <PhoneFormSingleInput phoneForm={phoneForm} handleChangeText={handleChangeText} />
            ) : (
                <PhoneFormMassInput
                    phoneForm={phoneForm}
                    handleMassTextField={handleMassTextField}
                    phonesTypes={phonesTypes}
                    // defaultTags={defaultTags}
                />
            )}
            <PhoneFormGeneralBlock
                phoneForm={phoneForm}
                handleChangePhoneType={handleChangePhoneType}
                handleChangePhoneStatus={handleChangePhoneStatus}
                handleChangePhoneUsedStatus={handleChangePhoneUsedStatus}
                handleChipChange={handleChipChange}
            />
            {showShort ? (
                <Grid item xs={12} style={cellStyle}>
                    <Button
                        variant="contained"
                        color="primary"
                        // disabled={!showShort}
                        style={{ marginRight: 10 }}
                        onClick={() => {
                            {
                                if (phoneForm.phoneNumber.length < 8) {
                                    alert("Проверьте номер телефона. (Минимум 8 знаков)");
                                    return;
                                }
                                if (!phoneForm.countryExplain || phoneForm.countryExplain === "Uknown Country Code") {
                                    alert("Проверьте код страны. (не должен быть пустым или неопознаным)");
                                    return;
                                }
                                const _np = [...newPhones];
                                _np.push(phoneForm);
                                setNewPhones(_np);
                                // newPhones2.push(phoneForm);
                                setPhoneForm(initPhoneFormState);
                                console.log(newPhones);
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
                        if (!phoneForm.mass) {
                            alert("TEXT FIELD IS EMPTY!");
                            return;
                        }

                        const rows = phoneForm.mass.split("\n");
                        for (let i in rows) {
                            rows[i].replace(" ", "");
                            const ents = rows[i].split(":");
                            if (ents.length !== 2) {
                                alert(`Row ${Number(i) + 1}. Check phone. Wait for 2 parameters. Got ${ents.length}`);
                                return;
                            }
                            const newPhoneForm_ = { ...phoneForm };
                            newPhoneForm_.phoneNumber = ents[0];
                            const countryCode = ents[1];
                            const country = phonesInfo.countries.find((el) => el.code === countryCode);
                            if (!country) {
                                alert(`Row ${Number(i) + 1}. Country was not found by code ${countryCode}`);
                                // alert("");
                                return;
                            }
                            newPhoneForm_.phoneCode = country.phoneCode;
                            newPhoneForm_.countryCode = countryCode;
                            newPhoneForm_.countryExplain = countryCode;
                            newPhoneForm_.country = country.name;
                            newPhoneForm_.password = ents[3];
                            if (newPhoneForm_.phoneNumber.length < 8) {
                                alert(
                                    `Row ${Number(i) + 1}. Проверьте номер телефона (Минимум 8 знаков) ${
                                        newPhoneForm_.ip
                                    }`
                                );
                                // alert("");
                                return;
                            }
                            if (
                                !newPhoneForm_.countryExplain ||
                                newPhoneForm_.countryExplain === "Uknown Country Code"
                            ) {
                                alert("Проверьте код страны. (не должен быть пустым или неопознаным)");
                                return;
                            }
                            const _np = [...newPhones];
                            _np.push(newPhoneForm_);
                            setNewPhones(_np);
                            // newPhones2.push(phoneForm);
                            setPhoneForm(initPhoneFormState);
                            // console.log(newPhones);
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
export function PhoneFromAddDraft2({ newPhones, setNewPhones }) {
    const initPhoneFormState = {
        mass: "",
        phoneNumber: "",
        countryCode: "",
        countryExplain: "",
        phoneCode: "",
        country: "",
        used: false,
        // statusLive: defaultStatuses[0],
        // phoneType: phonesTypes[0],
        tags: [new Date().toISOString().slice(0, 10)],
    };
    // const [phoneForm, setPhoneForm] = useState(changePhone ? changePhone : initPhoneFormState);
    const [phoneForm, setPhoneForm] = useState(initPhoneFormState);
    useEffect(() => {
        const country = phonesInfo.countries.find((el) => {
            return el.code === phoneForm.countryCode;
        });
        console.log(phoneForm.countryCode, country);
        if (country) {
            // phoneForm.countryExplain = `${country.name} | ${country.phoneCode} `;
            setPhoneForm({
                ...phoneForm,
                phoneNumber: country.phoneCode,
                countryExplain: `${country.name} | ${country.phoneCode} `,
                phoneCode: country.phoneCode,
                country: country.name,
            });
        } else {
            setPhoneForm({ ...phoneForm, ["countryExplain"]: `Uknown Country Code` });
        }
    }, [phoneForm.countryCode]);
    // const [bulkPhones, setBulkPhones] = useState("");

    const handleMassTextField = (e) => {
        setPhoneForm({ ...phoneForm, ["mass"]: event.target.value });
    };
    const handleChangeText = (prop) => (event) => {
        setPhoneForm({ ...phoneForm, [prop]: event.target.value });
    };
    const handleChangePhoneType = (event) => {
        setPhoneForm({ ...phoneForm, phoneType: event.target.value });
    };
    const handleChangePhoneStatus = (event) => {
        setPhoneForm({ ...phoneForm, statusLive: event.target.value });
    };
    const handleChangePhoneUsedStatus = (event) => {
        setPhoneForm({ ...phoneForm, used: event.target.value });
    };

    const handleChipChange = (event, values) => {
        setPhoneForm({ ...phoneForm, tags: values });
    };
    return (
        <>
            <PhoneFromFields
                phoneForm={phoneForm}
                handleChangeText={handleChangeText}
                handleChangePhoneType={handleChangePhoneType}
                handleChangePhoneStatus={handleChangePhoneStatus}
                handleChipChange={handleChipChange}
                handleChangePhoneUsedStatus={handleChangePhoneUsedStatus}
                handleMassTextField={handleMassTextField}
                newPhones={newPhones}
                setNewPhones={setNewPhones}
                setPhoneForm={setPhoneForm}
                initPhoneFormState={initPhoneFormState}
            />
        </>
    );
}
// ======================================================================================
// ======================================================================================
export function PhoneFromAdd({ changePhone }) {
    const [newPhones, setNewPhones] = useState([]);
    // const newPhones2 = [];
    // console.log(newPhones);

    return (
        <Grid container style={{ padding: 10 }}>
            <PhoneFromAddDraft2 newPhones={newPhones} setNewPhones={setNewPhones} />
            <Grid item xs={12} style={cellStyle}>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={async () => {
                        if (!newPhones) return;
                        console.log(123, newPhones);
                        const response = await fetch("/api/phone/addphone", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(newPhones),
                        });
                        const rJson = await response.json();
                        console.log(rJson);
                        if (rJson.ok) {
                            setNewPhones([]);
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
                    {newPhones.length ? (
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
                            Всего добавлено: {newPhones.length}
                        </Grid>
                    ) : null}
                    {newPhones &&
                        // newPhones.map &&
                        newPhones.map((phone, index) => {
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
                                    {index + 1} : {phone.phoneNumber}
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

export function PhoneFromAdd2({ changePhone }) {
    const initPhoneFormState = {
        phoneNumber: "",
        note: "",
        used: false,
        tags: [new Date().toISOString().slice(0, 10)],
    };
    const [newPhones, setNewPhones] = useState([]);
    // const newPhones2 = [];
    // console.log(newPhones);
    const [phoneForm, setPhoneForm] = useState(changePhone ? changePhone : initPhoneFormState);

    const handleChangeText = (prop) => (event) => {
        setPhoneForm({ ...phoneForm, [prop]: event.target.value });
    };
    const handleChangePhoneType = (event) => {
        setPhoneForm({ ...phoneForm, phoneType: event.target.value });
    };
    const handleChangePhoneStatus = (event) => {
        setPhoneForm({ ...phoneForm, statusLive: event.target.value });
    };
    const handleChangePhoneUsedStatus = (event) => {
        setPhoneForm({ ...phoneForm, used: event.target.value });
    };

    const handleChipChange = (event, values) => {
        setPhoneForm({ ...phoneForm, tags: values });
    };
    return (
        <Grid container style={{ padding: 10 }}>
            <PhoneFromFields
                phoneForm={phoneForm}
                defaultTags={defaultTags}
                handleChangeText={handleChangeText}
                handleChipChange={handleChipChange}
                handleChangePhoneUsedStatus={handleChangePhoneUsedStatus}
            />
            <Grid item xs={12} style={cellStyle}>
                <Button
                    variant="contained"
                    color="primary"
                    style={{ marginRight: 10 }}
                    onClick={() => {
                        {
                            if (phoneForm.phoneNumber.length < 8) {
                                alert("Check phone number. (minimum 8 digits)");
                                return;
                            }
                            const _np = [...newPhones];
                            _np.push(phoneForm);
                            setNewPhones(_np);
                            // newPhones2.push(phoneForm);
                            setPhoneForm(initPhoneFormState);
                            console.log(newPhones);
                        }
                    }}
                >
                    Add
                </Button>

                <Button
                    variant="contained"
                    color="secondary"
                    onClick={async () => {
                        if (!newPhones) return;
                        console.log(123, newPhones);
                        const response = await fetch("/api/phone/addphone", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(newPhones),
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
                    {newPhones.length ? (
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
                            Всего добавлено: {newPhones.length}
                        </Grid>
                    ) : null}
                    {newPhones &&
                        // newPhones.map &&
                        newPhones.map((phone, index) => {
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
                                    {index + 1} : {phone.phoneNumber}
                                </Grid>
                            );
                        })}
                </Grid>
            </Grid>
        </Grid>
    );
}
export function PhoneFromFields2({
    phoneForm,
    defaultTags,
    handleChangeText,
    handleChipChange,
    handleChangePhoneUsedStatus,
}) {
    return (
        <>
            <Grid item xs={12} style={cellStyle}>
                <TextField
                    fullWidth
                    label="Phone Number"
                    value={phoneForm.phoneNumber}
                    variant="outlined"
                    onChange={handleChangeText("phoneNumber")}
                />
            </Grid>
            <Grid item xs={12} style={cellStyle}>
                <TextField
                    fullWidth
                    label="Note"
                    value={phoneForm.note}
                    variant="outlined"
                    onChange={handleChangeText("note")}
                />
            </Grid>
            <Grid item xs={12} style={cellStyle}>
                <Select
                    value={phoneForm.used}
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
