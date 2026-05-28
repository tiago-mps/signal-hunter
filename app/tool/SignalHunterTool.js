.page { min-height: 100vh; background: #0a0a09; display: flex; flex-direction: column; font-family: 'DM Sans', sans-serif; }

.nav { display: flex; align-items: center; justify-content: space-between; padding: 0 28px; height: 56px; background: rgba(10,10,9,0.92); border-bottom: 1px solid rgba(255,255,255,0.07); position: sticky; top: 0; z-index: 20; backdrop-filter: blur(12px); }
.navLeft { display: flex; align-items: center; gap: 12px; }
.navLogo { height: 18px; filter: invert(1) brightness(2); }
.navDiv { width: 1px; height: 16px; background: rgba(255,255,255,0.12); }
.navProduct { font-family: 'Syne', sans-serif; font-size: 13px; font-weight: 600; color: #e8e6e0; letter-spacing: -0.01em; }
.navLink { font-size: 13px; color: rgba(255,255,255,0.35); text-decoration: none; transition: color 0.15s; }
.navLink:hover { color: #e8e6e0; }

.hero { padding: 52px 28px 40px; text-align: center; position: relative; overflow: hidden; border-bottom: 1px solid rgba(255,255,255,0.07); }
.heroBg {
  position: absolute; inset: 0; pointer-events: none;
  background-color: #0a0a09;
  background-image:
    radial-gradient(ellipse 60% 50% at 50% 0%, rgba(83,74,183,0.22) 0%, transparent 70%),
    linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
  background-size: 100% 100%, 40px 40px, 40px 40px;
}
.heroInner { position: relative; z-index: 1; }
.heroEye { display: inline-flex; align-items: center; gap: 6px; background: rgba(127,119,221,0.14); border: 1px solid rgba(127,119,221,0.28); border-radius: 20px; padding: 5px 14px; font-size: 11px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: #AFA9EC; margin-bottom: 20px; }
.heroDot { width: 5px; height: 5px; border-radius: 50%; background: #7F77DD; }
.heroTitle { font-family: 'Syne', sans-serif; font-size: clamp(22px, 4vw, 36px); font-weight: 800; line-height: 1.08; letter-spacing: -0.02em; color: #ffffff; margin-bottom: 14px; }
.heroAccent { color: #AFA9EC; }
.heroSub { font-size: 14px; color: rgba(255,255,255,0.5); line-height: 1.65; max-width: 400px; margin: 0 auto; }

.progWrap { padding: 18px 28px 0; background: #0a0a09; border-bottom: 1px solid rgba(255,255,255,0.06); }
.prog { display: flex; max-width: 560px; margin: 0 auto; }
.progStep { flex: 1; }
.progBar { height: 2px; border-radius: 1px; margin-bottom: 5px; transition: background 0.3s; }
.progLbl { font-size: 10px; letter-spacing: 0.05em; text-transform: uppercase; transition: color 0.2s; }

.fwrap { flex: 1; max-width: 560px; width: 100%; margin: 0 auto; padding: 28px 20px 3rem; }

.panelHead { margin-bottom: 20px; margin-top: 8px; }
.pEye { font-size: 10px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: #7F77DD; margin-bottom: 6px; }
.pTitle { font-family: 'Syne', sans-serif; font-size: 24px; font-weight: 700; color: #ffffff; margin-bottom: 6px; letter-spacing: -0.02em; }
.pSub { font-size: 13px; color: rgba(255,255,255,0.4); line-height: 1.6; }

.form { display: flex; flex-direction: column; gap: 14px; margin-bottom: 16px; }
.field { display: flex; flex-direction: column; gap: 6px; }
.flabel { font-size: 11px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: rgba(255,255,255,0.4); }
.finput, .ftarea { width: 100%; padding: 11px 14px; font-size: 14px; font-family: 'DM Sans', sans-serif; background: #141412; color: #e8e6e0; border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; transition: border-color 0.15s, box-shadow 0.15s; line-height: 1.5; }
.finput:focus, .ftarea:focus { outline: none; border-color: #7F77DD; box-shadow: 0 0 0 3px rgba(127,119,221,0.14); }
.finput::placeholder, .ftarea::placeholder { color: rgba(255,255,255,0.2); }
.ftarea { resize: vertical; }

.pbtn { width: 100%; padding: 12px 20px; font-size: 14px; font-weight: 500; font-family: 'DM Sans', sans-serif; background: #534AB7; color: #fff; border: none; border-radius: 8px; cursor: pointer; transition: all 0.15s; }
.pbtn:hover:not(:disabled) { background: #3C3489; }
.pbtn:disabled { opacity: 0.3; cursor: not-allowed; }
.gbtn { padding: 10px 16px; font-size: 13px; font-weight: 500; font-family: 'DM Sans', sans-serif; background: transparent; color: rgba(255,255,255,0.45); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; cursor: pointer; transition: all 0.15s; }
.gbtn:hover { background: rgba(255,255,255,0.05); border-color: rgba(255,255,255,0.2); color: #e8e6e0; }
.brow { display: flex; gap: 10px; }

@keyframes bounce { 0%,80%,100% { transform: scale(0); opacity: 0.3; } 40% { transform: scale(1); opacity: 1; } }
.ldots { display: flex; gap: 7px; }
.ldots span { width: 8px; height: 8px; border-radius: 50%; background: #7F77DD; display: inline-block; animation: bounce 1.4s ease-in-out infinite both; }
.ldots span:nth-child(1) { animation-delay: -0.32s; }
.ldots span:nth-child(2) { animation-delay: -0.16s; }
.lwrap { display: flex; flex-direction: column; align-items: center; gap: 14px; padding: 32px 0; }
.ltxt { font-size: 13px; color: rgba(255,255,255,0.35); }

.ebox { margin-bottom: 14px; padding: 10px 14px; background: rgba(163,45,45,0.12); border: 1px solid rgba(163,45,45,0.3); border-radius: 8px; font-size: 13px; color: #F09595; }

.ibox { background: rgba(127,119,221,0.1); border: 1px solid rgba(127,119,221,0.2); border-radius: 10px; padding: 12px 14px; margin-bottom: 12px; }
.iboxLbl { font-size: 10px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: #7F77DD; margin-bottom: 4px; }
.iboxTxt { font-size: 13px; color: #AFA9EC; line-height: 1.55; }

.tbox { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.07); border-radius: 10px; padding: 12px 14px; margin-bottom: 18px; }
.tboxLbl { font-size: 10px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: rgba(255,255,255,0.28); margin-bottom: 4px; }
.tboxTxt { font-size: 13px; color: rgba(255,255,255,0.45); line-height: 1.6; font-style: italic; }

.smini { margin-bottom: 20px; }
.sminiTitle { font-size: 10px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: rgba(255,255,255,0.28); margin-bottom: 10px; }
.srow { display: flex; align-items: flex-start; gap: 10px; padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.06); }
.srow:last-child { border-bottom: none; }
.sdot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; margin-top: 4px; }
.sname { font-size: 13px; font-weight: 500; color: #e8e6e0; flex: 1; }
.spts { font-size: 10px; font-weight: 700; padding: 2px 8px; border-radius: 8px; flex-shrink: 0; }
.swhy { font-size: 12px; color: rgba(255,255,255,0.38); line-height: 1.5; margin-top: 3px; }

.rsum { display: flex; gap: 8px; margin-bottom: 16px; flex-wrap: wrap; }
.rchip { border-radius: 8px; padding: 8px 14px; display: flex; gap: 7px; align-items: center; border: 1px solid rgba(255,255,255,0.07); }
.rcount { font-family: 'Syne', sans-serif; font-size: 22px; font-weight: 700; }
.rclbl { font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; }

.tlist { display: flex; flex-direction: column; gap: 8px; margin-bottom: 18px; }
.tcard { display: flex; align-items: flex-start; gap: 12px; padding: 13px 14px; background: #141412; border: 1px solid rgba(255,255,255,0.07); border-radius: 10px; transition: border-color 0.15s; }
.tcard:hover { border-color: rgba(127,119,221,0.35); }
.ava { width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 600; flex-shrink: 0; }
.tbody { flex: 1; min-width: 0; }
.tname { font-size: 13px; font-weight: 500; color: #ffffff; margin-bottom: 2px; }
.tstype { font-size: 10px; font-weight: 600; color: rgba(255,255,255,0.28); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px; }
.tdetail { font-size: 12px; color: rgba(255,255,255,0.42); line-height: 1.45; margin-bottom: 5px; }
.thook { font-size: 12px; color: #AFA9EC; background: rgba(127,119,221,0.1); border-radius: 6px; padding: 4px 9px; line-height: 1.45; }
.hlbl { font-weight: 600; color: #7F77DD; }

.sbadge { display: flex; flex-direction: column; align-items: flex-end; gap: 3px; flex-shrink: 0; }
.snum { font-family: 'Syne', sans-serif; font-size: 20px; font-weight: 700; }
.slbl { font-size: 9px; font-weight: 600; padding: 2px 7px; border-radius: 8px; white-space: nowrap; letter-spacing: 0.04em; text-transform: uppercase; }

.footer { border-top: 1px solid rgba(255,255,255,0.06); padding: 16px 28px; display: flex; gap: 16px; align-items: center; font-size: 11px; color: rgba(255,255,255,0.22); }
.footer a { color: #7F77DD; text-decoration: none; }
.footer a:hover { text-decoration: underline; }

@media (max-width: 600px) {
  .fwrap { padding: 20px 16px 3rem; }
  .heroTitle { font-size: 22px; }
  .brow { flex-direction: column; }
}
