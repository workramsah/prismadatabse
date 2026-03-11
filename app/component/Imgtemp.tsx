"use client";

import { useState } from "react";
//  const tempdata = ()=>{
//     console.log("testing that its function is working or not ")
//  }
const TEMPLATE_BASE = {
    language: "en",
    category: "MARKETING",
    allow_category_change: true,
    components: [

        {
            type: "BODY",
            text: "Hi {{1}}! For a limited time you can get our {{2}} for as low as {{3}}. Tap the button for more info.",
            example: { body_text: [["Mark", "Post by ram", "800"]] },
        },
        { type: "FOOTER", text: "Offer valid until May 31, 2023" },
        {
            type: "BUTTONS",
            buttons: [
                { type: "PHONE_NUMBER", text: "Call", phone_number: "+9779824210033" },
                { type: "URL", text: "Shop Now", url: "https://www.examplesite.com/shop?promo={{1}}", example: ["summer2023"] },
            ],
        },
    ],
};

export default function Imgtemp() {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState("");
    const [names, setNames] = useState("");
    const [imglink, setImglink] = useState("");

    async function handleSend() {
        setStatus("loading");
        setMessage("");

        const TEMPLATE = {
            ...TEMPLATE_BASE,
            name: names,

            type: "HEADER",
            format: "IMAGE",
            example: {
                header_handle: [
                    imglink,
                ],

            },// <-- use the input value here
        };
        try {
            const res = await fetch("/api/imgtemp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(TEMPLATE),
            });
            const data = (await res.json().catch(() => ({}))) as { error?: { message?: string; code?: number } };
            if (res.ok) {
                setStatus("success");
                setMessage("API request successful.");
                return;
            }
            const err = data?.error;
            setMessage(`Error ${err?.code ?? res.status}: ${err?.message ?? "Request failed."}`);
            setStatus("error");
        } catch (err) {
            setMessage(err instanceof Error ? err.message : "Request failed.");
            setStatus("error");
        }
    }

    return (
        <>
            <h1>this all data from Imgtemp</h1>
            <input value={names} onChange={(e) => setNames(e.target.value)} placeholder="template name"></input>
            <input value={imglink} onChange={(e) => setImglink(e.target.value)} placeholder="image link"></input>
            <h1>{names}</h1><h1>{imglink}</h1>
            <button type="button" onClick={handleSend} disabled={status === "loading"} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50">
                {status === "loading" ? "Sending…" : "send imgtemp"}
            </button>
            {(status === "success" || status === "error") && <p className={`mt-2 ${status === "success" ? "text-green-600" : "text-red-600"}`}>{message}</p>}
        </>
    );
}
