import React, { useEffect, useState } from 'react'
import type { UserProgress } from '@shared/types'

interface Props {
  chapterId: number
}

export default function Progress({ chapterId }: Props) {
  const [progress, setProgress] = useState<UserProgress[]>([])

  useEffect(() => {
    window.api.getProgress(chapterId).then(setProgress)
  }, [chapterId])

  if (progress.length === 0) {
    return <p className="text-sm text-gray-400">No attempts yet.</p>
  }

  return (
    <div className="space-y-2">
      {progress.map((p) => (
        <div key={p.id} className="flex justify-between text-sm text-gray-600">
          <span>{new Date(p.completedAt).toLocaleDateString()}</span>
          <span className="font-medium">{p.score}%</span>
        </div>
      ))}
    </div>
  )
}
