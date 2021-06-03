import Head from "next/head";
import "react-datepicker/dist/react-datepicker.css";
// import Image from "next/image";
import { useState } from "react";
// import styles from "../styles/Home.module.css";
// import { TextField } from "@material-ui/core";
import DatePicker from "react-datepicker";
import { Button, Grid } from "@material-ui/core";

export default function Home() {
    const [accounts, setAccounts] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);

    console.log(startDate, endDate);
    return (
        <div>
            <div
                style={{
                    backgroundColor: "whitesmoke",
                    padding: 10,
                    boxSizing: "border-box",
                }}
            >
                <h2>Select date range</h2>
                <Grid container xs={12}>
                    <Grid item xs={4}>
                        <div>Start Date</div>
                        <DatePicker
                            style={{ width: "400px", margin: "5%" }}
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                        />
                    </Grid>

                    <Grid item xs={4}>
                        <div>End Date</div>
                        <DatePicker
                            style={{ width: "400px", margin: "5%" }}
                            selected={endDate}
                            onChange={(date) => {
                                console.log(date);
                                if (date < startDate) {
                                    date = startDate;
                                }
                                setEndDate(date);
                            }}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Button
                            onClick={async () => {
                                const resp = await fetch(
                                    "/api/accounts/getaccountsbydate",
                                    {
                                        method: "POST",
                                        body: JSON.stringify({
                                            startDate,
                                            endDate,
                                        }),
                                        headers: {
                                            "Content-Type": "application/json",
                                        },
                                    }
                                );

                                const data = await resp.json();
                                console.log(data);
                                setAccounts(data);
                            }}
                            color="primary"
                            variant="contained"
                        >
                            load accounts
                        </Button>
                    </Grid>
                    {/* <input type="date" value={startDate} /> */}
                </Grid>
            </div>
            <div>
                {accounts &&
                    accounts.map((acc) => {
                        return (
                            <div
                                key={acc._id}
                                style={{
                                    boxSizing: "border-box",
                                    border: "2px solid gray",
                                    margin: 10,
                                    padding: 10,
                                }}
                            >
                                <p>{acc.accountId} </p>
                                <p
                                    style={{
                                        fontSize: "80%",
                                        color: "lightgray",
                                    }}
                                >
                                    created at: {acc.createdAt}
                                </p>
                                {/* <pre>{JSON.stringify(acc, 0, 5)}</pre> */}
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}
