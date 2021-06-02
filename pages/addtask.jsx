import { useState } from "react";

export default function AdTask() {
    const [accountId, setAccountId] = useState("");
    const [campaignName, setCampaignName] = useState("");
    const [budget, setBudget] = useState(Math.random() * 0.5 + 0.5);

    return (
        <div>
            <h1>Add task "Create Campaign"</h1>
            <div>
                <input
                    placeholder="Account ID: XXX-XXX-XXXX"
                    onChange={(e) => {
                        setAccountId(e.target.value);
                    }}
                />
                <p>413-922-4703</p>
                <p>Type: Display</p>
                <input
                    placeholder="Name of Campaign"
                    onChange={(e) => {
                        setCampaignName(e.target.value);
                    }}
                />
                <input
                    type="number"
                    placeholder="budget"
                    onChange={(e) => {
                        setBudget(e.target.value);
                    }}
                />
                <button
                    onClick={async () => {
                        await fetch("/api/tasks/settask", {
                            method: "POST",
                            body: JSON.stringify({
                                accountId: accountId,
                                name: campaignName,
                                budget: budget,
                                geo: "Italy",
                                lang: "it", //it;es;pt
                                type: "Display",
                                strategy: "Maximize conversions",
                                status: "Enabled",
                            }),
                            headers: {
                                "Content-Type": "application/json",
                            },
                        });
                    }}
                >
                    Set Task
                </button>
            </div>
        </div>
    );
}
