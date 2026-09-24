import { BookOpenCheck, Sigma } from 'lucide-react'

export default function AcademicsVisual({ compact = false }) {
  const bars = [64, 78, 88, 72, 94]

  return (
    <div
      className={`
        relative overflow-hidden rounded-3xl
        border border-cyan-300/15
        bg-[#071827]
        ${compact ? 'h-full min-h-32' : 'h-[300px] sm:h-[360px]'}
      `}
    >
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-indigo-500/10" />

      {/* Label */}
      <div className="absolute left-6 top-6 flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
        <Sigma className="h-5 w-5 text-cyan-300" />

        <span className="text-xs font-bold tracking-widest text-cyan-100">
          CREDIT × GRADE
        </span>
      </div>

      {/* CGPA circle */}
      <div className="absolute left-[12%] top-[35%] flex h-28 w-28 items-center justify-center rounded-full border border-cyan-200/20 bg-cyan-400/5">
        <div className="flex h-20 w-20 flex-col items-center justify-center rounded-full border border-indigo-300/20 bg-indigo-500/10 text-white">
          <span className="text-[10px] font-bold tracking-widest text-cyan-200">
            CGPA
          </span>

          <strong className="text-2xl">
            8.72
          </strong>
        </div>
      </div>

      {/* Chart */}
      <div className="absolute bottom-7 right-6 flex h-28 w-[45%] items-end gap-2 rounded-2xl border border-white/10 bg-white/5 p-4">
        {bars.map((height, index) => (
          <div
            key={index}
            className="flex-1 rounded-t-md bg-gradient-to-t from-indigo-500 to-cyan-300"
            style={{ height: `${height}%` }}
          />
        ))}
      </div>

      {/* Description */}
      {!compact && (
        <div className="absolute right-7 top-[25%] flex items-center gap-2 text-cyan-100">
          <BookOpenCheck className="h-5 w-5 text-cyan-300" />

          <span className="text-xs font-bold">
            Subjects loaded automatically
          </span>
        </div>
      )}
    </div>
  )
}