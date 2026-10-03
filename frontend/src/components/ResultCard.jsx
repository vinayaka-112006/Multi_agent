import { ChevronDown, ChevronUp, Copy, Check, FileText } from 'lucide-react'
import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function ResultCard({ title, content, icon: Icon = FileText, defaultOpen = false, className = '' }) {
  const [open, setOpen] = useState(defaultOpen)
  const [copied, setCopied] = useState(false)
  async function copy() { try { await navigator.clipboard.writeText(content || ''); setCopied(true); setTimeout(() => setCopied(false), 1600) } catch {} }
  return <section className={`result-card ${className}`}><button className="result-head" onClick={() => setOpen(!open)} aria-expanded={open}><span className="result-title"><span className="result-icon"><Icon size={17} /></span>{title}</span><span className="result-actions">{open && content && <span className="copy-link" role="button" tabIndex={0} onClick={e => { e.stopPropagation(); copy() }} onKeyDown={e => { if (e.key === 'Enter') { e.stopPropagation(); copy() } }}>{copied ? <Check size={14} /> : <Copy size={14} />}{copied ? 'Copied' : 'Copy'}</span>}{open ? <ChevronUp size={17} /> : <ChevronDown size={17} />}</span></button>{open && <div className="result-content markdown"><ReactMarkdown remarkPlugins={[remarkGfm]}>{content || 'No content returned.'}</ReactMarkdown></div>}</section>
}
