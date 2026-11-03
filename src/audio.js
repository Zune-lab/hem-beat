let SPB=60/92/4;export const setBpm=b=>{SPB=60/b/4};
export let CAT=['Nhịp','Hiệu ứng','Giai điệu','Giọng'],CK=['#ffb347','#4fd18b','#ff6b6b','#b388ff'];
let A,out,nb,master;const pans=[];
const SC=[0,2,5,7,9],f=n=>{const o=Math.floor(n/12),r=((n%12)+12)%12;let b=0,bd=99;for(const d of [...SC,12])if(Math.abs(d-r)<bd){bd=Math.abs(d-r);b=d}return 110*2**((o*12+b)/12)},on=(s,...a)=>a.includes(s%16);
function init(){
  if(A){A.resume();return}
  A=new(window.AudioContext||window.webkitAudioContext)();
  const c=A.createDynamicsCompressor();master=out=A.createGain();out.gain.value=.8;out.connect(c);c.connect(A.destination);
  const cv=A.createConvolver(),RL=A.sampleRate*1.8|0,ib=A.createBuffer(2,RL,A.sampleRate);
  for(let ch=0;ch<2;ch++){const d=ib.getChannelData(ch);for(let i=0;i<RL;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/RL,2.6)}
  cv.buffer=ib;const wet=A.createGain();wet.gain.value=.28;out.connect(cv);cv.connect(wet);wet.connect(c);
  for(let i=0;i<7;i++){const p=A.createStereoPanner();p.pan.value=(i-3)/3*.75;p.connect(master);pans.push(p)}
  nb=A.createBuffer(1,A.sampleRate,A.sampleRate);const d=nb.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;
}
function G(t,v,d,dest=out){const g=A.createGain();g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.0001,t+d);g.connect(dest);return g}
function O(type,fr,t,d,v,to){const o=A.createOscillator(),g=G(t,v,d);o.type=type;o.frequency.setValueAtTime(fr,t);if(to)o.frequency.exponentialRampToValueAtTime(to,t+d*.5);o.connect(g);o.start(t);o.stop(t+d+.05);return o}
function N(t,d,v,type,fr,q){const s=A.createBufferSource();s.buffer=nb;s.loop=true;const b=A.createBiquadFilter();b.type=type;b.frequency.value=fr;b.Q.value=q||1;const g=G(t,v,d);s.connect(b);b.connect(g);s.start(t);s.stop(t+d+.05);return g}
const VW={a:[800,1150],e:[400,2000],o:[500,900]};
const FM={a:[[800,1],[1200,.55],[2800,.18]],e:[[400,1],[2000,.5],[2800,.22]],o:[[450,1],[800,.55],[2830,.12]]};
const RAO=['Ai bánh mì hông','Hủ tiếu gõ nè','Ai ve chai bán hông','Chè đậu xanh đây'];let rc=0,VV;
function sp(w,rate,pitch){try{if(speechSynthesis.speaking)return true;VV=VV||speechSynthesis.getVoices().find(v=>/^vi/i.test(v.lang));if(!VV)return false;const u=new SpeechSynthesisUtterance(w);u.voice=VV;u.lang='vi-VN';u.rate=rate;u.pitch=pitch;u.volume=.9;speechSynthesis.speak(u);return true}catch(e){return false}}
function voc(t,fr,v,d,vol){
  const g=A.createGain();g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(vol,t+Math.min(.06,d*.3));g.gain.setValueAtTime(vol,t+d*.6);g.gain.exponentialRampToValueAtTime(.0001,t+d+.12);g.connect(out);
  const lf=A.createOscillator(),lg=A.createGain();lf.frequency.value=5.2+Math.random()*.7;lg.gain.setValueAtTime(0,t);lg.gain.linearRampToValueAtTime(fr*.016,t+d*.8);lf.connect(lg);lf.start(t);lf.stop(t+d+.2);
  [-9,0,8].forEach(cn=>{const o=A.createOscillator(),pre=A.createBiquadFilter();o.type='sawtooth';o.detune.value=cn;o.frequency.setValueAtTime(fr*.985,t);o.frequency.linearRampToValueAtTime(fr,t+.08);lg.connect(o.frequency);pre.type='lowpass';pre.frequency.value=3500;o.connect(pre);
    FM[v].forEach(([fm,k])=>{const b=A.createBiquadFilter(),q=A.createGain();b.type='bandpass';b.frequency.value=fm;b.Q.value=7;q.gain.value=k*1.4;pre.connect(b);b.connect(q);q.connect(g)});
    o.start(t);o.stop(t+d+.2)});
  N(t,d,vol*.1,'bandpass',FM[v][1][0],1.2);
}
function horn(t,d,v){const g=G(t,v,d+.05),m=A.createGain(),l=A.createOscillator(),lg=A.createGain();m.gain.value=.7;l.frequency.value=110;lg.gain.value=.3;l.connect(lg);lg.connect(m.gain);l.start(t);l.stop(t+d+.1);
  [415,520,830].forEach(fr=>{const o=A.createOscillator(),b=A.createBiquadFilter();o.type='sawtooth';o.frequency.value=fr*(1+Math.random()*.004);b.type='lowpass';b.frequency.value=2800;o.connect(b);b.connect(m);o.start(t);o.stop(t+d+.1)});m.connect(g)}
function flute(t,fr,d,vol){const g=A.createGain(),lf=A.createOscillator(),lg=A.createGain();g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(vol,t+.07);g.gain.setValueAtTime(vol*.9,t+d*.6);g.gain.exponentialRampToValueAtTime(.0001,t+d);g.connect(out);
  lf.frequency.value=5;lg.gain.setValueAtTime(0,t);lg.gain.linearRampToValueAtTime(fr*.01,t+d*.7);lf.connect(lg);lf.start(t);lf.stop(t+d+.1);
  [[1,1],[2,.25],[3,.08]].forEach(([r,k])=>{const o=A.createOscillator(),q=A.createGain();o.frequency.setValueAtTime(fr*r*.97,t);o.frequency.linearRampToValueAtTime(fr*r,t+.06);lg.connect(o.frequency);q.gain.value=k;o.connect(q);q.connect(g);o.start(t);o.stop(t+d+.1)});
  N(t,d*.9,vol*.12,'bandpass',fr*3,2);N(t,.05,vol*.4,'bandpass',fr*4,2)}
function brass(t,fr,d,vol){const g=A.createGain(),b=A.createBiquadFilter();g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(vol,t+.04);g.gain.setValueAtTime(vol*.8,t+d*.7);g.gain.exponentialRampToValueAtTime(.0001,t+d+.08);b.type='lowpass';b.Q.value=2;b.frequency.setValueAtTime(500,t);b.frequency.linearRampToValueAtTime(2800,t+.08);b.frequency.linearRampToValueAtTime(1300,t+d);b.connect(g);g.connect(out);
  [-5,5].forEach(c=>{const o=A.createOscillator();o.type='sawtooth';o.detune.value=c;o.frequency.setValueAtTime(fr*.96,t);o.frequency.exponentialRampToValueAtTime(fr,t+.05);o.connect(b);o.start(t);o.stop(t+d+.1)});N(t,.06,vol*.3,'bandpass',fr*3,1)}
export const beat={v:0};
const KS={};
function ks(t,fr,d,vol){
  const sr=A.sampleRate,k=Math.round(fr)+'_'+d;let b=KS[k];
  if(!b){const n=sr*d|0,L=Math.max(2,sr/fr|0),y=new Float32Array(n);b=A.createBuffer(1,n,sr);
    for(let i=0;i<L;i++)y[i]=Math.random()*2-1;
    for(let i=L;i<n;i++)y[i]=(y[i-L]+y[i-L+1])*.4985;
    for(let i=0;i<n;i++)y[i]*=Math.min(1,i/80);
    b.copyToChannel(y,0);KS[k]=b}
  const q=A.createBufferSource(),g=G(t,vol,d);q.buffer=b;q.connect(g);q.start(t);
}
const S0=[
{c:0,n:'Trống',i:'🥁',p:(t,s)=>{if(on(s,0,6,8,11)||s==30){O('sine',160,t,.3,.9,45);O('triangle',90,t,.12,.3,50);N(t,.02,.3,'bandpass',1800,1);N(t,.25,.08,'lowpass',250);return 1}}},
{c:0,n:'Mõ',i:'🪵',p:(t,s)=>{if(on(s,2,5,8,11,14)){const bf=s%16==8?1100:820;O('sine',bf,t,.12,.45,bf*.8);O('sine',bf*2.4,t,.05,.18);N(t,.02,.3,'bandpass',bf*2,4);return 1}}},
{c:0,n:'Chũm',i:'✨',p:(t,s)=>{if(s%2==0){N(t,s%16==14?.3:.05,s%4?.14:.24,'highpass',8500);N(t,s%16==14?.3:.05,.06,'bandpass',11000,6);return 1}}},
{c:1,n:'Bass lo-fi',i:'🌊',p:(t,s)=>{const m={0:0,3:0,6:3,8:5,11:3,14:7}[s%16];if(m!=null){O('sine',f(m-12),t,.5,.8);O('triangle',f(m-12)*2,t,.2,.12);N(t,.02,.12,'lowpass',400);return 1}}},
{c:1,n:'Bass gằn',i:'🐍',p:(t,s)=>{if(s%4==0){const m=[0,0,3,5,0,0,7,5][(s/4|0)%8],o=A.createOscillator(),b=A.createBiquadFilter(),g=G(t,.5,.35);o.type='sawtooth';o.frequency.value=f(m-12);b.type='lowpass';b.Q.value=8;b.frequency.setValueAtTime(900,t);b.frequency.exponentialRampToValueAtTime(120,t+.3);o.connect(b);b.connect(g);o.start(t);o.stop(t+.4);return 1}}},
{c:2,n:'Đàn bầu',i:'🎋',p:(t,s)=>{const m={0:19,6:15,10:12,16:15,22:17,26:22}[s];if(m!=null){O('sine',f(m)*2,t,.8,.06);O('triangle',f(m),t,1,.05);const o=O('sine',f(m)*.94,t,1.1,.35),l=A.createOscillator(),lg=A.createGain();o.frequency.exponentialRampToValueAtTime(f(m),t+.12);l.frequency.value=5.5;lg.gain.value=4;l.connect(lg);lg.connect(o.frequency);l.start(t);l.stop(t+1.2);return 1}}},
{c:2,n:'Đàn tranh',i:'🪕',p:(t,s)=>{if(s%2==0){const m=[12,15,17,19,22,19,17,15][(s/2)%8];ks(t,f(m+12),1.2,.5);return 1}}},
{c:2,n:'Xe kem',i:'🍦',p:(t,s)=>{const m={0:24,2:22,4:19,8:22,10:19,12:15,16:24,18:22,20:19,24:17,26:19}[s];if(m!=null){O('square',f(m+12),t,.18,.1);return 1}}},
{c:3,n:'Hò',i:'🎤',p:(t,s)=>{const m={0:['o',12,.6],8:['a',15,.5],12:['e',17,.3]}[s%16];if(m){voc(t,f(m[1]),m[0],m[2],.3);return 1}}},
{c:3,n:'Ê a',i:'📣',p:(t,s)=>{const v={1:'a',4:'e',7:'o',10:'a',13:'e'}[s%16];if(v){voc(t,f(19+(s%3)*3),v,.14,.28);return 1}}},
{c:4,n:'Còi xe',i:'🛵',p:(t,s)=>{if(on(s,12,14)||s==26){const d=s==26?.5:.1;horn(t,d,.16);return 1}}},
{c:4,n:'Ve sầu',i:'🦗',p:(t,s)=>{if(s%16==0){const g=N(t,2.4,.06,'bandpass',5200,4),l=A.createOscillator(),lg=A.createGain();l.frequency.value=42;lg.gain.value=.05;l.connect(lg);lg.connect(g.gain);l.start(t);l.stop(t+2.4);return 1}}},
{c:4,n:'Chuông xe',i:'🚲',p:(t,s)=>{if(on(s,4,5)||s==22){[1,2.76,5.4,8.9].forEach((r,k)=>O('sine',2300*r,t,.9/(k+1),.17/(k+1)));return 1}}}
];
function pad(t){[0,7,9].forEach(m=>{const o=A.createOscillator(),g=A.createGain();o.type='sine';o.frequency.value=f(m+12);g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(.05,t+.8);g.gain.linearRampToValueAtTime(.0001,t+SPB*16);o.connect(g);g.connect(out);o.start(t);o.stop(t+SPB*16+.05)})}

const NS=[
{n:'Mưa',i:'🌧️',p:(t,s)=>{if(s%16==0)N(t,2.5,.04,'bandpass',3000,.5);if(s%2==1){N(t,.05,.06,'highpass',6000);return s%4==1}}},
{n:'Pháo',i:'🧨',p:(t,s)=>{if(on(s,3,4,10,14)){N(t,.06,.35,'bandpass',3500,1.5);O('sine',220,t,.08,.35,60);return 1}}},
{n:'Sáo',i:'🎶',p:(t,s)=>{const m={0:24,4:27,8:29,12:27,16:24,20:22,24:24,28:19}[s];if(m!=null){flute(t,f(m),.8,.24);return 1}}},
{n:'Kèn',i:'🎺',p:(t,s)=>{const m={0:12,6:12,8:15,14:15,16:17,22:15,24:12}[s];if(m!=null){brass(t,f(m),.4,.22);return 1}}},
{n:'Ru',i:'🌙',p:(t,s)=>{const m={0:['o',10,1],16:['a',12,1],24:['o',7,.6]}[s];if(m){voc(t,f(m[1]),m[0],m[2],.24);return 1}}},
{n:'Rao',i:'🛒',p:(t,s)=>{if(s%16==2){const w=RAO[rc++%RAO.length];if(!sp(w,1.05,1.15))voc(t,f(19),'a',.25,.3);return 1}}},
{n:'Hét',i:'🙌',p:(t,s)=>{if(s==4||s==20){if(!sp('Dô ta!',1.15,1.1))voc(t,f(24),'e',.18,.35);return 1}if(s==12||s==28){if(!sp('Hò dô!',1.2,1.2))voc(t,f(22),'a',.4,.35);return 1}}}
];
const SRC=[S0[0],S0[1],S0[2],S0[3],S0[4],S0[10],S0[11],S0[12],NS[0],NS[1],S0[5],S0[6],S0[7],NS[2],NS[3],S0[8],S0[9],NS[4],NS[5],NS[6]];
const CATOF=[0,0,0,0,0,1,1,1,1,1,2,2,2,2,2,3,3,3,3,3];
const SND1=SRC.map((x,i)=>({...x,c:CATOF[i]}));export let SND=SND1;
const BONUS1=[{n:'Giao thừa',ids:[0,9,10,15],c:'#ffd54f'},{n:'Mưa Sài Gòn',ids:[1,8,13,17],c:'#6ec6ff'},{n:'Phố đêm',ids:[3,5,11,18],c:'#ff5d8f'}];
export const bon=[false,false,false],unlocked=new Set();
function bonusLayer(t){
  if(!bon.some(Boolean))return;
  const d=Math.max(0,(t-A.currentTime)*1000);
  if(bon[0]){O('sine',f(24),t,1.8,.1);O('sine',f(31),t+.5,1.5,.08);}
  if(bon[1]){N(t,2.4,.05,'bandpass',2000,.7);}
  if(bon[2]){[24,27,31,34].forEach((m,k)=>O('triangle',f(m),t+k*SPB*4,.3,.12));}
}

let step=0,next=0,timer;const live=[];
export const unlive=i=>{live[i]=false};
export function startSeq(get,flash){init();step=0;next=A.currentTime+.08;clearInterval(timer);timer=setInterval(()=>{const {slots,muted}=get();
 while(next<A.currentTime+.15){if(step%16==0)slots.forEach((id,i)=>{if(id!=null)live[i]=true});
  slots.forEach((id,i)=>{if(id!=null&&live[i]&&!muted[i]){out=pans[i];let r;try{r=SND[id].p(next,step)}finally{out=master}if(r)flash(i,(next-A.currentTime)*1000)}});
  if(step%4==0){const d=(next-A.currentTime)*1000;setTimeout(()=>{beat.v=1},Math.max(0,d))}
  if(step%16==0){pad(next);bonusLayer(next)}next+=SPB;step=(step+1)%32}},25)}
export const stopSeq=()=>clearInterval(timer);
export const wake=()=>init();

try{speechSynthesis.getVoices()}catch(e){}
export const liveAll=()=>{for(let i=0;i<7;i++)live[i]=true};

const CAT1=CAT,CAT2=['Trống','Bass','Giai điệu','Chuông'];
function LP(type,fr,t,d,v,cut){const o=A.createOscillator(),b=A.createBiquadFilter(),g=G(t,v,d);o.type=type;o.frequency.value=fr;b.type='lowpass';b.frequency.value=cut;o.connect(b);b.connect(g);o.start(t);o.stop(t+d+.05)}
const pt=(m,s,fn)=>{const x=m[s];if(x!=null){fn(x);return 1}};
const SND2=[
{c:0,n:'Basedrum',i:'🪨',p:(t,s)=>{if(on(s,0,6,8,11)||s==30){O('sine',140,t,.22,.9,40);N(t,.03,.35,'lowpass',500);return 1}}},
{c:0,n:'Snare',i:'🏜️',p:(t,s)=>{if(on(s,4,12)||s==30){N(t,.12,.4,'bandpass',2500,.8);O('triangle',200,t,.06,.25,120);return 1}}},
{c:0,n:'Hat',i:'🧊',p:(t,s)=>{if(s%2==0){N(t,.03,s%4?.12:.2,'highpass',8000);return 1}}},
{c:0,n:'Cow Bell',i:'🔔',p:(t,s)=>{if(on(s,2,10,13)){O('square',540,t,.25,.1);O('square',800,t,.25,.08);return 1}}},
{c:1,n:'Bass',i:'🪵',p:(t,s)=>pt({0:0,3:0,6:5,8:7,11:5,14:2},s%16,m=>LP('square',f(m-12),t,.3,.35,500))},
{c:1,n:'Didgeridoo',i:'🎃',p:(t,s)=>{if(s%8==0){LP('sawtooth',f(-12),t,.9,.3,350);LP('sawtooth',f(-12)*1.01,t,.9,.2,300);return 1}}},
{c:1,n:'Bit',i:'👾',p:(t,s)=>{if(s%2==0){O('square',f([0,2,5,7,9,7,5,2][(s/2)%8]+12),t,.12,.12);return 1}}},
{c:1,n:'Guitar',i:'🎸',p:(t,s)=>pt({0:0,3:7,6:9,8:7,11:5,14:2},s%16,m=>ks(t,f(m+12),.8,.5))},
{c:2,n:'Harp',i:'🌿',p:(t,s)=>{if(s%2==0){const m=[12,14,17,19,21,19,17,14][(s/2)%8];O('sine',f(m),t,.5,.3);O('triangle',f(m)*2,t,.2,.1);return 1}}},
{c:2,n:'Flute',i:'🧱',p:(t,s)=>pt({0:24,6:21,10:19,16:17,22:19,26:21},s,m=>flute(t,f(m),.5,.22))},
{c:2,n:'Banjo',i:'🌾',p:(t,s)=>{if(s%3==0){ks(t,f([12,14,19,14][(s/3|0)%4]+12),.35,.5);return 1}}},
{c:2,n:'Pling',i:'💡',p:(t,s)=>pt({0:19,8:24,16:21,24:17},s,m=>{O('sine',f(m),t,.5,.25);O('triangle',f(m)*2,t,.3,.1)})},
{c:3,n:'Bell',i:'🛎️',p:(t,s)=>pt({0:24,10:21,20:28},s,m=>[1,2.4,4.1].forEach((r,k)=>O('sine',f(m)*r,t,1.2/(k+1),.14/(k+1))))},
{c:3,n:'Chime',i:'❄️',p:(t,s)=>pt({4:31,14:29,22:33,28:26},s,m=>[1,3.1,5.3].forEach((r,k)=>O('sine',f(m)*r,t,.8/(k+1),.1/(k+1))))},
{c:3,n:'Xylophone',i:'🦴',p:(t,s)=>pt({0:24,3:26,6:28,10:26,16:24,19:21,22:26,26:24},s,m=>{O('sine',f(m),t,.2,.3);O('sine',f(m)*3,t,.08,.12)})},
{c:3,n:'Iron Xylo',i:'⚙️',p:(t,s)=>pt({2:19,8:24,12:26,18:21,24:26,28:28},s,m=>{O('triangle',f(m),t,.5,.25);O('sine',f(m)*2.76,t,.15,.1)})}
];
const BONUS2=[{n:'Creeper nổ',ids:[0,1,3,12],c:'#5aa02c'},{n:'Mưa trong hang',ids:[2,5,9,13],c:'#6ec6ff'},{n:'Đêm Nether',ids:[4,6,11,15],c:'#b83a2a'}];
export let BONUS=BONUS1;
export const setLevel=n=>{SND=n?SND2:SND1;BONUS=n?BONUS2:BONUS1;CAT=n?CAT2:CAT1;bon.fill(false)};
