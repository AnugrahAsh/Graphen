"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Shield, Zap, Search, Lock, Share2, EyeOff, FileText, Database, Code, Globe } from "lucide-react";
import { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float, useGLTF } from "@react-three/drei";

// The custom component to load the user's star3d.glb model
function StarModel() {
  const { scene } = useGLTF("/star3d.glb");
  return (
    <Float speed={2.5} rotationIntensity={1.5} floatIntensity={2}>
      <primitive object={scene} scale={2} />
    </Float>
  );
}

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState("Vault");

  return (
    <div className="min-h-screen bg-maroon font-sans selection:bg-black selection:text-white flex flex-col">
      
      {/* 
        ======================================================================== 
        1. HERO SECTION (Company Intro)
        ========================================================================
      */}
      <div className="p-4 lg:p-6 w-full min-h-[95vh] flex flex-col">
        <div className="bg-[#fcfcfc] rounded-[2.5rem] flex-1 w-full text-black flex flex-col overflow-hidden relative shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]">
          
          {/* Navbar */}
          <nav className="flex items-center justify-between px-8 py-6 z-10 relative">
            <div className="flex items-center">
              <Image src="/logo.png" alt="Graphen Logo" width={64} height={64} className="object-contain" priority />
            </div>
            <div className="hidden lg:flex items-center gap-8 font-medium text-sm">
              <Link href="#about" className="hover:text-maroon transition-opacity">Company</Link>
              <Link href="#showcase" className="hover:text-maroon transition-opacity">Products</Link>
              <Link href="#architecture" className="hover:text-maroon transition-opacity">Engineering</Link>
              <Link href="#contact" className="hover:text-maroon transition-opacity">Contact Us</Link>
            </div>
            <Link 
              href="/dashboard"
              className="bg-maroon text-white px-8 py-3 rounded-full font-bold hover:bg-black transition-colors"
            >
              Enter Workspace
            </Link>
          </nav>

          {/* Hero Content */}
          <div className="flex-1 flex flex-col justify-center px-8 lg:px-16 pb-16 z-10 pt-12">
            <h2 className="text-maroon font-bold tracking-widest uppercase text-sm mb-6">Graphen Systems Inc.</h2>
            <motion.h1 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-[12vw] leading-[0.85] tracking-tighter text-black mb-12 max-w-6xl"
            >
              Engineered for <br/> Absolute Focus.
            </motion.h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
              {["Vault", "Search", "Timeline", "Markdown"].map((tab) => (
                <div 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`cursor-pointer rounded-3xl p-6 h-48 flex flex-col transition-all duration-500 border-2 ${
                    activeTab === tab 
                      ? "bg-maroon border-maroon text-white shadow-lg scale-[1.02]" 
                      : "bg-transparent border-maroon text-maroon hover:bg-maroon/5"
                  }`}
                >
                  <div className="flex justify-between items-start font-bold text-xl">
                    <span>{tab}</span>
                    {tab === "Vault" && <Lock size={24} />}
                    {tab === "Search" && <Search size={24} />}
                    {tab === "Timeline" && <Zap size={24} />}
                    {tab === "Markdown" && <BookOpen size={24} />}
                  </div>
                  {activeTab === tab && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-auto"
                    >
                      <div className="text-sm font-medium opacity-90 mb-2">Systems Online</div>
                      <div className="h-2 w-full bg-black/20 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-white rounded-full" 
                          initial={{ width: "0%" }} 
                          animate={{ width: "45%" }} 
                          transition={{ duration: 1 }} 
                        />
                      </div>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>

            {/* Bottom 3 Columns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 font-medium text-sm lg:text-base max-w-6xl">
              <div>
                <h3 className="text-maroon font-bold mb-2 text-lg">Pioneering Security</h3>
                <p className="opacity-75">At Graphen, we believe your enterprise knowledge is your most critical asset. We build military-grade AES encryption directly into the browser, ensuring zero-knowledge privacy.</p>
              </div>
              <div>
                <h3 className="opacity-60 mb-2">Zero-Latency Infrastructure</h3>
                <p className="opacity-75">We eliminate loading screens entirely. By decentralizing data to the edge and relying on localized memory, Graphen responds in 0 milliseconds.</p>
              </div>
              <div>
                <h3 className="opacity-60 mb-2">The Minimalist Collective</h3>
                <p className="opacity-75">We are a team of engineers obsessed with typography, reducing cognitive load, and preventing context switching in the enterprise sector.</p>
              </div>
            </div>
          </div>

          <div className="absolute right-0 bottom-0 text-maroon font-display text-[15vw] leading-none opacity-[0.03] tracking-tighter mix-blend-multiply pointer-events-none">
            //GRAPHEN
          </div>
        </div>
      </div>

      {/* 
        ======================================================================== 
        2. COMPANY METRICS & ABOUT
        ========================================================================
      */}
      <div id="about" className="py-24 px-8 lg:px-16 text-white text-center max-w-5xl mx-auto flex flex-col items-center">
        <h2 className="text-3xl md:text-5xl font-display font-light mb-8 leading-tight">
          "Graphen is not just software. It is a philosophy that <strong className="font-bold">knowledge should be frictionless</strong>."
        </h2>
        <p className="text-white/70 max-w-2xl text-lg mb-16">
          Founded in 2026, Graphen Systems Inc. strips the SaaS industry back to pure performance. While others build bloatware, we build hyper-focused tools for professionals who demand absolute speed.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full border-t border-white/20 pt-16">
          <div>
            <div className="text-5xl font-display font-bold mb-2">0ms</div>
            <div className="text-sm font-medium text-white/60 tracking-widest uppercase">Search Latency</div>
          </div>
          <div>
            <div className="text-5xl font-display font-bold mb-2">100%</div>
            <div className="text-sm font-medium text-white/60 tracking-widest uppercase">Local Privacy</div>
          </div>
          <div>
            <div className="text-5xl font-display font-bold mb-2">1M+</div>
            <div className="text-sm font-medium text-white/60 tracking-widest uppercase">Tokens Indexed</div>
          </div>
        </div>
      </div>

      {/* 
        ======================================================================== 
        3. 3D MODEL SHOWCASE SECTION (Graphen Nucleus)
        ========================================================================
      */}
      <div id="showcase" className="relative py-32 bg-[#F8F8F8] overflow-hidden flex items-center justify-center my-6 mx-4 rounded-[2.5rem]">
        {/* Background Scrolling Text */}
        <div className="absolute inset-x-0 whitespace-nowrap opacity-[0.03] text-[9vw] font-display font-black uppercase text-maroon flex pointer-events-none top-1/2 -translate-y-1/2">
          <motion.div
            animate={{ x: [0, -1500] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 35 }}
            className="flex gap-12 items-center"
          >
            <span>ENGINEERED FOR FOCUS ⊙ ZERO LATENCY ⊙ AES ENCRYPTION ⊙ ABSOLUTE PRIVACY ⊙ </span>
            <span>ENGINEERED FOR FOCUS ⊙ ZERO LATENCY ⊙ AES ENCRYPTION ⊙ ABSOLUTE PRIVACY ⊙ </span>
          </motion.div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Side: Text / Info */}
          <div className="order-2 lg:order-1 flex flex-col items-start text-black">
            <div className="inline-block px-4 py-2 bg-maroon/10 text-maroon rounded-full text-sm font-bold tracking-widest uppercase mb-6">
              Flagship Technology
            </div>
            <h2 className="font-display text-5xl md:text-7xl font-bold tracking-tighter mb-6 leading-[0.9]">
              The Graphen <br/> Core Engine.
            </h2>
            <p className="text-lg md:text-xl text-black/60 mb-8 max-w-md leading-relaxed">
              Our proprietary core transforms linear notes into a dynamic, interconnecting graph. This specialized environment allows companies to consolidate their knowledge base entirely isolated from external breaches.
            </p>
            
            <div className="flex flex-col gap-6 w-full max-w-md">
              <div className="flex gap-4 items-start">
                <div className="mt-1 p-2 bg-maroon/10 rounded-full text-maroon"><Globe size={20} /></div>
                <div>
                  <h4 className="font-bold text-lg">Cross-Device Synchronization</h4>
                  <p className="text-black/60 text-sm">Graphen securely synchronizes the environment using End-to-End Encrypted channels, eliminating unauthorized access vectors.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="mt-1 p-2 bg-maroon/10 rounded-full text-maroon"><Share2 size={20} /></div>
                <div>
                  <h4 className="font-bold text-lg">Scalable Collaboration</h4>
                  <p className="text-black/60 text-sm">Teams can safely generate and share view-only access portals through localized JWT cryptography.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Floating 3D Model */}
          <div className="order-1 lg:order-2 h-[500px] md:h-[600px] w-full relative group">
            <div className="absolute inset-0 bg-maroon/5 rounded-full blur-[100px] group-hover:bg-maroon/10 transition-colors duration-1000" />
            
            <Canvas camera={{ position: [0, 0, 6], fov: 45 }} className="w-full h-full z-10">
              <ambientLight intensity={1.5} />
              <directionalLight position={[5, 10, 5]} intensity={3} color="#ffffff" />
              <pointLight position={[-5, -5, -5]} intensity={1} color="#800000" />
              
              <Suspense fallback={null}>
                <StarModel />
              </Suspense>
              
              <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
            </Canvas>
          </div>
        </div>
      </div>

      {/* 
        ======================================================================== 
        4. OUR VISION (NEW SECTION)
        ========================================================================
      */}
      <div id="vision" className="mx-4 lg:mx-6 mb-6 rounded-[2.5rem] bg-white text-black py-24 px-8 lg:px-16 border border-black/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1">
            <h2 className="text-maroon font-bold tracking-widest uppercase text-sm mb-4">Our Vision</h2>
            <p className="font-display text-4xl leading-tight font-medium tracking-tight mb-8">
              "We envision a corporate world where ideas flow without the friction of legacy software, and where total security doesn't compromise speed."
            </p>
            <p className="text-xl text-black/60 leading-relaxed mb-8 max-w-2xl">
              Legacy knowledge management systems are bloated. They require gigabytes of RAM to type a grocery list. We assembled some of the best minds in systems engineering to solve writing, entirely. No slow loading states, no convoluted folder structures. Just type, search, and secure.
            </p>
            <Link href="#contact" className="inline-flex items-center gap-2 border-b-2 border-maroon text-maroon font-bold pb-1 hover:text-black hover:border-black transition-colors">
              Partner with Graphen <ArrowRight size={20} />
            </Link>
          </div>
          <div className="w-full md:w-[400px] h-[400px] bg-[#f4f4f5] rounded-3xl p-8 flex flex-col justify-end text-right border border-black/10 bg-gradient-to-tr from-[#f4f4f5] to-white shadow-xl relative overflow-hidden">
             <div className="absolute -right-12 -top-12 text-maroon/10">
                <Code size={250} />
             </div>
             <h3 className="font-bold text-2xl font-display">Code-Driven <br/>Architecture</h3>
             <p className="text-black/60 font-medium mt-2">Open source modules vetted by the community.</p>
          </div>
        </div>
      </div>

      {/* 
        ======================================================================== 
        5. FEATURE HIGHLIGHT SECTION (Deep Dive)
        ========================================================================
      */}
      <div className="py-24 px-8 lg:px-16 text-white max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          {/* Feature 1: Private Vault */}
          <div className="bg-[#111] border border-white/10 rounded-[2.5rem] p-10 lg:p-14 hover:border-maroon/50 transition-colors shadow-2xl">
            <div className="w-16 h-16 bg-maroon/20 text-maroon rounded-full flex items-center justify-center mb-8">
              <EyeOff size={32} />
            </div>
            <h3 className="font-display font-bold text-4xl mb-4">The Private Vault</h3>
            <p className="text-white/60 text-lg leading-relaxed mb-8">
              Corporate espionage is real. The Private Vault encrypts your sensitive trade secrets entirely within your browser storage. Access requires a physical PIN code and biometric verification (where enabled), ensuring top-tier privacy.
            </p>
            <ul className="space-y-3 font-medium text-white/80">
              <li className="flex items-center gap-3"><Lock size={18} className="text-maroon"/> Bank-grade AES-256 local encryption</li>
              <li className="flex items-center gap-3"><Lock size={18} className="text-maroon"/> Invisible to global indexing</li>
              <li className="flex items-center gap-3"><Lock size={18} className="text-maroon"/> Zero telemetry & No third-party trackers</li>
            </ul>
          </div>

          {/* Feature 2: Deep Search */}
          <div className="flex flex-col justify-center">
            <h3 className="font-display font-light text-5xl md:text-6xl text-white tracking-tighter mb-8 leading-[1.1]">
              Find any data point,<br/>
              <strong className="font-bold text-maroon">Instantly.</strong>
            </h3>
            <p className="text-white/70 text-lg leading-relaxed mb-8">
              Graphen implements an advanced Fuse.js fuzzy search algorithm running exclusively on client-side threads. Type a fragment of a thought, a misspelled keyword, or a piece of code, and watch millions of strings filter in zero milliseconds.
            </p>
            <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-4">
              <Search className="text-white/50" />
              <div className="flex-1 font-mono text-white/80">search query...</div>
              <div className="px-3 py-1 bg-white/10 rounded-md text-xs font-mono">⌘ K</div>
            </div>
          </div>
          
        </div>
      </div>

      {/* 
        ======================================================================== 
        6. EDITORIAL SECTION (Workflow)
        ========================================================================
      */}
      <div id="workflow" className="bg-[#EAEAEA] text-black py-24 px-8 border-t-4 border-black border-dashed mx-4 lg:mx-6 rounded-[2.5rem] mb-6">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">
          <div className="flex-1">
            <h2 className="font-display text-5xl md:text-7xl lg:text-[7rem] leading-[0.85] tracking-tighter uppercase mb-12">
              SEAMLESS <br/>
              WORKFLOW <i className="lowercase font-serif tracking-normal text-maroon">of</i> <br/>
              GRAPHEN
            </h2>
            <div className="max-w-sm border-2 border-black p-6 bg-white shrink-0 relative">
              <p className="text-sm font-medium leading-relaxed">
                We designed Graphen to completely remove the barrier between thought and text. No complex folders. No loading screens. Just open your workspace and start writing immediately.
              </p>
              <div className="absolute -bottom-3 text-xs font-bold uppercase bg-white px-3 py-1 border-x-2 border-t-2 border-black left-6">
                Core Philosophy
              </div>
            </div>
          </div>

          <div className="flex-[0.6] flex flex-col justify-end">
            <ul className="space-y-4 font-display text-xl uppercase font-bold text-black border-l-2 border-black pl-8">
              <li className="flex justify-between hover:text-maroon transition-colors cursor-pointer border-b border-black/20 pb-2"><span>The Markdown Editor</span> <span className="text-maroon">01</span></li>
              <li className="flex justify-between hover:text-maroon transition-colors cursor-pointer border-b border-black/20 pb-2"><span>Frictionless Search</span> <span className="opacity-50">02</span></li>
              <li className="flex justify-between hover:text-maroon transition-colors cursor-pointer border-b border-black/20 pb-2"><span>Timeline Visualization</span> <span className="opacity-50">03</span></li>
              <li className="flex justify-between hover:text-maroon transition-colors cursor-pointer border-b border-black/20 pb-2"><span>The Secure Vault</span> <span className="opacity-50">04</span></li>
            </ul>

            <div className="mt-16 bg-white p-6 border-2 border-black">
              <div className="grid grid-cols-[1fr_2fr] gap-4 text-sm font-medium border-b border-black pb-4 mb-4">
                <div className="opacity-60 font-bold">THE PRODUCT</div>
                <div>A unified workspace to gather, refine, and securely store your most important ideas.</div>
              </div>
              <div className="grid grid-cols-[1fr_2fr] gap-4 text-sm font-medium border-b border-black pb-4 mb-4">
                <div className="opacity-60 font-bold">THE EXPERIENCE</div>
                <div>Deep focus mode with minimalist typography. Graphen gets entirely out of your way.</div>
              </div>
              <div className="grid grid-cols-[1fr_2fr] gap-4 text-sm font-medium">
                <div className="opacity-60 font-bold">ACCESSIBILITY</div>
                <div>Your notes remain exactly where you left them, organized precisely how you like.</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 
        ======================================================================== 
        7. GRID FEATURE SECTION (Capabilities)
        ========================================================================
      */}
      <div id="features" className="bg-[#dfdfdf] mx-4 lg:mx-6 mb-6">
        <div className="border-[12px] border-black">
          {/* Header row */}
          <div className="grid grid-cols-1 md:grid-cols-4 border-b-[8px] border-black text-black">
            <div className="col-span-1 p-6 border-r-0 md:border-r-[8px] border-black font-bold uppercase text-xl leading-none flex items-center">
              Core Capabilities
            </div>
            <div className="col-span-1 md:col-span-3 p-6 flex items-center bg-white border-t-[8px] md:border-t-0 border-black">
              <h2 className="font-display font-black text-5xl md:text-8xl tracking-tighter uppercase leading-[0.8]">
                Unlock <br/> Your Mind.
              </h2>
            </div>
          </div>

          {/* Grid rows */}
          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-[minmax(300px,auto)_minmax(300px,auto)] text-black font-bold uppercase overflow-hidden">
            
            <div className="border-b-[8px] md:border-r-[8px] border-black p-8 flex flex-col justify-end bg-white hover:bg-black hover:text-white transition-colors">
              <div className="text-2xl leading-tight">CAPTURE IDEAS IN <br/> PURE MARKDOWN</div>
              <div className="mt-6 text-maroon"><FileText size={32} /></div>
            </div>
            
            <div className="border-b-[8px] md:border-r-[8px] border-black p-8 flex flex-col justify-start">
              <div className="text-2xl leading-tight">LOCK YOUR SECRETS <br/> IN THE PRIVATE VAULT</div>
            </div>

            <div className="border-b-[8px] md:border-r-[8px] border-black p-8 flex items-center justify-center bg-white relative overflow-hidden group">
              <div className="text-8xl text-maroon group-hover:scale-150 transition-transform duration-700">✱</div>
            </div>
            
            <div className="border-b-[8px] border-black p-8 flex flex-col justify-between text-sm lowercase font-medium bg-white">
              <p className="normal-case opacity-80 leading-relaxed text-base">
                An integrative approach to digital minimalism. Graphen eliminates the chaos of modern note taking and returns you to a beautifully structured, quiet zone for absolute productivity.
              </p>
              <Link href="/dashboard" className="normal-case font-bold hover:text-maroon transition-colors flex items-center gap-1 mt-6 text-lg">
                OPEN YOUR WORKSPACE <ArrowRight size={20} />
              </Link>
            </div>

            {/* Second row */}
            <div className="border-b-[8px] md:border-b-0 md:border-r-[8px] border-black p-8 flex flex-col justify-end bg-maroon text-white">
              <div className="text-2xl leading-tight mb-6">FIND ANY NOTE <br/> INSTANTLY</div>
              <Search size={48} className="opacity-50" />
            </div>
            
            <div className="border-b-[8px] md:border-b-0 md:border-r-[8px] border-black p-8 flex items-center justify-center relative overflow-hidden bg-white">
              <div className="text-9xl text-black hover:rotate-90 transition-transform duration-700 origin-center cursor-pointer">✦</div>
            </div>
            
            <div className="border-b-[8px] md:border-b-0 md:border-r-[8px] border-black p-8 flex flex-col justify-between bg-black text-white relative">
              <div className="text-2xl leading-tight text-right w-full z-10">SHARE PUBLIC LINKS <br/> EFFORTLESSLY</div>
              <div className="absolute bottom-8 left-8 text-white/10 text-9xl pointer-events-none">⚡</div>
            </div>
            
            <div className="p-8 flex flex-col justify-end bg-white hover:bg-[#f4f4f5] transition-colors">
              <div className="text-2xl leading-tight mb-4">VISUALIZE THOUGHTS <br/> OVER TIME</div>
              <div className="w-16 h-2 bg-maroon mt-4"></div>
            </div>

          </div>
        </div>
      </div>

      {/* 
        ======================================================================== 
        8. CONTACT US SECTION (NEW SECTION)
        ========================================================================
      */}
      <div id="contact" className="py-24 px-8 lg:px-16 text-black bg-white max-w-7xl mx-auto w-full rounded-[2.5rem] my-6 shadow-xl border border-black/5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-maroon font-bold tracking-widest uppercase text-sm mb-4">Sales & Support</h2>
            <h2 className="font-display text-5xl md:text-7xl font-bold tracking-tighter mb-6 leading-none">
              Get in touch.
            </h2>
            <p className="text-xl text-black/60 mb-8 max-w-md">
              Whether you are looking for an enterprise deployment of Graphen or just want to chat about the future of secure knowledge management, our team is ready.
            </p>
            <div className="space-y-4 font-medium text-lg">
              <p>Email: <a href="mailto:hello@graphen.app" className="underline hover:text-maroon">hello@graphen.app</a></p>
              <p>Press: <a href="mailto:press@graphen.app" className="underline hover:text-maroon">press@graphen.app</a></p>
              <p className="mt-8 text-black/50">Location: San Francisco, CA (Graphen HQ)</p>
            </div>
          </div>
          <div className="bg-[#fafafa] p-8 md:p-10 rounded-3xl border border-black/5">
            <form className="space-y-6 flex flex-col">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-black/50">First Name</label>
                  <input type="text" className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 outline-none focus:border-maroon focus:ring-2 focus:ring-maroon/20 transition-all shadow-sm" placeholder="Jane" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-black/50">Last Name</label>
                  <input type="text" className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 outline-none focus:border-maroon focus:ring-2 focus:ring-maroon/20 transition-all shadow-sm" placeholder="Doe" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-black/50">Work Email</label>
                <input type="email" className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 outline-none focus:border-maroon focus:ring-2 focus:ring-maroon/20 transition-all shadow-sm" placeholder="jane@company.com" />
              </div>
              <div className="space-y-2 flex-1">
                <label className="text-xs font-bold uppercase tracking-widest text-black/50">How can we help?</label>
                <textarea className="w-full h-32 bg-white border border-black/10 rounded-xl px-4 py-3 outline-none focus:border-maroon focus:ring-2 focus:ring-maroon/20 transition-all resize-none shadow-sm" placeholder="Describe your enterprise requirements..."></textarea>
              </div>
              <button 
                type="button" 
                className="w-full bg-maroon text-white font-bold py-4 rounded-xl hover:bg-black transition-colors shadow-lg hover:shadow-xl translate-y-0 hover:-translate-y-1 duration-200"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* 
        ======================================================================== 
        9. FOOTER (Good Looking Footer)
        ========================================================================
      */}
      <footer className="bg-black text-white pt-24 pb-12 px-8 lg:px-16 mt-12 rounded-[2.5rem] mx-4 lg:mx-6 mb-6 overflow-hidden relative">
         {/* Background giant logo effect */}
         <div className="absolute -bottom-24 -right-24 opacity-5 pointer-events-none">
           <Image src="/logo.png" width={400} height={400} alt="Graphen Background Motif" className="grayscale" />
         </div>

         <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-start gap-16 relative z-10 w-full hover:z-20">
            <div className="flex flex-col max-w-sm">
                <div className="mb-8">
                  <Image src="/logo.png" width={48} height={48} alt="Graphen Icon" className="grayscale opacity-90" />
                </div>
                <h3 className="text-2xl font-display font-medium tracking-tighter mb-4 text-white">Graphen Systems Inc.</h3>
                <p className="text-white/50 text-sm leading-relaxed mb-8">
                  Pioneering zero-latency, local-first architectures. We build corporate software that gets entirely out of your way and respects intellectual property absolutely.
                </p>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer font-bold text-sm">X</div>
                  <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer font-bold text-sm">In</div>
                  <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer font-bold text-sm">Gh</div>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-12 text-sm w-full lg:w-auto">
              <div className="min-w-[120px]">
                <h4 className="font-bold text-white/50 uppercase tracking-widest mb-6">Product</h4>
                <ul className="space-y-4 font-medium text-white/80">
                  <li><Link href="#features" className="hover:text-maroon transition-colors">Features</Link></li>
                  <li><Link href="#architecture" className="hover:text-maroon transition-colors">Architecture</Link></li>
                  <li><Link href="/dashboard" className="hover:text-maroon transition-colors">Workspace</Link></li>
                  <li><Link href="/vault" className="hover:text-maroon transition-colors">Enterprise Vault</Link></li>
                </ul>
              </div>
              <div className="min-w-[120px]">
                <h4 className="font-bold text-white/50 uppercase tracking-widest mb-6">Company</h4>
                <ul className="space-y-4 font-medium text-white/80">
                  <li><Link href="#about" className="hover:text-maroon transition-colors">About Us</Link></li>
                  <li><Link href="#vision" className="hover:text-maroon transition-colors">Our Vision</Link></li>
                  <li><Link href="#contact" className="hover:text-maroon transition-colors">Contact</Link></li>
                  <li><Link href="#" className="hover:text-maroon transition-colors">Careers</Link></li>
                </ul>
              </div>
              <div className="col-span-2 md:col-span-1 min-w-[120px]">
                <h4 className="font-bold text-white/50 uppercase tracking-widest mb-6">Legal</h4>
                <ul className="space-y-4 font-medium text-white/80">
                  <li><Link href="#" className="hover:text-maroon transition-colors">Privacy Policy</Link></li>
                  <li><Link href="#" className="hover:text-maroon transition-colors">Terms of Service</Link></li>
                  <li><Link href="#" className="hover:text-maroon transition-colors">Cookie Policy</Link></li>
                  <li><Link href="#" className="hover:text-maroon transition-colors">Security Audit</Link></li>
                </ul>
              </div>
            </div>
         </div>
         
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center border-t border-white/10 mt-24 pt-8 text-white/40 text-[13px] font-medium relative z-10 w-full">
           <div>© 2026 Graphen Systems Inc. All rights reserved.</div>
           <div className="mt-4 md:mt-0">Engineered in San Francisco.</div>
         </div>
      </footer>
    </div>
  );
}
