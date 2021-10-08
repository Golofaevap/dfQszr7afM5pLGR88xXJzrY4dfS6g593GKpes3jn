// import '../styles/globals.css'

import { Accordion, AccordionDetails, AccordionSummary, Button, Grid, Typography } from "@material-ui/core";
import Link from "next/link";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const buttonStyle = {
    marginTop: 10,
};

const MenuElement = ({ href, caption }) => {
    return (
        <Grid item xs={12} style={buttonStyle}>
            <Link href={href}>
                <Button fullWidth>{caption}</Button>
            </Link>
        </Grid>
    );
};

function MyApp({ Component, pageProps }) {
    return (
        <Grid container style={{ minHeight: "100vh", minWidth: "1200px" }}>
            <Grid item xs={1} style={{ backgroundColor: "skyblue" }}>
                <Grid container>
                    <MenuElement href="/dashboard" caption="Dashboard" />
                    <MenuElement href="/bydate" caption="GAds by Date" />
                    <MenuElement href="/wizards" caption="Wizards" />
                    <MenuElement href="/simplesessions" caption="simp-ses" />

                    <Grid item xs={12} style={buttonStyle}>
                        <Accordion
                            style={{ backgroundColor: "rgba(0,0,0,0.1)", border: "0px solid black", boxShadow: "none" }}
                        >
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>LISTS</AccordionSummary>
                            <AccordionDetails>
                                <Grid container>
                                    <MenuElement href="/users" caption="Users" />
                                    <MenuElement href="/proxies" caption="Proxy" />
                                    <MenuElement href="/userPhones" caption="Phones" />
                                    <MenuElement href="/userAddresses" caption="Addresses" />
                                    <MenuElement href="/payments" caption="Payments" />
                                </Grid>
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={11} style={{ padding: 15 }}>
                <Component {...pageProps} />
            </Grid>
        </Grid>
    );
}

export default MyApp;
