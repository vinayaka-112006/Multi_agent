import { Atom, Moon, Sun } from 'lucide-react'

export default function Header({ light, setLight, online }) {
  return <header className="topbar"><div className="brand"><div className="brand-icon"><Atom size={20} /></div><div><strong>ResearchFlow <span>AI</span></strong><small>Multi-Agent Research Assistant</small></div></div><div className="top-actions"><div className="backend"><i className={online ? 'dot online' : 'dot'} />{online ? 'Backend connected' : 'Backend offline'}</div><button className="icon-button" onClick={() => setLight(!light)} aria-label="Toggle color theme">{light ? <Moon size={17} /> : <Sun size={17} />}</button></div></header>
}
