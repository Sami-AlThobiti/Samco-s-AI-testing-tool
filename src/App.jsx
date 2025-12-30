import React, { useState } from 'react';
import { 
  Camera, Video, Mic, Zap, Sparkles, Monitor, 
  ArrowRight, ArrowLeft, Check, Palette, Twitter, Instagram, Youtube 
} from 'lucide-react';

// --- بيانات التطبيق ---
const TOOLS_DATA = [
  { id: 1, name: "Midjourney v6", category: "image", style: "cinematic", desc: "الأفضل للصور الفنية والسينمائية.", price: "$$", rating: 4.9, icon: <Camera size={32} /> },
  { id: 2, name: "DALL-E 3", category: "image", style: "clean", desc: "دقيق جداً في فهم النصوص والنظافة.", price: "$", rating: 4.7, icon: <Camera size={32} /> },
  { id: 3, name: "Leonardo AI", category: "image", style: "fast", desc: "سريع ومتعدد النماذج ومجاني جزئياً.", price: "Free/$$", rating: 4.6, icon: <Camera size={32} /> },
  { id: 4, name: "Runway Gen-2", category: "video", style: "cinematic", desc: "رائد في توليد الفيديو السينمائي.", price: "$$$", rating: 4.8, icon: <Video size={32} /> },
  { id: 5, name: "Pika Labs", category: "video", style: "fast", desc: "تحريك سريع وممتع للنصوص والصور.", price: "Free", rating: 4.5, icon: <Video size={32} /> },
  { id: 6, name: "Sora (Preview)", category: "video", style: "clean", desc: "الواقعية الفائقة (قريباً).", price: "$$$", rating: 5.0, icon: <Video size={32} /> },
  { id: 7, name: "ElevenLabs", category: "audio", style: "clean", desc: "أنقى استنساخ صوتي وبلا ضوضاء.", price: "$$", rating: 4.9, icon: <Mic size={32} /> },
  { id: 8, name: "Suno AI", category: "audio", style: "cinematic", desc: "توليد أغاني كاملة بموسيقى ملحمية.", price: "$", rating: 4.8, icon: <Mic size={32} /> },
];

// --- إعدادات الثيمات ---
const THEMES = {
  cyber: {
    id: 'cyber', name: 'سايبر نيون', bgClass: 'bg-slate-900', textClass: 'text-cyan-50',
    accentClass: 'bg-cyan-600 hover:bg-cyan-500 text-white',
    cardClass: 'bg-slate-800/80 border border-cyan-500/30 backdrop-blur-md'
  },
  luxury: {
    id: 'luxury', name: 'ذهبي فاخر', bgClass: 'bg-stone-900', textClass: 'text-amber-50',
    accentClass: 'bg-amber-600 hover:bg-amber-500 text-white',
    cardClass: 'bg-stone-800/80 border border-amber-500/30 backdrop-blur-md'
  },
  minimal: {
    id: 'minimal', name: 'أبيض نظيف', bgClass: 'bg-gray-100', textClass: 'text-gray-900',
    accentClass: 'bg-blue-600 hover:bg-blue-500 text-white',
    cardClass: 'bg-white border border-gray-200 shadow-xl'
  },
  galaxy: {
    id: 'galaxy', name: 'مجرة سامكو', bgClass: 'bg-indigo-950', textClass: 'text-purple-50',
    accentClass: 'bg-purple-600 hover:bg-purple-500 text-white',
    cardClass: 'bg-indigo-900/60 border border-purple-400/30 backdrop-blur-md'
  }
};

const TikTokIcon = ({ size = 24, className }) => (
  <svg xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" /></svg>
);

const App = () => {
  const [currentTheme, setCurrentTheme] = useState('cyber');
  const [page, setPage] = useState('home');
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({ type: null, style: null });
  const [loading, setLoading] = useState(false);
  const theme = THEMES[currentTheme];

  const goHome = () => { setPage('home'); setStep(0); setAnswers({ type: null, style: null }); };
  const toggleTheme = () => {
    const keys = Object.keys(THEMES);
    const next = keys[(keys.indexOf(currentTheme) + 1) % keys.length];
    setCurrentTheme(next);
  };

  const AnimatedBackground = () => (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {currentTheme === 'cyber' && <div className="absolute inset-0 bg-slate-900 opacity-90" />}
      {currentTheme === 'luxury' && <div className="absolute inset-0 bg-stone-900" />}
      {currentTheme === 'minimal' && <div className="absolute inset-0 bg-gray-50" />}
      {currentTheme === 'galaxy' && <div className="absolute inset-0 bg-indigo-950" />}
    </div>
  );

  return (
    <div className={`min-h-screen font-sans ${theme.bgClass} transition-colors duration-700 relative flex flex-col`} dir="rtl">
      <AnimatedBackground />
      {/* Header */}
      <div className="flex justify-between items-center p-6 w-full max-w-5xl mx-auto">
        <div onClick={goHome} className={`flex items-center gap-2 font-bold text-2xl cursor-pointer ${theme.textClass}`}>
          <Sparkles className="animate-spin-slow" /> <span>Samco AI</span>
        </div>
        <button onClick={toggleTheme} className={`flex items-center gap-2 px-4 py-2 rounded-full ${theme.cardClass} ${theme.textClass}`}>
          <Palette size={18} /> <span className="hidden sm:inline">{theme.name}</span>
        </button>
      </div>

      {/* Main Content */}
      <main className="flex-grow flex flex-col w-full relative z-10 max-w-5xl mx-auto p-4">
        {page === 'home' && (
          <div className="flex flex-col items-center justify-center text-center mt-10 animate-fade-in">
            <Monitor size={64} className={`mb-6 ${theme.textClass}`} />
            <h1 className={`text-4xl md:text-6xl font-bold mb-6 ${theme.textClass}`}>مُرشّح أدوات سامكو</h1>
            <button onClick={() => setPage('quiz')} className={`px-8 py-4 text-xl font-bold rounded-full shadow-lg hover:scale-105 transition-transform flex items-center gap-3 ${theme.accentClass}`}>
              <span>ابدأ الآن</span> <ArrowLeft />
            </button>
          </div>
        )}

        {page === 'quiz' && (
          <div className="w-full max-w-4xl mx-auto mt-8 animate-slide-up">
            <h2 className={`text-3xl font-bold text-center mb-12 ${theme.textClass}`}>
              {step === 0 ? "وش تبي تصمم اليوم؟" : "كيف تبي النتيجة تكون؟"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {step === 0 ? (
                <>
                  <SelectionCard icon={<Camera size={40} />} title="صور" onClick={() => { setAnswers({...answers, type: 'image'}); setStep(1); }} theme={theme} />
                  <SelectionCard icon={<Video size={40} />} title="فيديو" onClick={() => { setAnswers({...answers, type: 'video'}); setStep(1); }} theme={theme} />
                  <SelectionCard icon={<Mic size={40} />} title="صوت" onClick={() => { setAnswers({...answers, type: 'audio'}); setStep(1); }} theme={theme} />
                </>
              ) : (
                <>
                  <SelectionCard icon={<Sparkles size={40} />} title="سينمائي" onClick={() => { setAnswers({...answers, style: 'cinematic'}); setLoading(true); setTimeout(() => { setLoading(false); setPage('results'); }, 1500); }} theme={theme} />
                  <SelectionCard icon={<Check size={40} />} title="نظيف" onClick={() => { setAnswers({...answers, style: 'clean'}); setLoading(true); setTimeout(() => { setLoading(false); setPage('results'); }, 1500); }} theme={theme} />
                  <SelectionCard icon={<Zap size={40} />} title="سريع" onClick={() => { setAnswers({...answers, style: 'fast'}); setLoading(true); setTimeout(() => { setLoading(false); setPage('results'); }, 1500); }} theme={theme} />
                </>
              )}
            </div>
          </div>
        )}

        {page === 'results' && !loading && (
          <div className="animate-fade-in">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {TOOLS_DATA.filter(t => t.category === answers.type).sort((a,b) => (a.style === answers.style ? -1 : 1)).map((tool, idx) => (
                  <div key={tool.id} className={`p-6 rounded-2xl ${theme.cardClass} ${tool.style === answers.style ? 'border-yellow-400 border-2' : ''}`}>
                    <div className="flex justify-between"><div className={theme.textClass}>{tool.icon}</div><span className={theme.textClass}>{tool.rating} ★</span></div>
                    <h3 className={`text-xl font-bold my-2 ${theme.textClass}`}>{tool.name}</h3>
                    <p className={`opacity-80 ${theme.textClass}`}>{tool.desc}</p>
                  </div>
                ))}
             </div>
             <button onClick={goHome} className={`mt-8 mx-auto block px-6 py-3 rounded-full border ${theme.textClass}`}>بحث جديد</button>
          </div>
        )}
      </main>

      {/* Social Footer */}
      <div className="w-full py-8 mt-auto flex justify-center gap-6">
         <SocialLink href="[https://x.com/designer_samco](https://x.com/designer_samco)" icon={<Twitter />} theme={theme} color="hover:bg-black" />
         <SocialLink href="[https://tiktok.com/@samco_designer](https://tiktok.com/@samco_designer)" icon={<TikTokIcon />} theme={theme} color="hover:bg-[#ff0050]" />
         <SocialLink href="[https://instagram.com/samco_design](https://instagram.com/samco_design)" icon={<Instagram />} theme={theme} color="hover:bg-pink-600" />
         <SocialLink href="[https://youtube.com/@samco-desing](https://youtube.com/@samco-desing)" icon={<Youtube />} theme={theme} color="hover:bg-red-600" />
      </div>
    </div>
  );
};

const SelectionCard = ({ icon, title, onClick, theme }) => (
  <button onClick={onClick} className={`p-8 rounded-2xl border-2 border-transparent ${theme.cardClass} hover:border-current transition-all hover:-translate-y-2 ${theme.textClass}`}>
    <div className="mb-4">{icon}</div><h3 className="text-2xl font-bold">{title}</h3>
  </button>
);

const SocialLink = ({ href, icon, theme, color }) => (
  <a href={href} target="_blank" className={`p-3 rounded-xl ${theme.cardClass} ${theme.textClass} ${color} transition-all hover:-translate-y-2`}>{icon}</a>
);

export default App;
