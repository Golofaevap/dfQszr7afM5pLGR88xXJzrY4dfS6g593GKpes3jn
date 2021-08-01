import { Grid, Button } from "@material-ui/core";
import { useMemo, useState } from "react";

export function PhoneRow({ phone, header }) {
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
                    {phone.phoneNumber}
                </Grid>

                <Grid item xs={4} style={cellStyle}>
                    {phone.note}
                </Grid>
                <Grid item xs={1} style={cellStyle}>
                    {phone.used}
                </Grid>
                <Grid item xs={2} style={cellStyle}>
                    {header ? "Session" : <div>{phone.session ? phone.session.name : "-"}</div>}
                </Grid>
                {/* <Grid item xs={1} style={cellStyle}>
                    {header ? <div>Action</div> : <Button>Edit</Button>}
                </Grid> */}
            </Grid>
        </Grid>
    );
}

export function PhoneTable({ phones }) {
    const header = {
        used: "Used",
        phoneNumber: "Phone Number Raw",

        note: "Note",
        session: {
            _id: "123",
            name: "name of the session",
        },
    };
    // const phones = [header, header];
    console.log("phones", phones);
    return (
        <Grid container>
            <PhoneRow phone={header} header={true} />
            {phones &&
                phones.map((phone) => {
                    return <PhoneRow key={Math.random()} phone={phone} header={false} />;
                })}
        </Grid>
    );
}
