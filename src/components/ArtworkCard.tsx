import { useState } from 'react'
import { X } from 'lucide-react'

type Props = { title: string; category: string; description: string; file: string }

export default function ArtworkCard({ title, category, description, file }: Props) {
  const [expanded, setExpanded] = useState(false)
  const [missing, setMissing] = useState(false)
  return <>
    <button className="artwork-card" onClick={() => setExpanded(true)} aria-label={`Preview ${title}`}>
      {missing ? <div className="art-placeholder"><span>✧</span><small>Add artwork image</small><code>{file}</code></div> : <img src={file} alt={title} onError={() => setMissing(true)} />}
      <span className="artwork-caption"><strong>{title}</strong><small>{category}</small></span>
    </button>
    {expanded && <div className="lightbox" role="dialog" aria-modal="true" aria-label={title} onClick={() => setExpanded(false)}>
      <button className="lightbox-close" onClick={() => setExpanded(false)} aria-label="Close preview"><X size={22} /></button>
      <div className="lightbox-content" onClick={e => e.stopPropagation()}>
        {missing ? <div className="art-placeholder large"><span>✧</span><small>Artwork image goes here</small><code>{file}</code></div> : <img src={file} alt={title} />}
        <div><span className="eyebrow">{category}</span><h2>{title}</h2><p>{description}</p></div>
      </div>
    </div>}
  </>
}
