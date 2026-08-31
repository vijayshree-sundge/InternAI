"use client";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import { getCurrentUserId } from "@/lib/auth";

export default function ProfilePage() {
  const userId = getCurrentUserId();
  const [profile, setProfile] = useState({ name: "", email: "" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!userId) return;
    api.get(`/profile/${userId}`).then(res => setProfile(res.data));
  }, [userId]);

  const handleSave = async () => {
    if (!userId) return;
    try {
      await api.put(`/profile/${userId}`, profile);
      setMessage("Profile updated.");
    } catch {
      setMessage("Failed to update profile.");
    }
  };

  if (!userId) {
    return <div className="p-8 text-slate-600">Unable to load user. Please log in again.</div>;
  }

  return (
    <div className="p-8 max-w-md space-y-4">
      <h1 className="text-xl font-bold text-slate-900">My Profile</h1>
      <input className="border p-2 w-full rounded" placeholder="Name"
        value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })} />
      <input className="border p-2 w-full rounded" placeholder="Email"
        value={profile.email} onChange={e => setProfile({ ...profile, email: e.target.value })} />
      <button className="bg-indigo-600 text-white w-full py-2 rounded" onClick={handleSave}>
        Save Changes
      </button>
      {message && <p className="text-sm text-slate-600">{message}</p>}
    </div>
  );
}