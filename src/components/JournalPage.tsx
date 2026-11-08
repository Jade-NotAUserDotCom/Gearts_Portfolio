import { motion } from 'framer-motion'
import type { JournalPage as PageData } from '../data/pages'
import ArtworkCard from './ArtworkCard'

export default function JournalPage({ page, side }: { page: PageData; side: 'left' | 'right' }) {
  return <motion.article className={`paper-page ${side}`} initial={{ opacity: 0.65 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}>
    <div className="page-inner">
      <span className="eyebrow">{page.eyebrow}</span>
      <h2>{page.title}</h2>
      {page.body && <p className="page-body">{page.body}</p>}
      {page.artworks && <div className={`artwork-grid ${page.artworks.length === 1 ? 'single' : ''}`}>
        {page.artworks.map(art => <ArtworkCard key={art.title} {...art} />)}
      </div>}
      <div className="page-flourish" aria-hidden="true">✦　✧　✦</div>
    </div>
    <span className="page-number">{page.id}</span>
  </motion.article>
}
