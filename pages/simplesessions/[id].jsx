import { Grid } from "@material-ui/core";
import { SessionFormEdit } from "../../components/simpleSessions/SimpleSessionsForm";

export async function getServerSideProps(ctx) {
    console.log(ctx.query);
    const { id } = ctx.query;

    const resp = await fetch("http://localhost:3000/api/simplesessions/get", {
        method: "POST",
        body: JSON.stringify({ id: id }),
        headers: {
            "Content-Type": "application/json",
        },
    });

    const respJson = await resp.json();
    const fullResp = JSON.parse(JSON.stringify(respJson));

    return {
        props: {
            id: id,
            session: fullResp.result,
        },
    };
}

export default function Index(props) {
    return (
        <Grid container>
            <Grid item xs={12}>
                <div style={{ fontSize: "150%", fontWeight: 800 }}>User</div>
                <div style={{ color: "gray" }}>{JSON.stringify(props.id)}</div>
            </Grid>
            <Grid item xs={6}>
                <p>FORM</p>
                <SessionFormEdit loadedSession={props.session} />
            </Grid>
            <Grid item xs={6}>
                <p>History</p>
                {
                    '{"accountCountry":"latvia","phone":"37167669698","website":"https://detailed.com/finance-blogs/","keywords":"Impotenza","address":"03 Muciņš Street","city":"Madona","zip":"LV-7443","payType":"ba","lang":"de","businessCountry":"Italy","bizLen":"755","sumLen":"1555"}'
                }
            </Grid>
        </Grid>
    );
}
