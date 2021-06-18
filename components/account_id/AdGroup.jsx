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

// *******************************************************************
import { PerformanceForPeriod } from "./StatElements.jsx";
import { Ad } from "./Ad.jsx";
import { GroupTasks } from "./tasks/GroupTasks.jsx";
// ************************************************

export function AdGroup({ adGroup, classes, tasks }) {
    return (
        <Accordion style={{ backgroundColor: "rgb(240,240,240)" }}>
            <AccordionSummary
                style={{ backgroundColor: "rgb(235,235,235)" }}
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography className={classes.heading}>Ad Group : {adGroup.adGroupId}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography>{adGroup.adGroupId}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <GroupTasks adGroup={adGroup} tasks={tasks} />
                    </Grid>

                    <Grid item xs={12}>
                        {adGroup.ads &&
                            adGroup.ads.map((ad) => {
                                return <Ad key={ad.adId} ad={ad} classes={classes} />;
                            })}
                    </Grid>
                </Grid>
            </AccordionDetails>
        </Accordion>
    );
}
