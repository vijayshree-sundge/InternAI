"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function RequireRole({ role, children }: { role: string; children: React.ReactNode }) {
  const router = useRouter();
  const [ok, setOk] = useState(false);

  useEffect(() => {
    const userRole = localStorage.getItem("role");
    if (userRole !== role) router.push("/login");
    else setOk(true);
  }, [role, router]);

  return ok ? <>{children}</> : null;
}