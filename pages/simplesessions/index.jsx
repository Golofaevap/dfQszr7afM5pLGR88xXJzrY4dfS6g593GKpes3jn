// import { useMemo } from "react";
import { Button, Grid, IconButton, TextField } from "@material-ui/core";

import AddCircleIcon from "@material-ui/icons/AddCircle";
import { useState } from "react";
import { SessionFormAdd } from "../../components/simpleSessions/SimpleSessionsForm";
import { SimpleSessionsTable } from "../../components/simpleSessions/SimpleSessionsTable";
import { PopUpFormSkeleton } from "../../components/popUpFormTemplate";

export async function getServerSideProps(ctx) {
    // console.log(ctx.query);
    // const { id } = ctx.query;

    const resp = await fetch("http://localhost:3000/api/simplesessions/get", {
        method: "GET",

        headers: {
            "Content-Type": "application/json",
        },
    });

    const respJson = await resp.json();
    const fullResp = JSON.parse(JSON.stringify(respJson));
    console.log("fullResp", fullResp);
    if (fullResp.ok) {
        return {
            props: {
                sessions: fullResp.result,
            },
        };
    }

    return {
        props: { sessions: [] },
    };
}

export default function Index(props) {
    const _sessions = props.sessions;
    const [sessions, setSessions] = useState(_sessions);
    const [addSimpleSessionsDialog, setAddSimpleSessionsDialog] = useState(0); // 1 - one 2 - bulk
    const [showFilter, setShowFilter] = useState(false); // 1 - one 2 - bulk
    const [searchFilter, setSearchFilter] = useState({
        tags: "",
    });

    const handleUpdateFilterText = (prop) => (event) => {
        setSearchFilter({ ...searchFilter, [prop]: event.target.value });
    };
    return (
        <Grid container>
            <Grid item xs={12}>
                <Grid container>
                    <Grid item xs={1}>
                        <IconButton
                            color="primary"
                            variant="contained"
                            // size="large"
                            aria-label="upload picture"
                            component="span"
                            onClick={() => {
                                setAddSimpleSessionsDialog(1);
                            }}
                        >
                            <AddCircleIcon />
                        </IconButton>
                    </Grid>
                    <Grid item xs={7}>
                        <h3>simpleSessionss</h3>
                        {showFilter ? (
                            <Grid container>
                                <Grid item xs={3}>
                                    <TextField
                                        label="samaraId"
                                        onChange={handleUpdateFilterText("samaraId")}
                                        value={searchFilter.samaraId}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <TextField
                                        label="tags"
                                        onChange={handleUpdateFilterText("tags")}
                                        value={searchFilter.tags}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <Button
                                        onClick={async () => {
                                            const resp = await fetch(
                                                "http://localhost:3000/api/simplesessions/getbyfilter",
                                                {
                                                    method: "POST",
                                                    body: JSON.stringify(searchFilter),
                                                    headers: {
                                                        "Content-Type": "application/json",
                                                    },
                                                }
                                            );

                                            const respJson = await resp.json();
                                            const fullResp = JSON.parse(JSON.stringify(respJson));
                                            console.log("fullResp", fullResp);
                                            // console.log(fullResp.result);
                                            if (fullResp.ok) {
                                                return setSessions(fullResp.result);
                                            }
                                        }}
                                    >
                                        filter
                                    </Button>
                                </Grid>
                            </Grid>
                        ) : null}
                    </Grid>
                    <Grid item xs={4}>
                        <Button onClick={() => setShowFilter(!showFilter)}>filter</Button>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                {/* filter {JSON.stringify(rows)} */}
            </Grid>
            <Grid item xs={12}>
                <SimpleSessionsTable sessions={sessions} />
            </Grid>
            {addSimpleSessionsDialog ? (
                <PopUpFormSkeleton closeDialog={setAddSimpleSessionsDialog}>
                    <SessionFormAdd />
                </PopUpFormSkeleton>
            ) : null}
        </Grid>
    );
}
