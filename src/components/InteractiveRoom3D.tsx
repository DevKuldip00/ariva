import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Eye, RotateCcw, Sparkles, Sun, Moon, Sunrise, Layers, Info, X } from 'lucide-react';

interface Hotspot {
  id: string;
  name: string;
  position: [number, number, number];
  category: string;
  description: string;
  specification: string;
}

const HOTSPOTS: Hotspot[] = [
  {
    id: 'fluted-wall',
    name: 'Acoustic Fluted Wall',
    position: [0, 1.8, -4.8],
    category: 'Architectural Joinery',
    description: 'Precision vertical fluted timber slats designed to dampen reverberation while adding sculptural warmth.',
    specification: 'Handcrafted natural oak / smoked walnut with 12mm shadow gap reveals and integrated cove LED strip.',
  },
  {
    id: 'curved-sofa',
    name: 'Curved Bouclé Lounge',
    position: [0, 0.65, 0],
    category: 'Bespoke Furniture',
    description: 'Organic low-profile curved sofa sculpted for 360-degree spatial dialogue and ergonomic relaxation.',
    specification: 'High-density memory foam core wrapped in tactile warm ivory Italian bouclé textile.',
  },
  {
    id: 'stone-table',
    name: 'Honed Travertine Table',
    position: [0, 0.45, 1.2],
    category: 'Natural Stone',
    description: 'Monolithic coffee table crafted from single slab travertine with soft matte honed surface.',
    specification: 'Roman travertine with filled pore finish and 45° chamfered under-edge detail.',
  },
  {
    id: 'glazing-courtyard',
    name: 'Courtyard Glass Vista',
    position: [-4.8, 2, 0],
    category: 'Spatial Glazing',
    description: 'Floor-to-ceiling slimline glass curtain wall connecting the interior volume to the lush Ahmedabad courtyard.',
    specification: 'Double-glazed Low-E acoustic glass with thermally broken architectural bronze framing.',
  },
];

export const InteractiveRoom3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null);
  const [wallMaterial, setWallMaterial] = useState<'travertine' | 'oak' | 'limewash'>('travertine');
  const [lightingMode, setLightingMode] = useState<'morning' | 'golden' | 'evening'>('golden');
  const [isInteracting, setIsInteracting] = useState(false);
  const [webGLSupported, setWebGLSupported] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  // References to three objects for runtime adjustments
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const backWallMaterialRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const dirLightRef = useRef<THREE.DirectionalLight | null>(null);
  const ambientLightRef = useRef<THREE.AmbientLight | null>(null);
  const coveLightRef = useRef<THREE.PointLight | null>(null);
  const requestRef = useRef<number | null>(null);
  const isVisibleRef = useRef<boolean>(true);

  // Orbit controls state
  const isDraggingRef = useRef<boolean>(false);
  const previousMousePositionRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const cameraAngleRef = useRef<{ phi: number; theta: number; distance: number }>({
    phi: Math.PI / 4.2, // Elevation angle
    theta: Math.PI / 1.35, // Azimuth angle
    distance: 7.2,
  });

  const resetCamera = () => {
    cameraAngleRef.current = {
      phi: Math.PI / 4.2,
      theta: Math.PI / 1.35,
      distance: 7.2,
    };
    setSelectedHotspot(null);
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check WebGL support
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setWebGLSupported(false);
        setIsLoading(false);
        return;
      }
    } catch {
      setWebGLSupported(false);
      setIsLoading(false);
      return;
    }

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 520;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x131614);
    scene.fog = new THREE.FogExp2(0x131614, 0.04);

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(48, width / height, 0.1, 100);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    rendererRef.current = renderer;
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 4. Room Geometry & Meshes
    // Floor: Honed light limestone with gentle reflectivity
    const floorGeo = new THREE.PlaneGeometry(12, 12);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0xded8ce,
      roughness: 0.35,
      metalness: 0.08,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    // Ceiling
    const ceilingGeo = new THREE.PlaneGeometry(12, 12);
    const ceilingMat = new THREE.MeshStandardMaterial({
      color: 0xf5f2ec,
      roughness: 0.85,
    });
    const ceiling = new THREE.Mesh(ceilingGeo, ceilingMat);
    ceiling.position.y = 4.2;
    ceiling.rotation.x = Math.PI / 2;
    scene.add(ceiling);

    // Back Feature Wall
    const backWallGeo = new THREE.PlaneGeometry(12, 4.2);
    const backWallMat = new THREE.MeshStandardMaterial({
      color: 0xd7cfbf, // default travertine
      roughness: 0.6,
      metalness: 0.05,
    });
    backWallMaterialRef.current = backWallMat;
    const backWall = new THREE.Mesh(backWallGeo, backWallMat);
    backWall.position.set(0, 2.1, -5);
    backWall.receiveShadow = true;
    scene.add(backWall);

    // Vertical Acoustic Slats on Back Wall
    const slatGroup = new THREE.Group();
    const slatGeo = new THREE.BoxGeometry(0.04, 4.2, 0.04);
    const slatMat = new THREE.MeshStandardMaterial({
      color: 0x3d3126,
      roughness: 0.6,
    });
    for (let x = -2.4; x <= 2.4; x += 0.12) {
      const slat = new THREE.Mesh(slatGeo, slatMat);
      slat.position.set(x, 2.1, -4.95);
      slat.castShadow = true;
      slatGroup.add(slat);
    }
    scene.add(slatGroup);

    // Right Wall with recessed display shelf
    const rightWallGeo = new THREE.PlaneGeometry(12, 4.2);
    const rightWallMat = new THREE.MeshStandardMaterial({
      color: 0xede8df,
      roughness: 0.8,
    });
    const rightWall = new THREE.Mesh(rightWallGeo, rightWallMat);
    rightWall.position.set(5, 2.1, 0);
    rightWall.rotation.y = -Math.PI / 2;
    rightWall.receiveShadow = true;
    scene.add(rightWall);

    // Left Wall: Architectural Floor-to-Ceiling Window
    const windowFrameGeo = new THREE.BoxGeometry(0.1, 4.2, 10);
    const windowFrameMat = new THREE.MeshStandardMaterial({
      color: 0x1d211f,
      roughness: 0.4,
    });
    const windowFrame = new THREE.Mesh(windowFrameGeo, windowFrameMat);
    windowFrame.position.set(-5, 2.1, 0);
    scene.add(windowFrame);

    // Courtyard Backdrop outside the glass
    const courtyardGeo = new THREE.PlaneGeometry(14, 6);
    const courtyardMat = new THREE.MeshBasicMaterial({
      color: 0x223528,
    });
    const courtyard = new THREE.Mesh(courtyardGeo, courtyardMat);
    courtyard.position.set(-6.5, 2.5, 0);
    courtyard.rotation.y = Math.PI / 2;
    scene.add(courtyard);

    // Curved Bouclé Sofa
    const sofaGroup = new THREE.Group();
    const sofaMat = new THREE.MeshStandardMaterial({
      color: 0xf5f3ee,
      roughness: 0.9,
      metalness: 0.02,
    });
    // Base cushion
    const sofaBaseGeo = new THREE.CylinderGeometry(1.6, 1.8, 0.45, 32, 1, false, 0, Math.PI * 0.9);
    const sofaBase = new THREE.Mesh(sofaBaseGeo, sofaMat);
    sofaBase.position.set(0, 0.22, 0);
    sofaBase.rotation.y = -Math.PI * 0.95;
    sofaBase.castShadow = true;
    sofaBase.receiveShadow = true;
    sofaGroup.add(sofaBase);

    // Backrest curve
    const sofaBackGeo = new THREE.CylinderGeometry(1.5, 1.7, 0.55, 32, 1, true, 0, Math.PI * 0.9);
    const sofaBackMat = new THREE.MeshStandardMaterial({
      color: 0xf2eee6,
      roughness: 0.92,
      side: THREE.DoubleSide,
    });
    const sofaBack = new THREE.Mesh(sofaBackGeo, sofaBackMat);
    sofaBack.position.set(0, 0.55, 0);
    sofaBack.rotation.y = -Math.PI * 0.95;
    sofaBack.castShadow = true;
    sofaGroup.add(sofaBack);

    // Accent Pillows
    const pillowGeo = new THREE.BoxGeometry(0.4, 0.4, 0.15);
    const olivePillowMat = new THREE.MeshStandardMaterial({ color: 0x5a634e, roughness: 0.8 });
    const rustPillowMat = new THREE.MeshStandardMaterial({ color: 0x9e6044, roughness: 0.8 });

    const pillow1 = new THREE.Mesh(pillowGeo, olivePillowMat);
    pillow1.position.set(-0.8, 0.52, -0.4);
    pillow1.rotation.set(0.1, 0.5, 0.2);
    pillow1.castShadow = true;
    sofaGroup.add(pillow1);

    const pillow2 = new THREE.Mesh(pillowGeo, rustPillowMat);
    pillow2.position.set(0.8, 0.52, -0.3);
    pillow2.rotation.set(0.1, -0.4, -0.15);
    pillow2.castShadow = true;
    sofaGroup.add(pillow2);

    scene.add(sofaGroup);

    // Travertine Coffee Table
    const tableGroup = new THREE.Group();
    const tableTopGeo = new THREE.CylinderGeometry(0.75, 0.75, 0.08, 32);
    const tableTopMat = new THREE.MeshStandardMaterial({
      color: 0xd4cbbe,
      roughness: 0.45,
      metalness: 0.05,
    });
    const tableTop = new THREE.Mesh(tableTopGeo, tableTopMat);
    tableTop.position.set(0, 0.38, 1.3);
    tableTop.castShadow = true;
    tableTop.receiveShadow = true;
    tableGroup.add(tableTop);

    // Table stone base
    const tableBaseGeo = new THREE.CylinderGeometry(0.35, 0.45, 0.34, 32);
    const tableBase = new THREE.Mesh(tableBaseGeo, tableTopMat);
    tableBase.position.set(0, 0.17, 1.3);
    tableBase.castShadow = true;
    tableGroup.add(tableBase);

    // Minimal Ceramic Bowl on table
    const bowlGeo = new THREE.CylinderGeometry(0.14, 0.06, 0.08, 16);
    const bowlMat = new THREE.MeshStandardMaterial({ color: 0x2b241e, roughness: 0.3 });
    const bowl = new THREE.Mesh(bowlGeo, bowlMat);
    bowl.position.set(0.1, 0.46, 1.25);
    tableGroup.add(bowl);

    scene.add(tableGroup);

    // Floating Smoked Oak Credenza on Right Wall
    const credenzaGeo = new THREE.BoxGeometry(0.5, 0.45, 3.2);
    const credenzaMat = new THREE.MeshStandardMaterial({
      color: 0x2d251f,
      roughness: 0.55,
    });
    const credenza = new THREE.Mesh(credenzaGeo, credenzaMat);
    credenza.position.set(4.65, 0.7, 0);
    credenza.castShadow = true;
    credenza.receiveShadow = true;
    scene.add(credenza);

    // Architectural Linear Chandelier / Ring
    const pendantRingGeo = new THREE.TorusGeometry(0.9, 0.02, 16, 64);
    const pendantMat = new THREE.MeshStandardMaterial({
      color: 0xc5a880, // champagne bronze
      roughness: 0.25,
      metalness: 0.85,
    });
    const pendantRing = new THREE.Mesh(pendantRingGeo, pendantMat);
    pendantRing.rotation.x = Math.PI / 2;
    pendantRing.position.set(0, 3.2, 0.5);
    scene.add(pendantRing);

    // Fine suspension wire
    const wireGeo = new THREE.CylinderGeometry(0.005, 0.005, 1);
    const wire1 = new THREE.Mesh(wireGeo, pendantMat);
    wire1.position.set(-0.6, 3.7, 0.5);
    scene.add(wire1);
    const wire2 = new THREE.Mesh(wireGeo, pendantMat);
    wire2.position.set(0.6, 3.7, 0.5);
    scene.add(wire2);

    // 5. Lighting Setup
    // Ambient Light
    const ambientLight = new THREE.AmbientLight(0xfff6ea, 0.9);
    ambientLightRef.current = ambientLight;
    scene.add(ambientLight);

    // Main Directional Light (Sunlight through courtyard glass)
    const dirLight = new THREE.DirectionalLight(0xffecd0, 1.6);
    dirLightRef.current = dirLight;
    dirLight.position.set(-7, 6, 3);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    dirLight.shadow.bias = -0.0005;
    dirLight.shadow.camera.near = 0.5;
    dirLight.shadow.camera.far = 25;
    dirLight.shadow.camera.left = -6;
    dirLight.shadow.camera.right = 6;
    dirLight.shadow.camera.top = 6;
    dirLight.shadow.camera.bottom = -6;
    scene.add(dirLight);

    // Architectural Perimeter Cove Accent Light
    const coveLight = new THREE.PointLight(0xffcf99, 1.8, 9);
    coveLightRef.current = coveLight;
    coveLight.position.set(0, 3.9, -4.5);
    scene.add(coveLight);

    // 6. Interaction Handlers (Mouse & Touch Orbiting)
    const onMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      setIsInteracting(true);
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const deltaX = e.clientX - previousMousePositionRef.current.x;
      const deltaY = e.clientY - previousMousePositionRef.current.y;

      cameraAngleRef.current.theta -= deltaX * 0.006;
      cameraAngleRef.current.phi = Math.max(0.15, Math.min(Math.PI / 2.3, cameraAngleRef.current.phi + deltaY * 0.005));

      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDraggingRef.current = false;
      setIsInteracting(false);
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      cameraAngleRef.current.distance = Math.max(4.2, Math.min(10.5, cameraAngleRef.current.distance + e.deltaY * 0.005));
    };

    // Touch controls
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDraggingRef.current = true;
        setIsInteracting(true);
        previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMousePositionRef.current.x;
      const deltaY = e.touches[0].clientY - previousMousePositionRef.current.y;

      cameraAngleRef.current.theta -= deltaX * 0.008;
      cameraAngleRef.current.phi = Math.max(0.15, Math.min(Math.PI / 2.3, cameraAngleRef.current.phi + deltaY * 0.007));

      previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const onTouchEnd = () => {
      isDraggingRef.current = false;
      setIsInteracting(false);
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    domElement.addEventListener('wheel', onWheel, { passive: false });

    domElement.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // 7. Resize Observer
    const handleResize = () => {
      if (!container || !camera || !renderer) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // 8. Visibility Observer to throttle when scrolled out of view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    // 9. Animation Loop
    let currentTheta = cameraAngleRef.current.theta;
    let currentPhi = cameraAngleRef.current.phi;
    let currentDistance = cameraAngleRef.current.distance;

    const animate = () => {
      requestRef.current = requestAnimationFrame(animate);

      if (!isVisibleRef.current) return;

      // Smooth damping toward target angles
      currentTheta += (cameraAngleRef.current.theta - currentTheta) * 0.08;
      currentPhi += (cameraAngleRef.current.phi - currentPhi) * 0.08;
      currentDistance += (cameraAngleRef.current.distance - currentDistance) * 0.08;

      // Auto gentle idle drift when user is not actively dragging
      if (!isDraggingRef.current && !selectedHotspot) {
        cameraAngleRef.current.theta += 0.0007;
      }

      // Compute camera coordinates from spherical
      camera.position.x = currentDistance * Math.sin(currentPhi) * Math.sin(currentTheta);
      camera.position.y = currentDistance * Math.cos(currentPhi) + 0.8;
      camera.position.z = currentDistance * Math.sin(currentPhi) * Math.cos(currentTheta);

      const targetLookAt = selectedHotspot
        ? new THREE.Vector3(...selectedHotspot.position)
        : new THREE.Vector3(0, 1.2, 0);

      camera.lookAt(targetLookAt);
      renderer.render(scene, camera);
    };

    setIsLoading(false);
    animate();

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      observer.disconnect();

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Update wall finish dynamically
  useEffect(() => {
    if (!backWallMaterialRef.current) return;
    if (wallMaterial === 'travertine') {
      backWallMaterialRef.current.color.setHex(0xd7cfbf);
      backWallMaterialRef.current.roughness = 0.55;
    } else if (wallMaterial === 'oak') {
      backWallMaterialRef.current.color.setHex(0x382c23);
      backWallMaterialRef.current.roughness = 0.65;
    } else {
      backWallMaterialRef.current.color.setHex(0xf1ece4);
      backWallMaterialRef.current.roughness = 0.88;
    }
  }, [wallMaterial]);

  // Update lighting atmosphere dynamically
  useEffect(() => {
    if (!dirLightRef.current || !ambientLightRef.current || !coveLightRef.current || !sceneRef.current) return;

    if (lightingMode === 'morning') {
      dirLightRef.current.color.setHex(0xfff4e0);
      dirLightRef.current.intensity = 1.8;
      ambientLightRef.current.color.setHex(0xfff7ed);
      ambientLightRef.current.intensity = 1.0;
      coveLightRef.current.intensity = 1.2;
      sceneRef.current.background = new THREE.Color(0x1a211d);
    } else if (lightingMode === 'golden') {
      dirLightRef.current.color.setHex(0xffcb88);
      dirLightRef.current.intensity = 2.1;
      ambientLightRef.current.color.setHex(0xffe8cc);
      ambientLightRef.current.intensity = 0.85;
      coveLightRef.current.intensity = 2.0;
      coveLightRef.current.color.setHex(0xffbb77);
      sceneRef.current.background = new THREE.Color(0x181a17);
    } else {
      // Evening Ambient
      dirLightRef.current.color.setHex(0x446688);
      dirLightRef.current.intensity = 0.5;
      ambientLightRef.current.color.setHex(0x223344);
      ambientLightRef.current.intensity = 0.55;
      coveLightRef.current.intensity = 2.8;
      coveLightRef.current.color.setHex(0xffaa55);
      sceneRef.current.background = new THREE.Color(0x0e1110);
    }
  }, [lightingMode]);

  const handleHotspotClick = (hotspot: Hotspot) => {
    setSelectedHotspot(hotspot);
    // Smooth camera focal point shift
    if (cameraAngleRef.current) {
      if (hotspot.id === 'fluted-wall') {
        cameraAngleRef.current = { phi: Math.PI / 4.6, theta: Math.PI, distance: 5.6 };
      } else if (hotspot.id === 'curved-sofa') {
        cameraAngleRef.current = { phi: Math.PI / 3.8, theta: Math.PI * 0.8, distance: 4.8 };
      } else if (hotspot.id === 'stone-table') {
        cameraAngleRef.current = { phi: Math.PI / 3.4, theta: Math.PI * 0.65, distance: 4.5 };
      } else if (hotspot.id === 'glazing-courtyard') {
        cameraAngleRef.current = { phi: Math.PI / 4.2, theta: Math.PI * 1.45, distance: 6.2 };
      }
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%', borderRadius: '4px', overflow: 'hidden', background: '#111614' }}>
      {/* 3D Canvas Container */}
      <div
        ref={mountRef}
        style={{
          width: '100%',
          height: 'clamp(460px, 60vh, 680px)',
          cursor: isInteracting ? 'grabbing' : 'grab',
          touchAction: 'none',
        }}
      />

      {/* WebGL Fallback */}
      {!webGLSupported && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            textAlign: 'center',
            background: 'linear-gradient(rgba(17,22,20,0.85), rgba(17,22,20,0.95)), url(/images/hero-penthouse.jpg) center/cover',
          }}
        >
          <img src="/images/hero-penthouse.jpg" alt="Ariva Living Interior Architecture" style={{ maxWidth: '80%', maxHeight: '60%', borderRadius: '4px', marginBottom: '1.5rem', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }} />
          <h3 style={{ color: '#F9F7F2', fontSize: '1.6rem', marginBottom: '0.5rem' }}>Interactive Room Gallery</h3>
          <p style={{ color: '#A3A99E', maxWidth: '520px', fontSize: '0.95rem' }}>
            WebGL hardware acceleration is paused in your browser. Explore our high-resolution completed architectural suites above.
          </p>
        </div>
      )}

      {/* Loading Overlay */}
      {isLoading && webGLSupported && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#111614',
            color: '#c5a880',
            fontFamily: 'var(--font-sans)',
            fontSize: '0.9rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '32px', height: '32px', border: '2px solid rgba(197,168,128,0.2)', borderTopColor: '#c5a880', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
            <span>Initializing 3D Architectural Scene...</span>
          </div>
        </div>
      )}

      {/* Top Controls Bar */}
      <div
        style={{
          position: 'absolute',
          top: '1.25rem',
          left: '1.25rem',
          right: '1.25rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.75rem',
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            background: 'rgba(20, 26, 23, 0.85)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(197, 168, 128, 0.25)',
            borderRadius: '3px',
            padding: '0.5rem 1rem',
            pointerEvents: 'auto',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
          }}
        >
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#c5a880', boxShadow: '0 0 10px #c5a880' }} />
          <span style={{ fontSize: '0.75rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#F9F7F2', fontWeight: 600 }}>
            Real-time 3D Architectural Studio
          </span>
        </div>

        <button
          onClick={resetCamera}
          style={{
            background: 'rgba(20, 26, 23, 0.85)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(197, 168, 128, 0.25)',
            color: '#F9F7F2',
            borderRadius: '3px',
            padding: '0.5rem 0.9rem',
            fontSize: '0.75rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem',
            pointerEvents: 'auto',
            transition: 'all 0.3s ease',
          }}
          title="Reset Camera View"
        >
          <RotateCcw size={13} color="#c5a880" />
          <span>Reset Camera</span>
        </button>
      </div>

      {/* Floating Hotspot Selectors (Quick Links) */}
      <div
        style={{
          position: 'absolute',
          left: '1.25rem',
          bottom: '1.25rem',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem',
          maxWidth: '520px',
          zIndex: 10,
        }}
      >
        {HOTSPOTS.map((spot) => (
          <button
            key={spot.id}
            onClick={() => handleHotspotClick(spot)}
            style={{
              background: selectedHotspot?.id === spot.id ? '#c5a880' : 'rgba(20, 26, 23, 0.88)',
              color: selectedHotspot?.id === spot.id ? '#111614' : '#F9F7F2',
              backdropFilter: 'blur(10px)',
              border: selectedHotspot?.id === spot.id ? '1px solid #c5a880' : '1px solid rgba(197, 168, 128, 0.2)',
              borderRadius: '2px',
              padding: '0.45rem 0.85rem',
              fontSize: '0.75rem',
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              transition: 'all 0.25s ease',
            }}
          >
            <Sparkles size={12} color={selectedHotspot?.id === spot.id ? '#111614' : '#c5a880'} />
            <span>{spot.name}</span>
          </button>
        ))}
      </div>

      {/* Right Customizer Panel (Wall Material & Lighting Mode) */}
      <div
        style={{
          position: 'absolute',
          right: '1.25rem',
          bottom: '1.25rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.65rem',
          zIndex: 10,
        }}
      >
        {/* Wall Finish Switcher */}
        <div
          style={{
            background: 'rgba(20, 26, 23, 0.88)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(197, 168, 128, 0.25)',
            borderRadius: '3px',
            padding: '0.6rem 0.85rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.4rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#c5a880' }}>
            <Layers size={12} />
            <span>Wall Finish</span>
          </div>
          <div style={{ display: 'flex', gap: '0.35rem' }}>
            <button
              onClick={() => setWallMaterial('travertine')}
              style={{
                fontSize: '0.7rem',
                padding: '0.3rem 0.6rem',
                borderRadius: '2px',
                background: wallMaterial === 'travertine' ? '#c5a880' : 'rgba(255,255,255,0.06)',
                color: wallMaterial === 'travertine' ? '#111614' : '#F9F7F2',
                fontWeight: wallMaterial === 'travertine' ? 600 : 400,
              }}
            >
              Travertine
            </button>
            <button
              onClick={() => setWallMaterial('oak')}
              style={{
                fontSize: '0.7rem',
                padding: '0.3rem 0.6rem',
                borderRadius: '2px',
                background: wallMaterial === 'oak' ? '#c5a880' : 'rgba(255,255,255,0.06)',
                color: wallMaterial === 'oak' ? '#111614' : '#F9F7F2',
                fontWeight: wallMaterial === 'oak' ? 600 : 400,
              }}
            >
              Smoked Oak
            </button>
            <button
              onClick={() => setWallMaterial('limewash')}
              style={{
                fontSize: '0.7rem',
                padding: '0.3rem 0.6rem',
                borderRadius: '2px',
                background: wallMaterial === 'limewash' ? '#c5a880' : 'rgba(255,255,255,0.06)',
                color: wallMaterial === 'limewash' ? '#111614' : '#F9F7F2',
                fontWeight: wallMaterial === 'limewash' ? 600 : 400,
              }}
            >
              Limewash
            </button>
          </div>
        </div>

        {/* Lighting Mode Switcher */}
        <div
          style={{
            background: 'rgba(20, 26, 23, 0.88)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(197, 168, 128, 0.25)',
            borderRadius: '3px',
            padding: '0.6rem 0.85rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.4rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#c5a880' }}>
            <Eye size={12} />
            <span>Atmosphere</span>
          </div>
          <div style={{ display: 'flex', gap: '0.35rem' }}>
            <button
              onClick={() => setLightingMode('morning')}
              title="Morning Daylight"
              style={{
                fontSize: '0.7rem',
                padding: '0.3rem 0.6rem',
                borderRadius: '2px',
                background: lightingMode === 'morning' ? '#c5a880' : 'rgba(255,255,255,0.06)',
                color: lightingMode === 'morning' ? '#111614' : '#F9F7F2',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
              }}
            >
              <Sunrise size={11} /> Morning
            </button>
            <button
              onClick={() => setLightingMode('golden')}
              title="Golden Hour Sunset"
              style={{
                fontSize: '0.7rem',
                padding: '0.3rem 0.6rem',
                borderRadius: '2px',
                background: lightingMode === 'golden' ? '#c5a880' : 'rgba(255,255,255,0.06)',
                color: lightingMode === 'golden' ? '#111614' : '#F9F7F2',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
              }}
            >
              <Sun size={11} /> Golden
            </button>
            <button
              onClick={() => setLightingMode('evening')}
              title="Evening Ambient"
              style={{
                fontSize: '0.7rem',
                padding: '0.3rem 0.6rem',
                borderRadius: '2px',
                background: lightingMode === 'evening' ? '#c5a880' : 'rgba(255,255,255,0.06)',
                color: lightingMode === 'evening' ? '#111614' : '#F9F7F2',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
              }}
            >
              <Moon size={11} /> Evening
            </button>
          </div>
        </div>
      </div>

      {/* Selected Hotspot Detail Card */}
      {selectedHotspot && (
        <div
          style={{
            position: 'absolute',
            top: '4.5rem',
            left: '1.25rem',
            maxWidth: '340px',
            background: 'rgba(20, 26, 23, 0.94)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(197, 168, 128, 0.4)',
            borderRadius: '3px',
            padding: '1.25rem',
            color: '#F9F7F2',
            boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
            zIndex: 20,
            animation: 'fadeIn 0.3s ease',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
            <div>
              <span style={{ fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#c5a880' }}>
                {selectedHotspot.category}
              </span>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: '#F9F7F2', marginTop: '0.2rem' }}>
                {selectedHotspot.name}
              </h4>
            </div>
            <button
              onClick={() => setSelectedHotspot(null)}
              style={{ color: '#A3A99E', padding: '0.2rem' }}
              title="Close specification"
            >
              <X size={16} />
            </button>
          </div>
          <p style={{ fontSize: '0.85rem', color: '#D6CFBF', lineHeight: 1.6, marginBottom: '0.85rem' }}>
            {selectedHotspot.description}
          </p>
          <div
            style={{
              padding: '0.65rem 0.8rem',
              background: 'rgba(197, 168, 128, 0.08)',
              borderLeft: '2px solid #c5a880',
              fontSize: '0.78rem',
              color: '#F7F5F0',
              lineHeight: 1.5,
            }}
          >
            <strong style={{ color: '#c5a880', display: 'block', marginBottom: '0.2rem' }}>Architectural Detail:</strong>
            {selectedHotspot.specification}
          </div>
        </div>
      )}

      {/* Orbit Gesture Helper Note */}
      <div
        style={{
          position: 'absolute',
          bottom: '0.6rem',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '0.7rem',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'rgba(214, 207, 191, 0.6)',
          pointerEvents: 'none',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <span>Drag to orbit 360° · Scroll or pinch to zoom · Select hotspots to inspect</span>
      </div>
    </div>
  );
};
