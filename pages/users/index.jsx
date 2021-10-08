// import { useMemo } from "react";
import { Grid, IconButton } from "@material-ui/core";

import AddCircleIcon from "@material-ui/icons/AddCircle";
import { useState } from "react";
import { UsersFromAdd } from "../../components/users/UsersForm";
import { UsersTable } from "../../components/users/UsersTable";
import { PopUpFormSkeleton } from "../../components/popUpFormTemplate";

export async function getServerSideProps(ctx) {
    // console.log(ctx.query);
    // const { id } = ctx.query;

    const resp = await fetch("http://localhost:3000/api/users/getsomeusers", {
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
                users: fullResp.result,
            },
        };
    }

    return {
        props: { users: [] },
    };
}

export default function Index(props) {
    const { users } = props;
    const [addPhoneDialog, setAddPhoneDialog] = useState(0); // 1 - one 2 - bulk
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
                                setAddPhoneDialog(1);
                            }}
                        >
                            <AddCircleIcon />
                        </IconButton>
                    </Grid>
                    <Grid item xs={7}>
                        <h3>Users</h3>
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
                <UsersTable users={users} />
            </Grid>
            {addPhoneDialog ? (
                <PopUpFormSkeleton closeDialog={setAddPhoneDialog}>
                    <UsersFromAdd />
                </PopUpFormSkeleton>
            ) : null}
        </Grid>
    );
}
