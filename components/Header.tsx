import React from 'react';
import { LanguageMode } from '../types';
import { ICONS } from '../constants';

interface HeaderProps {
  languageMode: LanguageMode;
  setLanguageMode: (mode: LanguageMode) => void;
}

export const Header: React.FC<HeaderProps> = ({ languageMode, setLanguageMode }) => {
  return (
    <header className="border-b border-slate-800 bg-dark/50 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Branding */}
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-2">
            <div className="text-primary">
              <ICONS.Brain />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-white leading-none">
              Refactor<span className="text-primary">Deck</span>
            </h1>
          </div>
          <span className="text-[10px] text-slate-500 font-mono tracking-widest pl-8 uppercase pt-1 hidden sm:block">
            Advanced Programming Mastery
          </span>
        </div>
        
        {/* Controls */}
        <div className="flex items-center gap-3">
          {/* Language Toggle (Desktop) */}
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
  );
};