'use client';

import React, { useState, useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';

// ==========================================
// 1. CONFIGURATION DES MÉDIAS (PHOTOS / VIDÉOS)
// ==========================================
const MEDIAS = [
  { type: 'image', url: '/images/2.jpg' },
  { type: 'video', url: '/images/12.mp4' },
  { type: 'image', url: '/images/3.jpg' },
  { type: 'image', url: '/images/4.jpg' },
  { type: 'video', url: '/images/11.mp4' },
  { type: 'image', url: '/images/1.jpg' },
];

export default function Home() {
  const [activeSection, setActiveSection] = useState('letter');
  const [hasStarted, setHasStarted] = useState(false);
  const bgMusic = useRef<HTMLAudioElement | null>(null);

  const startWebsite = () => {
    setHasStarted(true);
    if (bgMusic.current) {
      bgMusic.current.volume = 0.4;
      bgMusic.current.play().catch(e => console.log("L'audio attend une interaction"));
    }
  };

  if (!hasStarted) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 'screen', height: '100vh', backgroundColor: '#000000', color: '#ffffff', fontFamily: 'serif', padding: '20px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#e9d5ff', letterSpacing: '0.2em', marginBottom: '16px', textTransform: 'uppercase' }}>KALI — 14.07.2003</h1>
        <p style={{ color: 'rgba(216, 180, 254, 0.6)', fontSize: '0.9rem', marginBottom: '32px', maxWidth: '350px' }}>
          Un petit espace secret pour célébrer une personne unique.
        </p>
        <button onClick={startWebsite} style={{ padding: '12px 32px', backgroundColor: 'transparent', border: '1px solid rgba(147, 51, 234, 0.4)', borderRadius: '9999px', color: '#c084fc', fontSize: '1rem', letterSpacing: '0.1em', cursor: 'pointer', transition: 'all 0.3s', boxShadow: '0 0 15px rgba(147, 51, 234, 0.15)' }}>
          Entrer dans notre histoire 💜
        </button>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#000000', color: '#ffffff', fontFamily: 'serif', position: 'relative', overflowX: 'hidden' }}>
      <audio ref={bgMusic} src="/audio/those_eyes.mp3" loop />
      
      {/* BARRE DE NAVIGATION */}
      <nav style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 50, backgroundColor: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(147, 51, 234, 0.2)', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxSizing: 'border-box' }}>
        <div style={{ color: '#e9d5ff', fontWeight: 'bold', fontSize: '1.1rem', letterSpacing: '0.1em' }}>KALI'S DAY 💜</div>
        <div style={{ display: 'flex', gap: '24px' }}>
          {[
            { id: 'letter', label: 'Ma Lettre' },
            { id: 'gallery', label: 'Galerie' },
            { id: 'wishes', label: 'Vœux & Bougies' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              style={{ background: 'none', border: 'none', color: activeSection === item.id ? '#c084fc' : 'rgba(243, 232, 255, 0.6)', fontWeight: activeSection === item.id ? 'bold' : 'normal', borderBottom: activeSection === item.id ? '2px solid #a855f7' : 'none', paddingBottom: '4px', cursor: 'pointer', fontSize: '0.9rem', transition: 'all 0.3s' }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      <main style={{ transition: 'all 0.5s' }}>
        {activeSection === 'letter' && <LetterSection />}
        {activeSection === 'gallery' && <GallerySection />}
        {activeSection === 'wishes' && <WishesSection />}
      </main>
    </div>
  );
}

// ==========================================
// 2. COMPOSANT : MA LETTRE
// ==========================================
export function LetterSection() {
  const paragraphs = [
    "Mon bébés d'amour,",
    "Aujourd'hui est une journée si particulière. En ce 14 juillet, le monde entier célèbre peut-être autre chose, mais pour moi, cette date n'a qu'un seul sens : elle marque le jour où on a mis au monde une personne extraordinaire qui est venue uniquement dans ce monde pour illuminer nos vies.",
    "Regarder ces photos et ces vidéos de nous me rappelle à quel point chaque instant passé à tes côtés est précieux. Ta présence, ton rire, ta manière unique de voir les choses, ta manière de me montrer que tu tiens à moi... tout chez toi apporte une douceur à mon quotidien.",
    "Je voulais profiter de cet espace secret pour te dire merci. Merci d'être exactement qui tu es, avec cette lumière qui n'appartient qu'à toi. Je te souhaite le plus merveilleux des anniversaires, rempli de rires, de projets fous et de tout le bonheur que tu mérites tant.",
    "Prends soin de toi, continue de briller.",
    "Avec toute ma tendresse, ton emmerdeuse Jaël 💜"
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'linear-gradient(to bottom, #1e1b4b, #311042, #11031c)', paddingTop: '100px', paddingBottom: '40px', paddingLeft: '24px', paddingRight: '24px', boxSizing: 'border-box' }}>
      <div style={{ maxWidth: '42rem', width: '100%', backgroundColor: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', border: '1px solid rgba(168, 85, 247, 0.2)', padding: '40px', borderRadius: '24px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)', boxSizing: 'border-box' }}>
        {paragraphs.map((text, index) => (
          <p key={index} style={{ marginBottom: '24px', color: 'rgba(243, 232, 255, 0.9)', fontSize: index === 0 ? '1.3rem' : '1.05rem', fontWeight: (index === 0 || index === paragraphs.length - 1) ? 'bold' : 'normal', textAlign: index === paragraphs.length - 1 ? 'right' : 'justify', fontStyle: index === paragraphs.length - 1 ? 'italic' : 'normal', color: index === 0 ? '#e9d5ff' : index === paragraphs.length - 1 ? '#c084fc' : 'rgba(243, 232, 255, 0.9)', lineHeight: '1.7' }}>
            {text}
          </p>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// 3. COMPOSANT : GALERIE
// ==========================================
export function GallerySection() {
  const [index, setIndex] = useState(0);
  const sfxPage = useRef<HTMLAudioElement | null>(null);

  const changePage = (direction: number) => {
    if (direction === 1 && index < MEDIAS.length - 1) {
      if (sfxPage.current) sfxPage.current.play();
      setIndex(index + 1);
    } else if (direction === -1 && index > 0) {
      if (sfxPage.current) sfxPage.current.play();
      setIndex(index - 1);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'linear-gradient(to bottom, #2e1065, #4c1d95, #1e1b4b)', paddingTop: '100px', paddingBottom: '40px', paddingLeft: '16px', paddingRight: '16px', boxSizing: 'border-box' }}>
      <audio ref={sfxPage} src="/audio/page-flip.mp3" />
      <h2 style={{ fontSize: '1.8rem', color: '#e9d5ff', marginBottom: '8px', tracking: '0.05em', textAlign: 'center' }}>Les fragments de notre complicité</h2>
      <p style={{ fontSize: '0.9rem', color: '#c084fc', opacity: 0.8, marginBottom: '24px', textAlign: 'center' }}>Le temps passe, mais les rires restent gravés.</p>
      
      <div style={{ relative: 'true', width: '100%', maxWidth: '500px', aspectRatio: '4/3', backgroundColor: 'rgba(88, 28, 135, 0.2)', borderRadius: '24px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)', border: '1px solid rgba(192, 132, 252, 0.2)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {MEDIAS[index] && (
          <div style={{ width: '100%', height: '100%' }}>
            {MEDIAS[index].type === 'image' ? (
              <img src={MEDIAS[index].url} alt="Souvenir d'album" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <video src={MEDIAS[index].url} autoPlay muted loop style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            )}
          </div>
        )}
      </div>

      <div style={{ display: 'flex', gap: '24px', marginTop: '24px', alignItems: 'center' }}>
        <button onClick={() => changePage(-1)} disabled={index === 0} style={{ padding: '10px 20px', backgroundColor: 'rgba(88, 28, 135, 0.4)', border: '1px solid rgba(192, 132, 252, 0.3)', borderRadius: '12px', color: '#e9d5ff', cursor: index === 0 ? 'not-allowed' : 'pointer', opacity: index === 0 ? 0.3 : 1, transition: 'all 0.3s' }}>◄ Précédent</button>
        <span style={{ color: '#c084fc', fontSize: '1rem', fontWeight: 'bold' }}>{index + 1} / {MEDIAS.length}</span>
        <button onClick={() => changePage(1)} disabled={index === MEDIAS.length - 1} style={{ padding: '10px 20px', backgroundColor: 'rgba(88, 28, 135, 0.4)', border: '1px solid rgba(192, 132, 252, 0.3)', borderRadius: '12px', color: '#e9d5ff', cursor: index === MEDIAS.length - 1 ? 'not-allowed' : 'pointer', opacity: index === MEDIAS.length - 1 ? 0.3 : 1, transition: 'all 0.3s' }}>Suivant ➔</button>
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
    if (sfxClick.current) sfxClick.current.play();
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
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'linear-gradient(to bottom, #4c1d95, #0f172a, #000000)', paddingTop: '100px', paddingBottom: '40px', paddingLeft: '24px', paddingRight: '24px', textAlign: 'center', boxSizing: 'border-box' }}>
      <audio ref={sfxClick} src="/audio/click.mp3" />
      <p style={{ maxWidth: '500px', color: 'rgba(243, 232, 255, 0.8)', fontSize: '1rem', lineHeight: '1.7', marginBottom: '48px', fontStyle: 'italic', textAlign: 'center' }}>
        "Une occasion parfaite pour rendre ta journée un peu plus magique. Voici pour une nouvelle année remplie de belles vagues, d'histoires encore plus douces et de petits bonheurs quotidiens qui méritent d'être gardés pour toujours. Que chaque doux instant vienne à toi naturellement. Reste au chaud, et continue de briller comme tu l'as toujours fait."
      </p>

      {/* ZONE DES BOUGIES */}
      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', alignItems: 'flex-end', height: '150px', marginBottom: '32px' }}>
        {candles.map((isLit, i) => (
          <div key={i} onClick={() => isLit && extinguishCandle(i)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: isLit ? 'pointer' : 'default' }}>
            {isLit ? (
              <div style={{ width: '12px', height: '24px', background: 'linear-gradient(to top, #f59e0b, #ef4444)', borderRadius: '50% 50% 20% 20%', boxShadow: '0 0 15px #f59e0b', marginBottom: '4px' }} />
            ) : (
              <div style={{ height: '28px' }} />
            )}
            <div style={{ width: '16px', height: '80px', borderRadius: '4px 4px 0 0', background: isLit ? 'linear-gradient(to bottom, #c084fc, #6b21a8)' : '#1e1b4b', opacity: isLit ? 1 : 0.4, transition: 'all 0.5s' }} />
          </div>
        ))}
      </div>

      <h3 style={{ fontSize: '1.2rem', color: '#e9d5ff', letterSpacing: '0.1em', marginBottom: '48px', textAlign: 'center' }}>
        {allExtinguished ? "Tes vœux vont s'accomplir... ✨" : "Éteins chaque lumière et fais un vœu..."}
      </h3>

      {allExtinguished && (
        <div style={{ marginTop: '16px', padding: '32px', backgroundColor: 'rgba(88, 28, 135, 0.3)', border: '1px solid rgba(192, 132, 252, 0.4)', borderRadius: '24px', maxWidth: '350px', width: '100%', boxSizing: 'border-box', boxShadow: '0 20px 40px rgba(0,0,0,0.6)', textAlign: 'center' }}>
          <h4 style={{ fontSize: '1.6rem', color: '#e9d5ff', fontWeight: 'bold', marginBottom: '4px' }}>Joyeux Anniversaire Kali ! 🎉</h4>
          <p style={{ fontSize: '0.8rem', color: '#a855f7', letterSpacing: '0.2em', marginBottom: '16px' }}>14 JUILLET 2003</p>
          <div style={{ width: '50px', height: '1px', backgroundColor: 'rgba(168, 85, 247, 0.4)', margin: '16px auto' }} />
          <p style={{ fontSize: '0.95rem', color: 'rgba(243, 232, 255, 0.9)', marginBottom: '8px' }}>Merci d'être la lumière que tu es chaque jour.</p>
          <p style={{ fontStyle: 'italic', color: '#c084fc', fontSize: '0.85rem' }}>Avec toute ma tendresse,</p>
          <p style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#ffffff', marginTop: '8px', letterSpacing: '0.05em' }}>Jaël 💜</p>
        </div>
      )}
    </div>
  );
}
