
import React from 'react';

const Spinner: React.FC = () => (
    <div className="flex justify-center items-center">
      <svg
        className="animate-spin h-12 w-12 text-blue-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>
);


interface TshirtMockupProps {
  imageUrl: string | null;
  isLoading: boolean;
}

const TshirtMockup: React.FC<TshirtMockupProps> = ({ imageUrl, isLoading }) => {
  const tshirtColor = 'bg-slate-800';

  return (
    <div className="relative w-full max-w-md mx-auto aspect-[4/5] flex items-center justify-center p-4">
      {/* T-shirt shape simulation */}
      <div className="relative w-[90%] h-[95%]">
        <div className={`w-full h-full ${tshirtColor} rounded-b-[10%] shadow-inner`}></div>
        <div className={`absolute top-0 -left-[1%] w-1/3 h-1/4 ${tshirtColor} -rotate-45 transform origin-bottom-right rounded-t-xl shadow-inner`}></div>
        <div className={`absolute top-0 -right-[1%] w-1/3 h-1/4 ${tshirtColor} rotate-45 transform origin-bottom-left rounded-t-xl shadow-inner`}></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[10%] bg-gray-900 rounded-b-full">
            <div className={`absolute top-[1.2rem] left-1/2 -translate-x-1/2 w-[80%] h-full ${tshirtColor} rounded-b-full`}></div>
        </div>
      </div>
      
      {/* Design & Loading Area */}
      <div className="absolute top-[28%] w-[45%] aspect-square flex items-center justify-center">
        {isLoading && <Spinner />}
        <div className={`transition-opacity duration-700 ease-in-out ${isLoading ? 'opacity-0' : 'opacity-100'} w-full h-full`}>
            {imageUrl ? (
              <img 
                src={imageUrl} 
                alt="Generated T-shirt design" 
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            ) : (
                <div className="w-full h-full border-2 border-dashed border-gray-600 rounded-lg flex flex-col items-center justify-center text-gray-500 text-center p-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-sm font-semibold">Your design will appear here</p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default TshirtMockup;
