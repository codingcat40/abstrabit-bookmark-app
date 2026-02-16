"use client"

import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)
  const [title, setTitle] = useState("")
  const [url, setUrl] = useState("")
  const [bookmarks, setBookmarks] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // fetching bookmarks
  const fetchBookmarks = async (userId: string) => {
    const { data, error } = await supabase
      .from("bookmarks")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })

    if (!error) setBookmarks(data || [])
  }


  // adding bookmark
  const addBookmark = async () => {
    if (!title || !url) return

    const { data } = await supabase.auth.getUser()
    const currentUser = data.user
    if (!currentUser) return

    const { error } = await supabase.from("bookmarks").insert({
      title,
      url,
      user_id: currentUser.id,
    })

    if (!error) {
      setTitle("")
      setUrl("")
      fetchBookmarks(currentUser.id)
    }
  }

  useEffect(() => {
    let channel: any

    const init = async () => {
      const { data } = await supabase.auth.getUser()
      const currentUser = data.user

      setUser(currentUser)
      setLoading(false)

      if (!currentUser) return

      await fetchBookmarks(currentUser.id)

      // realtime
      channel = supabase
        .channel("bookmarks-channel")
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "bookmarks" },
          () => fetchBookmarks(currentUser.id)
        )
        .subscribe()
    }

    init()

    return () => {
      if (channel) supabase.removeChannel(channel)
    }
  }, [])

  if (loading) return <div className="p-10">Loading...</div>
  if (!user) return <div className="p-10">Not logged in</div>

  return (
    <div className="min-h-screen bg-black text-white flex flex-col gap-16 p-12">
      <div className="text-center text-xl">
        Welcome, {user.email} :)
      </div>

      <div className="max-w-3xl mx-auto w-full space-y-10">
        
        <div className="flex gap-4">
          <input
            className="bg-zinc-900 px-4 py-2 rounded w-full"
            type="text"
            placeholder="Bookmark Title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            className="bg-zinc-900 px-4 py-2 rounded w-full"
            type="text"
            placeholder="URL..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />

          <button
            onClick={addBookmark}
            className="bg-blue-600 cursor-pointer px-6 py-2 rounded-xl whitespace-nowrap"
          >
            Add
          </button>
        </div>

        
        <div className="flex flex-col gap-4">
          {bookmarks.map((item: any) => (
            <div key={item.id} className="bg-zinc-900 p-4 rounded flex justify-between">
              <p className="text-gray-300">{item.title}</p>
              <div className="flex gap-6">
              <a
                href={item.url}
                target="_blank"
                className="text-blue-400 text-sm p-3"
              >
                Open URL
              </a>
              <button className="text-sm px-3 py-2 bg-red-600 rounded-2xl">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
