"use client"
import axios from "axios"
import { useState } from "react"

export default function Form(){
        const [names, setNames]= useState("")
        const [languages, setLanguage]= useState("")
        const [categorys, setCategory]= useState("")
        const [headers, setHeader]= useState("")
        const [messages, setMessage]= useState("")
        const [footers, setFooter]= useState("")
        const [buttonss, setButtons]= useState("")

        async function Handle() {
            return await axios.post("/api/template", {
                name: names,
                language: languages,
                category: categorys,
                Header: headers,
                Message: messages,
                Footer: footers,
                Buttons: buttonss,
            });
        }
    return(
        <>
        <div>
            <input onChange={(e)=>setNames(e.target.value)} value={names} placeholder="name"></input>
            <input onChange={(e)=>setLanguage(e.target.value)} value={languages} placeholder="language"></input>
            <input onChange={(e)=>setCategory(e.target.value)} value={categorys} placeholder="category"></input>
            <input onChange={(e)=>setHeader(e.target.value)} value={headers} placeholder="header"></input>
            <input onChange={(e)=>setMessage(e.target.value)} value={messages} placeholder="message"></input>
            <input onChange={(e)=>setFooter(e.target.value)} value={footers} placeholder="footer"></input>
            <input onChange={(e)=>setButtons(e.target.value)} value={buttonss} placeholder="buttons"></input>

            <button onClick={Handle}>send data</button>
        </div>
        </>
    )
}