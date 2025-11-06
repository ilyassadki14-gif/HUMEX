
import React, { useState, useCallback } from 'react';
import { generateTshirtDesign } from './services/geminiService';
import TshirtMockup from './components/TshirtMockup';

const initialPrompt = `A bold and modern T-shirt design featuring the phrase “TURN THE VOLUME UP” in large, distressed sans-serif typography. The text is centered with “TURN THE” on top and “VOLUME UP” below. Under the words, a clean blue rectangle with white stars and red stripes adds patriotic energy. Add subtle 3D shading, slight metallic texture, and warm gradient lighting for a premium finish. Keep it powerful, minimal, and perfectly balanced on a solid dark grey background, high contrast, no watermarks, ready for print-on-demand shirts.`;

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>(initialPrompt);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    if (!prompt || isLoading) return;
    setIsLoading(true);
    setError(null);
    setGeneratedImage(null); // Clear previous image

    try {
      const imageUrl = await generateTshirtDesign(prompt);
      setGeneratedImage(imageUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [prompt, isLoading]);

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto max-w-7xl">
        <header className="text-center mb-8 md:mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">
              AI T-Shirt Designer
            </span>
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-lg sm:text-xl text-gray-400">
            Craft your unique T-shirt design with the power of AI.
          </p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <div className="bg-gray-800/50 p-6 rounded-2xl shadow-lg ring-1 ring-white/10">
            <h2 className="text-2xl font-bold mb-4 text-teal-300">1. Describe Your Design</h2>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., A minimalist logo of a cat astronaut"
              className="w-full h-64 bg-gray-900 border border-gray-700 rounded-lg p-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 resize-none text-gray-200 placeholder-gray-500"
              disabled={isLoading}
            />
            <button
              onClick={handleGenerate}
              disabled={isLoading || !prompt}
              className="mt-6 w-full flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-transform transform active:scale-95 shadow-lg"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating...
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  Generate Design
                </>
              )}
            </button>
            {error && <p className="mt-4 text-red-400 bg-red-900/50 p-3 rounded-lg text-center">{error}</p>}
          </div>

          <div className="bg-gray-800/50 p-6 rounded-2xl shadow-lg ring-1 ring-white/10 flex flex-col">
            <h2 className="text-2xl font-bold mb-4 text-teal-300 text-center lg:text-left">2. Preview Your T-Shirt</h2>
            <div className="flex-grow flex items-center justify-center">
              <TshirtMockup imageUrl={generatedImage} isLoading={isLoading} />
            </div>
             {generatedImage && !isLoading && (
              <a
                href={generatedImage}
                download="tshirt-design.jpeg"
                className="mt-6 w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-4 rounded-lg transition-transform transform active:scale-95 shadow-lg text-center"
              >
                Download Design
              </a>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
