import { Grid, Button } from "@material-ui/core";
import { useMemo, useState } from "react";


export function ProxyRow({ proxy, header }) {
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
                <Grid item xs={1} style={cellStyle}>
                    {proxy.isAlive}
                </Grid>
                <Grid item xs={2} style={cellStyle}>
                    {proxy.proxyType}
                </Grid>
                <Grid item xs={2} style={cellStyle}>
                    {proxy.ip}
                </Grid>
                <Grid item xs={1} style={cellStyle}>
                    {proxy.port}
                </Grid>
                <Grid item xs={1} style={cellStyle}>
                    {proxy.login}
                </Grid>
                <Grid item xs={1} style={cellStyle}>
                    {proxy.password}
                </Grid>
                <Grid item xs={1} style={cellStyle}>
                    {proxy.used}
                </Grid>
                <Grid item xs={1} style={cellStyle}>
                    {header ? "Session" : <div>{proxy.session ? proxy.session.name : "-"}</div>}
                </Grid>
                {/* <Grid item xs={1} style={cellStyle}>
                    {header ? <div>Action</div> : <Button>Edit</Button>}
                </Grid> */}
            </Grid>
        </Grid>
    );
}

export function ProxyTable({ proxies }) {
    console.log("proxies", proxies);
    const header = {
        used: "Used",
        isAlive: "Is Alive",
        proxyType: "Type",
        ip: "IP",
        port: "PORT",
        login: "Login",
        password: "Pasword",
        session: {
            _id: "123",
            name: "name of the session",
        },
    };
    // const proxies = [header, header];
    return (
        <Grid container>
            <ProxyRow proxy={header} header />
            {proxies &&
                proxies.map((proxy) => {
                    return <ProxyRow key={Math.random()} proxy={proxy} header={false} />;
                })}
        </Grid>
    );
}
