"use client"

import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"

export default function Dashboard(){
    const [user, setUser] = useState<any>(null)
    const [title, setTitle] = useState<string>("")
    const [url, setUrl] = useState<string>("")

    // to fetch bookmarks

    // Add Bookmark data

    const addBookmark = async () => {
        const {data:  {user}} = await supabase.auth.getUser()

        await supabase.from('bookmarks').insert({
            title,
            url,
            user_id:  user?.id
        })

        setTitle("")
        setUrl("")
    }

    useEffect(() =>  {
        supabase.auth.getUser().then(({data}) =>  {
            setUser(data.user)
        })
    }, [])
    
    if(!user){
        return <div>Loading Please Wait ... </div>
    }

    return <div className="h-screen bg-black text-white flex flex-col space-y-24 p-12">
        
        <div className="text-center justify-center">
            Welcome, {user.email} :)

        </div>

        <div className=" text-center justify-center min-w-172 mx-auto">
                {/* div for input form */}
                <div className="flex gap-6">
                        <input type="text" 
                        placeholder="Bookmark Title..."
                        onChange={(e) => setTitle(e.target.value)}
                        
                        />

                        <input type="text" 
                        placeholder="URL.."
                        onChange={(e) => setUrl(e.target.value)}
                        />


                        <button onClick={addBookmark} className="bg-blue-600 px-4 py-2 rounded-2xl">
                           Add URL
                        </button>
                </div>

        </div>
        
        
    </div>
}