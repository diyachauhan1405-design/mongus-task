import { useEffect, useRef, useState } from 'react';
import { Badge, Icon, Plate } from '../components/ui.jsx';
import { DEFAULT_SITE, EVIDENCE, PLANTS, SITES, TEAMS, VEHICLES } from '../data.js';

export default function AssignDrawer({ ticketId, workers, onDispatch, onClose }) {
  const site = SITES[ticketId] || DEFAULT_SITE;
  const worker = workers.find((w) => w.ticket === ticketId);
  const alreadyMoving = worker && worker.status !== 'Unassigned';

  const [team, setTeam] = useState(TEAMS.find((t) => t.best).id);
  const [veh, setVeh] = useState(VEHICLES[0].plate);
  const [plant, setPlant] = useState(PLANTS[0]);
  const [note, setNote] = useState('');
  const [done, setDone] = useState(false);
  const panel = useRef(null);

  const teamObj = TEAMS.find((t) => t.id === team);
  const vehObj = VEHICLES.find((v) => v.plate === veh);
  const status = done || alreadyMoving ? (worker?.status === 'Done' ? 'Done' : 'In-Progress') : 'Pending';
  const step = done ? 3 : 2; // 0 review, 1 team, 2 dispatch

  // Modal behaviour: focus the panel, close on Escape, lock page scroll.
  useEffect(() => {
    panel.current?.focus();
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = prev; };
  }, [onClose]);

  const submit = () => {
    onDispatch(ticketId, teamObj, vehObj, { plant, note });
    setDone(true);
  };

  return (
    <>
      <div className="scrim" onClick={onClose} />
      <section ref={panel} tabIndex={-1} className="drawer" role="dialog" aria-modal="true" aria-labelledby="dlg-title">
        <header className="drawer__head">
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span className="eyebrow">Assign &amp; dispatch</span>
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12 }}>
                <h2 id="dlg-title" className="ticket-id">{ticketId}</h2>
                <Badge status={status} />
              </div>
            </div>
            <button className="btn btn--secondary btn--icon" aria-label="Close" onClick={onClose}><Icon name="close" /></button>
          </div>
          <div className="meta">
            <span>{site.kind}</span>
            <span>Raised {site.raised}</span>
            <span className="meta--alert"><Icon name="clock-sla" size={14} strokeWidth={2.2} />SLA {site.sla} left</span>
          </div>
          <ol className="steps" aria-label="Progress">
            {['Review evidence', 'Pick team', 'Dispatch'].map((s, i) => (
              <li key={s} className={i < step ? 'is-done' : i === step ? 'is-current' : ''} aria-current={i === step ? 'step' : undefined}>{s}</li>
            ))}
          </ol>
        </header>

        <div className="drawer__body">
          <section className="section" aria-labelledby="h-site">
            <h3 id="h-site" className="h3">Site &amp; request</h3>
            <div className="site">
              <div className="map" role="img" aria-label={`Map pin at ${site.gps}`}>
                <svg style={{ position: 'absolute', inset: 0 }} width="100%" height="100%" viewBox="0 0 200 150" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M0 100 L200 70" stroke="#fff" strokeWidth="8" /><path d="M70 0 L95 150" stroke="#fff" strokeWidth="6" /><path d="M140 0 L150 150" stroke="#fff" strokeWidth="4" />
                </svg>
                <span className="map__pin" />
                <span className="map__gps">{site.gps}</span>
              </div>
              <div className="site__info">
                <div className="kv"><small>Pickup address</small><b>{site.address}</b></div>
                <div className="kv"><small>Contact</small><b>{site.contact}</b></div>
                <div style={{ display: 'flex', gap: 16 }}>
                  <div className="kv"><small>Material</small><b>{site.material}</b></div>
                  <div className="kv"><small>Est. load</small><b>{site.load}</b></div>
                </div>
              </div>
            </div>
          </section>

          <section className="section" aria-labelledby="h-ev">
            <div className="section__head">
              <h3 id="h-ev" className="h3">Uploaded evidence <span className="muted" style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: 14 }}>· 5 photos</span></h3>
              <span className="badge badge--done">Geo-tag verified</span>
            </div>
            <div className="photos">
              {EVIDENCE.map((p) => (
                <button key={p.label} className="photo" style={{ background: p.tone }} aria-label={`Open photo: ${p.label}`}>
                  [{p.label}]
                  <span className="photo__stamp">{p.gps}<br />{p.time}</span>
                </button>
              ))}
              <button className="photo photo--more" aria-label="View 3 more photos"><b>+3</b><span style={{ fontSize: 12, color: '#B4BEDA' }}>View all</span></button>
            </div>
          </section>

          <section className="section" aria-labelledby="h-team">
            <div className="section__head">
              <h3 id="h-team" className="h3">Assign field team</h3>
              <span className="muted" style={{ fontSize: 13 }}>Sorted by distance</span>
            </div>
            <div role="radiogroup" aria-labelledby="h-team" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {TEAMS.map((t) => (
                <label key={t.id} className={`option${team === t.id ? ' is-selected' : ''}`}>
                  <input type="radio" name="team" checked={team === t.id} onChange={() => setTeam(t.id)} disabled={done} />
                  <span className="stack">
                    <span className="avatar av-0">{t.initials[0]}</span>
                    <span className="avatar av-1">{t.initials[1]}</span>
                    <span className="avatar" style={{ background: 'var(--offwhite)', color: 'var(--slate-700)' }}>+{t.more}</span>
                  </span>
                  <span className="cell-stack" style={{ flex: 1, minWidth: 0 }}>
                    <span style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>{t.name}{t.best && <span className="tag">Best match</span>}</span>
                    <small style={{ fontSize: 13 }}>Lead: {t.lead} · {t.jobs}</small>
                  </span>
                  <span className="nowrap" style={{ fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Icon name="map-pin" size={14} className="muted" />{t.km}
                  </span>
                </label>
              ))}
            </div>
          </section>

          <section className="section" aria-labelledby="h-veh">
            <h3 id="h-veh" className="h3">Dispatch vehicle</h3>
            <div className="vehicles" role="radiogroup" aria-labelledby="h-veh">
              {VEHICLES.map((v) => (
                <label key={v.plate} className={`option${veh === v.plate ? ' is-selected' : ''}${v.unavailable ? ' is-disabled' : ''}`}>
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <input type="radio" name="veh" checked={veh === v.plate} disabled={v.unavailable || done} onChange={() => setVeh(v.plate)} />
                    <span className={`avail${v.unavailable ? ' avail--off' : ''}`}>{v.unavailable ? 'In service' : 'Available'}</span>
                  </span>
                  <span style={{ alignSelf: 'flex-start' }}><Plate no={v.plate} /></span>
                  <span style={{ fontSize: 13, color: 'var(--slate-700)' }}>{v.kind}</span>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>{v.eta}</span>
                </label>
              ))}
            </div>
            <label className="label">
              Destination plant
              <span className="select">
                <select value={plant} onChange={(e) => setPlant(e.target.value)} disabled={done} style={{ height: 48 }}>
                  {PLANTS.map((p) => <option key={p}>{p}</option>)}
                </select>
                <Icon name="chevron-down" size={16} />
              </span>
            </label>
            <label className="label">
              <span>Note for field team <span className="muted" style={{ fontWeight: 400 }}>(optional)</span></span>
              <textarea rows={2} placeholder="e.g. Use the rear gate on Block C service road" value={note} onChange={(e) => setNote(e.target.value)} disabled={done} />
            </label>
          </section>
        </div>

        <footer className="drawer__foot">
          {done ? (
            <div className="success" role="status">
              <span className="success__icon"><Icon name="check" strokeWidth={3} /></span>
              <div className="cell-stack" style={{ flex: 1 }}>
                <strong>Dispatched · {teamObj.name}</strong>
                <span style={{ fontSize: 13 }}>{veh} is on the way. Field team notified by SMS &amp; app.</span>
              </div>
              <a href="#/workers" onClick={(e) => { e.preventDefault(); onClose(); }}>Done</a>
            </div>
          ) : (
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12 }}>
              <div className="cell-stack muted" style={{ flex: '1 1 200px', fontSize: 13 }}>
                <span>Sending <strong style={{ color: 'var(--navy-900)' }}>{teamObj.name}</strong></span>
                <span>in <strong className="mono" style={{ color: 'var(--navy-900)' }}>{veh}</strong></span>
              </div>
              <button className="btn btn--secondary" style={{ height: 48 }} onClick={onClose}>Cancel</button>
              <button className="btn btn--primary" style={{ height: 48, padding: '0 24px', fontSize: 15 }} onClick={submit}>
                {alreadyMoving ? 'Re-dispatch' : 'Assign & dispatch'} <Icon name="dispatch" />
              </button>
            </div>
          )}
        </footer>
      </section>
    </>
  );
}
