import { Button, Chip, Grid, MenuItem, Select, TextField } from "@material-ui/core";
import ChipInput from "material-ui-chip-input";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useState } from "react";
import getProxiesType from "../../utils/enums/proxyTypes";
import { getProxiesTags, getProxiesStatus } from "../../utils/enums/tags";
const proxiesTypes = getProxiesType();
const defaultTags = getProxiesTags();
const defaultStatuses = getProxiesStatus();

const cellStyle = {
    marginTop: 10,
};
// ======================================================================================
export function ProxyFromFields({
    proxyForm,
    proxiesTypes,
    defaultStatuses,
    defaultTags,
    handleChangeText,
    handleChangeProxyType,
    handleChangeProxyStatus,
    handleChipChange,
    handleChangeProxyUsedStatus,
}) {
    return (
        <>
            <Grid item xs={12} style={cellStyle}>
                <TextField
                    fullWidth
                    label="IP"
                    value={proxyForm.ip}
                    variant="outlined"
                    onChange={handleChangeText("ip")}
                />
            </Grid>
            <Grid item xs={12} style={cellStyle}>
                <TextField
                    fullWidth
                    label="PORT"
                    value={proxyForm.port}
                    variant="outlined"
                    onChange={handleChangeText("port")}
                />
            </Grid>
            <Grid item xs={12} style={cellStyle}>
                <TextField
                    fullWidth
                    label="Login"
                    value={proxyForm.login}
                    variant="outlined"
                    onChange={handleChangeText("login")}
                />
            </Grid>
            <Grid item xs={12} style={cellStyle}>
                <TextField
                    fullWidth
                    label="Password"
                    value={proxyForm.password}
                    variant="outlined"
                    onChange={handleChangeText("password")}
                />
            </Grid>
            <Grid item xs={12} style={cellStyle}>
                <Select
                    value={proxyForm.proxyType}
                    defaultValue={proxiesTypes[0]}
                    onChange={handleChangeProxyType}
                    fullWidth
                    label="Proxy Type"
                    variant="outlined"
                >
                    {proxiesTypes &&
                        proxiesTypes.map((pt) => {
                            return (
                                <MenuItem key={pt} value={pt}>
                                    {pt}
                                </MenuItem>
                            );
                        })}
                </Select>
            </Grid>
            <Grid item xs={12} style={cellStyle}>
                <Select
                    value={proxyForm.statusLive}
                    defaultValue={defaultStatuses[0]}
                    onChange={handleChangeProxyStatus}
                    fullWidth
                    label="Proxy Status"
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
                <Select
                    value={proxyForm.used}
                    defaultValue={false}
                    onChange={handleChangeProxyUsedStatus}
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

export function ProxyFromAdd({ changeProxy }) {
    const initProxyFrormState = {
        ip: "",
        port: "",
        login: "",
        password: "",
        used: false,
        statusLive: defaultStatuses[0],
        proxyType: proxiesTypes[0],
        tags: [new Date().toISOString().slice(0, 10)],
    };
    const [newProxies, setNewProxies] = useState([]);
    // const newProxies2 = [];
    // console.log(newProxies);
    const [proxyForm, setProxyForm] = useState(changeProxy ? changeProxy : initProxyFrormState);

    const handleChangeText = (prop) => (event) => {
        setProxyForm({ ...proxyForm, [prop]: event.target.value });
    };
    const handleChangeProxyType = (event) => {
        setProxyForm({ ...proxyForm, proxyType: event.target.value });
    };
    const handleChangeProxyStatus = (event) => {
        setProxyForm({ ...proxyForm, statusLive: event.target.value });
    };
    const handleChangeProxyUsedStatus = (event) => {
        setProxyForm({ ...proxyForm, used: event.target.value });
    };

    const handleChipChange = (event, values) => {
        setProxyForm({ ...proxyForm, tags: values });
    };
    return (
        <Grid container style={{ padding: 10 }}>
            <ProxyFromFields
                proxyForm={proxyForm}
                proxiesTypes={proxiesTypes}
                defaultStatuses={defaultStatuses}
                defaultTags={defaultTags}
                handleChangeText={handleChangeText}
                handleChangeProxyType={handleChangeProxyType}
                handleChangeProxyStatus={handleChangeProxyStatus}
                handleChipChange={handleChipChange}
                handleChangeProxyUsedStatus={handleChangeProxyUsedStatus}
            />
            <Grid item xs={12} style={cellStyle}>
                {!changeProxy ? (
                    <Button
                        variant="contained"
                        color="primary"
                        style={{ marginRight: 10 }}
                        onClick={() => {
                            {
                                if (proxyForm.ip.length < 8) {
                                    alert("Проверьте IP. (Минимум 8 знаков)");
                                    return;
                                }
                                const _np = [...newProxies];
                                _np.push(proxyForm);
                                setNewProxies(_np);
                                // newProxies2.push(proxyForm);
                                setProxyForm(initProxyFrormState);
                                console.log(newProxies);
                            }
                        }}
                    >
                        Add
                    </Button>
                ) : null}
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={async () => {
                        if (!newProxies) return;
                        console.log(123, newProxies);
                        const response = await fetch("/api/proxy/addproxy", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(newProxies),
                        });
                        // const rJson = await response.json();
                        // console.log(rJons);
                    }}
                >
                    Save
                </Button>
            </Grid>
            <Grid item xs={12} style={cellStyle}>
                <Grid container>
                    {newProxies.length ? (
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
                            Всего добавлено: {newProxies.length}
                        </Grid>
                    ) : null}
                    {newProxies &&
                        // newProxies.map &&
                        newProxies.map((proxy, index) => {
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
                                    {index + 1} : {proxy.ip}:{proxy.port}
                                </Grid>
                            );
                        })}
                </Grid>
            </Grid>
        </Grid>
    );
}
