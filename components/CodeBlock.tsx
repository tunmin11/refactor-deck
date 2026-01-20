import React, { useEffect, useRef } from 'react';

// Declare Prism global from the script tag
declare global {
  interface Window {
    Prism: any;
  }
}

interface CodeBlockProps {
  code: string;
  label?: string;
  isGood?: boolean;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, label, isGood }) => {
  const codeRef = useRef<HTMLElement>(null);

  // Trigger highlight whenever code changes
  useEffect(() => {
    if (window.Prism && codeRef.current) {
      window.Prism.highlightElement(codeRef.current);
    }
  }, [code]);

  if (!code) return null;

  const borderColor = isGood === undefined 
    ? 'border-slate-700' 
    : isGood 
      ? 'border-green-500/50' 
      : 'border-red-500/50';
  
  // Use a subtle background tint for the header only, keeping the code block high-contrast dark
  const labelColor = isGood === undefined 
    ? 'text-slate-400 bg-slate-800' 
    : isGood 
      ? 'text-green-300 bg-green-900/40 border-b border-green-500/20' 
      : 'text-red-300 bg-red-900/40 border-b border-red-500/20';

  return (
    <div className={`my-4 rounded-lg border ${borderColor} overflow-hidden bg-[#2d2d2d] shadow-lg`}>
      {label && (
        <div className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider flex justify-between items-center ${labelColor}`}>
          <span>{label}</span>
          <span className="text-[10px] opacity-60 font-normal">TypeScript</span>
        </div>
      )}
      
      {/* 
         - overflow-x-auto: Enables horizontal scrolling on small screens
         - !bg-transparent: Overrides Prism's default pre background to blend with our container 
         - text-sm/text-xs: Responsive font sizing for better mobile view
      */}
      <div className="overflow-x-auto relative">
        <pre className="!m-0 !rounded-none !bg-transparent !p-4 !font-mono text-xs sm:text-sm leading-relaxed">
          <code ref={codeRef} className="language-tsx">
            {code}
          </code>
        </pre>
      </div>
    </div>
  );
};