import { Grid, Button } from "@material-ui/core";
import Link from "next/link";
import { useMemo, useState } from "react";

export function SimpleSessionsRow({ session, header }) {
    const cellStyle = {
        borderLeft: "1px solid black",
        backgroundColor: header ? "whitesmoke" : session.color ? session.color : "white",
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
                            {/* <Button>copy</Button> */}
                            <Link href={`/simplesessions/${session._id}`}>
                                <Button>Edit</Button>
                            </Link>
                            <div>{session.note}</div>
                        </>
                    )}
                </Grid>
                <Grid item xs={2} style={cellStyle}>
                    <div>{session.samaraId}</div>
                    <div>{session.gadsId}</div>
                </Grid>

                <Grid item xs={2} style={cellStyle}>
                    <div>{session.address}</div>
                    <div>{session.city}</div>
                    <div>{session.zip}</div>
                    <div>{session.phone}</div>
                </Grid>
                <Grid item xs={2} style={cellStyle}>
                    <div>{session.gmail}</div>
                    <div>{session.recoveryEmail}</div>
                    <div>{session.password}</div>
                </Grid>
                <Grid item xs={1} style={cellStyle}>
                    {session.dob}
                </Grid>
                <Grid item xs={2} style={cellStyle}>
                    <div>{session.billingCountry}</div>
                    <div>{session.offerCountry}</div>
                    <div>{session.lang}</div>
                    <div>{session.paymentMethod}</div>
                </Grid>
                <Grid item xs={1} style={cellStyle}>
                    {session.tags}
                </Grid>
                {/* <Grid item xs={1} style={cellStyle}>
                    {header ? "Session" : <div>{session.session ? session.session.name : "-"}</div>}
                </Grid> */}
                {/* <Grid item xs={1} style={cellStyle}>
                    {header ? <div>Action</div> : <Button>Edit</Button>}
                </Grid> */}
            </Grid>
        </Grid>
    );
}

export function SimpleSessionsTable({ sessions }) {
    console.log("sessions", sessions);
    const header = {
        samaraId: "Samara ID",
        gadsId: "Google Ads ID",
        phone: "Phone",
        address: "Address",
        // city: String,
        // zip: String,
        gmail: "GMAIL",
        recoveryEmail: "recovery Email",
        password: "password",
        dob: "Date of Birth",
        billingCountry: "billingCountry",
        offerCountry: "offerCountry",
        lang: "lang",
        paymentMethod: "payment Method",
        tags: "tags",
    };
    // const sessions = [header, header];
    return (
        <Grid container>
            <SimpleSessionsRow session={header} header />
            {sessions &&
                sessions.map((session) => {
                    return <SimpleSessionsRow key={Math.random()} session={session} header={false} />;
                })}
        </Grid>
    );
}
