import { Grid, Button } from "@material-ui/core";
import { useMemo, useState } from "react";

export function UsersRow({ user, header }) {
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
                    {user.empty === 1 ? "EMPTY_USER" : user.firstName}
                </Grid>

                <Grid item xs={4} style={cellStyle}>
                    {user.empty === 1 ? "EMPTY_USER" : user.lastName}
                </Grid>
                {/* <Grid item xs={1} style={cellStyle}>
                    {user.used}
                </Grid>
                <Grid item xs={2} style={cellStyle}>
                    {header ? "Session" : <div>{user.session ? user.session.name : "-"}</div>}
                </Grid> */}
                {/* <Grid item xs={1} style={cellStyle}>
                    {header ? <div>Action</div> : <Button>Edit</Button>}
                </Grid> */}
            </Grid>
        </Grid>
    );
}

export function UsersTable({ users }) {
    const header = {
        firstName: "First Name",
        lastName: "Last Name",

        // note: "Note",
        session: {
            _id: "123",
            name: "name of the session",
        },
    };
    // const users = [header, header];
    console.log("users", users);
    return (
        <Grid container>
            <UsersRow user={header} header={true} />
            {users &&
                users.map((user) => {
                    return <UsersRow key={Math.random()} user={user} header={false} />;
                })}
        </Grid>
    );
}
