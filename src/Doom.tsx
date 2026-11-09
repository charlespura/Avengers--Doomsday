import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function Doom({ motion }: { motion: boolean }) {
  const host = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    if (!host.current) return;
    const el = host.current;
    let renderer: THREE.WebGLRenderer;
    try { renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true }); } catch { setFailed(true); return; }
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    el.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, .1, 100);
    const model = new THREE.Group(); scene.add(model);
    const steel = new THREE.MeshStandardMaterial({ color: '#9fa9a3', metalness: .85, roughness: .3, flatShading: true });
    const dark = new THREE.MeshStandardMaterial({ color: '#020403', roughness: 1 });
    const green = new THREE.MeshStandardMaterial({ color: '#123b26', roughness: .95, side: THREE.DoubleSide, flatShading: true });
    const glow = new THREE.MeshBasicMaterial({ color: '#b5ff91' });
    function mesh(geo: THREE.BufferGeometry, mat: THREE.Material, x: number, y: number, z: number, sx=1, sy=1, sz=1) {
      const m = new THREE.Mesh(geo, mat); m.position.set(x,y,z); m.scale.set(sx,sy,sz); model.add(m); return m;
    }
    // A faceted hood frames Doom's angular iron mask and signature mouth grille.
    mesh(new THREE.SphereGeometry(1.24, 12, 12), green, 0,.45,-.28,1,1.22,.7);
    mesh(new THREE.SphereGeometry(.95, 12, 12), dark, 0,.42,.29,1,1.22,.5);
    mesh(new THREE.CylinderGeometry(.68,.46,1.5,6), steel,0,.35,.63,1,1,.4);
    mesh(new THREE.BoxGeometry(.42,.14,.16), dark,-.34,.6,.94).rotation.z=-.12;
    mesh(new THREE.BoxGeometry(.42,.14,.16), dark,.34,.6,.94).rotation.z=.12;
    mesh(new THREE.BoxGeometry(.29,.035,.02), glow,-.34,.6,1.03);
    mesh(new THREE.BoxGeometry(.29,.035,.02), glow,.34,.6,1.03);
    mesh(new THREE.ConeGeometry(.17,.65,4), steel,0,.27,1.04).rotation.x=.2;
    mesh(new THREE.BoxGeometry(.58,.26,.12), dark,0,-.12,.98);
    for(let i=0;i<7;i++) mesh(new THREE.BoxGeometry(.035,.23,.08),steel,(i-3)*.075,-.12,1.06);
    mesh(new THREE.BoxGeometry(.55,.16,.17),steel,0,-.39,.94);
    for(const x of [-.63,.63]) for(const y of [.96,.13,-.28]) mesh(new THREE.SphereGeometry(.045,8,6),steel,x,y,.85);
    // Keep the mask details, but give the head human proportions above a full body.
    const head = new THREE.Group();
    [...model.children].forEach(part => head.add(part));
    head.scale.setScalar(.43); head.position.set(0,2.25,0); model.add(head);
    const gold = new THREE.MeshStandardMaterial({color:'#a38d49',metalness:.8,roughness:.35});
    const armor = new THREE.MeshStandardMaterial({color:'#66766e',metalness:.8,roughness:.38,flatShading:true});
    const cloth = new THREE.MeshStandardMaterial({color:'#16432b',roughness:1,flatShading:true,side:THREE.DoubleSide});
    mesh(new THREE.CylinderGeometry(.21,.25,.35,10),armor,0,1.94,0);
    mesh(new THREE.CylinderGeometry(.62,.44,1.4,10),cloth,0,1.16,0,1,1,.65);
    mesh(new THREE.SphereGeometry(.59,12,8),armor,0,1.47,.04,1,.65,.62);
    mesh(new THREE.CylinderGeometry(.47,.47,.2,12),dark,0,.49,0,1,1,.72);
    mesh(new THREE.BoxGeometry(.28,.23,.1),gold,0,.49,.36);
    mesh(new THREE.BoxGeometry(.14,.12,.03),dark,0,.49,.42);
    // Short split tunic above separate armored legs.
    for(const side of [-1,1]) {
      const flap=mesh(new THREE.BoxGeometry(.45,.8,.12),cloth,side*.25,0,.3);flap.rotation.z=side*.07;
      mesh(new THREE.CylinderGeometry(.22,.19,1.05,10),armor,side*.29,-.62,0);
      mesh(new THREE.SphereGeometry(.23,10,8),steel,side*.3,-1.19,.06,1,1,.85);
      mesh(new THREE.CylinderGeometry(.19,.15,1.03,10),armor,side*.32,-1.77,0);
      mesh(new THREE.BoxGeometry(.24,.77,.09),steel,side*.32,-1.75,.17);
      mesh(new THREE.BoxGeometry(.39,.3,.7),armor,side*.33,-2.4,.14);
      mesh(new THREE.BoxGeometry(.4,.09,.72),dark,side*.33,-2.57,.14);
      mesh(new THREE.SphereGeometry(.32,10,8),steel,side*.72,1.64,0,1,.75,1.1);
      const upper=mesh(new THREE.CylinderGeometry(.21,.18,.73,10),armor,side*.85,1.14,0);upper.rotation.z=side*.2;
      mesh(new THREE.SphereGeometry(.19,10,8),dark,side*.94,.75,0);
      const forearm=mesh(new THREE.CylinderGeometry(.19,.24,.67,10),steel,side*.98,.37,.05);forearm.rotation.z=side*.06;
      // Layered gauntlet cuffs, closed hands, and individual metal fingers.
      for(let j=0;j<3;j++)mesh(new THREE.CylinderGeometry(.23,.24,.07,10),armor,side*.99,.19+j*.11,.05);
      mesh(new THREE.BoxGeometry(.29,.31,.25),steel,side*1.01,-.12,.07);
      for(let j=0;j<4;j++)mesh(new THREE.BoxGeometry(.055,.18,.09),armor,side*1.01+(j-1.5)*.065,-.24,.2);
      mesh(new THREE.SphereGeometry(.08,8,6),armor,side*.84,-.13,.15,1,1.5,1);
      mesh(new THREE.SphereGeometry(.105,12,8),gold,side*.54,1.77,.36);
    }
    const chain = new THREE.Mesh(new THREE.TorusGeometry(.53,.018,6,40,Math.PI),gold);chain.rotation.z=Math.PI;chain.position.set(0,1.76,.39);chain.scale.y=.38;model.add(chain);
    // An open-front cape: the back and sides flow to the floor without hiding the boots.
    const vertices:number[]=[], indices:number[]=[];
    const columns=40, rows=18;
    for(let row=0;row<=rows;row++) {
      const v=row/rows;
      for(let col=0;col<=columns;col++) {
        const angle=.48+(Math.PI*2-.96)*col/columns;
        const radius=.62+v*.85+Math.sin(col/columns*Math.PI*18)*.055*v;
        vertices.push(Math.sin(angle)*radius,1.85-v*4.39,Math.cos(angle)*radius*.57-.17);
      }
    }
    for(let row=0;row<rows;row++)for(let col=0;col<columns;col++) {
      const a=row*(columns+1)+col,b=a+columns+1;indices.push(a,b,a+1,b,b+1,a+1);
    }
    const capeGeometry=new THREE.BufferGeometry();capeGeometry.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3));capeGeometry.setIndex(indices);capeGeometry.computeVertexNormals();
    mesh(capeGeometry,green,0,0,0);
    // A subtle platform grounds the figure and makes the entire silhouette legible.
    mesh(new THREE.CylinderGeometry(1.55,1.65,.09,64),dark,0,-2.68,0);
    const ring=mesh(new THREE.TorusGeometry(1.51,.012,6,80),glow,0,-2.62,0);ring.rotation.x=Math.PI/2;
    scene.add(new THREE.HemisphereLight('#c5e8d2','#111811',2));
    const light = new THREE.DirectionalLight('#ebffe9',5); light.position.set(-3,4,5);scene.add(light);
    const rim = new THREE.PointLight('#64ff63',25);rim.position.set(2,0,-1);scene.add(rim);
    let pointer=0, frame=0;
    const move=(e:PointerEvent)=>{pointer=(e.clientX-el.getBoundingClientRect().left)/el.clientWidth-.5;};
    el.addEventListener('pointermove',move);
    const resize=new ResizeObserver(()=>{
      const width=el.clientWidth,height=el.clientHeight;
      if(!width||!height)return;
      renderer.setSize(width,height);camera.aspect=width/height;
      // Fit both axes with breathing room, including narrow mobile screens.
      const halfFov=THREE.MathUtils.degToRad(camera.fov/2);
      const distance=Math.max(3.1/Math.tan(halfFov),1.85/(Math.tan(halfFov)*camera.aspect))+1;
      camera.position.set(0,.15,distance);camera.lookAt(0,.15,0);camera.updateProjectionMatrix();
    });resize.observe(el);
    function animate(t:number){frame=requestAnimationFrame(animate);model.rotation.y=motion ? Math.sin(t*.0004)*.12+pointer*.5 : 0;model.position.y=motion ? Math.sin(t*.0008)*.045 : 0;renderer.render(scene,camera);}frame=requestAnimationFrame(animate);
    const lost=(e:Event)=>{e.preventDefault();setFailed(true);};renderer.domElement.addEventListener('webglcontextlost',lost);
    return()=>{cancelAnimationFrame(frame);resize.disconnect();el.removeEventListener('pointermove',move);renderer.domElement.removeEventListener('webglcontextlost',lost);scene.traverse(o=>{if(o instanceof THREE.Mesh){o.geometry.dispose();const mats=Array.isArray(o.material)?o.material:[o.material];mats.forEach(m=>m.dispose());}});renderer.dispose();renderer.domElement.remove();};
  },[motion]);
  return <div className="doom-model" ref={host} role="img" aria-label="Interactive full-body fan-made 3D Doctor Doom with green hood and cape, iron mask, armored arms, gauntlets, belt, legs and boots">{failed && <div className="fallback-mask">◈<span>DOCTOR DOOM</span><small>3D requires WebGL. Explore the dossier below.</small></div>}</div>;
}
