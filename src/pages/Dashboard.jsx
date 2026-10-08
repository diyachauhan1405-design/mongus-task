import { useMemo, useState } from 'react';
import { Avatar, Badge, Icon, PageHeader, Segmented, initials } from '../components/ui.jsx';
import { KPIS, MATERIALS } from '../data.js';

function KpiCard({ k }) {
  return (
    <article className={`card kpi${k.highlight ? ' card--dark' : ''}`}>
      <div className="kpi__top">
        <span className="kpi__label">{k.label}</span>
        <span className={`kpi__icon${k.tone === 'alert' ? ' kpi__icon--alert' : ''}`}><Icon name={k.icon} size={16} /></span>
      </div>
      <span className="kpi__value">{k.value}</span>
      <div className="kpi__bottom">
        <span className="trend">{k.dir === 'up' ? '▲' : '▼'} {k.trend}</span>
        {k.spark ? (
          <svg width="80" height="28" viewBox="0 0 80 28" fill="none" aria-hidden="true">
            <polyline points={k.spark} stroke={k.highlight ? 'var(--indigo-300)' : 'var(--indigo-500)'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : <span className="muted" style={{ fontSize: 12 }}>{k.note}</span>}
      </div>
    </article>
  );
}

function Donut({ data }) {
  const total = data.reduce((s, d) => s + d.tonnes, 0);
  const C = 2 * Math.PI * 70;
  let offset = 0;
  return (
    <div className="donut">
      <svg width="200" height="200" viewBox="0 0 200 200" role="img"
        aria-label={`${total} tonnes by material: ${data.map((d) => `${d.name} ${d.tonnes}`).join(', ')}`}>
        <g transform="rotate(-90 100 100)" fill="none" strokeWidth="24">
          {data.map((d) => {
            const len = (d.tonnes / total) * C;
            const seg = <circle key={d.name} cx="100" cy="100" r="70" stroke={d.color} strokeDasharray={`${len - 3} ${C}`} strokeDashoffset={-offset} />;
            offset += len;
            return seg;
          })}
        </g>
      </svg>
      <div className="donut__center">
        <span className="donut__value">{total}</span>
        <span className="muted" style={{ fontSize: 12 }}>Tonnes processed</span>
      </div>
    </div>
  );
}

const FILTERS = ['All', 'Pending', 'In-Progress', 'Done'];

export default function Dashboard({ tickets }) {
  const [filter, setFilter] = useState('All');
  const [range, setRange] = useState('Today');
  const [query, setQuery] = useState('');
  const total = MATERIALS.reduce((s, d) => s + d.tonnes, 0);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return tickets.filter((t) => (filter === 'All' || t.status === filter) &&
      (!q || `${t.id} ${t.who} ${t.loc}`.toLowerCase().includes(q)));
  }, [tickets, filter, query]);
  const count = (s) => (s === 'All' ? tickets.length : tickets.filter((t) => t.status === s).length);

  return (
    <>
      <PageHeader eyebrow="Wed, 7 Oct 2026 · Updated 12 sec ago" title="Operations overview">
        <label className="field" style={{ flex: '0 1 320px' }}>
          <Icon name="search" className="muted" />
          <span className="sr-only">Search tickets</span>
          <input type="search" placeholder="Search ticket, worker, vehicle…" value={query} onChange={(e) => setQuery(e.target.value)} />
          <span className="kbd">⌘K</span>
        </label>
        <Segmented label="Date range" options={['Today', '7D', '30D']} value={range} onChange={setRange} />
        <button className="btn btn--secondary btn--icon" aria-label="Notifications" style={{ position: 'relative' }}>
          <Icon name="bell" />
          <span style={{ position: 'absolute', top: 10, right: 11, width: 8, height: 8, borderRadius: '50%', background: 'var(--alert-dot)', border: '2px solid #fff' }} />
        </button>
      </PageHeader>

      <section className="kpis" aria-label="Key metrics">
        {KPIS.map((k) => <KpiCard key={k.id} k={k} />)}
      </section>

      <div className="split">
        <section className="card split__main" aria-labelledby="live-title">
          <div className="card__head">
            <div style={{ flex: '1 1 220px', display: 'flex', alignItems: 'center', gap: 12 }}>
              <h2 id="live-title" className="h2">Live ticket activity</h2>
              <span className="badge badge--live">LIVE</span>
            </div>
            <div role="tablist" aria-label="Filter by status" style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {FILTERS.map((f) => (
                <button key={f} role="tab" className="chip" aria-selected={f === filter} onClick={() => setFilter(f)}>
                  {f} <span>{count(f)}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="table-wrap">
            <table className="table" style={{ minWidth: 760 }}>
              <thead>
                <tr><th>Ticket</th><th>Category</th><th>Location</th><th>Assigned to</th><th>Updated</th><th>Status</th></tr>
              </thead>
              <tbody>
                {rows.map((t, i) => (
                  <tr key={t.id}>
                    <td className="mono nowrap" style={{ fontWeight: 600, fontSize: 13 }}>{t.id}</td>
                    <td>{t.type}</td>
                    <td><div className="cell-stack"><span style={{ fontWeight: 500 }}>{t.loc}</span><small>{t.zone}</small></div></td>
                    <td><div className="person"><span className={`avatar av-${i % 2}`}>{initials(t.who)}</span>{t.who}</div></td>
                    <td className="muted nowrap">{t.time}</td>
                    <td><Badge status={t.status} /></td>
                  </tr>
                ))}
                {rows.length === 0 && (
                  <tr><td colSpan={6} className="muted" style={{ textAlign: 'center', padding: 32 }}>No tickets match.</td></tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="card__foot">
            <span>Showing {rows.length} of {total} open tickets today</span>
            <a href="#/workers" style={{ fontWeight: 600 }}>View all tickets →</a>
          </div>
        </section>

        <aside className="split__aside">
          <section className="card" style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 20 }} aria-labelledby="ops-title">
            <div className="section__head">
              <h2 id="ops-title" className="h2">Operations summary</h2>
              <span className="muted" style={{ fontSize: 12 }}>{range}</span>
            </div>
            <Donut data={MATERIALS} />
            <div className="legend">
              {MATERIALS.map((m) => (
                <div key={m.name} className="legend__item">
                  <span className="legend__swatch" style={{ background: m.color }} />
                  <div className="cell-stack">
                    <span className="muted" style={{ fontSize: 13 }}>{m.name}</span>
                    <strong>{m.tonnes} T · {Math.round((m.tonnes / total) * 100)}%</strong>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="card card--dark" style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }} aria-labelledby="fleet-title">
            <div className="section__head">
              <h2 id="fleet-title" className="h3">Fleet on road</h2>
              <a href="#/workers/assign/RA-2026-006" style={{ color: 'var(--indigo-300)', fontWeight: 600, fontSize: 13 }}>Dispatch →</a>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <span className="kpi__value">42</span>
              <span style={{ color: '#B4BEDA' }}>of 56 vehicles active</span>
            </div>
            <div className="progress" role="progressbar" aria-valuenow={75} aria-valuemin={0} aria-valuemax={100}><span style={{ width: '75%' }} /></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, fontSize: 13, color: '#B4BEDA' }}>
              <span>9 idle</span><span>5 in service</span><span>Avg load 21.4 MT</span>
            </div>
          </section>
        </aside>
      </div>
    </>
  );
}
