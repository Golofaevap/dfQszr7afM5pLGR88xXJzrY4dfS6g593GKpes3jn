// import { useMemo } from "react";
import { Grid, IconButton } from "@material-ui/core";

import { ProxyTable } from "../../components/proxy/ProxyTable";
import { useState } from "react";
import AddCircleIcon from "@material-ui/icons/AddCircle";
// import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { PopUpFormSkeleton } from "../../components/popUpFormTemplate";
import { ProxyFromAdd } from "../../components/proxy/ProxyForm";

export async function getServerSideProps(ctx) {
    // console.log(ctx.query);
    // const { id } = ctx.query;

    const resp = await fetch("http://localhost:3000/api/proxy/getallproxies", {
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
                proxies: fullResp.result,
            },
        };
    }

    return {
        props: { proxies: [] },
    };
}

export default function Index(props) {
    const { proxies } = props;
    const [addProxyDialog, setAddProxyDialog] = useState(0); // 1 - one 2 - bulk
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
                                setAddProxyDialog(1);
                            }}
                        >
                            <AddCircleIcon />
                        </IconButton>
                    </Grid>
                    <Grid item xs={7}>
                        <h3>Proxies</h3>
                    </Grid>
                    <Grid item xs={4}>
                        options
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                {/* filter {JSON.stringify(rows)} */}
            </Grid>
            <Grid item xs={12}>
                <ProxyTable proxies={proxies} />
            </Grid>
            {addProxyDialog ? (
                <PopUpFormSkeleton closeDialog={setAddProxyDialog}>
                    <ProxyFromAdd></ProxyFromAdd>
                </PopUpFormSkeleton>
            ) : null}
        </Grid>
    );
}
