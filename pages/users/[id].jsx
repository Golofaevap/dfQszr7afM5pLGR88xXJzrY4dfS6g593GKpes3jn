import { Button, Grid, TextField } from "@material-ui/core";
import { useState } from "react";

export async function getServerSideProps(ctx) {
    console.log(ctx.query);
    const { id } = ctx.query;

    const resp = await fetch("http://localhost:3000/api/users/getsomeusers", {
        method: "POST",
        body: JSON.stringify({ userId: id }),
        headers: {
            "Content-Type": "application/json",
        },
    });

    const respJson = await resp.json();
    console.log(respJson);
    const user = JSON.parse(JSON.stringify(respJson));

    return {
        props: {
            user: user,
        },
    };
}

export default function Index(props) {
    const [isEditMode, setIsEditMode] = useState(false);
    if (props.user.ok) {
        return (
            <Grid container>
                <Grid item xs={4}>
                    <h1>USER</h1>
                </Grid>
                <Grid item xs={4}>
                    <p>{!isEditMode ? "Preview" : "Edit"}</p>
                </Grid>
                <Grid item xs={4}>
                    <Button
                        onClick={() => {
                            setIsEditMode(!isEditMode);
                        }}
                        variant="contained"
                        color={isEditMode ? "secondary" : "default"}
                    >
                        Edit
                    </Button>
                </Grid>
                {isEditMode ? (
                    <Grid item xs={12}>
                        <TextField />
                        {/* < ПРОДОЛЖАТЬ ЗДЕСЬ */}
                    </Grid>
                ) : (
                    <Grid item xs={12} style={{ borderBottom: "1px solid black" }}>
                        <Grid container>
                            <Grid item xs={5}>
                                First Name
                            </Grid>
                            <Grid item xs={7}>
                                {props.user.result.firstName ? props.user.result.firstName : "EMPTY"}
                            </Grid>
                        </Grid>
                    </Grid>
                )}
                <Grid item xs={12} style={{ color: "gray" }}>
                    User Phone {JSON.stringify(props)}
                </Grid>
            </Grid>
        );
    }
    return <div> user not found</div>;
}
