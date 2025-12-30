import React, { useState, useEffect } from 'react';
import { 
  Camera, Video, Mic, Zap, Sparkles, Monitor, 
  ArrowRight, ArrowLeft, RefreshCw, Star, Heart, 
  Share2, ChevronRight, Home, Settings, Youtube, 
  Instagram, Twitter, Linkedin, Check, Palette
} from 'lucide-react';

// --- بيانات التطبيق (Mock Data) ---
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
    id: 'cyber',
    name: 'سايبر نيون',
    bgClass: 'bg-slate-900',
    textClass: 'text-cyan-50',
    accentClass: 'bg-cyan-600 hover:bg-cyan-500 text-white',
    cardClass: 'bg-slate-800/80 border border-cyan-500/30 backdrop-blur-md',
    animation: 'cyber-grid'
  },
  luxury: {
    id: 'luxury',
    name: 'ذهبي فاخر',
    bgClass: 'bg-stone-900',
    textClass: 'text-amber-50',
    accentClass: 'bg-amber-600 hover:bg-amber-500 text-white',
    cardClass: 'bg-stone-800/80 border border-amber-500/30 backdrop-blur-md',
    animation: 'golden-particles'
  },
  minimal: {
    id: 'minimal',
    name: 'أبيض نظيف',
    bgClass: 'bg-gray-100',
    textClass: 'text-gray-900',
    accentClass: 'bg-blue-600 hover:bg-blue-500 text-white',
    cardClass: 'bg-white border border-gray-200 shadow-xl',
    animation: 'soft-clouds'
  },
  galaxy: {
    id: 'galaxy',
    name: 'مجرة سامكو',
    bgClass: 'bg-indigo-950',
    textClass: 'text-purple-50',
    accentClass: 'bg-purple-600 hover:bg-purple-500 text-white',
    cardClass: 'bg-indigo-900/60 border border-purple-400/30 backdrop-blur-md',
    animation: 'stars-move'
  }
};

// --- أيقونة التيك توك المخصصة (SVG) ---
const TikTokIcon = ({ size = 24, className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const App = () => {
  const [currentTheme, setCurrentTheme] = useState('cyber');
  const [page, setPage] = useState('home'); // home, quiz, results
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({ type: null, style: null });
  const [loading, setLoading] = useState(false);
  const theme = THEMES[currentTheme];

  // دالة لإعادة الضبط والعودة للرئيسية
  const goHome = () => {
    setPage('home');
    setStep(0);
    setAnswers({ type: null, style: null });
  };

  // التعامل مع اختيار الثيم
  const toggleTheme = () => {
    const keys = Object.keys(THEMES);
    const currentIndex = keys.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % keys.length;
    setCurrentTheme(keys[nextIndex]);
  };

  // مكون الخلفية المتحركة
  const AnimatedBackground = () => (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {currentTheme === 'cyber' && (
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
          <div className="absolute top-0 left-0 w-full h-full bg-slate-900/90" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[100px] animate-pulse" />
        </div>
      )}
      {currentTheme === 'luxury' && (
        <div className="absolute inset-0 bg-stone-900">
           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px]" />
           <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-yellow-600/10 rounded-full blur-[100px] animate-pulse" />
        </div>
      )}
      {currentTheme === 'minimal' && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white" />
      )}
      {currentTheme === 'galaxy' && (
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900 via-indigo-950 to-black" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[800px] max-h-[800px] bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
          {[...Array(20)].map((_, i) => (
            <div 
              key={i}
              className="absolute bg-white rounded-full animate-bounce"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                animationDuration: `${Math.random() * 5 + 3}s`,
                opacity: Math.random()
              }}
            />
          ))}
        </div>
      )}
    </div>
  );

  // مكون الهيدر
  const Header = () => (
    <div className="flex justify-between items-center p-6 w-full max-w-5xl mx-auto">
      <div 
        onClick={goHome} 
        className={`flex items-center gap-2 font-bold text-2xl cursor-pointer ${theme.textClass} tracking-wider`}
      >
        <Sparkles className="animate-spin-slow" />
        <span>Samco<span className="opacity-70 text-sm font-light mx-2">AI Picker</span></span>
      </div>
      <div className="flex gap-3">
        {page !== 'home' && (
          <button 
            onClick={goHome} 
            className={`p-2 rounded-full ${theme.cardClass} ${theme.textClass} hover:opacity-80 transition-all`}
          >
            <Home size={20} />
          </button>
        )}
        <button 
          onClick={toggleTheme} 
          className={`flex items-center gap-2 px-4 py-2 rounded-full ${theme.cardClass} ${theme.textClass} hover:scale-105 transition-transform`}
        >
          <Palette size={18} />
          <span className="hidden sm:inline text-sm">{theme.name}</span>
        </button>
      </div>
    </div>
  );

  // مكون الفوتر الاجتماعي (Social Footer)
  const SocialFooter = () => (
    <div className="w-full py-8 mt-auto">
      <div className="flex flex-col items-center gap-4">
        <p className={`text-sm font-medium opacity-80 ${theme.textClass}`}>
          تابع سامكو للمزيد من الأدوات والتصاميم
        </p>
        <div className="flex gap-6">
          <SocialIcon 
            href="https://x.com/designer_samco?s=21&t=dbffdoGcvgOluktAOa9LHA" 
            icon={<Twitter size={24} />} 
            color="hover:bg-black hover:text-white" 
            theme={theme}
          />
          <SocialIcon 
            href="https://www.tiktok.com/@samco_designer?_t=ZS-90FZRdOXUiG&_r=1" 
            icon={<TikTokIcon size={24} />} 
            color="hover:bg-[#ff0050] hover:text-white" 
            theme={theme}
          />
          <SocialIcon 
            href="https://www.instagram.com/samco_design?igsh=MXhiN2RjbG1ydHducg%3D%3D&utm_source=qr" 
            icon={<Instagram size={24} />} 
            color="hover:bg-gradient-to-tr hover:from-yellow-400 hover:via-red-500 hover:to-purple-500 hover:text-white" 
            theme={theme}
          />
          <SocialIcon 
            href="https://www.youtube.com/@samco-desing" 
            icon={<Youtube size={24} />} 
            color="hover:bg-red-600 hover:text-white" 
            theme={theme}
          />
        </div>
      </div>
    </div>
  );

  const SocialIcon = ({ href, icon, color, theme }) => (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className={`
        p-3 rounded-2xl transition-all duration-300 transform 
        hover:-translate-y-2 hover:shadow-lg shadow-md
        ${theme.cardClass} ${theme.textClass} ${color}
      `}
    >
      {icon}
    </a>
  );

  // --- صفحات التطبيق ---

  // 1. الصفحة الرئيسية
  const HomePage = () => (
    <div className="flex flex-col items-center justify-center text-center max-w-2xl mx-auto mt-10 p-6 animate-fade-in">
      <div className={`mb-6 p-6 rounded-full ${theme.cardClass} shadow-2xl`}>
        <Monitor size={64} className={theme.textClass} />
      </div>
      <h1 className={`text-4xl md:text-6xl font-bold mb-6 ${theme.textClass}`}>
        مُرشّح أدوات سامكو
      </h1>
      <p className={`text-lg md:text-xl mb-10 opacity-90 leading-relaxed ${theme.textClass}`}>
        لا تضيع وقتك في البحث. أجب على سؤالين فقط وسأخبرك بأفضل أداة ذكاء اصطناعي تناسب مشروعك القادم.
      </p>
      
      <button 
        onClick={() => setPage('quiz')}
        className={`
          group relative px-8 py-4 text-xl font-bold rounded-full 
          shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105
          flex items-center gap-3 ${theme.accentClass}
        `}
      >
        <span>ابدأ الآن</span>
        <ArrowLeft className="group-hover:-translate-x-1 transition-transform" />
      </button>

      {/* بطاقات الميزات المصغرة */}
      <div className="grid grid-cols-3 gap-4 mt-16 w-full">
        <div className={`p-4 rounded-xl text-center ${theme.cardClass}`}>
          <Camera className={`mx-auto mb-2 ${theme.textClass}`} />
          <span className={`text-sm ${theme.textClass}`}>صور</span>
        </div>
        <div className={`p-4 rounded-xl text-center ${theme.cardClass}`}>
          <Video className={`mx-auto mb-2 ${theme.textClass}`} />
          <span className={`text-sm ${theme.textClass}`}>فيديو</span>
        </div>
        <div className={`p-4 rounded-xl text-center ${theme.cardClass}`}>
          <Mic className={`mx-auto mb-2 ${theme.textClass}`} />
          <span className={`text-sm ${theme.textClass}`}>صوت</span>
        </div>
      </div>
    </div>
  );

  // 2. صفحة الأسئلة (Quiz)
  const QuizPage = () => {
    const handleAnswer = (key, value) => {
      setAnswers(prev => ({ ...prev, [key]: value }));
      if (key === 'type') {
        setStep(1);
      } else {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          setPage('results');
        }, 1500);
      }
    };

    return (
      <div className="w-full max-w-4xl mx-auto mt-8 p-4">
        {/* شريط التقدم */}
        <div className="w-full h-2 bg-gray-700/20 rounded-full mb-12 overflow-hidden">
          <div 
            className={`h-full ${theme.accentClass} transition-all duration-500 ease-out`}
            style={{ width: step === 0 ? '33%' : '66%' }}
          />
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 animate-pulse">
            <RefreshCw size={60} className={`mb-6 animate-spin ${theme.textClass}`} />
            <h2 className={`text-2xl font-bold ${theme.textClass}`}>جاري تحليل طلبك...</h2>
            <p className={`mt-2 opacity-70 ${theme.textClass}`}>يتم البحث عن الأداة المناسبة</p>
          </div>
        ) : (
          <div className="animate-slide-up">
            <h2 className={`text-3xl font-bold text-center mb-12 ${theme.textClass}`}>
              {step === 0 ? "وش تبي تصمم اليوم؟" : "كيف تبي النتيجة تكون؟"}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {step === 0 ? (
                // السؤال الأول: النوع
                <>
                  <SelectionCard 
                    icon={<Camera size={40} />} 
                    title="صور وتصاميم" 
                    desc="أحتاج صور، لوقو، أو رسم"
                    onClick={() => handleAnswer('type', 'image')}
                    theme={theme}
                  />
                  <SelectionCard 
                    icon={<Video size={40} />} 
                    title="فيديو وتحريك" 
                    desc="أحتاج فيديو من نص أو صورة"
                    onClick={() => handleAnswer('type', 'video')}
                    theme={theme}
                  />
                  <SelectionCard 
                    icon={<Mic size={40} />} 
                    title="صوت وموسيقى" 
                    desc="أحتاج تعليق صوتي أو أغنية"
                    onClick={() => handleAnswer('type', 'audio')}
                    theme={theme}
                  />
                </>
              ) : (
                // السؤال الثاني: الأسلوب
                <>
                  <SelectionCard 
                    icon={<Sparkles size={40} />} 
                    title="سينمائي وإبداعي" 
                    desc="جودة عالية وتفاصيل فنية"
                    onClick={() => handleAnswer('style', 'cinematic')}
                    theme={theme}
                  />
                  <SelectionCard 
                    icon={<Check size={40} />} 
                    title="نظيف وواقعي" 
                    desc="خالٍ من الأخطاء وواقعي"
                    onClick={() => handleAnswer('style', 'clean')}
                    theme={theme}
                  />
                  <SelectionCard 
                    icon={<Zap size={40} />} 
                    title="سريع وعملي" 
                    desc="نتيجة سريعة للسوشيال ميديا"
                    onClick={() => handleAnswer('style', 'fast')}
                    theme={theme}
                  />
                </>
              )}
            </div>
            
            {step === 1 && (
              <button 
                onClick={() => setStep(0)}
                className={`mt-8 flex items-center gap-2 mx-auto opacity-60 hover:opacity-100 ${theme.textClass}`}
              >
                <ArrowRight size={18} />
                <span>العودة للسؤال السابق</span>
              </button>
            )}
          </div>
        )}
      </div>
    );
  };

  // 3. صفحة النتائج (Results)
  const ResultsPage = () => {
    // تصفية النتائج
    const filteredTools = TOOLS_DATA.filter(t => t.category === answers.type);
    // ترتيب النتائج بحيث يظهر التطابق التام أولاً
    const sortedTools = [...filteredTools].sort((a, b) => {
      if (a.style === answers.style) return -1;
      if (b.style === answers.style) return 1;
      return 0;
    });

    return (
      <div className="w-full max-w-5xl mx-auto mt-4 p-4 animate-fade-in">
         <div className="text-center mb-10">
           <h2 className={`text-3xl font-bold mb-2 ${theme.textClass}`}>ترشيحات سامكو لك</h2>
           <p className={`opacity-80 ${theme.textClass}`}>
             بناءً على اختيارك: {answers.type === 'image' ? 'صور' : answers.type === 'video' ? 'فيديو' : 'صوت'} 
             {' + '} 
             {answers.style === 'cinematic' ? 'سينمائي' : answers.style === 'clean' ? 'نظيف' : 'سريع'}
           </p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedTools.map((tool, idx) => (
              <ResultCard 
                key={tool.id} 
                tool={tool} 
                isBestMatch={tool.style === answers.style} 
                theme={theme}
                idx={idx}
              />
            ))}
         </div>

         <div className="mt-12 flex justify-center">
            <button 
              onClick={goHome}
              className={`flex items-center gap-2 px-6 py-3 rounded-full border ${theme.textClass} hover:bg-white/10 transition`}
            >
              <RefreshCw size={20} />
              <span>بحث جديد</span>
            </button>
         </div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen font-sans ${theme.bgClass} transition-colors duration-700 relative flex flex-col`} dir="rtl">
      <AnimatedBackground />
      <Header />
      
      <main className="flex-grow flex flex-col w-full relative z-10">
        {page === 'home' && <HomePage />}
        {page === 'quiz' && <QuizPage />}
        {page === 'results' && <ResultsPage />}
      </main>

      <SocialFooter />
    </div>
  );
};

// --- المكونات الفرعية (Sub-Components) ---

const SelectionCard = ({ icon, title, desc, onClick, theme }) => (
  <button 
    onClick={onClick}
    className={`
      group flex flex-col items-center justify-center p-8 rounded-2xl border-2 border-transparent
      ${theme.cardClass} hover:border-current
      transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl text-center h-64
      ${theme.textClass}
    `}
  >
    <div className={`mb-6 p-4 rounded-full bg-white/10 group-hover:scale-110 transition-transform`}>
      {icon}
    </div>
    <h3 className="text-2xl font-bold mb-3">{title}</h3>
    <p className="opacity-70 text-sm">{desc}</p>
  </button>
);

const ResultCard = ({ tool, isBestMatch, theme, idx }) => (
  <div 
    className={`
      relative p-6 rounded-2xl flex flex-col gap-4
      ${theme.cardClass} ${isBestMatch ? 'border-2 border-yellow-400/50 shadow-yellow-400/20 shadow-lg' : ''}
      animate-slide-up
    `}
    style={{ animationDelay: `${idx * 100}ms` }}
  >
    {isBestMatch && (
      <div className="absolute -top-3 right-4 bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-md z-10">
        <Star size={12} fill="black" />
        <span>الخيار الأفضل</span>
      </div>
    )}

    <div className="flex justify-between items-start">
      <div className={`p-3 rounded-xl bg-white/10 ${theme.textClass}`}>
        {tool.icon}
      </div>
      <div className="flex flex-col items-end">
        <span className={`text-lg font-bold ${theme.textClass}`}>{tool.rating}</span>
        <div className="flex">
          {[...Array(5)].map((_, i) => (
             <Star key={i} size={12} className={i < Math.floor(tool.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-500"} />
          ))}
        </div>
      </div>
    </div>

    <div>
      <h3 className={`text-xl font-bold mb-1 ${theme.textClass}`}>{tool.name}</h3>
      <div className="flex gap-2 mb-3">
        <span className="text-xs px-2 py-1 rounded bg-white/5 text-current opacity-70 border border-white/10">{tool.category}</span>
        <span className="text-xs px-2 py-1 rounded bg-white/5 text-current opacity-70 border border-white/10">{tool.style}</span>
        <span className="text-xs px-2 py-1 rounded bg-green-500/20 text-green-400 border border-green-500/20">{tool.price}</span>
      </div>
      <p className={`text-sm opacity-80 leading-relaxed ${theme.textClass}`}>
        {tool.desc}
      </p>
    </div>

    <div className="mt-auto pt-4 flex gap-2">
      <button className={`flex-1 py-2 rounded-lg font-bold text-sm transition ${theme.accentClass}`}>
        تجربة الأداة
      </button>
      <button className={`p-2 rounded-lg border border-white/10 hover:bg-white/10 ${theme.textClass}`}>
        <Heart size={20} />
      </button>
    </div>
  </div>
);

export default App;
