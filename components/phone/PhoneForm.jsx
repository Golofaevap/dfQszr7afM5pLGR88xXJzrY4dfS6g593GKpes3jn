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
export function PhoneFromFields({
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
// ======================================================================================
// ======================================================================================

export function PhoneFromAdd({ changePhone }) {
    const initPhoneFrormState = {
        phoneNumber: "",
        note: "",
        used: false,
        tags: [new Date().toISOString().slice(0, 10)],
    };
    const [newPhones, setNewPhones] = useState([]);
    // const newPhones2 = [];
    // console.log(newPhones);
    const [phoneForm, setPhoneForm] = useState(changePhone ? changePhone : initPhoneFrormState);

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
                            setPhoneForm(initPhoneFrormState);
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
