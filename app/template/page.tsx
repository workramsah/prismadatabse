"use client"
import { useState } from "react";
import axios from "axios";
import Datas from "../component/datas";
import Imgtemp from "../component/Imgtemp";

export default function Page() {
    const [formData, setFormData] = useState({
        name: "",
        language: "",
        Category: "",
        Header: "",
        Message: "",
        Footer: "",
        Buttons: "",
    });

    const handleChange = (e:any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        try {
            const response = await axios.post("/api/template", formData);
            console.log("Template created:", response.data);
        } catch (error) {
            console.error("Error creating template:", error);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    name="name"
                    placeholder="Template name"
                    value={formData.name}
                    onChange={handleChange}
                />
                <input
                    name="language"
                    placeholder="Language"
                    value={formData.language}
                    onChange={handleChange}
                />
                <input
                    name="Category"
                    placeholder="Category"
                    value={formData.Category}
                    onChange={handleChange}
                />
                <input
                    name="Header"
                    placeholder="Header"
                    value={formData.Header}
                    onChange={handleChange}
                />
                <input
                    name="Message"
                    placeholder="Message body"
                    value={formData.Message}
                    onChange={handleChange}
                />
                <input
                    name="Footer"
                    placeholder="Footer"
                    value={formData.Footer}
                    onChange={handleChange}
                />
                <input
                    name="Buttons"
                    placeholder="Buttons"
                    value={formData.Buttons}
                    onChange={handleChange}
                />
                <button type="submit">Create template</button>
            </form>
            <h1>Data fetching from the api</h1>
            <Datas/>
            <h1>Here is button for image adding to meta</h1>
            <Imgtemp/>


        </>
    );
}