"use client"
import { supabase } from "./lib/supabase";


export default function Home() {

  // functionality for login 
  const loginWithGoogle = async () =>  {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    })
  }

  return (
    <div className="h-screen flex flex-col gap-16 items-center justify-center">
      <p>Save Your Individual Bookmarks Here</p>
      <button onClick={loginWithGoogle} className="bg-black text-white p-3 rounded-md">
        Sign In With Google
      </button>
    </div>
  );
}