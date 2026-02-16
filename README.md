# 🔖 Simple Realtime Bookmark App

A full-stack realtime bookmark manager built using **Next.js**, **Supabase**, and **Tailwind CSS**.  
This application allows users to sign in with Google, add bookmarks, and see updates instantly across tabs using Supabase realtime functionality.

---

## 🚀 Live Demo
I will add vercel link here
---

## 🛠 Tech Stack

- **Frontend:** Next.js (App Router), React, Tailwind CSS  
- **Backend & Database:** Supabase (PostgreSQL)  
- **Authentication:** Supabase Google OAuth  
- **Realtime:** Supabase Realtime subscriptions  

---

## ✨ Features

- 🔐 Google OAuth Login (Supabase Auth)
- ➕ Add bookmarks (title + URL)
- ⚡ Realtime syncing across tabs (no refresh)
- 🗑 Delete your own bookmarks
- 🛡 Secure database using Row Level Security (RLS)
- 📱 Responsive UI for different screen sizes

---

## 🧠 Challenges Faced & Solutions

### 1. Google OAuth “Unsupported Provider” Error
While integrating Google OAuth with Supabase, I encountered a **“validation failed: unsupported provider”** error during login.  
Even after configuring the correct Google Client ID and Secret, authentication was failing.

**Solution:**  
After reviewing Supabase authentication settings, I found that although the Google provider was configured, the **“Sign in with Google” option was disabled**.  
Enabling this option resolved the issue and allowed successful authentication.

---

### 2. Understanding Supabase Row Level Security (RLS)
As I was new to Supabase and PostgreSQL policies, implementing proper database authorization using Row Level Security was initially challenging.

**Solution:**  
I explored Supabase documentation and learned how to write SQL policies.  
I implemented policies ensuring:
- Users can insert only their own bookmarks  
- Users can view only their own bookmarks  
- Users can delete only their own bookmarks  

This ensured secure and authorized access to data.

---

### 3. Realtime Sync Not Working Across Tabs
Initially, realtime syncing was not functioning — changes made in one tab were not reflecting in another.

**Solution:**  
I discovered that realtime must be explicitly enabled for each table in Supabase.  
After enabling realtime for the bookmarks table and setting up a Postgres changes subscription in the frontend, updates began syncing instantly across tabs.

---

### 4. Incorrect OAuth Redirect Behavior
The application was redirecting to the dashboard before Google authentication completed.  
This happened because I attempted manual navigation using Next.js router immediately after triggering OAuth login.

**Solution:**  
I fixed this by using Supabase’s built-in OAuth redirect configuration:

```ts
options: {
  redirectTo: `${window.location.origin}/dashboard`
}
```

This ensured users were redirected only after successful authentication.

---

### 5. Responsive UI Issues
While testing across devices, I noticed spacing and alignment issues on different screen sizes.

**Solution:**  
I refined the layout using Tailwind CSS responsive utilities and tested across multiple screen widths to ensure a clean and consistent interface.

---

## 🛡 Security Implementation

Row Level Security (RLS) policies ensure that:
- Users can only view their own bookmarks
- Users can only insert their own bookmarks
- Users can only delete their own bookmarks

This prevents unauthorized access to other users’ data.

---

## 🧑‍💻 Running Locally

### 1. Clone repository
```bash
git clone <your-repo-link>
cd bookmark-app
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create environment variables
Create `.env.local` in root:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Run project
```bash
npm run dev
```

---

## 🌍 Deployment

---

## 👤 Author
Naman Matoliya
naman.mat20255@gmail.com
