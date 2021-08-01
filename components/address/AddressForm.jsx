import { Button, Chip, Grid, MenuItem, Select, TextField } from "@material-ui/core";
// import ChipInput from "material-ui-chip-input";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useState } from "react";
// // import getProxiesType from "../../utils/enums/addressTypes";
import { getAddressesTags } from "../../utils/enums/tags";
// const proxiesTypes = getProxiesType();
const defaultTags = getAddressesTags();
// const defaultStatuses = getProxiesStatus();

const cellStyle = {
    marginTop: 10,
};
// ======================================================================================
export function AddressFormFields({
    addressForm,
    defaultTags,
    handleChangeText,
    handleChipChange,
    handleChangeAddressUsedStatus,
}) {
    return (
        <>
            <Grid item xs={12} style={cellStyle}>
                <TextField
                    fullWidth
                    label="1st line"
                    value={addressForm.firstLineAddress}
                    variant="outlined"
                    onChange={handleChangeText("firstLineAddress")}
                />
            </Grid>
            <Grid item xs={12} style={cellStyle}>
                <TextField
                    fullWidth
                    label="city"
                    value={addressForm.city}
                    variant="outlined"
                    onChange={handleChangeText("city")}
                />
            </Grid>
            <Grid item xs={12} style={cellStyle}>
                <TextField
                    fullWidth
                    label="zip"
                    value={addressForm.zip}
                    variant="outlined"
                    onChange={handleChangeText("zip")}
                />
            </Grid>
            <Grid item xs={12} style={cellStyle}>
                <TextField
                    fullWidth
                    label="state"
                    value={addressForm.state}
                    variant="outlined"
                    onChange={handleChangeText("state")}
                />
            </Grid>
            <Grid item xs={12} style={cellStyle}>
                <Select
                    value={addressForm.used}
                    defaultValue={false}
                    onChange={handleChangeAddressUsedStatus}
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

export function AddressFormAdd({ changeAddress }) {
    const initaddressFrormState = {
        firstLineAddress: "",
        city: "",
        zip: "",
        state: "",

        used: false,
        tags: [new Date().toISOString().slice(0, 10)],
    };
    const [newAddresss, setNewAddresss] = useState([]);
    // const newAddresss2 = [];
    // console.log(newAddresss);
    const [addressForm, setAddressForm] = useState(changeAddress ? changeAddress : initaddressFrormState);

    const handleChangeText = (prop) => (event) => {
        setAddressForm({ ...addressForm, [prop]: event.target.value });
    };

    const handleChangeAddressUsedStatus = (event) => {
        setAddressForm({ ...addressForm, used: event.target.value });
    };

    const handleChipChange = (event, values) => {
        setAddressForm({ ...addressForm, tags: values });
    };
    return (
        <Grid container style={{ padding: 10 }}>
            <AddressFormFields
                addressForm={addressForm}
                defaultTags={defaultTags}
                handleChangeText={handleChangeText}
                handleChipChange={handleChipChange}
                handleChangeAddressUsedStatus={handleChangeAddressUsedStatus}
            />
            <Grid item xs={12} style={cellStyle}>
                <Button
                    variant="contained"
                    color="primary"
                    style={{ marginRight: 10 }}
                    onClick={() => {
                        {
                            // if (addressForm.addressNumber.length < 8) {
                            //     alert("Check address number. (minimum 8 digits)");
                            //     return;
                            // }
                            const _np = [...newAddresss];
                            _np.push(addressForm);
                            setNewAddresss(_np);
                            // newAddresss2.push(addressForm);
                            setAddressForm(initaddressFrormState);
                            console.log(newAddresss);
                        }
                    }}
                >
                    Add
                </Button>

                <Button
                    variant="contained"
                    color="secondary"
                    onClick={async () => {
                        if (!newAddresss) return;
                        console.log(123, newAddresss);
                        const response = await fetch("/api/address/addaddress", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(newAddresss),
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
                    {newAddresss.length ? (
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
                            Всего добавлено: {newAddresss.length}
                        </Grid>
                    ) : null}
                    {newAddresss &&
                        // newAddresss.map &&
                        newAddresss.map((address, index) => {
                            return (
                                <Grid
                                    item
                                    xs={6}
                                    key={index}
                                    style={{
                                        width: "100%",
                                        backgroundColor: "lightgrey",
                                        borderRadius: 10,
                                        padding: 5,
                                        marginTop: 3,
                                    }}
                                >
                                    {index + 1} : {address.firstLineAddress}, {address.city}, {address.zip}{" "}
                                    {address.state}
                                </Grid>
                            );
                        })}
                </Grid>
            </Grid>
        </Grid>
    );
}
