import { Grid, Button } from "@material-ui/core";
// import { useMemo, useState } from "react";

export function AddressRow({ address, header }) {
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
                <Grid item xs={2} style={cellStyle}>
                    {address.firstLineAddress}
                </Grid>

                <Grid item xs={2} style={cellStyle}>
                    {address.city}
                </Grid>
                <Grid item xs={1} style={cellStyle}>
                    {address.zip}
                </Grid>
                <Grid item xs={2} style={cellStyle}>
                    {address.state}
                </Grid>
                <Grid item xs={1} style={cellStyle}>
                    {address.used}
                </Grid>
                <Grid item xs={2} style={cellStyle}>
                    {header ? "Session" : <div>{address.session ? address.session.name : "-"}</div>}
                </Grid>
                {/* <Grid item xs={1} style={cellStyle}>
                    {header ? <div>Action</div> : <Button>Edit</Button>}
                </Grid> */}
            </Grid>
        </Grid>
    );
}

export function AddressTable({ addresses }) {
    const header = {
        used: "Used",
        firstLineAddress: "1st line",
        city: "City",
        zip: "ZIP",
        state: "State",
        session: {
            _id: "123",
            name: "name of the session",
        },
    };
    // const addresses = [header, header];
    console.log("addresses", addresses);
    return (
        <Grid container>
            <AddressRow address={header} header={true} />
            {addresses &&
                addresses.map((address) => {
                    return <AddressRow key={Math.random()} address={address} header={false} />;
                })}
        </Grid>
    );
}
