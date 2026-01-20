import React from 'react';
import { FlashcardData, LanguageMode } from '../types';
import { CodeBlock } from './CodeBlock';

interface FlashcardProps {
  data: FlashcardData;
  isFlipped: boolean;
  onFlip: () => void;
  languageMode: LanguageMode;
}

export const Flashcard: React.FC<FlashcardProps> = ({ data, isFlipped, onFlip, languageMode }) => {
  
  const showEng = languageMode === LanguageMode.ENG || languageMode === LanguageMode.BOTH;
  const showMm = languageMode === LanguageMode.MM || languageMode === LanguageMode.BOTH;

  return (
    <div 
      className="relative w-full max-w-3xl h-[600px] sm:h-[500px] cursor-pointer group perspective-1000"
      onClick={onFlip}
    >
      <div className={`relative w-full h-full duration-500 transform-style-3d transition-all ${isFlipped ? 'rotate-y-180' : ''}`}>
        
        {/* FRONT */}
        <div className="absolute w-full h-full bg-card border border-slate-700 rounded-2xl shadow-2xl backface-hidden p-6 sm:p-10 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="flex justify-between items-start mb-6">
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase">
                {data.title}
              </span>
              <span className="text-slate-500 text-xs font-mono">
                {data.difficulty} Level
              </span>
            </div>

            <div className="space-y-6">
              {showEng && (
                <div>
                  <h3 className="text-slate-400 text-sm font-semibold uppercase tracking-wider mb-2">Scenario</h3>
                  <p className="text-lg text-slate-200 leading-relaxed font-sans">{data.scenario_eng}</p>
                </div>
              )}
              
              {showMm && (
                <div className={showEng ? "pt-4 border-t border-slate-700/50" : ""}>
                   <h3 className="text-slate-400 text-sm font-semibold uppercase tracking-wider mb-2">Scenario (MM)</h3>
                  <p className="text-lg text-slate-200 leading-relaxed font-sans">{data.scenario_mm}</p>
                </div>
              )}

              <CodeBlock code={data.code_snippet_initial || ''} label="Current Implementation" isGood={false} />

              <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50 mt-4">
                 {showEng && <p className="font-semibold text-primary">{data.question_eng}</p>}
                 {showMm && <p className={`font-semibold text-primary ${showEng ? 'mt-2' : ''}`}>{data.question_mm}</p>}
              </div>
            </div>
          </div>
          
          <div className="mt-6 text-center text-slate-500 text-sm animate-pulse">
            Click to reveal solution
          </div>
        </div>

        {/* BACK */}
        <div className="absolute w-full h-full bg-slate-900 border border-indigo-900/50 rounded-2xl shadow-2xl backface-hidden rotate-y-180 p-6 sm:p-10 flex flex-col overflow-y-auto">
          <div className="mb-6 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <h2 className="text-xl font-bold text-slate-100">Solution & Analysis</h2>
          </div>

          <div className="space-y-6 flex-grow">
             {showEng && (
                <div>
                  <p className="text-slate-300 leading-relaxed">{data.solution_eng}</p>
                </div>
              )}
              
              {showMm && (
                <div className={showEng ? "pt-4 border-t border-slate-800" : ""}>
                  <p className="text-slate-300 leading-relaxed">{data.solution_mm}</p>
                </div>
              )}

            <CodeBlock code={data.code_snippet_solution || ''} label="Refactored Code" isGood={true} />

            <div className="bg-indigo-950/30 p-4 rounded-lg border border-indigo-500/20">
              <h4 className="text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2">Key Takeaway</h4>
              {showEng && <p className="text-slate-200 italic">"{data.key_takeaway_eng}"</p>}
              {showMm && <p className="text-slate-200 italic mt-1">"{data.key_takeaway_mm}"</p>}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};