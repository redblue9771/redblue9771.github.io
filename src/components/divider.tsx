interface DividerProps {
  children: React.ReactNode
}

export default function Divider({ children }: DividerProps) {
  return (
    <div className="my-4 flex items-center gap-2 text-center">
      <span
        aria-hidden="true"
        className="h-px flex-1 bg-gradient-to-r from-transparent to-slate-500"
      />
      <span className="whitespace-nowrap px-1 text-slate-700 dark:text-slate-200">
        {children}
      </span>
      <span
        aria-hidden="true"
        className="h-px flex-1 bg-gradient-to-l from-transparent to-slate-500"
      />
    </div>
  )
}
