import axios from "axios";
import React, { useEffect, useState } from "react";
import { Template } from "../generated/prisma/models";
import Metatemp from "./Metatemp";

export default function Datas() {
    const [templates, setTemplates] = useState<Template[]>([]);

    useEffect(() => {
        const fetchTemplates = async () => {
            try {
                const response = await axios.get("/api/template/[id]");
                setTemplates(response.data);
            } catch (error) {
                console.error("Error fetching templates:", error);
            }
        };

        fetchTemplates();
    }, []);

    return (
        <>        <div>
            <h1>Templates</h1>
            {templates.map((template) => (
                <div key={template.id}>
                    <h2>{template.name}</h2>
                    <p>Language: {template.language}</p>
                    <p>Category: {template.category}</p>
                    <p>Header: {template.Header}</p>
                    <p>Message: {template.Message}</p>
                    <p>Footer: {template.Footer}</p>
                    <p>Buttons: {template.Buttons}</p>
                </div>
            ))}
        </div>
        <div>
            <h1>this is from metatemp component</h1>
            <Metatemp/>
        </div>
        </>

    );
}