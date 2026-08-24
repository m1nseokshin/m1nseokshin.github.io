"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Project } from "@/components/SwipeCarousel";
import defaultProjects from "@/data/projects.json";

export default function AdminDashboardPage() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  // Edit / Add Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);

  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth");
        const data = await res.json();
        if (data.authenticated || localStorage.getItem("admin_auth") === "true") {
          setAuthenticated(true);
          loadProjects();
        } else {
          setAuthenticated(false);
          router.push("/admin/login");
        }
      } catch (err) {
        setAuthenticated(false);
        router.push("/admin/login");
      }
    };

    checkAuth();
  }, [router]);

  const loadProjects = async () => {
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setProjects(data.data);
      } else {
        const local = localStorage.getItem("portfolio_projects");
        setProjects(local ? JSON.parse(local) : (defaultProjects as Project[]));
      }
    } catch (err) {
      setProjects(defaultProjects as Project[]);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth", { method: "DELETE" });
    localStorage.removeItem("admin_auth");
    router.push("/admin/login");
  };

  // Reordering functions
  const moveUp = (index: number) => {
    if (index === 0) return;
    const updated = [...projects];
    const temp = updated[index - 1];
    updated[index - 1] = updated[index];
    updated[index] = temp;
    saveProjectsToStateAndStorage(updated);
  };

  const moveDown = (index: number) => {
    if (index === projects.length - 1) return;
    const updated = [...projects];
    const temp = updated[index + 1];
    updated[index + 1] = updated[index];
    updated[index] = temp;
    saveProjectsToStateAndStorage(updated);
  };

  const saveProjectsToStateAndStorage = async (newProjects: Project[]) => {
    const reindexed = newProjects.map((item, idx) => ({ ...item, index: idx }));
    setProjects(reindexed);
    localStorage.setItem("portfolio_projects", JSON.stringify(reindexed));

    setSaving(true);
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projects: reindexed }),
      });
      if (res.ok) {
        setSaveMessage("성공적으로 저장되었습니다");
        setTimeout(() => setSaveMessage(""), 2500);
      }
    } catch (err) {
      console.error("Failed to save to server:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = (idOrIndex: string | number) => {
    if (!confirm("정말 이 프로젝트를 삭제하시겠습니까?")) return;
    const updated = projects.filter((p) => p.id !== idOrIndex && p.index !== idOrIndex);
    saveProjectsToStateAndStorage(updated);
  };

  const handleOpenAddModal = () => {
    setEditingProject({
      id: `project-${Date.now()}`,
      index: projects.length,
      tag: "Design & Development",
      titleKo: "",
      titleEn: "",
      descKo: "",
      descEn: "",
      url: "https://",
      img: "/img/p_01.png",
      isAward: false,
      awardTextKo: "우수상",
      awardTextEn: "Excellence Award",
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (project: Project) => {
    setEditingProject({ ...project });
    setIsModalOpen(true);
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject || !editingProject.titleKo) return;

    let updatedProjects: Project[];
    const existingIndex = projects.findIndex(
      (p) => p.id === editingProject.id || p.index === editingProject.index
    );

    if (existingIndex >= 0) {
      updatedProjects = [...projects];
      updatedProjects[existingIndex] = editingProject as Project;
    } else {
      updatedProjects = [...projects, editingProject as Project];
    }

    saveProjectsToStateAndStorage(updatedProjects);
    setIsModalOpen(false);
    setEditingProject(null);
  };

  if (authenticated === null) {
    return (
      <div className="min-h-[80vh] bg-[#F8F9FC] text-slate-900 flex items-center justify-center">
        <p className="text-slate-400 text-sm font-medium animate-pulse">관리자 권한 확인 중...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8F9FC] text-slate-900 py-10 px-4 sm:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <header className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 mb-8 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-1.5">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                프로젝트 관리 대시보드
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                Admin
              </span>
            </div>
            <p className="text-sm text-slate-500">
              메인 및 Work 페이지의 프로젝트 순서 변경, 신규 등록, 수정, 삭제를 관리합니다.
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              onClick={() => {
                const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(projects, null, 2));
                const downloadAnchor = document.createElement("a");
                downloadAnchor.setAttribute("href", dataStr);
                downloadAnchor.setAttribute("download", "projects.json");
                document.body.appendChild(downloadAnchor);
                downloadAnchor.click();
                downloadAnchor.remove();
              }}
              className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors cursor-pointer"
            >
              JSON 내보내기
            </button>
            <Link
              href="/work"
              target="_blank"
              className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors"
            >
              미리보기 ↗
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-200/60 rounded-full transition-colors cursor-pointer"
            >
              로그아웃
            </button>
          </div>
        </header>

        {/* Action Controls */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={handleOpenAddModal}
            className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-full transition-all shadow-sm cursor-pointer"
          >
            <span>+</span>
            <span>새 프로젝트 등록</span>
          </button>

          {saveMessage && (
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200 animate-fade-in">
              {saveMessage}
            </span>
          )}
        </div>

        {/* Projects List */}
        <div className="space-y-4">
          {projects.map((project, idx) => (
            <div
              key={project.id || idx}
              className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-5 transition-all hover:border-slate-300 shadow-[0_2px_12px_rgba(0,0,0,0.02)]"
            >
              {/* Left Info */}
              <div className="flex items-center gap-4 flex-1 min-w-0">
                {/* Order Index */}
                <div className="flex flex-col items-center justify-center w-7 text-slate-400 font-mono font-bold text-sm">
                  #{idx + 1}
                </div>

                {/* Thumbnail */}
                <div className="relative w-24 h-16 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-100">
                  <Image
                    src={project.img || "/img/p_01.png"}
                    alt={project.titleKo}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>

                {/* Content info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-[11px] font-medium text-slate-500 uppercase bg-slate-100 px-2 py-0.5 rounded-md">
                      {project.tag}
                    </span>
                    {project.isAward && (
                      <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md uppercase tracking-wide">
                        {project.awardTextKo || "우수상"}
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 truncate">
                    {project.titleKo}
                  </h3>
                  <p className="text-xs text-slate-500 truncate max-w-md mt-0.5">
                    {project.descKo}
                  </p>
                </div>
              </div>

              {/* Right Controls */}
              <div className="flex items-center gap-2 self-end md:self-center">
                {/* Reorder Buttons */}
                <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-xl p-1">
                  <button
                    onClick={() => moveUp(idx)}
                    disabled={idx === 0}
                    title="위로 이동"
                    className="w-7 h-7 flex items-center justify-center text-slate-600 hover:text-slate-900 disabled:opacity-20 cursor-pointer rounded-lg hover:bg-slate-200/70 transition-colors text-xs"
                  >
                    ▲
                  </button>
                  <button
                    onClick={() => moveDown(idx)}
                    disabled={idx === projects.length - 1}
                    title="아래로 이동"
                    className="w-7 h-7 flex items-center justify-center text-slate-600 hover:text-slate-900 disabled:opacity-20 cursor-pointer rounded-lg hover:bg-slate-200/70 transition-colors text-xs"
                  >
                    ▼
                  </button>
                </div>

                {/* Edit Button */}
                <button
                  onClick={() => handleOpenEditModal(project)}
                  className="px-3.5 py-2 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors cursor-pointer"
                >
                  수정
                </button>

                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(project.id || idx)}
                  className="px-3.5 py-2 text-xs font-semibold bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200/60 rounded-xl transition-colors cursor-pointer"
                >
                  삭제
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Add / Edit */}
        {isModalOpen && editingProject && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 w-full max-w-2xl my-8 shadow-2xl">
              <h2 className="text-xl font-bold text-slate-900 mb-6">
                {editingProject.id && projects.some((p) => p.id === editingProject.id)
                  ? "프로젝트 정보 수정"
                  : "새 프로젝트 등록"}
              </h2>

              <form onSubmit={handleSaveModal} className="space-y-4">
                {/* Title KO & EN */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">제목 (한글)</label>
                    <input
                      type="text"
                      required
                      value={editingProject.titleKo || ""}
                      onChange={(e) => setEditingProject({ ...editingProject, titleKo: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">제목 (영문)</label>
                    <input
                      type="text"
                      value={editingProject.titleEn || ""}
                      onChange={(e) => setEditingProject({ ...editingProject, titleEn: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                    />
                  </div>
                </div>

                {/* Description KO & EN */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">설명 (한글)</label>
                  <textarea
                    rows={3}
                    value={editingProject.descKo || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, descKo: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">설명 (영문)</label>
                  <textarea
                    rows={2}
                    value={editingProject.descEn || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, descEn: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                  />
                </div>

                {/* Tag & URL */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">카테고리 태그</label>
                    <input
                      type="text"
                      value={editingProject.tag || ""}
                      onChange={(e) => setEditingProject({ ...editingProject, tag: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">프로젝트 링크 URL</label>
                    <input
                      type="url"
                      value={editingProject.url || ""}
                      onChange={(e) => setEditingProject({ ...editingProject, url: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                    />
                  </div>
                </div>

                {/* Image Path */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">이미지 경로 (예: /img/p_rally.png)</label>
                  <input
                    type="text"
                    value={editingProject.img || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, img: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                  />
                </div>

                {/* Award Badge Toggle & Text */}
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="isAward"
                      checked={editingProject.isAward || false}
                      onChange={(e) => setEditingProject({ ...editingProject, isAward: e.target.checked })}
                      className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500 accent-emerald-600"
                    />
                    <label htmlFor="isAward" className="text-xs font-semibold text-slate-800 cursor-pointer">
                      수상작 (Award Winner) 태그 활성화
                    </label>
                  </div>

                  {editingProject.isAward && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">수상 뱃지 문구 (한글)</label>
                        <input
                          type="text"
                          value={editingProject.awardTextKo || ""}
                          onChange={(e) => setEditingProject({ ...editingProject, awardTextKo: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-900 text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">수상 뱃지 문구 (영문)</label>
                        <input
                          type="text"
                          value={editingProject.awardTextEn || ""}
                          onChange={(e) => setEditingProject({ ...editingProject, awardTextEn: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-900 text-xs"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Buttons */}
                <div className="flex items-center justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-full transition-colors cursor-pointer"
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-full shadow-sm transition-colors cursor-pointer"
                  >
                    저장하기
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
