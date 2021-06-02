import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
    const [accounts, setAccounts] = useState([]);
    return (
        <div>
            Hello
            <div>
                <button
                    onClick={async () => {
                        const resp = await fetch("/api/getaccounts");
                        const data = await resp.json();
                        console.log(data);
                        setAccounts(data);
                    }}
                >
                    load accounts
                </button>
            </div>
            <div>
                {accounts &&
                    accounts.map((acc) => {
                        return (
                            <div key={acc._id}>
                                <h1>{acc.accountId} </h1>
                                <pre>{JSON.stringify(acc, 0, 5)}</pre>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}
