import {useState,useRef,useEffect} from 'react';import gsap from 'gsap';
import {SND,CAT,bon,BONUS,startSeq,stopSeq,unlive,wake,liveAll,setBpm as setTempo,setLevel} from './audio.js';
import Fx from './Fx.jsx';import Lanterns from './Lanterns.jsx';import Char from './Char.jsx';
const PAL=['#b83a2a','#5b7f3a','#2b3a67','#c8821a'],INK='#2b1a12';
const h0=location.hash.match(/^#mix-(.+)$/)?.[1].split('-').map(x=>x==='x'?null:parseInt(x,36));
export default function App(){
  const [slots,setSlots]=useState(h0?.length===7&&h0.every(x=>x==null||x<SND.length)?h0:Array(7).fill(null)),[muted,setMuted]=useState(Array(7).fill(false)),[playing,setPlaying]=useState(false),[auto,setAuto]=useState(false),[bpm,setBpm]=useState(92),act=useRef({}),[lv,setLv]=useState(0),tch=useRef(false),[ghost,setGhost]=useState(null),[toast,setToast]=useState(''),figs=useRef([]),st=useRef({}),got=useRef(new Set());
  st.current={slots,muted};
  const play=()=>{wake();startSeq(()=>st.current,(i,d)=>setTimeout(()=>figs.current[i]&&gsap.fromTo(figs.current[i],{y:-14,scaleY:1.07,transformOrigin:'50% 100%'},{y:0,scaleY:1,duration:.35,ease:'back.out(3)'}),Math.max(0,d)));setPlaying(true)};
  const assign=(id,i)=>{const at=slots.indexOf(id),n=[...slots];if(i==null){if(at>=0){n[at]=null;setSlots(n);return}i=n.indexOf(null);if(i<0)return setToast('Kín chỗ rồi, kéo thả lên người để đổi.')}
    if(at>=0)n[at]=null;n[i]=id;unlive(i);setSlots(n);if(!playing)play()};
  const rand=()=>{const pick=[0,1,2,3].map(c=>{const l=SND.map((s,i)=>s.c===c?i:-1).filter(i=>i>=0);return l[Math.random()*l.length|0]});while(pick.length<7){const i=Math.random()*SND.length|0;if(!pick.includes(i))pick.push(i)}pick.sort(()=>Math.random()-.5);liveAll();setSlots(pick);setMuted(Array(7).fill(false));if(!playing)play()};
  const touch=(id,e)=>{const mv=v=>setGhost({id,x:v.clientX,y:v.clientY}),up=v=>{removeEventListener('pointermove',mv);removeEventListener('pointerup',up);setGhost(null);const el=document.elementFromPoint(v.clientX,v.clientY)?.closest('[data-slot]');if(el)assign(id,+el.dataset.slot);else if(Math.hypot(v.clientX-e.clientX,v.clientY-e.clientY)<8)assign(id)};addEventListener('pointermove',mv);addEventListener('pointerup',up);mv(e)};
  const level=n=>{stopSeq();setPlaying(false);setLevel(n);got.current=new Set();setSlots(Array(7).fill(null));setMuted(Array(7).fill(false));setLv(n)};
  const tgl=()=>playing?(stopSeq(),setPlaying(false)):play();
  act.current={rand,tgl};
  const toggle=i=>slots[i]!=null&&setMuted(m=>m.map((x,k)=>k===i?!x:x));
  const reset=()=>{setSlots(Array(7).fill(null));setMuted(Array(7).fill(false))};
  useEffect(()=>{const act=slots.map((x,i)=>x!=null&&!muted[i]?x:null);
    BONUS.forEach((b,k)=>{bon[k]=b.ids.every(id=>act.includes(id));if(bon[k]&&!got.current.has(k)){got.current.add(k);setToast('Mở khóa: '+b.n+'!')}});
    lv||history.replaceState(null,'','#mix-'+slots.map(x=>x==null?'x':x.toString(36)).join('-'))},[slots,muted]);
  useEffect(()=>{if(!auto)return;const t=setInterval(()=>{const n=[...st.current.slots];if(!n.some(x=>x!=null))return;const i=Math.random()*7|0,id=Math.random()*SND.length|0;if(n.includes(id))return;n[i]=id;liveAll();setSlots(n);setMuted(m=>m.map((x,k)=>k===i?false:x))},8000);return()=>clearInterval(t)},[auto]);
  useEffect(()=>{const k=e=>{if(e.target.tagName==='INPUT')return;if(e.code==='Space'){e.preventDefault();act.current.tgl()}if(e.key==='r'||e.key==='R')act.current.rand()};addEventListener('keydown',k);return()=>removeEventListener('keydown',k)},[]);
  useEffect(()=>{if(!toast)return;const t=setTimeout(()=>setToast(''),2200);return()=>clearTimeout(t)},[toast]);
  useEffect(()=>{gsap.from('.slot',{y:40,opacity:0,stagger:.06,duration:.6,ease:'power3.out'})},[]);
  const btn='rounded-md border-[3px] px-3 py-1.5 text-sm font-black shadow-[3px_3px_0_#2b1a12] active:translate-y-px';
  return <div className="flex h-dvh flex-col overflow-hidden" style={{color:INK}}>
   <header className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-2">
    <div className="flex items-center gap-3"><span className="grid h-12 w-12 -rotate-6 place-items-center border-[3px] bg-[#b83a2a] text-xl font-black text-[#f6ecd2]" style={{borderColor:INK}}>Hẻm</span>
     <div><h1 className="text-3xl font-black leading-none">Hẻm Beat</h1><span className="text-xs opacity-70">{lv?'Màn 2 · Note Block':'Màn 1 · Hẻm Sài Gòn'}</span></div></div>
    <div className="flex flex-wrap items-center gap-2"><label className="flex items-center gap-1 text-xs font-black" title="Tốc độ">♩{bpm}<input type="range" min="70" max="130" value={bpm} className="w-20 accent-[#b83a2a]" onChange={e=>{setBpm(+e.target.value);setTempo(+e.target.value)}}/></label>{[[playing?'Dừng':'Phát',()=>playing?(stopSeq(),setPlaying(false)):play(),'bg-[#b83a2a] text-[#f6ecd2]'],['Xóa hết',reset,'bg-[#f6ecd2]'],['Ngẫu nhiên',rand,'bg-[#f6ecd2]'],[lv?'Màn 1: Hẻm':'Màn 2: Note Block',()=>level(1-lv),'bg-[#6fb34a]'],['Tự phối: '+(auto?'bật':'tắt'),()=>setAuto(v=>!v),auto?'bg-[#d9992b]':'bg-[#f6ecd2]'],['Chia sẻ',()=>navigator.clipboard?.writeText(location.href).then(()=>setToast('Đã chép link bản mix')),'bg-[#f6ecd2]']].map(([t,f,c])=><button key={t} onClick={f} className={`${btn} ${c}`} style={{borderColor:INK}}>{t}</button>)}</div>
   </header>
   <main className="mx-auto flex min-h-0 w-full max-w-6xl flex-1 flex-col px-4">
    <section className="relative flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border-4 bg-[#e0a93f] pt-32" style={{borderColor:INK,background:lv?'linear-gradient(#7ec0ee,#bfe3f7)':undefined}}>
     <div className={lv?'hidden':'absolute inset-0 opacity-40'} style={{background:'radial-gradient(#2b1a12 1px,transparent 1.5px) 0 0/9px 9px'}}/>
     {(lv?[]:[8,38,68]).map(x=><div key={x} className="slats absolute top-14 h-24 w-[18%] rounded-t-full border-4" style={{left:x+'%',borderColor:INK}}/>)}
     <svg className={lv?'hidden':'absolute inset-x-0 top-0 h-28 w-full'} viewBox="0 0 1000 100" preserveAspectRatio="none"><path d="M0 10Q250 70 500 22T1000 34M0 44Q300 90 620 44T1000 66" fill="none" stroke={INK} strokeWidth="3"/></svg>
     {lv?<><div className="absolute right-10 top-8 h-14 w-14 bg-[#ffe45a] shadow-[0_0_0_6px_#fff3a0]"/><div className="absolute left-[12%] top-10 h-6 w-28 bg-white/90"/><div className="absolute left-[48%] top-16 h-5 w-20 bg-white/90"/></>:<Lanterns/>}
     <div className="relative z-20 grid min-h-0 flex-1 grid-cols-7 items-end gap-1 px-2">
      {slots.map((id,i)=><div key={i} data-slot={i} className="slot flex h-full cursor-pointer flex-col items-center justify-end" onClick={()=>toggle(i)} onDragOver={e=>e.preventDefault()} onDrop={e=>assign(+e.dataTransfer.getData('t'),i)}>
       <div ref={el=>figs.current[i]=el} className={`flex min-h-0 w-full flex-1 items-end justify-center ${muted[i]?'opacity-50 grayscale':''}`}><Char id={id} lv={lv} on={id!=null&&!muted[i]}/></div>
       <b className="mb-1 mt-0.5 text-[11px]">{id!=null?(muted[i]?'Tắt tiếng':SND[id].n):'Thả vào đây'}</b></div>)}
     </div>
     <div className="relative z-20 h-5 border-t-4 bg-[#8a5a3a]" style={{borderColor:INK,background:lv?'repeating-linear-gradient(90deg,#0003 0 8px,transparent 8px 16px),linear-gradient(#5aa02c 0 45%,#7a5230 45%)':'repeating-linear-gradient(90deg,#2b1a1244 0 3px,transparent 3px 26px),#9b6a43'}}/>
    </section>
   </main>
   <section className="mt-2 grid grid-cols-1 gap-x-4 gap-y-2 border-t-4 bg-[#2b1a12] px-4 py-2 sm:grid-cols-2 lg:grid-cols-4">
    {CAT.map((c,ci)=><div key={c}><h2 className="mb-1 text-xs font-black text-[#f6ecd2]">{c}</h2><div className="grid grid-cols-5 gap-1">
     {SND.map((s,id)=>s.c===ci&&<button key={id} draggable onDragStart={e=>e.dataTransfer.setData('t',id)} onPointerDown={e=>{if(e.pointerType==='touch'){tch.current=true;touch(id,e)}}} onClick={()=>{if(tch.current){tch.current=false;return}assign(id)}} className={`flex flex-col items-center rounded-md border-[3px] bg-[#f6ecd2] px-0.5 py-1 transition ${slots.includes(id)?'opacity-45':'hover:-translate-y-0.5'}`} style={{borderColor:PAL[ci],touchAction:'none'}}><span className="text-xl leading-none">{s.i}</span><span className="text-[10px] font-black leading-tight">{s.n}</span></button>)}</div></div>)}
   </section>
   {ghost&&<div className="pointer-events-none fixed z-40 grid h-14 w-14 place-items-center rounded-full border-[3px] bg-[#f6ecd2] text-3xl" style={{left:ghost.x-28,top:ghost.y-28,borderColor:INK}}>{SND[ghost.id].i}</div>}
   <Fx/>
   {toast&&<div className="fixed bottom-40 left-1/2 -translate-x-1/2 rounded-full border-[3px] bg-[#f6ecd2] px-5 py-2 font-black" style={{borderColor:INK}}>{toast}</div>}
  </div>}
