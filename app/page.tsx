"use client"
import { supabase } from "./lib/supabase";

export default function Home() {
  // functionality for login 
  const loginWithGoogle = async () =>  {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options:  {
        redirectTo:  `${window.location.origin}/dashboard`
      }
    },
  )
    
  }

  return (
    <div className="h-screen flex flex-col gap-16 items-center justify-center">
      <p className="text-lg font-mono">Save Your private Bookmarks and URLs Here</p>
      <button onClick={loginWithGoogle} className="bg-black text-white p-3 rounded-md cursor-pointer hover:text-black hover:bg-white transition-all ease-out duration-1000">
        Sign In With Google
      </button>
    </div>
  );
}