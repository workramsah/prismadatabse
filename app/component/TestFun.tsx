"use client";

import axios from "axios";
import { useEffect, useState } from "react";

const API_URL = "http://prismadatabse.vercel.app/api/template";

type Template = {
   id: number;
   name: string;
   language: string;
   category: string;
   Header: string;
   Message: string;
   Footer: string;
   Buttons: string;
};

export default function TestFun() {
   const [templates, setTemplates] = useState<Template[]>([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);

   useEffect(() => {
      async function fetchTemplates() {
         try {
            const res = await axios.get(API_URL);
            setTemplates(Array.isArray(res.data) ? res.data : []);
         } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to fetch");
         } finally {
            setLoading(false);
         }
      }
      fetchTemplates();
   }, []);

   if (loading) return <p>Loading…</p>;
   if (error) return <p className="text-red-600">Error: {error}</p>;

   return (
      <>
         <div>
            <h1>Templates</h1>
            <ul className="mt-3 space-y-3">
               {templates.map((t) => (
                  <li key={t.id} className="border rounded p-3">
                     <div className="font-semibold">{t.name}</div>
                     <div className="text-sm text-gray-600">
                        {t.language} · {t.category}
                     </div>

                     <div className="mt-2 text-sm">
                        <div>
                           <span className="font-semibold">Header:</span> {t.Header}
                        </div>
                        <div>
                           <span className="font-semibold">Message:</span> {t.Message}
                        </div>
                        <div>
                           <span className="font-semibold">Footer:</span> {t.Footer}
                        </div>
                        <div>
                           <span className="font-semibold">Buttons:</span> {t.Buttons}
                        </div>
                     </div>
                  </li>
               ))}
            </ul>
         </div>
      </>
   );
}