import { useMemo, useState } from 'react';
import { Avatar, Badge, Icon, PageHeader, Plate, Segmented, Select } from '../components/ui.jsx';
import { AFFILIATIONS, ZONES } from '../data.js';

const STATUSES = ['All', 'Unassigned', 'In-Progress', 'Done'];
const CAPACITY_MT = 25;

/** Excel opens CSV directly; BOM keeps Excel happy with UTF-8. */
function exportCsv(rows) {
  const head = ['Worker ID', 'Name', 'Role', 'Affiliation', 'Zone', 'Area', 'Ticket', 'Vehicle', 'Weight (MT)', 'Status'];
  const esc = (v) => `"${String(v).replace(/"/g, '""')}"`;
  const body = rows.map((w) => [w.id, w.name, w.role, w.aff, w.zone, w.area, w.ticket, w.vehicle, w.weight || '', w.status].map(esc).join(','));
  const blob = new Blob(['﻿' + [head.map(esc).join(','), ...body].join('\r\n')], { type: 'text/csv;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `workers-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(a.href);
}

export default function Directory({ workers }) {
  const [q, setQ] = useState('');
  const [aff, setAff] = useState('');
  const [zone, setZone] = useState('');
  const [status, setStatus] = useState('All');
  const [selected, setSelected] = useState(() => new Set(['MGW-0142', 'MGW-0219']));

  const rows = useMemo(() => {
    const s = q.trim().toLowerCase();
    return workers.filter((w) =>
      (status === 'All' || w.status === status) &&
      (!aff || w.aff === aff) &&
      (!zone || w.zone === zone) &&
      (!s || `${w.id} ${w.name} ${w.vehicle} ${w.ticket}`.toLowerCase().includes(s)));
  }, [workers, q, aff, zone, status]);

  const onDuty = workers.filter((w) => w.status === 'In-Progress').length;
  const waiting = workers.filter((w) => w.status === 'Unassigned').length;
  const allSelected = rows.length > 0 && rows.every((r) => selected.has(r.id));
  const toggle = (id) => setSelected((prev) => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const toggleAll = () => setSelected((prev) => {
    const n = new Set(prev);
    rows.forEach((r) => (allSelected ? n.delete(r.id) : n.add(r.id)));
    return n;
  });
  const clear = () => { setQ(''); setAff(''); setZone(''); setStatus('All'); };
  const firstSelectedTicket = workers.find((w) => selected.has(w.id) && w.status === 'Unassigned')?.ticket;

  return (
    <>
      <PageHeader eyebrow="Manage / Workers & Enforcement" title="Worker directory">
        <div className="actions">
          <button className="btn btn--secondary" onClick={() => exportCsv(rows)}>
            <Icon name="export-excel" size={16} style={{ color: 'var(--done-fg)' }} /> Export Excel
          </button>
          <button className="btn btn--secondary" onClick={() => window.print()}>
            <Icon name="print" size={16} /> Print
          </button>
          <a className="btn btn--primary" href="#/workers/assign/RA-2026-006">
            <Icon name="plus" size={16} /> New assignment
          </a>
        </div>
      </PageHeader>

      <section className="stats" aria-label="Workforce summary">
        <div className="card stat"><span className="stat__bar" style={{ background: 'var(--navy-900)' }} /><div className="cell-stack"><span className="kpi__label">Total workers</span><span className="stat__value">1,126</span></div></div>
        <div className="card stat"><span className="stat__bar" style={{ background: 'var(--indigo-500)' }} /><div className="cell-stack"><span className="kpi__label">On duty now</span><span className="stat__value">864</span></div></div>
        <div className="card stat"><span className="stat__bar" style={{ background: 'var(--pending-dot)' }} /><div className="cell-stack"><span className="kpi__label">Awaiting assignment</span><span className="stat__value">{waiting} tickets</span></div></div>
        <div className="card stat stat--accent"><span className="stat__bar" style={{ background: 'var(--navy-900)' }} /><div className="cell-stack"><span className="kpi__label">Hauled today</span><span className="stat__value">924 MT</span></div></div>
      </section>

      <section className="card" aria-label="Workers table">
        <div className="filters">
          <label className="field field--muted">
            <Icon name="search" className="muted" />
            <span className="sr-only">Search by ID, worker or vehicle</span>
            <input type="search" placeholder="Search by ID, worker or vehicle no." value={q} onChange={(e) => setQ(e.target.value)} />
          </label>
          <Select label="Affiliation" value={aff} onChange={setAff} options={AFFILIATIONS} allLabel="All affiliations" />
          <Select label="Zone" value={zone} onChange={setZone} options={ZONES} allLabel="All zones" />
          <Segmented label="Status" options={STATUSES} value={status} onChange={setStatus} />
        </div>

        <div className="summary">
          <span><strong>{rows.length}</strong> workers match</span>
          <span className="dot-sep" />
          <span>Sorted by last activity · {onDuty} in progress</span>
          <span style={{ marginLeft: 'auto' }}>
            {selected.size} selected
            {firstSelectedTicket && <> · <a href={`#/workers/assign/${firstSelectedTicket}`} style={{ fontWeight: 600 }}>Bulk assign</a></>}
          </span>
        </div>

        <div className="table-wrap">
          <table className="table" style={{ minWidth: 1040 }}>
            <thead>
              <tr>
                <th style={{ width: 24 }}><input type="checkbox" className="checkbox" aria-label="Select all" checked={allSelected} onChange={toggleAll} /></th>
                <th>Worker</th><th>Affiliation</th><th>Zone</th><th>Assignment</th><th>Vehicle</th><th>Weight</th><th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((w, i) => {
                const pct = Math.min(100, Math.round((w.weight / CAPACITY_MT) * 100));
                const open = w.status === 'Unassigned';
                return (
                  <tr key={w.id} className={selected.has(w.id) ? 'is-selected' : undefined}>
                    <td><input type="checkbox" className="checkbox" aria-label={`Select ${w.name}`} checked={selected.has(w.id)} onChange={() => toggle(w.id)} /></td>
                    <td>
                      <div className="person">
                        <Avatar name={w.name} index={i} />
                        <div className="cell-stack">
                          <span style={{ fontWeight: 600 }}>{w.name}</span>
                          <small className="mono nowrap">{w.id} · {w.role}</small>
                        </div>
                      </div>
                    </td>
                    <td>{w.aff}</td>
                    <td><div className="cell-stack nowrap"><span style={{ fontWeight: 500 }}>{w.zone}</span><small>{w.area}</small></div></td>
                    <td className="mono nowrap" style={{ fontWeight: 600, fontSize: 13 }}>{w.ticket}</td>
                    <td><Plate no={w.vehicle} /></td>
                    <td>
                      <div className="weight">
                        <span>{w.weight ? `${w.weight.toFixed(2)} MT` : '—'}</span>
                        <span className="weight__track"><span className={`weight__bar${pct > 85 ? ' is-heavy' : ''}`} style={{ width: `${pct}%` }} /></span>
                      </div>
                    </td>
                    <td><Badge status={w.status} /></td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: 6 }}>
                        <a className={`btn btn--sm ${open ? 'btn--primary' : 'btn--secondary'}`} href={`#/workers/assign/${w.ticket}`}>{open ? 'Assign' : 'View'}</a>
                        <button className="btn btn--secondary btn--sm btn--icon" aria-label={`More actions for ${w.name}`}><Icon name="more" size={16} /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {rows.length === 0 && (
          <div className="empty" role="status">
            <span className="empty__icon"><Icon name="search" size={24} /></span>
            <strong className="h3">No workers match these filters</strong>
            <span className="muted" style={{ maxWidth: 360 }}>Try another ID, worker name or vehicle number, or clear the filters to see everyone.</span>
            <button className="btn btn--secondary" onClick={clear}>Clear filters</button>
          </div>
        )}

        <div className="card__foot">
          <span>Rows per page: <strong style={{ color: 'var(--navy-900)' }}>10</strong></span>
          <nav className="pager" aria-label="Pagination">
            <button className="pager__edge" aria-label="Previous page"><Icon name="chevron-right" size={16} style={{ transform: 'rotate(180deg)' }} /></button>
            <button aria-current="page">1</button><button>2</button><button>3</button>
            <span style={{ padding: '0 6px' }}>…</span><button>113</button>
            <button className="pager__edge" aria-label="Next page"><Icon name="chevron-right" size={16} /></button>
          </nav>
        </div>
      </section>
    </>
  );
}
