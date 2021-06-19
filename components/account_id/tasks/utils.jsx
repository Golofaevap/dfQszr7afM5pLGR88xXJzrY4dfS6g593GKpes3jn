import { Button, Grid, Typography, Accordion, AccordionSummary, AccordionDetails, TextField } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useState } from "react";

export function SmallAccordion({ title, children }) {
    return (
        <Accordion style={{ backgroundColor: "rgb(240,240,240)" }}>
            <AccordionSummary
                style={{ backgroundColor: "rgb(200,240,200)" }}
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography>{title}</Typography>
            </AccordionSummary>
            <AccordionDetails>{children}</AccordionDetails>
        </Accordion>
    );
}

export function NavButton({ cls, menuItem, setMenuItem, title, code }) {
    return (
        <div className={cls.buttonDiv}>
            <Button
                color={menuItem === code ? "primary" : "default"}
                variant={menuItem === code ? "contained" : "text"}
                onClick={() => {
                    setMenuItem(code);
                }}
            >
                {title}
            </Button>
        </div>
    );
}

export function OneTask({ task }) {
    // const ed = task.entityData;
    if (task)
        return (
            <Grid container style={{ backgroundColor: "rgb(230,230,230)", marginTop: 5, padding: 5 }}>
                <Grid item xs={4}>
                    <div>{task.entityType}</div>
                    <div>{task.status}</div>
                </Grid>
                <Grid item xs={8}>
                    <SmallAccordion title="JSON">
                        <pre>{JSON.stringify(task, 0, 5)}</pre>;
                    </SmallAccordion>
                </Grid>
            </Grid>
        );
    else
        return (
            <SmallAccordion title="JSON">
                <pre>{JSON.stringify(task, 0, 5)}</pre>;
            </SmallAccordion>
        );
}

export function TasksList({ tasks }) {
    const [filter, setFilter] = useState("TO_EXECUTE");
    const statuses = ["TO_EXECUTE", "COMPLETED", "ALL"];
    if (tasks)
        tasks = tasks.filter((task) => {
            if (filter === "ALL") return true;
            return task.status === filter;
        });
    return (
        <Grid container>
            <Grid item xs={12}>
                {statuses &&
                    statuses.map((status) => {
                        return (
                            <Button
                                key={status}
                                onClick={() => {
                                    setFilter(status);
                                }}
                                variant="outlined"
                            >
                                {status}
                            </Button>
                        );
                    })}
            </Grid>

            {tasks &&
                tasks.map((task) => {
                    return (
                        <Grid item xs={12} key={task._id}>
                            <OneTask task={task} />
                        </Grid>
                    );
                })}
        </Grid>
    );
}

export function EditSaveGroup({ value, handleChangeText, fieldName, label, accountId, type }) {
    console.log("EditSaveGroup", accountId);
    return (
        <Grid container style={{ marginTop: 15 }}>
            <Grid item xs={8}>
                <TextField
                    type={type ? type : "text"}
                    value={value}
                    onChange={handleChangeText(fieldName)}
                    fullWidth
                    label={label}
                    variant="outlined"
                />
            </Grid>
            <Grid item xs={4}>
                <Button
                    style={{ height: "100%", width: "100%" }}
                    variant="contained"
                    color="primary"
                    onClick={async () => {
                        console.log("1");
                        const resp = await fetch("/api/accounts/edit", {
                            method: "POST",
                            body: JSON.stringify({
                                operation: fieldName,
                                newValue: value,
                                accId: accountId,
                            }),
                            headers: {
                                "Content-Type": "application/json",
                            },
                        });
                        const jsonBody = await resp.json();
                        console.log(jsonBody);
                    }}
                >
                    Save
                </Button>
            </Grid>
        </Grid>
    );
}
