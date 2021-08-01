import { Grid } from "@material-ui/core";

const styleX1 = {
    padding: 5,
    paddingLeft: 220,
};
const styleX2 = {
    padding: 5,
    paddingLeft: 40,
};
const d = {
    name: "Egil Jeppese",
    adrs: "598 South Las Vegas Boulevard",
    city: "Las Vegas",
    state: "NV",
    zip: "89101",
    phone: "(260) 419-3328",
};

export default function Test() {
    return (
        <div style={styleX1}>
            <h2>Account</h2>
            <div style={styleX2}>
                <h3>{d.name}</h3>
                <hr />
                <h4>Address</h4>
                <p>{d.adrs}</p>
                <p>
                    {d.city}, {d.state} {d.zip}
                </p>
                <hr />
                <h4>Phone</h4>
                <p>{d.phone}</p>
                
            </div>
        </div>
    );
    return (
        <Grid container>
            <Grid item xs={12} style={styleX1}>
                <Grid container>
                    <Grid item xs={1} style={styleX1}></Grid>
                    <Grid item xs={3} style={styleX1}>
                        <h1>Contact information</h1>
                    </Grid>
                    <Grid item xs={5} style={styleX1}></Grid>
                    <Grid item xs={3} style={styleX1}></Grid>
                </Grid>
            </Grid>

            <Grid item xs={12} style={styleX1}>
                <Grid container>
                    <Grid item xs={1} style={styleX1}></Grid>
                    <Grid item xs={3} style={styleX1}></Grid>
                    <Grid item xs={5} style={styleX1}>
                        <h2>Account Info</h2>
                        <hr />
                        <p>Egil Jeppese</p>
                    </Grid>
                    <Grid item xs={3} style={styleX1}></Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} style={styleX1}>
                <Grid container>
                    <Grid item xs={1} style={styleX1}></Grid>
                    <Grid item xs={3} style={styleX1}></Grid>
                    <Grid item xs={5} style={styleX1}></Grid>
                    <Grid item xs={3} style={styleX1}></Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} style={styleX1}>
                <Grid container>
                    <Grid item xs={1} style={styleX1}></Grid>
                    <Grid item xs={3} style={styleX1}></Grid>
                    <Grid item xs={5} style={styleX1}>
                        <h3>Address</h3>
                        <p>598 South Las Vegas Boulevard</p>
                        <p>Las Vegas, NV 89101</p>
                    </Grid>
                    <Grid item xs={3} style={styleX1}></Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} style={styleX1}>
                <Grid container>
                    <Grid item xs={1} style={styleX1}></Grid>
                    <Grid item xs={3} style={styleX1}></Grid>
                    <Grid item xs={5} style={styleX1}>
                        <h3>Address</h3>
                        <p>598 South Las Vegas Boulevard</p>
                        <p>Las Vegas, NV 89101</p>
                    </Grid>
                    <Grid item xs={3} style={styleX1}></Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} style={styleX1}></Grid>
            <Grid item xs={12} style={styleX1}></Grid>
            <Grid item xs={3} style={styleX1}></Grid>
        </Grid>
    );
}
