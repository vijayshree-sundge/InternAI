"use client";
import { useEffect, useState } from "react";
import api from "@/lib/api";

export default function ProfilePage() {
  // TODO: replace hardcoded userId with real value from JWT/localStorage once decoded there
  const userId = 1;
  const [profile, setProfile] = useState({ name: "", email: "" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    api.get(`/profile/${userId}`).then(res => setProfile(res.data));
  }, []);

  const handleSave = async () => {
    try {
      await api.put(`/profile/${userId}`, profile);
      setMessage("Profile updated.");
    } catch {
      setMessage("Failed to update profile.");
    }
  };

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