import React, { useState, useEffect, useCallback } from 'react';
import { Topic, LanguageMode, FlashcardData } from './types';
import { generateFlashcard } from './services/geminiService';
import { Flashcard } from './components/Flashcard';
import { ICONS } from './constants';

const App: React.FC = () => {
  // State
  const [topic, setTopic] = useState<Topic>(Topic.CLEAN_CODE);
  const [languageMode, setLanguageMode] = useState<LanguageMode>(LanguageMode.BOTH);
  const [currentCard, setCurrentCard] = useState<FlashcardData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch logic
  const loadNewCard = useCallback(async () => {
    setLoading(true);
    setError(null);
    setIsFlipped(false);
    try {
      const data = await generateFlashcard(topic);
      setCurrentCard(data);
    } catch (err) {
      console.error(err);
      setError("Failed to generate content. Please check your API key or try again.");
    } finally {
      setLoading(false);
    }
  }, [topic]);

  // Initial load
  useEffect(() => {
    loadNewCard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount, then user drives via "Next" button

  return (
    <div className="min-h-screen bg-dark flex flex-col font-sans">
      
      {/* Header */}
      <header className="border-b border-slate-800 bg-dark/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-2">
                <div className="text-primary"><ICONS.Brain /></div>
                <h1 className="text-xl font-bold tracking-tight text-white leading-none">
                Refactor<span className="text-primary">Deck</span>
                </h1>
            </div>
            <span className="text-[10px] text-slate-500 font-mono tracking-widest pl-8 uppercase pt-1 hidden sm:block">Advanced Programming Mastery</span>
          </div>
          
          {/* Controls */}
          <div className="flex items-center gap-3">
             {/* Language Toggle */}
             <div className="hidden sm:flex bg-slate-800 p-1 rounded-lg">
              {Object.values(LanguageMode).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setLanguageMode(mode)}
                  className={`px-3 py-1 text-xs rounded-md font-medium transition-colors ${
                    languageMode === mode 
                      ? 'bg-primary text-white shadow-sm' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {mode === LanguageMode.ENG ? 'ENG' : mode === LanguageMode.MM ? 'MM' : 'BOTH'}
                </button>
              ))}
            </div>
            
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noreferrer" 
              className="text-slate-500 hover:text-white transition-colors text-sm"
            >
              GitHub
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center p-4 sm:p-8">
        
        {/* Topic Selector */}
        <div className="w-full max-w-3xl mb-8 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-slate-400 text-sm font-medium whitespace-nowrap">Current Focus:</span>
            <select 
              value={topic}
              onChange={(e) => {
                setTopic(e.target.value as Topic);
                // We do NOT auto-reload here to let user decide when to switch context
              }}
              className="bg-slate-800 border-none text-white text-sm rounded-lg focus:ring-2 focus:ring-primary block w-full p-2.5 cursor-pointer hover:bg-slate-700 transition-colors"
            >
              {Object.values(Topic).map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <button
            onClick={() => loadNewCard()}
            disabled={loading}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed border border-slate-700"
          >
            {loading ? (
              <span className="flex items-center gap-2">Thinking...</span>
            ) : (
               <>
                <ICONS.Refresh />
                <span>Generate New Card</span>
               </>
            )}
          </button>
        </div>

        {/* Card Area */}
        <div className="w-full max-w-3xl flex justify-center mb-8 min-h-[500px]">
          {loading ? (
            <div className="w-full h-[500px] bg-card rounded-2xl animate-pulse flex flex-col items-center justify-center border border-slate-800">
               <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
               <p className="text-slate-400 text-sm">Consulting AI Architect...</p>
               <p className="text-slate-600 text-xs mt-2">Generating {topic} scenario</p>
            </div>
          ) : error ? (
            <div className="text-center p-8 bg-red-950/20 border border-red-900/50 rounded-xl max-w-lg">
              <h3 className="text-red-400 font-bold mb-2">Error</h3>
              <p className="text-red-200/70 mb-4">{error}</p>
              <button onClick={() => loadNewCard()} className="text-primary hover:underline">Try Again</button>
            </div>
          ) : currentCard ? (
            <Flashcard 
              data={currentCard} 
              isFlipped={isFlipped} 
              onFlip={() => setIsFlipped(!isFlipped)} 
              languageMode={languageMode}
            />
          ) : (
            <div className="text-slate-500">Press Generate to start</div>
          )}
        </div>

        {/* Mobile Language Toggle (Visible only on small screens) */}
        <div className="sm:hidden flex bg-slate-800 p-1 rounded-lg mb-8">
            {Object.values(LanguageMode).map((mode) => (
            <button
                key={mode}
                onClick={() => setLanguageMode(mode)}
                className={`px-4 py-2 text-xs rounded-md font-medium transition-colors ${
                languageMode === mode 
                    ? 'bg-primary text-white shadow-sm' 
                    : 'text-slate-400 hover:text-white'
                }`}
            >
                {mode === LanguageMode.ENG ? 'ENG' : mode === LanguageMode.MM ? 'MM' : 'BOTH'}
            </button>
            ))}
        </div>

      </main>
      
      <footer className="py-6 text-center text-slate-600 text-xs border-t border-slate-800">
        <p>Powered by Google Gemini • Built with React & Tailwind</p>
      </footer>
    </div>
  );
};

export default App;