import { ICONS } from '../icons.js';

/** Stroke icon from the Magnus Ops icon pack. Inherits text colour. */
export function Icon({ name, size = 18, strokeWidth = 2, label, ...rest }) {
  const paths = ICONS[name];
  if (!paths) return null;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      {...rest}
    >
      {paths.map((d, i) => <path key={i} d={d} />)}
    </svg>
  );
}

const slug = (s) => s.toLowerCase().replace(/[^a-z]+/g, '-');

/** Status badge — Pending | In-Progress | Done | Unassigned | alert */
export function Badge({ status, children }) {
  return <span className={`badge badge--${slug(status)}`}>{children ?? status}</span>;
}

/** Indian number plate, e.g. UP-16 GT-7390 */
export function Plate({ no }) {
  return (
    <span className="plate">
      <span className="plate__ind">IND</span>
      <span className="plate__no">{no}</span>
    </span>
  );
}

export const initials = (name) => name.split(' ').map((p) => p[0]).join('').slice(0, 2);

export function Avatar({ name, index = 0, text }) {
  return <span className={`avatar av-${index % 4}`}>{text ?? initials(name)}</span>;
}

/** Native select styled to match the kit (keeps keyboard + screen-reader behaviour). */
export function Select({ label, value, onChange, options, allLabel }) {
  return (
    <label className="select">
      <span className="sr-only">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {allLabel && <option value="">{allLabel}</option>}
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
      <Icon name="chevron-down" size={16} />
    </label>
  );
}

/** Segmented tabs, used for status filters. */
export function Segmented({ label, options, value, onChange }) {
  return (
    <div className="segmented" role="tablist" aria-label={label}>
      {options.map((o) => (
        <button key={o} role="tab" aria-selected={o === value} onClick={() => onChange(o)}>{o}</button>
      ))}
    </div>
  );
}

export function PageHeader({ eyebrow, title, children }) {
  return (
    <header className="page-head">
      <div className="page-head__text">
        <span className="page-head__eyebrow">{eyebrow}</span>
        <h1 className="h1">{title}</h1>
      </div>
      {children}
    </header>
  );
}
