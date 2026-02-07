'use client';

import React, { useState } from 'react';
import { Download, Wand2, Sparkles } from 'lucide-react';

interface GeneratedImage {
  url: string;
  prompt: string;
  timestamp: string;
  aspectRatio: string;
}

export default function AIMediaGenerator() {
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState<string>('1:1');
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateImage = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      // Use Bhindi's FREE Gemini Nano Banana Pro API
      const response = await fetch('/api/gemini-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          prompt,
          aspectRatio 
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate image');
      }

      const data = await response.json();
      
      // Add to gallery
      const newImage: GeneratedImage = {
        url: data.imageUrl,
        prompt: prompt,
        timestamp: new Date().toLocaleString(),
        aspectRatio: aspectRatio
      };
      
      setGeneratedImages([newImage, ...generatedImages]);
      setPrompt(''); // Clear prompt after successful generation
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Generation error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = async (imageUrl: string, prompt: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${prompt.slice(0, 30)}-${Date.now()}.jpg`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Failed to download image');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-12 h-12 text-yellow-400" />
            <h1 className="text-5xl font-bold text-white">AI Image Generator</h1>
          </div>
          <p className="text-xl text-blue-200">
            ✨ FREE Unlimited Image Generation • Powered by Gemini Nano Banana Pro
          </p>
        </div>

        {/* Generation Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-8 border border-white/20">
          <div className="space-y-6">
            {/* Prompt Input */}
            <div>
              <label className="block text-white text-lg font-semibold mb-3">
                What do you want to create?
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your image... (e.g., 'a beautiful sunset over mountains', 'a cat wearing sunglasses')"
                className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 min-h-[100px] resize-none"
                disabled={isGenerating}
              />
            </div>

            {/* Aspect Ratio Selection */}
            <div>
              <label className="block text-white text-lg font-semibold mb-3">
                Aspect Ratio
              </label>
              <div className="grid grid-cols-5 gap-3">
                {[
                  { value: '1:1', label: 'Square', icon: '⬜' },
                  { value: '16:9', label: 'Landscape', icon: '🖼️' },
                  { value: '4:3', label: 'Standard', icon: '📺' },
                  { value: '3:4', label: 'Portrait', icon: '📱' },
                  { value: '9:16', label: 'Story', icon: '📲' }
                ].map((ratio) => (
                  <button
                    key={ratio.value}
                    onClick={() => setAspectRatio(ratio.value)}
                    disabled={isGenerating}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      aspectRatio === ratio.value
                        ? 'bg-blue-500 border-blue-400 text-white'
                        : 'bg-white/10 border-white/30 text-white hover:bg-white/20'
                    } ${isGenerating ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    <div className="text-2xl mb-1">{ratio.icon}</div>
                    <div className="text-sm font-semibold">{ratio.label}</div>
                    <div className="text-xs opacity-75">{ratio.value}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4">
                <p className="text-red-200">{error}</p>
              </div>
            )}

            {/* Generate Button */}
            <button
              onClick={generateImage}
              disabled={isGenerating || !prompt.trim()}
              className={`w-full py-4 rounded-lg font-bold text-lg transition-all flex items-center justify-center gap-3 ${
                isGenerating || !prompt.trim()
                  ? 'bg-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl'
              } text-white`}
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                  Generating your masterpiece...
                </>
              ) : (
                <>
                  <Wand2 className="w-6 h-6" />
                  Generate FREE Image
                </>
              )}
            </button>

            {/* Info */}
            <div className="bg-blue-500/20 border border-blue-400/50 rounded-lg p-4">
              <p className="text-blue-100 text-sm text-center">
                🎉 <strong>100% FREE</strong> • No API keys needed • Unlimited generations • High quality images
              </p>
            </div>
          </div>
        </div>

        {/* Gallery */}
        {generatedImages.length > 0 && (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="w-6 h-6 text-yellow-400" />
              <h2 className="text-2xl font-bold text-white">
                Your Creations ({generatedImages.length})
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {generatedImages.map((image, index) => (
                <div
                  key={index}
                  className="bg-white/5 rounded-xl overflow-hidden border border-white/20 hover:border-white/40 transition-all"
                >
                  <div className="relative aspect-square">
                    <img
                      src={image.url}
                      alt={image.prompt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-white font-semibold mb-2 line-clamp-2">
                      {image.prompt}
                    </p>
                    <div className="flex items-center justify-between text-sm text-white/60 mb-3">
                      <span className="bg-blue-500/30 px-2 py-1 rounded">
                        {image.aspectRatio}
                      </span>
                      <span>{image.timestamp}</span>
                    </div>
                    <button
                      onClick={() => handleDownload(image.url, image.prompt)}
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-8 text-white/60">
          <p>Powered by Bhindi AI • Gemini Nano Banana Pro</p>
        </div>
      </div>
    </div>
  );
}
