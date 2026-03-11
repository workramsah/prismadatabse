"use client";

import axios from "axios";
import { useState } from "react";

export default function Metatemp() {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState<string>("");

    async function handleChange() {
        setStatus("loading");
        setMessage("");
        const data = JSON.stringify({
            name: "sea_promotion_text_only_v2",
            language: "en",
            category: "MARKETING",
            components: [
                {
                    type: "HEADER",
                    format: "TEXT",
                    text: "{{1}} Special Offer!",
                    example: {
                        header_text: ["Summer"],
                    },
                },
                {
                    type: "BODY",
                    text: "Enjoy our limited-time {{1}} deal! Shop before {{2}} and apply code {{3}} to receive {{4}} discount on all items.",
                    example: {
                        body_text: [["summer", "August 31", "SUMMER25", "25%"]],
                    },
                },
                {
                    type: "FOOTER",
                    text: "Manage your promotional message preferences below.",
                },
                {
                    type: "BUTTONS",
                    buttons: [
                        { type: "QUICK_REPLY", text: "Stop Promo Messages" },
                        { type: "QUICK_REPLY", text: "Stop All Messages" },
                    ],
                },
            ],
        });

        const config = {
            method: "post",
            maxBodyLength: Infinity,
            url: "https://graph.facebook.com/v18.0/2821828158157500/message_templates",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer EAAcPiWi4m0oBQ88yn6ZBzWvtmhcWxmKquwfiMvTozZBB9ceX6PtpuH8X3kTuZBR49re09XXpgh6cdkNuWntxF6yuUnHV9f3AxTeMJkFV5n6xx1mWHUgKvhAnWEQxW6HuTWeuFltI85sxXVtlfjvS34wthq4lEtUAjLunqUdZB32dCFjcgCBCZBiESiHmZB5gZDZD",
            },
            data: data,
        };

        try {
            const response = await axios.request(config);
            console.log(JSON.stringify(response.data));
            setStatus("success");
            setMessage("API request successful.");
        } catch (error) {
            console.error(error);
            setStatus("error");
            setMessage(error instanceof Error ? error.message : "Request failed.");
        }
    }

    return (
        <>
            <div>hello world from the meta</div>
            <button
                type="button"
                onClick={handleChange}
                disabled={status === "loading"}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
                {status === "loading" ? "Sending…" : "send data"}
            </button>
            {status === "success" && <p className="text-green-600 mt-2">{message}</p>}
            {status === "error" && <p className="text-red-600 mt-2">{message}</p>}
        </>
    );
}