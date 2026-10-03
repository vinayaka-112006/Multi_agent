import { useEffect, useState } from 'react'
import { AlertCircle, Download, FileSearch, FileText, MessageSquareQuote } from 'lucide-react'
import Header from './components/Header.jsx'
import ResearchInput from './components/ResearchInput.jsx'
import AgentPipeline from './components/AgentPipeline.jsx'
import ResultCard from './components/ResultCard.jsx'

const API = import.meta.env.VITE_API_URL || 'http://localhost:8000'
const wait = ms => new Promise(resolve => setTimeout(resolve, ms))

export default function App() {
  const [topic, setTopic] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [active, setActive] = useState(-1)
  const [error, setError] = useState('')
  const [online, setOnline] = useState(false)
  const [light, setLight] = useState(false)

  useEffect(() => { fetch(`${API}/health`).then(r => setOnline(r.ok)).catch(() => setOnline(false)) }, [])

  async function submit(e) {
    e.preventDefault()
    const cleanTopic = topic.trim()
    if (cleanTopic.length < 3 || loading) return
    setLoading(true); setError(''); setResult(null); setActive(0)
    let stage = 0
    const timer = setInterval(() => { stage = Math.min(stage + 1, 3); setActive(stage) }, 12000)
    try {
      const response = await fetch(`${API}/research`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ topic: cleanTopic }) })
      const data = await response.json()
      if (!response.ok) throw new Error(data.detail || 'The research request could not be completed.')
      setResult(data); setActive(3)
      await wait(500)
      setActive(4)
    } catch (err) { setError(err.message || 'Could not connect to the research backend.'); setActive(Math.min(stage, 3)) }
    finally { clearInterval(timer); setLoading(false) }
  }

  function downloadReport() {
    const file = new Blob([`# ${result.topic}\n\n${result.report}\n\n## Critic feedback\n\n${result.feedback}`], { type: 'text/markdown' })
    const url = URL.createObjectURL(file); const link = document.createElement('a'); link.href = url; link.download = 'research-report.md'; link.click(); URL.revokeObjectURL(url)
  }

  const completed = Boolean(result && !loading && !error)
  return <div className={`app-shell ${light ? 'light' : ''}`}><Header light={light} setLight={setLight} online={online} /><main><ResearchInput topic={topic} setTopic={setTopic} onSubmit={submit} loading={loading} />
    {(loading || active >= 0 || result) && <AgentPipeline active={active} complete={completed} error={Boolean(error)} />}
    {error && <div className="error-card"><AlertCircle size={20} /><div><strong>Research couldn’t finish</strong><p>{error}</p><small>Check that the FastAPI backend is running at {API}.</small></div></div>}
    {result && <section className="results"><div className="section-heading result-summary"><div><span className="eyebrow">RESEARCH COMPLETE</span><h2>{result.topic}</h2></div><div className="summary-meta"><span><b>4</b> agents</span><span className="complete-pill"><i /> Completed</span></div></div>
      <section className="report-panel"><div className="report-top"><div><span className="report-label"><FileText size={15} /> FINAL RESEARCH REPORT</span><h2>Your research brief</h2></div><button className="secondary-button" onClick={downloadReport}><Download size={15} /> Download .md</button></div><div className="markdown report-body"><ReactMarkdownShim content={result.report} /></div></section>
      <section className="feedback-panel"><div className="feedback-title"><MessageSquareQuote size={17} /><h3>Critic’s review</h3></div><div className="markdown"><ReactMarkdownShim content={result.feedback} /></div></section>
      <div className="sources-grid"><ResultCard title="Search results" content={result.search_results} icon={FileSearch} /><ResultCard title="Scraped content" content={result.scraped_content} icon={FileText} /></div>
    </section>}
    <footer><span>RESEARCHFLOW AI</span><span>Search · Read · Write · Critique</span></footer>
  </main></div>
}

function ReactMarkdownShim({ content }) {
  // Kept in a tiny component to share the exact same Markdown extensions in each result surface.
  return <MarkdownContent content={content} />
}
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
function MarkdownContent({ content }) { return <ReactMarkdown remarkPlugins={[remarkGfm]}>{content || ''}</ReactMarkdown> }
