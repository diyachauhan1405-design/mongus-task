import { Icon } from './ui.jsx';

const MONITOR = [
  { to: '#/dashboard', label: 'Dashboard', icon: 'dashboard', match: 'dashboard' },
  { to: '#/dashboard', label: 'Live Tickets', icon: 'ticket', count: 15 },
  { to: '#/workers', label: 'Workers & Enforcement', icon: 'workers', match: 'workers' },
  { to: '#/workers/assign/RA-2026-006', label: 'Fleet & Dispatch', icon: 'truck' },
  { to: '#/dashboard', label: '311 Grievances', icon: 'grievance-311', count: 8, warn: true },
];
const MANAGE = [
  { to: '#/dashboard', label: 'Zones Map', icon: 'zones-map' },
  { to: '#/dashboard', label: 'Reports', icon: 'reports' },
  { to: '#/dashboard', label: 'Settings', icon: 'settings' },
];

export default function Sidebar({ section, open, onNavigate }) {
  const item = (it) => {
    const active = it.match === section;
    return (
      <a
        key={it.label}
        href={it.to}
        className={`nav__item${active ? ' is-active' : ''}`}
        aria-current={active ? 'page' : undefined}
        onClick={onNavigate}
      >
        <Icon name={it.icon} />
        <span>{it.label}</span>
        {it.count != null && <span className={`nav__count${it.warn ? ' nav__count--warn' : ''}`}>{it.count}</span>}
      </a>
    );
  };

  return (
    <aside className={`sidebar${open ? ' is-open' : ''}`} aria-label="Main navigation">
      <div className="brand">
        <span className="brand__mark"><Icon name="plant" size={22} strokeWidth={2.2} /></span>
        <div>
          <div className="brand__name">Magnus</div>
          <div className="brand__sub">Green Infra · Ops</div>
        </div>
      </div>

      <button className="zone-switch" type="button">
        <span className="live-dot" />
        <span style={{ flex: 1 }}>Live · Noida Zone 3</span>
        <Icon name="chevron-down" size={16} />
      </button>

      <nav className="nav">
        <span className="nav__label">Monitor</span>
        {MONITOR.map(item)}
        <span className="nav__label" style={{ paddingTop: 16 }}>Manage</span>
        {MANAGE.map(item)}
      </nav>

      <div className="user-card">
        <span className="avatar">AK</span>
        <div>
          <div style={{ fontWeight: 600 }}>Arjun Kapoor</div>
          <div className="user-card__role">Operations Manager</div>
        </div>
      </div>
    </aside>
  );
}
