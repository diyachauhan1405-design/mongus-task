// Mock data for the prototype. Replace with API calls when wiring a backend.

export const KPIS = [
  { id: 'assess', label: 'Assessment Requests', value: '1,284', trend: '12.4%', dir: 'up', icon: 'assessment', highlight: true, spark: '0,22 13,18 26,20 40,12 53,14 66,6 80,4' },
  { id: 'enforce', label: 'Enforcement Jobs', value: '342', trend: '4.1%', dir: 'up', icon: 'enforcement', spark: '0,18 13,20 26,14 40,16 53,12 66,13 80,9' },
  { id: 'ct', label: 'Collection & Transport', value: '618', trend: '8.7%', dir: 'up', icon: 'truck', spark: '0,20 13,16 26,18 40,10 53,12 66,8 80,7' },
  { id: 'griev', label: '311 Grievances', value: '96', trend: '6.2% fewer', dir: 'down-good', icon: 'grievance-311', tone: 'alert', spark: '0,6 13,8 26,7 40,12 53,14 66,18 80,20' },
  { id: 'workers', label: 'Total Workers', value: '1,126', trend: '2.3%', dir: 'up', icon: 'workers', note: '864 on duty' },
];

export const TICKETS = [
  { id: 'RA-2026-006', type: 'Assessment', loc: 'Sector 62, Block C', zone: 'Zone 3 · Noida', who: 'Ravi Sharma', time: '2 min ago', status: 'Pending' },
  { id: 'EJ-2026-118', type: 'Enforcement', loc: 'Sector 18 Market', zone: 'Zone 1 · Noida', who: 'Neha Verma', time: '6 min ago', status: 'In-Progress' },
  { id: 'CT-2026-431', type: 'Collection & Transport', loc: 'Sector 137 Expressway', zone: 'Zone 4 · Noida', who: 'Imran Khan', time: '11 min ago', status: 'Done' },
  { id: 'GR-311-0942', type: '311 Grievance', loc: 'Gaur City 2, Ave 4', zone: 'Zone 6 · Gr. Noida W', who: 'Pooja Yadav', time: '14 min ago', status: 'Pending' },
  { id: 'RA-2026-007', type: 'Assessment', loc: 'Sector 75, Plot 12', zone: 'Zone 3 · Noida', who: 'Amit Singh', time: '19 min ago', status: 'In-Progress' },
  { id: 'CT-2026-432', type: 'Collection & Transport', loc: 'Knowledge Park II', zone: 'Zone 7 · Gr. Noida', who: 'Sunil Kumar', time: '23 min ago', status: 'Done' },
  { id: 'EJ-2026-119', type: 'Enforcement', loc: 'Sector 50 Main Rd', zone: 'Zone 2 · Noida', who: 'Deepa Nair', time: '31 min ago', status: 'Pending' },
  { id: 'GR-311-0943', type: '311 Grievance', loc: 'Sector 104, Hajipur', zone: 'Zone 4 · Noida', who: 'Vikas Gupta', time: '38 min ago', status: 'Done' },
  { id: 'CT-2026-433', type: 'Collection & Transport', loc: 'Sector 15 Metro Station', zone: 'Zone 1 · Noida', who: 'Farhan Ali', time: '44 min ago', status: 'In-Progress' },
  { id: 'EJ-2026-120', type: 'Enforcement', loc: 'Sector 44 Commercial Hub', zone: 'Zone 2 · Noida', who: 'Kavya Rao', time: '52 min ago', status: 'Pending' },
  { id: 'RA-2026-008', type: 'Assessment', loc: 'Sector 128 Wish Town', zone: 'Zone 4 · Noida', who: 'Ravi Sharma', time: '1 hr ago', status: 'Done' },
  { id: 'GR-311-0944', type: '311 Grievance', loc: 'Alpha 1 Commercial Belt', zone: 'Zone 7 · Gr. Noida', who: 'Pooja Yadav', time: '1 hr ago', status: 'Pending' },
  { id: 'CT-2026-434', type: 'Collection & Transport', loc: 'Sector 93 Expressview', zone: 'Zone 4 · Noida', who: 'Sunil Kumar', time: '2 hr ago', status: 'Done' },
  { id: 'EJ-2026-121', type: 'Enforcement', loc: 'Sector 27 Atta Market', zone: 'Zone 1 · Noida', who: 'Neha Verma', time: '2 hr ago', status: 'In-Progress' },
  { id: 'RA-2026-009', type: 'Assessment', loc: 'Sector 144 SEZ Complex', zone: 'Zone 5 · Noida', who: 'Amit Singh', time: '3 hr ago', status: 'Pending' },
  { id: 'CT-2026-435', type: 'Collection & Transport', loc: 'Delta 1 Greater Noida', zone: 'Zone 7 · Gr. Noida', who: 'Farhan Ali', time: '3 hr ago', status: 'Done' },
];

export const MATERIALS = [
  { name: 'Concrete', tonnes: 388, color: 'var(--navy-900)' },
  { name: 'Bricks', tonnes: 231, color: 'var(--indigo-500)' },
  { name: 'Soil', tonnes: 175, color: 'var(--indigo-300)' },
  { name: 'Mixed', tonnes: 130, color: 'var(--slate-300)' },
];

export const WORKERS = [
  { id: 'MGW-0142', name: 'Ravi Sharma', role: 'Inspector', aff: 'Noida Authority', zone: 'Zone 3', area: 'Sector 62', ticket: 'RA-2026-006', vehicle: 'UP-16 GT-7390', weight: 0, status: 'Unassigned' },
  { id: 'MGW-0187', name: 'Neha Verma', role: 'Enforcement', aff: 'Noida Authority', zone: 'Zone 1', area: 'Sector 18', ticket: 'EJ-2026-118', vehicle: 'UP-16 FT-2245', weight: 12.6, status: 'In-Progress' },
  { id: 'MGW-0203', name: 'Imran Khan', role: 'Driver', aff: 'GreenHaul Contractors', zone: 'Zone 4', area: 'Sector 137', ticket: 'CT-2026-431', vehicle: 'UP-16 HT-8812', weight: 24.2, status: 'Done' },
  { id: 'MGW-0219', name: 'Pooja Yadav', role: 'Inspector', aff: 'EcoBuild Services', zone: 'Zone 6', area: 'Gaur City', ticket: 'GR-311-0942', vehicle: 'UP-16 KT-1043', weight: 0, status: 'Unassigned' },
  { id: 'MGW-0231', name: 'Amit Singh', role: 'Driver', aff: 'GreenHaul Contractors', zone: 'Zone 3', area: 'Sector 75', ticket: 'RA-2026-007', vehicle: 'UP-16 GT-5521', weight: 18.4, status: 'In-Progress' },
  { id: 'MGW-0256', name: 'Sunil Kumar', role: 'Driver', aff: 'GreenHaul Contractors', zone: 'Zone 7', area: 'KP II', ticket: 'CT-2026-432', vehicle: 'UP-16 DT-6670', weight: 21.75, status: 'Done' },
  { id: 'MGW-0262', name: 'Deepa Nair', role: 'Enforcement', aff: 'Noida Authority', zone: 'Zone 2', area: 'Sector 50', ticket: 'EJ-2026-119', vehicle: 'UP-16 FT-3308', weight: 0, status: 'Unassigned' },
  { id: 'MGW-0275', name: 'Vikas Gupta', role: 'Inspector', aff: 'EcoBuild Services', zone: 'Zone 4', area: 'Sector 104', ticket: 'GR-311-0943', vehicle: 'UP-16 KT-9921', weight: 9.8, status: 'Done' },
  { id: 'MGW-0288', name: 'Farhan Ali', role: 'Driver', aff: 'GreenHaul Contractors', zone: 'Zone 1', area: 'Sector 15', ticket: 'CT-2026-433', vehicle: 'UP-16 HT-4417', weight: 16.2, status: 'In-Progress' },
  { id: 'MGW-0294', name: 'Kavya Rao', role: 'Enforcement', aff: 'Noida Authority', zone: 'Zone 2', area: 'Sector 44', ticket: 'EJ-2026-120', vehicle: 'UP-16 FT-7762', weight: 0, status: 'Unassigned' },
];

export const AFFILIATIONS = ['Noida Authority', 'GreenHaul Contractors', 'EcoBuild Services'];
export const ZONES = ['Zone 1', 'Zone 2', 'Zone 3', 'Zone 4', 'Zone 6', 'Zone 7'];

// Details shown in the assign drawer, keyed by ticket ID. Unknown tickets fall back to DEFAULT_SITE.
export const SITES = {
  'RA-2026-006': { kind: 'Assessment request', raised: '7 Oct · 21:40', sla: '1h 18m', address: 'Plot 14, Block C, Sector 62, Noida', contact: 'Rakesh Mehta · Site owner', material: 'Concrete', load: '25.00 MT', gps: '28.6273° N, 77.3725° E' },
};
export const DEFAULT_SITE = { kind: 'Field request', raised: 'Today', sla: '2h 00m', address: 'Address on file', contact: '[Site contact]', material: 'Mixed', load: '—', gps: '28.5355° N, 77.3910° E' };

export const EVIDENCE = [
  { label: 'Site photo · front', gps: '28.6273, 77.3725', time: '07 Oct 21:42:08', tone: '#526075' },
  { label: 'Debris pile', gps: '28.6274, 77.3726', time: '07 Oct 21:43:51', tone: '#7C8597' },
];

export const TEAMS = [
  { id: 'alpha', name: 'Team Alpha', lead: 'Ravi Sharma', initials: ['RS', 'AS'], more: 3, jobs: '2 active jobs', km: '1.2 km' },
  { id: 'bravo', name: 'Team Bravo', lead: 'Neha Verma', initials: ['NV', 'DN'], more: 4, jobs: 'Free now', km: '3.8 km', best: true },
  { id: 'delta', name: 'Team Delta', lead: 'Imran Khan', initials: ['IK', 'FA'], more: 2, jobs: '1 active job', km: '5.4 km' },
];

export const VEHICLES = [
  { plate: 'UP-16 GT-7390', kind: '25 MT tipper', eta: 'ETA 12 min' },
  { plate: 'UP-16 HT-4417', kind: '16 MT tipper', eta: 'ETA 18 min' },
  { plate: 'UP-16 DT-6670', kind: '30 MT hauler', eta: 'Back 22:30', unavailable: true },
];

export const PLANTS = ['C&D Recycling Plant · Sector 80', 'Transfer Station · Sector 145'];
