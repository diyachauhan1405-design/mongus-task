import { useCallback, useEffect, useState } from 'react';
import Sidebar from './components/Sidebar.jsx';
import { Icon } from './components/ui.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Directory from './pages/Directory.jsx';
import AssignDrawer from './pages/AssignDrawer.jsx';
import { TICKETS, WORKERS } from './data.js';

/** Tiny hash router: #/dashboard, #/workers, #/workers/assign/:ticketId */
function useRoute() {
  const read = () => (window.location.hash.replace(/^#\/?/, '') || 'dashboard').split('/');
  const [parts, setParts] = useState(read);
  useEffect(() => {
    const on = () => setParts(read());
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  return parts;
}

export default function App() {
  const [section, sub, ticketId] = useRoute();
  const [workers, setWorkers] = useState(WORKERS);
  const [tickets, setTickets] = useState(TICKETS);
  const [menuOpen, setMenuOpen] = useState(false);
  const [toast, setToast] = useState('');

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(''), 3200);
    return () => clearTimeout(t);
  }, [toast]);

  // Dispatching moves the ticket (and the worker holding it) to In-Progress.
  const dispatch = useCallback((id, team, vehicle) => {
    setWorkers((ws) => ws.map((w) => (w.ticket === id ? { ...w, status: 'In-Progress', vehicle: vehicle.plate } : w)));
    setTickets((ts) => ts.map((t) => (t.id === id ? { ...t, status: 'In-Progress', time: 'just now' } : t)));
    setToast(`${team.name} dispatched in ${vehicle.plate}`);
  }, []);

  // Stable so the drawer's focus/Escape effect runs once per open.
  const closeDrawer = useCallback(() => { window.location.hash = '#/workers'; }, []);

  const page = section === 'workers' ? 'workers' : 'dashboard';
  const assignOpen = page === 'workers' && sub === 'assign';

  return (
    <div className="shell">
      <div className="mobilebar">
        <button aria-label="Open menu" onClick={() => setMenuOpen(true)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>
        <strong style={{ fontFamily: 'var(--font-display)', fontSize: 18 }}>Magnus Ops</strong>
      </div>
      {menuOpen && <div className="scrim" style={{ zIndex: 65 }} onClick={() => setMenuOpen(false)} />}
      <Sidebar section={page} open={menuOpen} onNavigate={() => setMenuOpen(false)} />

      <main className="main">
        {page === 'dashboard' ? <Dashboard tickets={tickets} /> : <Directory workers={workers} />}
      </main>

      {assignOpen && (
        <AssignDrawer
          ticketId={ticketId || 'RA-2026-006'}
          workers={workers}
          onDispatch={dispatch}
          onClose={closeDrawer}
        />
      )}

      {toast && (
        <div className="toast" role="status">
          <Icon name="check" size={16} /> {toast}
        </div>
      )}
    </div>
  );
}
