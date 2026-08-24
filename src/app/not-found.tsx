import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-[80vh] flex items-center justify-center px-4 bg-white">
      <div className="text-center max-w-md mx-auto py-24">
        <span className="text-xs font-semibold text-emerald-600 uppercase tracking-widest block mb-4">
          404 Not Found
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
          페이지를 찾을 수 없습니다
        </h1>
        <p className="text-sm text-slate-500 mb-8 leading-relaxed">
          요청하신 페이지가 이동되었거나 삭제되었습니다. 홈 또는 프로젝트 목록으로 돌아가실 수 있습니다.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/"
            className="px-6 py-3 rounded-full bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors shadow-sm"
          >
            홈으로 이동
          </Link>
          <Link
            href="/work"
            className="px-6 py-3 rounded-full border border-slate-200 text-slate-900 text-xs font-semibold hover:bg-slate-50 transition-colors"
          >
            작업 목록 보기
          </Link>
        </div>
      </div>
    </main>
  );
}
