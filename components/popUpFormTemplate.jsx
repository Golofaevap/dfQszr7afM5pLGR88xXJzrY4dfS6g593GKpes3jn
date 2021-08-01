import { Grid, IconButton } from "@material-ui/core";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

export function PopUpFormSkeleton({ closeDialog, children }) {
    return (
        <Grid
            container
            style={{
                width: "100%",
                height: "100vh",
                position: "fixed",
                zIndex: 2,
                top: 0,
                left: 0,
            }}
        >
            <Grid
                item
                xs={6}
                style={{ backgroundColor: "rgba(10,10,10,0.8)", height: "100vh", padding: 25 }}
                onDoubleClick={() => {
                    closeDialog(0);
                }}
            >
                <IconButton
                    color="secondary"
                    variant="contained"
                    // size="large"
                    aria-label="upload picture"
                    component="span"
                    onClick={() => {
                        closeDialog(0);
                    }}
                >
                    <HighlightOffIcon />
                </IconButton>
            </Grid>
            <Grid item xs={6} style={{ backgroundColor: "white", height: "100vh", padding: 5, overflowY: "scroll" }}>
                {children}
            </Grid>
        </Grid>
    );
}
