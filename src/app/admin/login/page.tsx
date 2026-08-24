"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        localStorage.setItem("admin_auth", "true");
        router.push("/admin");
      } else {
        setError(data.message || "비밀번호가 올바르지 않습니다.");
      }
    } catch (err) {
      setError("로그인 처리 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[85vh] w-full bg-[#F8F9FC] text-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-10 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
        <div className="text-center mb-8">
          <Link
            href="/"
            className="inline-block text-xs font-semibold text-emerald-600 tracking-wider uppercase mb-3 hover:text-emerald-700 transition-colors"
          >
            ← Portfolio Home
          </Link>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 mb-2">
            관리자 로그인
          </h1>
          <p className="text-sm text-slate-500 leading-relaxed">
            포트폴리오 프로젝트 관리 시스템 인증
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              관리자 비밀번호
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
              required
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all text-sm"
            />
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs font-medium text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white font-semibold rounded-xl transition-all duration-200 cursor-pointer disabled:opacity-50 text-sm shadow-sm"
          >
            {loading ? "인증 중..." : "로그인"}
          </button>
        </form>
      </div>
    </main>
  );
}
