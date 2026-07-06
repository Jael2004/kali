'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

// ==========================================
// 1. CONFIGURATION DES MÉDIAS (PHOTOS / VIDÉOS)
// ==========================================
const MEDIAS = [
  { type: 'image', url: '/images/3.jpg' },
  { type: 'image', url: '/images/1.jpg' },
  { type: 'video', url: '/images/2.mp4' },
  // Ajoutez vos photos/vidéos de 1 à 20 ici dans le même format
];

export default function Home() {
  const [activeSection, setActiveSection] = useState('letter');
  const [hasStarted, setHasStarted] = useState(false);
  const bgMusic = useRef<HTMLAudioElement | null>(null);

  const startWebsite = () => {
    setHasStarted(true);
    if (bgMusic.current) {
      bgMusic.current.volume = 0.3; // Chanson de New West
      bgMusic.current.play().catch(e => console.log("L'audio attend une interaction"));
    }
  };

  if (!hasStarted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
        <h1 className="text-3xl font-serif text-purple-200 mb-4 tracking-widest animate-pulse">KALI — 14.07.2003</h1>
        <p className="text-purple-300/60 font-serif text-sm mb-8 text-center max-w-sm">
          Un petit espace secret pour célébrer une personne unique.
        </p>
        <button onClick={startWebsite} className="px-8 py-3 border border-purple-500/40 hover:bg-purple-950/40 rounded-full font-serif text-purple-300 tracking-wider shadow-[0_0_15px_rgba(147,51,234,0.2)] transition-all">
          Entrer dans notre histoire 💜
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-purple-500/30">
      <audio ref={bgMusic} src="/audio/those_eyes.mp3" loop />
      
      {/* BARRE DE NAVIGATION INTEGRÉE */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-purple-950/40 backdrop-blur-md border-b border-purple-500/20 px-6 py-4 flex justify-between items-center">
        <div className="text-purple-200 font-serif font-bold text-lg tracking-wider">KALI'S DAY 💜</div>
        <div className="flex gap-6 text-sm font-medium tracking-wide">
          {[
            { id: 'letter', label: 'Ma Lettre' },
            { id: 'gallery', label: 'Galerie' },
            { id: 'wishes', label: 'Vœux & Bougies' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`transition-all duration-300 ${activeSection === item.id ? 'text-purple-300 font-semibold border-b-2 border-purple-400 pb-1' : 'text-purple-100/60 hover:text-purple-200'}`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      <main className="transition-all duration-500">
        {activeSection === 'letter' && <LetterSection />}
        {activeSection === 'gallery' && <GallerySection />}
        {activeSection === 'wishes' && <WishesSection />}
      </main>
    </div>
  );
}

// ==========================================
// 2. COMPOSANT : MA LETTRE (DISCOURS)
// ==========================================
export function LetterSection() {
  const paragraphs = [
   "Mon bébés d'amour,",
    "Aujourd'hui est une journée si particulière. En ce 14 juillet, le monde entier célèbre peut-être autre chose, mais pour moi, cette date n'a qu'un seul sens : elle marque le jour où on a donné naissance à une personne extraordinaire qui est venue uniquement dans ce monde pour illuminer nos vies.",
    "Regarder ces photos et ces vidéos de nous me rappelle à quel point chaque instant passé à tes côtés est précieux. Ta présence, ton rire, ta manière unique de voir les choses, ta façon de me montrer que tu tiens à moi... tout chez toi apporte une douceur immense à mon quotidien.",
    "Je voulais profiter de cet espace secret pour te dire merci. Merci d'être exactement qui tu es, avec cette lumière qui n'appartient qu'à toi. Je te souhaite le plus merveilleux des anniversaires, rempli de rires, de projets fous et de tout le bonheur que tu mérites tant.",
    "Prends soin de toi, continue de briller.",
    "Avec toute ma tendresse, ton emmerdeuse Jaël 💜"
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-purple-950 via-purple-900 to-purple-950 pt-24 pb-12 px-6">
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        className="max-w-2xl w-full bg-purple-950/40 backdrop-blur-md border border-purple-400/20 p-8 md:p-12 rounded-3xl shadow-2xl font-serif text-purple-100/90 leading-relaxed space-y-6"
      >
        {paragraphs.map((text, index) => (
          <p key={index} className={`${index === 0 ? "text-xl font-bold text-purple-200" : ""} ${index === paragraphs.length - 1 ? "text-right italic font-bold text-purple-300 pt-4 text-lg" : "text-base text-justify"}`}>
            {text}
          </p>
        ))}
      </motion.div>
    </div>
  );
}

// ==========================================
  // 3. COMPOSANT : GALERIE (PHOTOS / VIDÉOS)
// ==========================================
export function GallerySection() {
  const [index, setIndex] = useState(0);
  const sfxPage = useRef<HTMLAudioElement | null>(null);

  const changePage = (direction: number) => {
    if (direction === 1 && index < MEDIAS.length - 1) {
      sfxPage.current?.play();
      setIndex(index + 1);
    } else if (direction === -1 && index > 0) {
      sfxPage.current?.play();
      setIndex(index - 1);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-purple-950 to-purple-900 pt-20 px-4">
      <audio ref={sfxPage} src="/audio/page-flip.mp3" />
      <h2 className="text-2xl font-serif text-purple-200 mb-2 tracking-wide">Les fragments de notre complicité</h2>
      <p className="text-sm text-purple-400/70 font-serif mb-6">Le temps passe, mais les rires restent gravés.</p>
      
      <div className="relative w-full max-w-xl aspect-[4/3] bg-purple-900/40 rounded-2xl shadow-2xl border border-purple-400/20 overflow-hidden flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div key={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full h-full">
            {MEDIAS[index]?.type === 'image' ? (
              <img src={MEDIAS[index].url} alt="Souvenir" className="w-full h-full object-cover" />
            ) : (
              <video src={MEDIAS[index]?.url} autoPlay muted loop className="w-full h-full object-cover" />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex gap-4 mt-6">
        <button onClick={() => changePage(-1)} disabled={index === 0} className="px-4 py-2 bg-purple-800/60 disabled:opacity-30 rounded-lg text-sm text-purple-200 hover:bg-purple-700 transition">◄ Précédent</button>
        <span className="text-purple-300 text-sm self-center">{index + 1} / {MEDIAS.length}</span>
        <button onClick={() => changePage(1)} disabled={index === MEDIAS.length - 1} className="px-4 py-2 bg-purple-800/60 disabled:opacity-30 rounded-lg text-sm text-purple-200 hover:bg-purple-700 transition">Suivant ➔</button>
      </div>
    </div>
  );
}

// ==========================================
// 4. COMPOSANT : VŒUX & BOUGIES
// ==========================================
export function WishesSection() {
  const [candles, setCandles] = useState([true, true, true, true, true]);
  const sfxClick = useRef<HTMLAudioElement | null>(null);
  const allExtinguished = candles.every(c => !c);

  const extinguishCandle = (index: number) => {
    sfxClick.current?.play();
    const newCandles = [...candles];
    newCandles[index] = false;
    setCandles(newCandles);
  };

  useEffect(() => {
    if (allExtinguished) {
      const colors = ['#a855f7', '#c084fc', '#e9d5ff', '#fbbf24', '#fef08a'];
      confetti({ particleCount: 150, spread: 80, origin: { x: 0.2, y: 0.6 }, colors });
      confetti({ particleCount: 150, spread: 80, origin: { x: 0.8, y: 0.6 }, colors });
    }
  }, [allExtinguished]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-purple-900 to-black pt-20 px-6 text-center">
      <audio ref={sfxClick} src="/audio/click.mp3" />
      <p className="max-w-md text-purple-200/80 font-serif leading-relaxed text-sm mb-12 italic">
        "Une occasion parfaite pour rendre ta journée un peu plus magique. Voici pour une nouvelle année remplie de belles vagues, d'histoires encore plus douces et de petits bonheurs quotidiens qui méritent d'être gardés pour toujours. Que chaque doux instant vienne à toi naturellement. Reste au chaud, et continue de briller comme tu l'as toujours fait."
      </p>

      <div className="flex gap-4 justify-center items-end h-32 mb-8">
        {candles.map((isLit, i) => (
          <div key={i} onClick={() => isLit && extinguishCandle(i)} className="flex flex-col items-center cursor-pointer">
            {isLit ? (
              <motion.div animate={{ scale: [1, 1.2, 1], y: [0, -2, 0] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-3 h-6 bg-gradient-to-t from-yellow-500 to-red-400 rounded-full blur-[1px] shadow-[0_0_10px_#f59e0b]" />
            ) : (
              <div className="w-1 h-4 bg-transparent" />
            )}
            <div className={`w-4 h-20 rounded-t-sm transition-all duration-500 ${isLit ? 'bg-gradient-to-b from-purple-400 to-purple-600' : 'bg-purple-950 opacity-40'}`} />
          </div>
        ))}
      </div>

      <h3 className="text-xl font-serif text-purple-300 tracking-widest mb-12">
        {allExtinguished ? "Tes vœux vont s'accomplir... ✨" : "Éteins chaque lumière et fais un vœu..."}
      </h3>

      {allExtinguished && (
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mt-4 p-6 bg-purple-950/60 border border-purple-500/30 rounded-2xl max-w-sm shadow-2xl mx-auto">
          <h4 className="text-2xl font-serif text-purple-200 font-bold">Joyeux Anniversaire Kali ! 🎉</h4>
          <p className="text-xs text-purple-400 tracking-widest mt-1">14 JUILLET 2003</p>
          <div className="w-12 h-[1px] bg-purple-500/50 mx-auto my-4" />
          <p className="font-serif italic text-purple-300 text-xs">Avec toute ma tendresse,</p>
          <p className="text-xl font-bold text-purple-100 mt-2 font-serif tracking-wide">Jaël 💜</p>
        </motion.div>
      )}
    </div>
  );
}
