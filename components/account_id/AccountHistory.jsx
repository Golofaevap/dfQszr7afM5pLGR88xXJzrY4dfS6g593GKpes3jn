import Grid from "@material-ui/core/Grid";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Button, makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react";

// import { makeStyles } from '@material-ui/core/styles';
// import IconButton from '@material-ui/core/IconButton';
// import Input from '@material-ui/core/Input';
// import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
// import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
// import Visibility from '@material-ui/icons/Visibility';
// import VisibilityOff from '@material-ui/icons/VisibilityOff';
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
// import FormControl from '@material-ui/core/FormControl';
import Select from "@material-ui/core/Select";

// SHOWS STATISTICS FOR PERIOD
export function AccountHistory({ accountId, notes }) {
    const initForm = {
        text: "",
        color: "white",
        iconId: 0,
    };
    const [form, setForm] = useState(initForm);
    const [showLimit, setShowLimit] = useState(5);
    const sortedNotes = notes.sort((a, b) => {
        const _a = new Date(a.dateOfNote);
        const _b = new Date(b.dateOfNote);
        return _b - _a;
    });
    // const sortedNotes = _sortedNotes.slice(0, showLimit);
    // const [showLimitButton, setShowLimitButton] = useState(false);

    const handleChangeSelect = (event) => {
        setForm({ ...form, color: event.target.value });
    };
    return (
        <Grid container>
            <Grid item xs={12}>
                <Grid container>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="New Log"
                            style={{ backgroundColor: form.color }}
                            multiline
                            onChange={(e) => {
                                setForm({ ...form, text: e.target.value });
                            }}
                        />
                    </Grid>
                    <Grid item xs={4} style={{ paddingLeft: 10, paddingRight: 10 }}>
                        <FormControl style={{ width: "100%" }}>
                            <InputLabel id="demo-simple-select-label">Color</InputLabel>
                            <Select labelId="demo-simple-select-label" id="demo-simple-select" value={form.color} onChange={handleChangeSelect}>
                                <MenuItem style={{ backgroundColor: "white" }} value={"white"}>
                                    white
                                </MenuItem>
                                <MenuItem style={{ backgroundColor: "yellow" }} value={"yellow"}>
                                    yellow
                                </MenuItem>
                                <MenuItem style={{ backgroundColor: "tomato" }} value={"tomato"}>
                                    tomato
                                </MenuItem>
                                <MenuItem style={{ backgroundColor: "lightgreen" }} value={"lightgreen"}>
                                    lightgreen
                                </MenuItem>
                                <MenuItem style={{ backgroundColor: "lightblue" }} value={"lightblue"}>
                                    lightblue
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={2}>
                        <Button
                            style={{ height: "100%" }}
                            variant="contained"
                            color="secondary"
                            onClick={async () => {
                                const resp = await fetch("/api/accounts/edit", {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({
                                        operation: "historyPush",
                                        historyText: form.text,
                                        color: form.color,
                                        iconId: form.iconId,
                                        accId: accountId,
                                    }),
                                });
                                const json = await resp.json();
                                console.log(json);
                                if (json.ok) {
                                    setForm({ ...form, text: "" });
                                }
                            }}
                        >
                            Add
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                history
                <Grid container>
                    {sortedNotes &&
                        sortedNotes.map((note, index) => {
                            if (index >= showLimit) {
                                return 0;
                            }
                            const myDate = new Date(note.dateOfNote);
                            return (
                                <Grid
                                    item
                                    xs={12}
                                    key={note.dateOfNote}
                                    style={{
                                        marginTop: 10,
                                        border: "1px solid lightgrey",
                                        padding: 5,
                                        borderRadius: 5,
                                        backgroundColor: note.colorOfNote,
                                    }}
                                >
                                    <Grid container>
                                        <Grid item xs={2}>
                                            <Grid container>
                                                <Grid item xs={12} style={{ color: "darkgrey" }}>
                                                    <b>{myDate.toLocaleTimeString("it-IT")}</b>
                                                </Grid>
                                                <Grid item xs={12} style={{ color: "lightgrey" }}>
                                                    {myDate.toDateString("it-IT")}
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={10} style={{ whiteSpace: "pre-line" }}>
                                            {note.textOfNote}
                                        </Grid>
                                    </Grid>
                                </Grid>
                            );
                        })}
                    <Grid item xs={12}>
                        <Button variant="contained" color="secondary" onClick={() => setShowLimit(showLimit + 5)}>
                            More
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}
