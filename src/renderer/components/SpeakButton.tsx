import { useTTS } from '../hooks/useTTS'

interface Props {
  text: string
  size?: 'sm' | 'md'
  className?: string
}

export default function SpeakButton({ text, size = 'sm', className = '' }: Props) {
  const { speak } = useTTS()
  const dim = size === 'sm' ? 'w-7 h-7' : 'w-9 h-9'
  const icon = size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'

  return (
    <button
      type="button"
      title="Listen"
      onClick={(e) => { e.stopPropagation(); speak(text) }}
      className={`${dim} rounded-lg border border-[--color-border] bg-[--color-muted]
                  flex items-center justify-center cursor-pointer shrink-0
                  hover:border-[--color-primary] hover:text-[--color-primary]
                  text-[--color-text-muted] transition-colors ${className}`}
    >
      <svg className={icon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
      </svg>
    </button>
  )
}
