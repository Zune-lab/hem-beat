const INK='#2b1a12',SKIN='#f0b98a';
const HATS=[
 <><path d="M6 32Q50-8 94 32Q50 26 6 32z" fill="#e8cf8c"/><path d="M28 26l-4 6M50 18v9M72 26l4 6" strokeWidth="1.5"/><path d="M33 52q17 14 34 0" fill="none" stroke="#b83a2a" strokeWidth="3"/></>,
 <><path d="M27 30Q50 4 73 30Q50 22 27 30z" fill="#f3efe2"/><path d="M36 18v10M46 12v10M56 12v10M66 18v10" stroke="#3a7a4a" strokeWidth="2.5"/></>,
 <><path d="M26 30Q26 6 50 6Q74 6 74 30z" fill="#6b7a3a"/><rect x="21" y="28" width="58" height="7" rx="3.5" fill="#56622e"/><path d="M50 12l2.5 5h-5z" fill="#d9302a" strokeWidth="1"/></>,
 <><path d="M25 32Q27 8 52 8Q77 10 75 32z" fill="#d9992b"/><rect x="23" y="30" width="54" height="6" rx="3" fill="#a8731a"/></>,
 <><ellipse cx="50" cy="19" rx="26" ry="12" fill="#2b2f55"/><path d="M28 21q22 9 44 0" fill="none" strokeWidth="2"/></>,
 <><circle cx="50" cy="9" r="11" fill={INK}/><path d="M26 32Q28 12 50 12Q72 12 74 32Q50 22 26 32z" fill={INK}/><circle cx="69" cy="17" r="5.5" fill="#e04a5b"/><circle cx="69" cy="17" r="1.8" fill="#f6d36b" strokeWidth="1"/></>];
const LK=[[2,'#b83a2a'],[0,'#7a4a2a'],[5,'#d9992b'],[3,'#2b3a67'],[2,'#2f6f73'],[3,'#b83a2a'],[1,'#5b7f3a'],[2,'#2f6f73'],[0,'#2b3a67'],[1,'#b83a2a'],[4,'#7a4a2a'],[5,'#8a4b6b'],[0,'#2f6f73'],[4,'#5b7f3a'],[3,'#d9992b'],[0,'#8a4b6b'],[1,'#2b3a67'],[5,'#b83a2a'],[0,'#7a4a2a'],[1,'#d9992b']];
const BASS=<><path d="M34 128q-14-14 4-26t24 4q10 14-4 26t-24-4z" fill="#8a5a2b"/><path d="M60 104l26-30" strokeWidth="4"/><circle cx="48" cy="114" r="4" fill={INK}/></>;
const PROPS=[
<><ellipse cx="50" cy="100" rx="22" ry="7" fill="#f6ecd2"/><path d="M28 100v22q22 10 44 0v-22" fill="#b83a2a"/></>,
<><ellipse cx="50" cy="108" rx="20" ry="13" fill="#9b6a43"/><path d="M40 108h20" strokeWidth="2.5"/><path d="M78 88l-14 18"/></>,
<><circle cx="22" cy="104" r="14" fill="#f2c94c"/><circle cx="78" cy="104" r="14" fill="#f2c94c"/><circle cx="22" cy="104" r="3.5" fill="#b8901c" strokeWidth="1.5"/><circle cx="78" cy="104" r="3.5" fill="#b8901c" strokeWidth="1.5"/></>,
BASS,BASS,
<><path d="M12 96h76" strokeWidth="4"/><circle cx="12" cy="96" r="5" fill="#f6ecd2"/><circle cx="88" cy="96" r="5" fill="#f6ecd2"/><circle cx="50" cy="94" r="9" fill="#d9992b"/></>,
<><ellipse cx="22" cy="92" rx="8" ry="20" fill="#e0f2e8" opacity=".85" transform="rotate(20 22 92)"/><ellipse cx="78" cy="92" rx="8" ry="20" fill="#e0f2e8" opacity=".85" transform="rotate(-20 78 92)"/><ellipse cx="50" cy="108" rx="9" ry="14" fill="#5b7f3a"/></>,
<><path d="M20 98h60" strokeWidth="4"/><path d="M38 98a12 12 0 0 1 24 0z" fill="#cfd8dc"/><circle cx="50" cy="102" r="3" fill={INK}/></>,
<>{[[18,92],[80,100],[28,120],[74,124]].map(([x,y])=><path key={x} d={`M${x} ${y}q-5 8 0 10q5-2 0-10z`} fill="#7fb6e8" strokeWidth="2"/>)}</>,
<>{[0,1,2].map(i=><rect key={i} x={40+i*7} y={92+i*8} width="6" height="14" rx="2" fill="#d9302a" strokeWidth="2"/>)}</>,
<><path d="M20 128L84 84" strokeWidth="5"/><circle cx="72" cy="92" r="9" fill="#d9a441"/><path d="M84 84l6-14" strokeWidth="2.5"/></>,
<><path d="M12 130l76-30v20l-76 14z" fill="#9b6a43"/><path d="M20 126l64-24M24 130l60-22M30 134l54-20" strokeWidth="1.5" stroke="#f6ecd2"/></>,
<><rect x="14" y="96" width="72" height="34" rx="4" fill="#f6ecd2"/><rect x="14" y="96" width="72" height="9" fill="#e0685a"/><circle cx="50" cy="90" r="6" fill="#f6d36b"/></>,
<path d="M24 52L88 44" strokeWidth="5" stroke="#d9a441"/>,
<path d="M50 54h22l16-12v36l-16-12H50z" fill="#f2c94c"/>,
<><path d="M4 80h92" strokeWidth="4"/><ellipse cx="12" cy="104" rx="11" ry="9" fill="#d9a441"/><ellipse cx="88" cy="104" rx="11" ry="9" fill="#d9a441"/><path d="M12 82v14M88 82v14" strokeWidth="2"/></>,
<path d="M56 58l32-14v34L56 64z" fill="#e0685a"/>,
<><ellipse cx="50" cy="108" rx="24" ry="14" fill="#f6ecd2"/><circle cx="36" cy="102" r="8" fill={SKIN}/><path d="M32 102h2M38 102h2" strokeWidth="2"/></>,
<><rect x="60" y="90" width="28" height="30" rx="3" fill="#c8821a"/><path d="M60 100h28M60 110h28" strokeWidth="2"/></>,
<><path d="M18 92L6 56M82 92L94 56" strokeWidth="9" stroke="#f0b98a"/><circle cx="6" cy="54" r="6" fill={SKIN}/><circle cx="94" cy="54" r="6" fill={SKIN}/></>];
const MC=['#00a8a8','#a83232','#3a7d2a','#d9a21a','#6a3da8','#2d6fb5','#c76a1d','#2f2f2f','#e06fa0','#4aa3a3','#8a5a2b','#7aa83a','#b8b8b8','#a8a83a','#3a3aa8','#d94a4a'];
function Block({id,on}){const c=MC[(id??0)%16],sk='#e0b08a';
  return <svg viewBox="0 0 100 140" shapeRendering="crispEdges" className={`h-full w-full overflow-visible ${id==null?'opacity-30':''}`}><g stroke="#1a1a1a" strokeWidth="2">
   <rect x="26" y="98" width="22" height="38" fill="#3b4fa8"/><rect x="52" y="98" width="22" height="38" fill="#3b4fa8"/>
   <rect x="24" y="56" width="52" height="44" fill={c}/><rect x="8" y="56" width="16" height="40" fill={c}/><rect x="76" y="56" width="16" height="40" fill={c}/>
   <rect x="8" y="90" width="16" height="8" fill={sk}/><rect x="76" y="90" width="16" height="8" fill={sk}/>
   <rect x="28" y="12" width="44" height="44" fill={sk}/><rect x="28" y="12" width="44" height="12" fill="#4a2f1a"/>
   <rect x="34" y="34" width="10" height="6" fill="#fff"/><rect x="56" y="34" width="10" height="6" fill="#fff"/><rect x="38" y="34" width="6" height="6" fill="#4a3aa8"/><rect x="56" y="34" width="6" height="6" fill="#4a3aa8"/>
   <rect x="42" y={on?45:48} width="16" height={on?8:3} fill="#7a2a2a"/>
   <rect x="30" y="78" width="40" height="34" fill="#8a5a2b"/><rect x="30" y="78" width="40" height="5" fill="#a8743c"/><rect x="38" y="88" width="24" height="16" fill="#5a3818"/>
   <text x="50" y="102" textAnchor="middle" fontSize="15" fill="#f6ecd2" stroke="none">♪</text></g></svg>}
export default function Char({id,on,lv}){
  if(lv)return <Block id={id} on={on}/>;
  const [hi,c]=id==null?[5,'#b9a98a']:LK[id],hat=HATS[hi],prop=id==null?null:PROPS[id];
  return <svg viewBox="0 0 100 140" className={`h-full w-full overflow-visible ${id==null?'opacity-30':''}`}>
   <g stroke={INK} strokeWidth="3.2" strokeLinejoin="round" strokeLinecap="round">
    <ellipse cx="50" cy="137" rx="32" ry="4" fill={INK} opacity=".25" stroke="none"/>
    <path d="M16 140V84q0-24 34-24t34 24v56z" fill={c}/>
    <path d="M40 62l10 26 10-26" fill="#f6ecd2"/><path d="M50 88v52" strokeWidth="2"/>
    {[98,112,126].map(y=><circle key={y} cx="50" cy={y} r="2.2" fill="#f6ecd2" strokeWidth="1.5"/>)}
    {prop}
    <rect x="43" y="50" width="14" height="14" fill={SKIN}/>
    <circle cx="50" cy="36" r="22" fill={SKIN}/>
    <path d="M37 37q4-4 8 0M55 37q4-4 8 0" fill="none"/>
    <circle cx="35" cy="45" r="4" fill="#e0685a" opacity=".55" stroke="none"/><circle cx="65" cy="45" r="4" fill="#e0685a" opacity=".55" stroke="none"/>
    {on?<ellipse cx="50" cy="48" rx="5" ry="4" fill="#7a2a2a" strokeWidth="2"/>:<path d="M45 47q5 4 10 0" fill="none" strokeWidth="2.5"/>}
    {hat}
   </g></svg>}
