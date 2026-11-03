import {useEffect,useRef} from 'react';import * as T from 'three';import {bon} from './audio.js';
const FW=[0xe0a020,0xd9302a,0x2b3a67,0xb83a2a],FF=[0xe0a020,0xd9302a];
export default function Fx(){const r=useRef();useEffect(()=>{
  const W=innerWidth,H=innerHeight,R=new T.WebGLRenderer({alpha:true});R.setSize(W,H);R.setPixelRatio(Math.min(2,devicePixelRatio));r.current.append(R.domElement);
  const cam=new T.OrthographicCamera(0,W,H,0,-1,1),sc=new T.Scene(),N=900,pos=new Float32Array(N*3),col=new Float32Array(N*3),P=Array.from({length:N},()=>({l:0,x:0,y:-99,vx:0,vy:0,g:0})),geo=new T.BufferGeometry(),c=new T.Color();
  geo.setAttribute('position',new T.BufferAttribute(pos,3));geo.setAttribute('color',new T.BufferAttribute(col,3));
  sc.add(new T.Points(geo,new T.PointsMaterial({size:6,vertexColors:true,sizeAttenuation:false})));
  let k=0,q,last=0,tb=0;
  const emit=(x,y,vx,vy,l,hex,g)=>{k=(k+1)%N;Object.assign(P[k],{x,y,vx,vy,l,g});c.set(hex);col.set([c.r,c.g,c.b],k*3)};
  const loop=t=>{q=requestAnimationFrame(loop);const dt=Math.min(.05,(t-last)/1000);last=t;
    if(bon[0]&&(tb-=dt)<0){tb=.7;const x=W*(.2+Math.random()*.6),y=H*(.5+Math.random()*.35),cl=FW[Math.random()*4|0];for(let i=0;i<70;i++){const a=Math.random()*6.283,s=80+Math.random()*170;emit(x,y,Math.cos(a)*s,Math.sin(a)*s,1.5,cl,240)}}
    if(bon[1])for(let i=0;i<6;i++)emit(Math.random()*W,H+5,0,-520-Math.random()*300,1.6,0x4a78a8,0);
    if(bon[2]&&Math.random()<.5)emit(Math.random()*W,H*.1,(Math.random()-.5)*30,40+Math.random()*50,4,FF[Math.random()*2|0],0);
    P.forEach((p,i)=>{if(p.l>0){p.l-=dt;p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy-=p.g*dt}else p.y=-99;pos[i*3]=p.x;pos[i*3+1]=p.y});
    geo.attributes.position.needsUpdate=geo.attributes.color.needsUpdate=true;R.render(sc,cam)};
  loop(0);return()=>{cancelAnimationFrame(q);R.dispose();R.domElement.remove()}},[]);
  return <div ref={r} className="pointer-events-none fixed inset-0 z-30"/>}
