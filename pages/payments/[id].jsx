export async function getServerSideProps(ctx) {
    console.log(ctx.query);
    const { id } = ctx.query;

    // const resp = await fetch("http://localhost:3000/api/accounts/getbyid", {
    //     method: "POST",
    //     body: JSON.stringify({
    //         id,
    //     }),
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    // });

    // const respJson = await resp.json();
    // const acc = JSON.parse(JSON.stringify(respJson));

    return {
        props: {
            id: id,
        },
    };
}

export default function Index(props) {
    return <div>Payments {JSON.stringify(props)}</div>;
}
