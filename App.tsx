import React, { useState, useEffect, useCallback } from 'react';
import { Topic, LanguageMode, FlashcardData } from './types';
import { generateFlashcard } from './services/geminiService';
import { Flashcard } from './components/Flashcard';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ICONS } from './constants';

const App: React.FC = () => {
  // --- State Management ---
  const [topic, setTopic] = useState<Topic>(Topic.CLEAN_CODE);
  const [languageMode, setLanguageMode] = useState<LanguageMode>(LanguageMode.BOTH);
  const [currentCard, setCurrentCard] = useState<FlashcardData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // --- Actions ---
  const loadNewCard = useCallback(async () => {
    setLoading(true);
    setError(null);
    setIsFlipped(false);
    
    try {
      const data = await generateFlashcard(topic);
      setCurrentCard(data);
    } catch (err) {
      console.error(err);
      setError("Unable to load the next flashcard. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [topic]);

  // Initial Data Load
  useEffect(() => {
    loadNewCard();
  }, [loadNewCard]);

  // --- Rendering Helpers ---
  const renderContent = () => {
    if (loading) {
      return (
        <div className="w-full h-[500px] bg-card rounded-2xl animate-pulse flex flex-col items-center justify-center border border-slate-800">
           <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
           <p className="text-slate-400 text-sm">Analyzing Codebase...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center p-8 bg-red-950/20 border border-red-900/50 rounded-xl max-w-lg">
          <h3 className="text-red-400 font-bold mb-2">Error</h3>
          <p className="text-red-200/70 mb-4">{error}</p>
          <button onClick={loadNewCard} className="text-primary hover:underline">Try Again</button>
        </div>
      );
    }

    if (!currentCard) {
      return <div className="text-slate-500">Press Next Card to start</div>;
    }

    return (
      <Flashcard 
        data={currentCard} 
        isFlipped={isFlipped} 
        onFlip={() => setIsFlipped(!isFlipped)} 
        languageMode={languageMode}
      />
    );
  };

  return (
    <div className="min-h-screen bg-dark flex flex-col font-sans">
      <Header languageMode={languageMode} setLanguageMode={setLanguageMode} />

      <main className="flex-grow flex flex-col items-center justify-center p-4 sm:p-8">
        
        {/* Controls Section */}
        <div className="w-full max-w-3xl mb-8 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <label htmlFor="topic-select" className="text-slate-400 text-sm font-medium whitespace-nowrap">
              Current Focus:
            </label>
            <select 
              id="topic-select"
              value={topic}
              onChange={(e) => setTopic(e.target.value as Topic)}
              className="bg-slate-800 border-none text-white text-sm rounded-lg focus:ring-2 focus:ring-primary block w-full p-2.5 cursor-pointer hover:bg-slate-700 transition-colors"
            >
              {Object.values(Topic).map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <button
            onClick={loadNewCard}
            disabled={loading}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed border border-slate-700"
          >
            {loading ? (
              <span>Thinking...</span>
            ) : (
               <>
                <ICONS.Refresh />
                <span>Next Card</span>
               </>
            )}
          </button>
        </div>

        {/* Flashcard Container */}
        <div className="w-full max-w-3xl flex justify-center mb-8 min-h-[500px]">
          {renderContent()}
        </div>

        {/* Mobile Language Controls */}
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
      
      <Footer />
    </div>
  );
};

export default App;