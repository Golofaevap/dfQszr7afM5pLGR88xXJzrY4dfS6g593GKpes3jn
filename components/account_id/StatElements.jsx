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
// import TextField from '@material-ui/core/TextField';
// import Visibility from '@material-ui/icons/Visibility';
// import VisibilityOff from '@material-ui/icons/VisibilityOff';

// SHOWS STATISTICS FOR PERIOD
export function PerformanceForPeriod({ title, clicks, cost }) {
    return (
        <>
            <Grid
                item
                xs={12}
                style={{
                    fontSize: "70%",
                }}
            >
                <strong>{title}</strong>
            </Grid>
            <Grid
                item
                xs={12}
                style={{
                    fontSize: "70%",
                }}
            >
                Clicks: {clicks ? clicks : "0"}
            </Grid>
            <Grid
                item
                xs={12}
                style={{
                    fontSize: "70%",
                }}
            >
                Cost: {cost ? cost : "0"}
            </Grid>
        </>
    );
}