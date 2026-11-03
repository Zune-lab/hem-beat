import {useEffect,useRef} from 'react';import * as T from 'three';import {beat} from './audio.js';
export default function Lanterns(){const r=useRef();useEffect(()=>{
  const el=r.current,w=el.clientWidth,h=el.clientHeight,R=new T.WebGLRenderer({alpha:true,antialias:true});R.setSize(w,h);R.setPixelRatio(devicePixelRatio);el.append(R.domElement);
  const sc=new T.Scene(),cam=new T.PerspectiveCamera(40,w/h,.1,100);cam.position.z=14;
  sc.add(new T.AmbientLight(0xffffff,1.3));const pl=new T.PointLight(0xffc070,80,40);pl.position.set(0,2,9);sc.add(pl);
  const vw=10.2*w/h,mat=c=>new T.MeshStandardMaterial({color:c,roughness:.65,emissive:0x4a1008}),gs=[];
  for(let i=0;i<9;i++){const g=new T.Group(),m=new T.Mesh(new T.SphereGeometry(1,24,16),mat(i%3?0xb83a2a:0xd9992b)),cap=new T.Mesh(new T.CylinderGeometry(.5,.5,.22,16),mat(0x2b1a12)),tas=new T.Mesh(new T.CylinderGeometry(.06,.14,.9,8),mat(0xd9992b));
    m.scale.y=1.25;m.position.y=-1.6;cap.position.y=-.2;tas.position.y=-3.5;g.add(m,cap,tas);g.position.set((i/8-.5)*vw*.92,4.6-(i%2)*1.1,0);g.scale.setScalar(.7);g.userData.p=i;sc.add(g);gs.push(g)}
  let q;const loop=t=>{q=requestAnimationFrame(loop);beat.v*=.93;gs.forEach(o=>{o.rotation.z=Math.sin(t/900+o.userData.p*1.7)*(.12+beat.v*.12);o.scale.setScalar(.7*(1+beat.v*.07))});R.render(sc,cam)};loop(0);
  return()=>{cancelAnimationFrame(q);R.dispose();R.domElement.remove()}},[]);
  return <div ref={r} className="pointer-events-none absolute inset-x-0 top-0 z-10 h-36"/>}
