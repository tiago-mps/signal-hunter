'use client'
import { useState } from 'react'
import styles from './tool.module.css'

function extractJSON(raw) {
  if (!raw) return null
  const t = raw.trim()
  const tries = [
    () => JSON.parse(t),
    () => { const m = t.match(/```(?:json)?\s*([\s\S]*?)```/); return m ? JSON.parse(m[1].trim()) : null },
    () => { const s = t.indexOf('{'), e = t.lastIndexOf('}'); return s !== -1 && e !== -1 ? JSON.parse(t.slice(s, e + 1)) : null },
    () => { const s = t.indexOf('['), e = t.lastIndexOf(']'); return s !== -1 && e !== -1 ? JSON.parse(t.slice(s, e + 1)) : null },
  ]
  for (const fn of tries) { try { const r = fn(); if (r) return r } catch {} }
  return null
}

async function callAPI(endpoint, body) {
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error(`Error ${res.status}`)
  const json = await res.json()
  return json.raw || ''
}

function LoadingDots({ text }) {
  return (
    <div className={styles.lwrap}>
      <div className={styles.ldots}><span /><span /><span /></div>
      <p className={styles.ltxt}>{text}</p>
    </div>
  )
}

function ScoreBadge({ score }) {
  const c = score >= 85
    ? ['#7F77DD', 'rgba(127,119,221,0.15)', 'Review']
    : score >= 70
    ? ['#1D9E75', 'rgba(29,158,117,0.15)', 'Auto-queue']
    : ['#EF9F27', 'rgba(239,159,39,0.15)', 'Nurture']
  return (
    <div className={styles.sbadge}>
      <span className={styles.snum} style={{ color: c[0] }}>{score}</span>
      <span className={styles.slbl} style={{ background: c[1], color: c[0] }}>{c[2]}</span>
    </div>
  )
}

function TargetCard({ t, idx }) {
  const AV = [
    ['rgba(127,119,221,0.15)', '#AFA9EC'],
    ['rgba(29,158,117,0.15)', '#5DCAA5'],
    ['rgba(216,90,48,0.15)', '#F0997B'],
    ['rgba(239,159,39,0.15)', '#FAC775'],
    ['rgba(55,138,221,0.15)', '#85B7EB'],
  ]
  const [bg, fg] = AV[idx % AV.length]
  const initials = (t.company || '?').split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()
  return (
    <div className={styles.tcard}>
      <div className={styles.ava} style={{ background: bg, color: fg }}>{initials}</div>
      <div className={styles.tbody}>
        <div className={styles.tname}>{t.company}</div>
        <div className={styles.tstype}>{t.signal_type}</div>
        <div className={styles.tdetail}>{t.signal_detail}</div>
        {t.outreach_hook && (
          <div className={styles.thook}>
            <span className={styles.hlbl}>Opening: </span>{t.outreach_hook}
          </div>
        )}
      </div>
      <ScoreBadge score={t.score || 0} />
    </div>
  )
}

function SignalRow({ sig, idx }) {
  const SC = [
    { dot: '#7F77DD', bg: 'rgba(127,119,221,0.12)', tx: '#AFA9EC' },
    { dot: '#1D9E75', bg: 'rgba(29,158,117,0.12)', tx: '#5DCAA5' },
    { dot: '#D85A30', bg: 'rgba(216,90,48,0.12)', tx: '#F0997B' },
  ]
  const c = SC[idx % 3]
  return (
    <div className={styles.srow}>
      <div className={styles.sdot} style={{ background: c.dot }} />
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
          <span className={styles.sname}>{sig.name}</span>
          <span className={styles.spts} style={{ background: c.bg, color: c.tx }}>+{sig.base_score} pts</span>
        </div>
        <div className={styles.swhy}>{sig.why}</div>
      </div>
    </div>
  )
}

export default function SignalHunterTool() {
  const [step, setStep] = useState('icp')
  const [icp, setIcp] = useState({ company: '', revenue: '', headcount: '', buyer: '', pain: '', exclude: '' })
  const [loading, setLoading] = useState(false)
  const [loadingTargets, setLoadingTargets] = useState(false)
  const [signals, setSignals] = useState(null)
  const [targets, setTargets] = useState(null)
  const [error, setError] = useState(null)

  const filled = icp.company && icp.revenue && icp.pain

  async function runSignals() {
    setLoading(true); setError(null); setSignals(null); setTargets(null)
    try {
      const raw = await callAPI('/api/signals', { icp })
      const parsed = extractJSON(raw)
      if (parsed && parsed.signals) { setSignals(parsed); setStep('signals') }
      else setError('Could not read the signal map. Please try again.')
    } catch (e) { setError('Something went wrong. Please try again.') }
    setLoading(false)
  }

  async function runTargets() {
    setLoadingTargets(true); setError(null); setTargets(null)
    try {
      const raw = await callAPI('/api/targets', { icp, signals: signals?.signals })
      const parsed = extractJSON(raw)
      const arr = Array.isArray(parsed) ? parsed : parsed?.targets
      if (arr && arr.length > 0) { setTargets(arr); setStep('targets') }
      else setError('Could not load targets. Please try again.')
    } catch (e) { setError('Something went wrong. Please try again.') }
    setLoadingTargets(false)
  }

  function reset() {
    setStep('icp'); setSignals(null); setTargets(null); setError(null)
  }

  const sorted = targets ? [...targets].sort((a, b) => (b.score || 0) - (a.score || 0)) : []
  const stepIdx = { icp: 0, signals: 1, targets: 2 }[step]

  return (
    <div className={styles.page}>
      <nav className={styles.nav}>
        <div className={styles.navLeft}>
          <img className={styles.navLogo} src="/logo.png" alt="Grantbot" />
          <div className={styles.navDiv} />
          <span className={styles.navProduct}>Signal Hunter</span>
        </div>
        <a href="https://grantbot.co" className={styles.navLink} target="_blank" rel="noopener">grantbot.co ↗</a>
      </nav>

      <div className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroInner}>
          <div className={styles.heroEye}><span className={styles.heroDot} />AI-powered prospecting</div>
          <h1 className={styles.heroTitle}>Find your next<br /><span className={styles.heroAccent}>100 targets</span><br />before they raise their hand.</h1>
          <p className={styles.heroSub}>Describe your ICP. Get a creative signal map and 10 scored outreach targets — the way the best prospectors think.</p>
        </div>
      </div>

      <div className={styles.progWrap}>
        <div className={styles.prog}>
          {['Define ICP', 'Signal map', '10 targets'].map((label, i) => (
            <div key={i} className={styles.progStep}>
              <div className={styles.progBar} style={{ background: i <= stepIdx ? '#534AB7' : 'rgba(255,255,255,0.08)' }} />
              <div className={styles.progLbl} style={{ color: i === stepIdx ? '#7F77DD' : i < stepIdx ? 'rgba(255,255,255,0.45)' : 'rgba(255,255,255,0.22)', fontWeight: i === stepIdx ? 600 : 400 }}>
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.fwrap}>

        {step === 'icp' && (
          <div>
            <div className={styles.panelHead}>
              <div className={styles.pEye}>Step 1</div>
              <h2 className={styles.pTitle}>Define your ideal client</h2>
              <p className={styles.pSub}>Be specific — the more detail you give, the more creative and accurate the signals.</p>
            </div>
            <div className={styles.form}>
              {[
                { key: 'company', label: 'What kind of company is your ideal client?', ph: 'e.g. Regional accounting software company, DTC home goods brand...', rows: 2 },
                { key: 'revenue', label: 'Revenue range', ph: 'e.g. $20M–$150M', rows: 1 },
                { key: 'headcount', label: 'Headcount range', ph: 'e.g. 50–400 employees', rows: 1 },
                { key: 'buyer', label: 'Who is the buyer or champion?', ph: 'e.g. COO, VP Operations, Founder', rows: 1 },
                { key: 'pain', label: 'What is their core pain? Be specific.', ph: "e.g. They know they need AI but don't know where to start...", rows: 3 },
                { key: 'exclude', label: 'Who do you NOT want? (optional)', ph: 'e.g. Enterprise companies, pure-tech companies...', rows: 2 },
              ].map(f => (
                <div key={f.key} className={styles.field}>
                  <label className={styles.flabel}>{f.label}</label>
                  {f.rows === 1
                    ? <input className={styles.finput} value={icp[f.key]} onChange={e => setIcp(p => ({ ...p, [f.key]: e.target.value }))} placeholder={f.ph} />
                    : <textarea className={styles.ftarea} value={icp[f.key]} onChange={e => setIcp(p => ({ ...p, [f.key]: e.target.value }))} placeholder={f.ph} rows={f.rows} />
                  }
                </div>
              ))}
            </div>
            {error && <div className={styles.ebox}>{error}</div>}
            {loading ? <LoadingDots text="Analyzing your ICP and building signal map..." /> : (
              <button className={styles.pbtn} disabled={!filled} onClick={runSignals}>
                {filled ? 'Generate signal map →' : 'Fill in your ICP to continue'}
              </button>
            )}
          </div>
        )}

        {step === 'signals' && signals && (
          <div>
            <div className={styles.panelHead}>
              <div className={styles.pEye}>Step 2 — Signal map</div>
              <h2 className={styles.pTitle}>Your creative signal map</h2>
            </div>
            <div className={styles.ibox}>
              <div className={styles.iboxLbl}>ICP confirmed</div>
              <div className={styles.iboxTxt}>{signals.icp_summary}</div>
            </div>
            {signals.tow_truck_insight && (
              <div className={styles.tbox}>
                <div className={styles.tboxLbl}>Your tow truck moment</div>
                <div className={styles.tboxTxt}>{signals.tow_truck_insight}</div>
              </div>
            )}
            <div className={styles.smini}>
              <div className={styles.sminiTitle}>3 intent signals detected</div>
              {(signals.signals || []).map((sig, i) => <SignalRow key={i} sig={sig} idx={i} />)}
            </div>
            {error && <div className={styles.ebox}>{error}</div>}
            {loadingTargets ? <LoadingDots text="Finding your first 10 targets..." /> : (
              <div className={styles.brow}>
                <button className={styles.gbtn} onClick={() => { setStep('icp'); setSignals(null) }}>← Edit ICP</button>
                <button className={styles.pbtn} style={{ flex: 1 }} onClick={runTargets}>Generate first 10 targets →</button>
              </div>
            )}
          </div>
        )}

        {step === 'targets' && targets && (
          <div>
            <div className={styles.panelHead}>
              <div className={styles.pEye}>Step 3 — First 10 targets</div>
              <h2 className={styles.pTitle}>Your signal-triggered targets</h2>
              <p className={styles.pSub}>Scored by signal strength. 85+ gets manual review. 70–84 auto-queues.</p>
            </div>
            <div className={styles.rsum}>
              {[
                { label: 'Review & send', color: '#7F77DD', bg: 'rgba(127,119,221,0.12)', min: 85 },
                { label: 'Auto-queue', color: '#1D9E75', bg: 'rgba(29,158,117,0.12)', min: 70, max: 85 },
                { label: 'Nurture', color: '#EF9F27', bg: 'rgba(239,159,39,0.12)', min: 0, max: 70 },
              ].map(b => (
                <div key={b.label} className={styles.rchip} style={{ background: b.bg }}>
                  <span className={styles.rcount} style={{ color: b.color }}>
                    {sorted.filter(t => t.score >= b.min && (b.max === undefined || t.score < b.max)).length}
                  </span>
                  <span className={styles.rclbl} style={{ color: b.color }}>{b.label}</span>
                </div>
              ))}
            </div>
            <div className={styles.tlist}>
              {sorted.map((t, i) => <TargetCard key={i} t={t} idx={i} />)}
            </div>
            <div className={styles.brow}>
              <button className={styles.gbtn} onClick={() => setStep('signals')}>← Back to signals</button>
              <button className={styles.pbtn} style={{ flex: 1 }} onClick={reset}>Run a new ICP →</button>
            </div>
          </div>
        )}

      </div>

      <footer className={styles.footer}>
        <span>Grantbot Consulting LLC</span>
        <a href="mailto:human@grantbot.co">human@grantbot.co</a>
        <a href="https://grantbot.co" target="_blank" rel="noopener">grantbot.co</a>
      </footer>
    </div>
  )
}
