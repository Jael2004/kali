import React, { useState, useRef } from 'react';
import confetti from 'canvas-confetti';

// ==========================================
// LISTE DES MÉDIAS (PHOTOS / VIDÉOS)
// ==========================================
const MEDIAS = [
  { type: 'image', url: '/images/1.jpg', caption: "Ton rire qui illumine toutes mes journées😂" }, 
  { type: 'image', url: '/images/5.jpg', caption: "Notre première sortie ensemble, tout a commencé ici😂❤️"},
  { type: 'image', url: '/images/6.jpeg', caption: "Notre deuxième sortie ensemble, à refaire très vite sur Accra, Assini, Zanzibar le tour du monde en fait 🙃❤️" },
  { type: 'image', url: '/images/2.png', caption: "Reste toujours la personne extraordinaire que tu es"},
  { type: 'video', url: '/images/12.mp4', caption: "Vois-tu comment t'es rayonnante, magnifique, toute belle...j'en passe, une DIVA en fait!"},
  { type: 'video', url: '/images/11.mp4', caption: "Je souris toujours en nous regardant. MERCI❤️"},
  { type: 'image', url: '/images/3.png', caption: "Ma magnifique skinny brown skin girl😻 Tu as aura de mannéquin même iyann😭🤌❤️" },
];

export default function Home() {
  const [activeSection, setActiveSection] = useState('letter');
  const [hasStarted, setHasStarted] = useState(false);
  const [showCountdown, setShowCountdown] = useState(false);
  const [countdownText, setCountdownText] = useState("03");
  
  const bgMusic = useRef<HTMLAudioElement | null>(null);
  const chronoSound = useRef<HTMLAudioElement | null>(null);

  // CORRECTIF CLAVIER ULTIME : FOCUS GLOBAL ET FLÈCHES AJOUTÉES
  useEffect(() => {
    if (!hasStarted) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const sections = ['letter', 'gallery', 'wishes'];
      const currentIndex = sections.indexOf(activeSection);

      // Touches globales de navigation entre les onglets
      if (e.key === 'Home') {
        e.preventDefault();
        setActiveSection('letter');
      } else if (e.key === 'End') {
        e.preventDefault();
        setActiveSection('wishes');
      } else if (e.key === 'PageDown' || e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        if (currentIndex < sections.length - 1) {
          setActiveSection(sections[currentIndex + 1]);
        }
      } else if (e.key === 'PageUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        if (currentIndex > 0) {
          setActiveSection(sections[currentIndex - 1]);
        }
      }
    };

    // On attache l'écouteur sur le document entier et on force le focus
    window.focus();
    document.addEventListener('keydown', handleKeyDown, true);
    return () => document.removeEventListener('keydown', handleKeyDown, true);
  }, [hasStarted, activeSection]);

  const startWebsite = () => {
    setShowCountdown(true);
    if (chronoSound.current) {
      chronoSound.current.volume = 0.9;
      chronoSound.current.load();
      chronoSound.current.play().catch(e => console.log("Erreur chrono", e));
    }
  };

  useEffect(() => {
    if (!showCountdown) return;

    const timer1 = setTimeout(() => setCountdownText("02"), 1000);
    const timer2 = setTimeout(() => setCountdownText("01"), 2000);
    const timer3 = setTimeout(() => {
      setShowCountdown(false);
      setHasStarted(true);
      if (bgMusic.current) {
        bgMusic.current.volume = 0.7;
        bgMusic.current.play().catch(e => console.log("Erreur musique", e));
      }
    }, 3000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [showCountdown]);

  if (showCountdown) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#000000', color: '#ff3333', fontFamily: 'monospace' }}>
        <audio ref={chronoSound} src="/audio/24_chrono.mp3" preload="auto" aria-label="Décompte sonore" />
        <h2 style={{ color: '#ffffff', fontSize: '2rem', fontFamily: 'serif', letterSpacing: '0.1em', marginBottom: '24px', fontWeight: 'normal' }}>14 Juillet 2026</h2>
        <div style={{ fontSize: '6rem', fontWeight: 'bold', letterSpacing: '0.1em', textShadow: '0 0 20px #ff0000', fontFamily: 'monospace', lineHeight: '1' }} aria-live="polite" aria-atomic="true">
          00:00:{countdownText}
        </div>
        <p style={{ color: 'rgba(255, 50, 50, 0.6)', fontSize: '1rem', marginTop: '20px', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
          Initialisation de ton univers...
        </p>
      </div>
    );
  }

  if (!hasStarted) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#000000', color: '#ffffff', fontFamily: 'serif', padding: '24px' }}>
        <style>{`
          @keyframes pulseText { 0% { transform: scale(1); opacity: 0.8; } 100% { transform: scale(1.05); opacity: 1; } }
          @keyframes floatBtn { 0% { box-shadow: 0 0 10px rgba(147, 51, 234, 0.2); } 100% { box-shadow: 0 0 25px rgba(168, 85, 247, 0.6); } }
          .animated-title { animation: pulseText 2s infinite alternate ease-in-out; }
          .animated-btn:hover { background-color: rgba(147, 51, 234, 0.2) !important; transform: scale(1.05); }
          .animated-btn:focus { outline: 2px solid #e9d5ff; outline-offset: 2px; }
        `}</style>
        <h1 className="animated-title" style={{ fontSize: '2.5rem', color: '#e9d5ff', letterSpacing: '0.2em', marginBottom: '16px', textTransform: 'uppercase' }}>POUR MON ANGE</h1>
        <p style={{ color: 'rgba(216, 180, 254, 0.9)', fontSize: '0.9rem', marginBottom: '32px', maxWidth: '350px', textAlign: 'center' }}>
          Un petit espace secret pour te célébrer DAYONE🥹❤️🔐.
        </p>
        <button 
          onClick={startWebsite} 
          className="animated-btn" 
          aria-label="Entrer et découvrir les surprises"
          style={{ padding: '12px 32px', backgroundColor: 'transparent', border: '1px solid rgba(147, 51, 234, 0.6)', borderRadius: '9999px', color: '#e9d5ff', cursor: 'pointer', fontSize: '1rem', transition: 'all 0.3s ease' }}
        >
          Entre ici...j'ai des surprises pour toi 💜
        </button>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#05020a', color: '#ffffff', fontFamily: 'serif', position: 'relative', overflowX: 'hidden' }}>
      <audio ref={bgMusic} src="/audio/those_eyes.mp3" preload="auto" loop aria-label="Musique de fond" />
      
      {/* BARRE DE NAVIGATION ANIMÉE */}
      <nav 
        style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 50, backgroundColor: 'rgba(11, 5, 20, 0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(147, 51, 234, 0.3)', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        role="navigation"
        aria-label="Navigation principale"
      >
        <div style={{ color: '#ffffff', fontWeight: 'bold', fontSize: '1.1rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>WELCOME TO MY ANGEL'S UNIVERSE 🤍</div>
        <div style={{ display: 'flex', gap: '16px' }}>
          {[
            { id: 'letter', label: 'Ma Lettre' },
            { id: 'gallery', label: 'Galerie' },
            { id: 'wishes', label: 'Vœux & Bougies' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              aria-current={activeSection === item.id ? 'page' : undefined}
              aria-label={`Aller à la section: ${item.label}`}
              style={{ 
                background: 'none', 
                border: 'none', 
                color: activeSection === item.id ? '#e9d5ff' : 'rgba(243, 232, 255, 0.6)', 
                fontWeight: activeSection === item.id ? 'bold' : 'normal', 
                borderBottom: activeSection === item.id ? '2px solid #e9d5ff' : '2px solid transparent',
                cursor: 'pointer',
                padding: '8px 0',
                transition: 'all 0.3s ease',
                fontSize: '0.95rem'
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      <main style={{ transition: 'all 0.5s ease', paddingTop: '80px' }}>
        {activeSection === 'letter' && <LetterSection />}
        {activeSection === 'gallery' && <GallerySection bgMusicRef={bgMusic} />}
        {activeSection === 'wishes' && <WishesSection />}
      </main>
    </div>
  );
}

export function LetterSection() {
  
 const paragraphs = [
    `Mon bébé d'amour,`,
    `Aujourd'hui est une journée si particulière. En ce 14 juillet, le monde entier célèbre peut-être autre chose, mais pour moi, cette date n'a qu'un seul sens : elle marque le jour où une personne extraordinaire est venue dans ce monde pour illuminer nos vies.`,
    `Tu sais, j'ai réalisé : je n'ai pas su être là pour toi quand tu avais besoin de moi. Je n'ai pas su te tenir la main lorsque tu traversais cette situation avec le C.`,
    `Je n'ai sans doute pas donné les meilleurs conseils, ou fait ni dit ce qu'il fallait pour t'aider. Ça me fait mal de constater qu'avec un peu de recul je ne t'ai rien apporté de beau, ni d'important...`,
    `J'ai bénéficié de tout sans rien donner en retour. Je sais que tu vois ça en LOL et tu me diras un truc du genre les gens ne seront toujours pas là dans notre vie, pour nous !`,
    `C'est vrai. J'ai failli, j'ai laissé cette phrase s'appliquer à moi. Je la refuse ! Je veux toujours être là pour toi même si tout le monde part. Je veux être là de jour comme de nuit, dans la joie comme dans la peine, en tout instant, en toute circonstance.`,
    `Je ne sais pas comment me rattraper. Je veux revoir le passé dans l'avenir et le changer pour le rendre meilleur si tu permets, si t'es prête à refaire ce chemin avec moi.`,
    `Tu as été la seule à être à mes côtés, à m'écouter sans me juger quand j'étais au bord du gouffre.`,
    `Je t'en revaudrai toute ma vie parce que tu as exercé une présence complète dans ma vie.`,
    `Je parais sauvage mais j'ai envie de te traiter comme une reine, ce que tu mérites.`,
    `Je me mets à ton service de gré ou de force. On dira peut-être que c'est à ton gars de se montrer romantique avec toi mais moi je me plie à cette tâche, parce que actuellement je crois qu'aucun homme ne te mérite, et un homme te méritera lorsqu'il sera à la hauteur de nos attentes.`,
    `Bref, TU ME MANQUES.......................................`,
    `Regarder ces photos et ces vidéos de nous me rappelle à quel point chaque instant passé à tes côtés est précieux. Ta présence, ton rire, ta manière unique de voir les choses et de tenir à moi... tout chez toi apporte une douceur immense à mon quotidien.`,
    `Je voulais profiter de cet espace secret pour te dire merci. Merci d'être exactement qui tu es, avec cette lumière qui n'appartient qu'à toi. Je te souhaite le plus merveilleux des anniversaires, rempli de rires, de projets fous et de tout le bonheur que tu mérites tant. Inshallah Ouaga en téléchargement.`,
    `Prends soin de toi, continue de briller.`,
    `Je n'ai pas grand-chose à te donner, retiens juste que tu es TOUT pour moi.`,
    `Avec tout mon amour, ton emmerdeuse Jaël 💜`
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'linear-gradient(to bottom, #0c0714, #230b30, #0c0714)', padding: '40px 20px' }}>
      <style>{`
        @keyframes fadeInLetter { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .letter-card { animation: fadeInLetter 1.2s ease-out; }
      `}</style>
      <div className="letter-card" style={{ maxWidth: '42rem', width: '100%', backgroundColor: 'rgba(15, 8, 28, 0.8)', border: '1px solid rgba(168, 85, 247, 0.4)', padding: '40px', borderRadius: '24px' }} role="article" aria-label="Lettre d'amour">
        {paragraphs.map((text, index) => (
          <p key={index} style={{ marginBottom: '24px', fontSize: index === 0 ? '1.4rem' : '1.05rem', fontWeight: (index === 0 || index === paragraphs.length - 1) ? 'bold' : 'normal', textAlign: index === 0 ? 'left' : 'left', lineHeight: '1.7', color: index === 0 ? '#e9d5ff' : 'rgba(243, 232, 255, 0.95)' }}>
            {text}
          </p>
        ))}
      </div>
    </div>
  );
}

export function GallerySection({ bgMusicRef }: { bgMusicRef: React.MutableRefObject<HTMLAudioElement | null> }) {
  const [index, setIndex] = useState(0);
  const sfxPage = useRef<HTMLAudioElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // ✅ AMÉLIORATION : Gestion audio correcte
  useEffect(() => {
    const isSafeToCheck = bgMusicRef.current !== null;
    
    if (!isSafeToCheck) return;

    if (MEDIAS[index].type === 'video') {
      // Pause la musique de fond quand une vidéo joue
      if (bgMusicRef.current && !bgMusicRef.current.paused) {
        bgMusicRef.current.pause();
      }
    } else {
      // Reprend la musique quand on revient à une image
      if (bgMusicRef.current && bgMusicRef.current.paused) {
        bgMusicRef.current.play().catch(e => console.log("Impossible de relire la musique", e));
      }
    }
  }, [index, bgMusicRef]);

  // ✅ AMÉLIORATION : Cleanup au démontage du composant
  useEffect(() => {
    return () => {
      // Au démontage, s'assure que la vidéo est arrêtée
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
      // Reprend la musique si on quitte la galerie
      if (bgMusicRef.current && bgMusicRef.current.paused) {
        bgMusicRef.current.play().catch(e => console.log("Impossible de relire la musique", e));
      }
    };
  }, [bgMusicRef]);

  const changePage = (direction: number) => {
    if (direction === 1 && index < MEDIAS.length - 1) {
      if (sfxPage.current) { 
        sfxPage.current.currentTime = 0;
        sfxPage.current.play().catch(e => console.log("Erreur son", e)); 
      }
      setIndex(index + 1);
    } else if (direction === -1 && index > 0) {
      if (sfxPage.current) { 
        sfxPage.current.currentTime = 0;
        sfxPage.current.play().catch(e => console.log("Erreur son", e)); 
      }
      setIndex(index - 1);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'linear-gradient(to bottom, #140727, #3b1354, #140727)', padding: '40px 20px' }} role="region" aria-label="Galerie de photos et vidéos">
      <audio ref={sfxPage} src="/audio/button.mp3" preload="auto" aria-label="Son de navigation" />
      <style>{`
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        .media-container { animation: scaleIn 0.5s ease-out; }
        .nav-btn:hover:not(:disabled) { background-color: #6b21a8 !important; transform: translateY(-2px); }
        .nav-btn:focus { outline: 2px solid #e9d5ff; outline-offset: 2px; }
        .nav-btn:disabled { opacity: 0.4; cursor: not-allowed; }
      `}</style>
      
      <h2 style={{ fontSize: '1.8rem', color: '#e9d5ff', marginBottom: '8px', textAlign: 'center', textShadow: '0 0 10px rgba(233,213,255,0.3)' }}>Les fragments de nos souvenirs</h2>
      <p style={{ fontSize: '0.9rem', color: '#d8b4fe', opacity: 0.9, marginBottom: '32px', textAlign: 'center' }}>Le temps passe, mais les moments restent gravés.</p>
      
      <div className="media-container" key={index} style={{ position: 'relative', width: '100%', maxWidth: '450px', minHeight: '400px', maxHeight: '75vh', backgroundColor: '#090412', borderRadius: '24px', border: '1px solid rgba(168, 85, 247, 0.2)', overflow: 'hidden' }}>
        {MEDIAS[index] ? (
          <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '100%', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
              {MEDIAS[index].type === 'image' ? (
                <img 
                  src={MEDIAS[index].url} 
                  alt={MEDIAS[index].caption} 
                  style={{ width: '100%', maxHeight: '55vh', objectFit: 'contain', borderRadius: '24px 24px 0 0' }} 
                  loading="lazy"
                />
              ) : (
                <video 
                  ref={videoRef} 
                  src={MEDIAS[index].url} 
                  autoPlay 
                  controls 
                  loop 
                  playsInline 
                  style={{ width: '100%', maxHeight: '55vh', objectFit: 'contain', borderRadius: '24px 24px 0 0' }}
                  aria-label={MEDIAS[index].caption}
                />
              )}
            </div>
            {MEDIAS[index].caption && (
              <div style={{ width: '100%', backgroundColor: 'rgba(15, 8, 28, 0.95)', backdropFilter: 'blur(8px)', padding: '16px', boxSizing: 'border-box', borderTop: '1px solid rgba(192, 132, 252, 0.3)' }}>
                <p style={{ margin: 0, color: '#e9d5ff', fontSize: '0.95rem', fontStyle: 'italic', lineHeight: '1.5' }}>
                  {MEDIAS[index].caption}
                </p>
              </div>
            )}
          </div>
        ) : (
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>Aucun média trouvé.</p>
        )}
      </div>

      <div style={{ display: 'flex', gap: '24px', marginTop: '32px', alignItems: 'center' }}>
        <button 
          onClick={() => changePage(-1)} 
          disabled={index === 0} 
          className="nav-btn" 
          aria-label="Média précédent"
          style={{ padding: '10px 24px', backgroundColor: 'rgba(88, 28, 135, 0.7)', border: '1px solid rgba(192, 132, 252, 0.4)', borderRadius: '8px', color: '#ffffff', cursor: index === 0 ? 'not-allowed' : 'pointer', transition: 'all 0.3s ease' }}
        >
          ← Précédent
        </button>
        <span style={{ color: '#e9d5ff', fontSize: '1rem', fontWeight: 'bold', backgroundColor: 'rgba(0,0,0,0.4)', padding: '8px 16px', borderRadius: '20px', minWidth: '60px', textAlign: 'center' }} aria-live="polite" aria-atomic="true">{index + 1} / {MEDIAS.length}</span>
        <button 
          onClick={() => changePage(1)} 
          disabled={index === MEDIAS.length - 1} 
          className="nav-btn"
          aria-label="Média suivant"
          style={{ padding: '10px 24px', backgroundColor: 'rgba(88, 28, 135, 0.7)', border: '1px solid rgba(192, 132, 252, 0.4)', borderRadius: '8px', color: '#ffffff', cursor: index === MEDIAS.length - 1 ? 'not-allowed' : 'pointer', transition: 'all 0.3s ease' }}
        >
          Suivant →
        </button>
      </div>
    </div>
  );
}

// ==========================================
// COMPOSANT : VŒUX & BOUGIES INTERACTIVES
// ==========================================
export function WishesSection() {
  const [candles, setCandles] = useState([true, true, true, true, true]);
  const sfxClick = useRef<HTMLAudioElement | null>(null);
  const allExtinguished = candles.every(c => !c);

  // ✅ AMÉLIORATION : Meilleure gestion du son
  const extinguishCandle = (index: number) => {
    if (sfxClick.current) { 
      sfxClick.current.currentTime = 0;
      sfxClick.current.play().catch(e => console.log("Erreur son bougie", e)); 
    }
    const newCandles = [...candles];
    newCandles[index] = false;
    setCandles(newCandles);
  };

  useEffect(() => {
    if (allExtinguished) {
      const colors = ['#a855f7', '#c084fc', '#e9d5ff', '#fbbf24', '#fef08a'];
      confetti({ particleCount: 180, spread: 90, origin: { x: 0.1, y: 0.5 }, colors });
      confetti({ particleCount: 180, spread: 90, origin: { x: 0.9, y: 0.5 }, colors });
    }
  }, [allExtinguished]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'linear-gradient(to bottom, #230b30, #0a0410, #000000)', padding: '40px 20px' }} role="region" aria-label="Section des vœux et bougies">
      {/* SONS POUR LES CLICS */}
      <audio ref={sfxClick} src="/audio/button.mp3" preload="auto" aria-label="Son de clic bougie" />
      <style>{`
        @keyframes flameWobble { 0% { transform: scale(1) rotate(-2deg); } 100% { transform: scale(1.15) rotate(2deg); } }
        @keyframes cardReveal { from { opacity: 0; transform: scale(0.9) translateY(20px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        .flame { animation: flameWobble 0.5s infinite alternate ease-in-out; }
        .reveal-box { animation: cardReveal 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
        .candle-button:hover { transform: scale(1.1); }
        .candle-button:focus { outline: 2px solid #e9d5ff; outline-offset: 2px; }
      `}</style>
      
      <p style={{ maxWidth: '500px', color: 'rgba(243, 232, 255, 0.85)', fontSize: '1rem', lineHeight: '1.7', marginBottom: '48px', fontStyle: 'italic', textAlign: 'center' }}>
        "Une occasion parfaite pour rendre ta journée un peu plus magique. Voici pour une nouvelle année remplie de belles vagues, d'histoires encore plus douces et de petits bonheurs quotidiens."
      </p>

      {/* ZONE DES BOUGIES */}
      <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', alignItems: 'flex-end', height: '150px', marginBottom: '40px' }} role="group" aria-label="Bougies interactives">
        {candles.map((isLit, i) => (
          <button
            key={i}
            onClick={() => isLit && extinguishCandle(i)}
            className="candle-button"
            aria-label={isLit ? `Bougie ${i + 1}, appuyez pour éteindre` : `Bougie ${i + 1}, éteinte`}
            aria-pressed={!isLit}
            disabled={!isLit}
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              cursor: isLit ? 'pointer' : 'default', 
              transition: 'all 0.3s ease',
              background: 'none',
              border: 'none',
              padding: '0'
            }}
          >
            {isLit ? (
              <div className="flame" style={{ width: '14px', height: '28px', background: 'linear-gradient(to top, #f59e0b, #ef4444, #ffedd5)', borderRadius: '50% 50% 20% 20%', boxShadow: '0 0 20px #f59e0b, 0 0 40px rgba(245, 158, 11, 0.5)' }} />
            ) : (
              <div style={{ height: '34px' }} />
            )}
            <div style={{ width: '18px', height: '85px', borderRadius: '4px 4px 0 0', background: isLit ? 'linear-gradient(to bottom, #d8b4fe, #7e22ce)' : '#120924', opacity: isLit ? 1 : 0.25, transition: 'all 0.3s ease' }} />
          </button>
        ))}
      </div>

      <h3 style={{ fontSize: '1.2rem', color: '#e9d5ff', letterSpacing: '0.1em', marginBottom: '48px', textAlign: 'center' }} role="status" aria-live="polite">
        {allExtinguished ? "Tes vœux vont s'accomplir... J'espère que t'as pas oublié de citer ta relation avec Dieu ohh Madame ✨" : "Éteins chaque lumière et fais un vœu..."}
      </h3>

      {allExtinguished && (
        <div className="reveal-box" style={{ padding: '32px', backgroundColor: 'rgba(35, 11, 48, 0.8)', border: '1px solid rgba(192, 132, 252, 0.6)', borderRadius: '24px', maxWidth: '380px', width: '100%', textAlign: 'center' }} role="complementary" aria-label="Message de joyeux anniversaire">
          <h4 style={{ fontSize: '1.7rem', color: '#e9d5ff', fontWeight: 'bold', marginBottom: '4px' }}>Joyeux Anniversaire mon Bébé d'Amour🥺❤️! 🎉</h4>
          <div style={{ width: '60px', height: '1px', backgroundColor: 'rgba(168, 85, 247, 0.5)', margin: '16px auto' }} />
          <p style={{ fontSize: '0.95rem', color: 'rgba(243, 232, 255, 0.95)', marginBottom: '12px', lineHeight: '1.6' }}>Merci d'être la lumière que tu es chaque jour.</p>
          <p style={{ fontStyle: 'italic', color: '#d8b4fe', fontSize: '0.9rem' }}>Avec toute ma tendresse,</p>
          <p style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#ffffff', marginTop: '6px', letterSpacing: '0.05em' }}>Jaël 💜</p>
        </div>
      )}
    </div>
  );
}
