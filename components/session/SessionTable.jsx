import { Grid, Button } from "@material-ui/core";
// import { useMemo, useState } from "react";

export function SessionRow({ session, header }) {
    const cellStyle = {
        borderLeft: "1px solid black",
        backgroundColor: header ? "whitesmoke" : "white",
        // borderRight: "1px solid black",
        padding: 5,
    };
    return (
        <Grid item xs={12} style={{ fontWeight: header ? "bold" : "normal" }}>
            <Grid container>
                <Grid item xs={2} style={cellStyle}>
                    {header ? (
                        <div>Buttons</div>
                    ) : (
                        <>
                            <Button>copy</Button>
                            <Button>Edit</Button>
                        </>
                    )}
                </Grid>
                <Grid item xs={3} style={cellStyle}>
                    {session.name}
                </Grid>

                {/* <Grid item xs={4} style={cellStyle}>
                    {session.note}
                </Grid>
                <Grid item xs={1} style={cellStyle}>
                    {session.used}
                </Grid>
                <Grid item xs={2} style={cellStyle}>
                    {header ? "Session" : <div>{session.session ? session.session.name : "-"}</div>}
                </Grid> */}
                {/* <Grid item xs={1} style={cellStyle}>
                    {header ? <div>Action</div> : <Button>Edit</Button>}
                </Grid> */}
            </Grid>
        </Grid>
    );
}

export function SessionTable({ sessions }) {
    const header = {
        used: "Used",
        name: "Name",
    };
    // const sessions = [header, header];
    console.log("sessions", sessions);
    return (
        <Grid container>
            <SessionRow session={header} header={true} />
            {sessions &&
                sessions.map((session) => {
                    return <SessionRow key={Math.random()} session={session} header={false} />;
                })}
        </Grid>
    );
}
