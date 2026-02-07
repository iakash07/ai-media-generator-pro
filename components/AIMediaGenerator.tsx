'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Wand2, Loader2, Download, Sparkles, Upload, Video, Image as ImageIcon, Settings, Key, X, Play } from 'lucide-react';

const IMAGE_PROVIDERS = ['gemini-bhindi', 'gemini-pro', 'dall-e'];
const IMAGE_STYLES = ['vivid', 'natural'];
const IMAGE_SIZES = ['1024x1024', '1792x1024', '1024x1792'];
const GEMINI_ASPECT_RATIOS = ['1:1', '16:9', '4:3', '3:4', '9:16'];
const VIDEO_MODELS = ['veo', 'runway', 'stability', 'luma'];

interface GeneratedMedia {
  type: 'image' | 'video';
  url: string;
  prompt: string;
  provider?: string;
  style?: string;
  size?: string;
  aspectRatio?: string;
  model?: string;
  timestamp: string;
  revisedPrompt?: string;
  isEdited?: boolean;
  fromImage?: boolean;
  isGenerating?: boolean;
}

// Image component with loading state
function ImageWithLoader({ src, alt, className }: { src: string; alt: string; className: string }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <div className="relative">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
            <span className="text-sm text-gray-600">Loading image...</span>
          </div>
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <span className="text-sm text-red-600">Failed to load image</span>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={className}
        onLoad={() => setLoading(false)}
        onError={() => {
          setLoading(false);
          setError(true);
        }}
        style={{ display: loading ? 'none' : 'block' }}
      />
    </div>
  );
}

export default function AIMediaGenerator() {
  const [mode, setMode] = useState<'image' | 'text-to-video' | 'image-to-video'>('image');
  const [prompt, setPrompt] = useState('');
  const [imageProvider, setImageProvider] = useState('gemini-bhindi'); // Default to Gemini Bhindi (free)
  const [imageStyle, setImageStyle] = useState('vivid');
  const [imageSize, setImageSize] = useState('1024x1024');
  const [geminiAspectRatio, setGeminiAspectRatio] = useState('1:1');
  const [videoModel, setVideoModel] = useState('veo');
  const [loading, setLoading] = useState(false);
  const [generatedMedia, setGeneratedMedia] = useState<GeneratedMedia[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  
  // API Keys - stored in localStorage
  const [openaiKey, setOpenaiKey] = useState('');
  const [googleKey, setGoogleKey] = useState('');
  const [runwayKey, setRunwayKey] = useState('');
  const [stabilityKey, setStabilityKey] = useState('');
  const [lumaKey, setLumaKey] = useState('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load API keys from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setOpenaiKey(localStorage.getItem('openai_key') || '');
      setGoogleKey(localStorage.getItem('google_key') || '');
      setRunwayKey(localStorage.getItem('runway_key') || '');
      setStabilityKey(localStorage.getItem('stability_key') || '');
      setLumaKey(localStorage.getItem('luma_key') || '');
    }
  }, []);

  // Save API keys to localStorage
  const saveApiKeys = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('openai_key', openaiKey);
      localStorage.setItem('google_key', googleKey);
      localStorage.setItem('runway_key', runwayKey);
      localStorage.setItem('stability_key', stabilityKey);
      localStorage.setItem('luma_key', lumaKey);
    }
    setShowSettings(false);
  };

  const generateGeminiBhindiImage = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }

    setLoading(true);
    setError(null);

    // Add placeholder to gallery immediately
    const placeholderMedia: GeneratedMedia = {
      type: 'image',
      url: '',
      prompt: prompt,
      provider: 'gemini-bhindi',
      aspectRatio: geminiAspectRatio,
      timestamp: new Date().toLocaleString(),
      isGenerating: true
    };
    
    setGeneratedMedia([placeholderMedia, ...generatedMedia]);
    const currentPrompt = prompt;
    setPrompt('');

    try {
      const response = await fetch('/api/gemini-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: currentPrompt,
          aspectRatio: geminiAspectRatio
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate image');
      }

      const data = await response.json();
      
      // Update the placeholder with actual image
      const newMedia: GeneratedMedia = {
        type: 'image',
        url: data.imageUrl,
        prompt: currentPrompt,
        provider: 'gemini-bhindi',
        aspectRatio: geminiAspectRatio,
        timestamp: new Date().toLocaleString(),
        isGenerating: false
      };
      
      setGeneratedMedia(prev => [newMedia, ...prev.slice(1)]);
      
    } catch (err: any) {
      setError(`Gemini Bhindi Error: ${err.message}`);
      // Remove placeholder on error
      setGeneratedMedia(prev => prev.slice(1));
    } finally {
      setLoading(false);
    }
  };

  const generateGeminiProImage = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }

    if (!googleKey) {
      setError('Please add your Google API key in settings');
      setShowSettings(true);
      return;
    }

    setLoading(true);
    setError(null);

    // Add placeholder to gallery immediately
    const placeholderMedia: GeneratedMedia = {
      type: 'image',
      url: '',
      prompt: prompt,
      provider: 'gemini-pro',
      aspectRatio: geminiAspectRatio,
      timestamp: new Date().toLocaleString(),
      isGenerating: true
    };
    
    setGeneratedMedia([placeholderMedia, ...generatedMedia]);
    const currentPrompt = prompt;
    setPrompt('');

    try {
      const response = await fetch('/api/google-gemini-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: currentPrompt,
          aspectRatio: geminiAspectRatio,
          apiKey: googleKey
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate image');
      }

      const data = await response.json();
      
      // Update the placeholder with actual image
      const newMedia: GeneratedMedia = {
        type: 'image',
        url: data.imageUrl,
        prompt: currentPrompt,
        provider: 'gemini-pro',
        aspectRatio: geminiAspectRatio,
        timestamp: new Date().toLocaleString(),
        isGenerating: false
      };
      
      setGeneratedMedia(prev => [newMedia, ...prev.slice(1)]);
      
    } catch (err: any) {
      setError(`Gemini Pro Error: ${err.message}`);
      // Remove placeholder on error
      setGeneratedMedia(prev => prev.slice(1));
    } finally {
      setLoading(false);
    }
  };

  const generateImage = async () => {
    if (imageProvider === 'gemini-bhindi') {
      return generateGeminiBhindiImage();
    }

    if (imageProvider === 'gemini-pro') {
      return generateGeminiProImage();
    }

    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }

    if (!openaiKey) {
      setError('Please add your OpenAI API key in settings');
      setShowSettings(true);
      return;
    }

    setLoading(true);
    setError(null);

    // Add placeholder to gallery immediately
    const placeholderMedia: GeneratedMedia = {
      type: 'image',
      url: '',
      prompt: prompt,
      provider: 'dall-e',
      style: imageStyle,
      size: imageSize,
      timestamp: new Date().toLocaleString(),
      isGenerating: true
    };
    
    setGeneratedMedia([placeholderMedia, ...generatedMedia]);
    const currentPrompt = prompt;
    setPrompt('');

    try {
      const response = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${openaiKey}`
        },
        body: JSON.stringify({
          model: 'dall-e-3',
          prompt: currentPrompt,
          n: 1,
          size: imageSize,
          quality: 'hd',
          style: imageStyle
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Failed to generate image');
      }

      const data = await response.json();
      
      // Update the placeholder with actual image
      const newMedia: GeneratedMedia = {
        type: 'image',
        url: data.data[0].url,
        prompt: currentPrompt,
        provider: 'dall-e',
        style: imageStyle,
        size: imageSize,
        timestamp: new Date().toLocaleString(),
        revisedPrompt: data.data[0].revised_prompt,
        isGenerating: false
      };
      
      setGeneratedMedia(prev => [newMedia, ...prev.slice(1)]);
      
    } catch (err: any) {
      setError(`DALL-E Error: ${err.message}`);
      // Remove placeholder on error
      setGeneratedMedia(prev => prev.slice(1));
    } finally {
      setLoading(false);
    }
  };

  const generateVeoVideo = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }

    if (!googleKey) {
      setError('Please add your Google API key in settings');
      setShowSettings(true);
      return;
    }

    setLoading(true);
    setError(null);

    // Add placeholder to gallery immediately
    const placeholderMedia: GeneratedMedia = {
      type: 'video',
      url: '',
      prompt: prompt,
      model: 'veo',
      timestamp: new Date().toLocaleString(),
      fromImage: mode === 'image-to-video',
      isGenerating: true
    };
    
    setGeneratedMedia([placeholderMedia, ...generatedMedia]);
    const currentPrompt = prompt;
    setPrompt('');

    try {
      const response = await fetch('/api/google-veo-video', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: currentPrompt,
          imageUrl: mode === 'image-to-video' ? uploadedImage : undefined,
          apiKey: googleKey
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate video');
      }

      const data = await response.json();

      if (data.status === 'completed') {
        // Video is ready immediately
        const newMedia: GeneratedMedia = {
          type: 'video',
          url: data.videoUrl,
          prompt: currentPrompt,
          model: 'veo',
          timestamp: new Date().toLocaleString(),
          fromImage: mode === 'image-to-video',
          isGenerating: false
        };
        
        setGeneratedMedia(prev => [newMedia, ...prev.slice(1)]);
      } else if (data.status === 'processing') {
        // Need to poll for completion
        pollVeoVideoStatus(data.operationId, currentPrompt);
      }
      
    } catch (err: any) {
      setError(`Veo Error: ${err.message}`);
      // Remove placeholder on error
      setGeneratedMedia(prev => prev.slice(1));
      setLoading(false);
    }
  };

  const pollVeoVideoStatus = async (operationId: string, currentPrompt: string) => {
    const maxAttempts = 60; // 5 minutes max (5 second intervals)
    let attempts = 0;

    const checkStatus = async () => {
      try {
        const response = await fetch('/api/google-veo-status', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            operationId,
            apiKey: googleKey
          })
        });

        if (!response.ok) {
          throw new Error('Failed to check video status');
        }

        const data = await response.json();

        if (data.status === 'completed') {
          // Update placeholder with actual video
          const newMedia: GeneratedMedia = {
            type: 'video',
            url: data.videoUrl,
            prompt: currentPrompt,
            model: 'veo',
            timestamp: new Date().toLocaleString(),
            fromImage: mode === 'image-to-video',
            isGenerating: false
          };
          
          setGeneratedMedia(prev => [newMedia, ...prev.slice(1)]);
          setLoading(false);
        } else if (data.status === 'failed') {
          throw new Error(data.error || 'Video generation failed');
        } else if (attempts < maxAttempts) {
          // Still processing, check again in 5 seconds
          attempts++;
          setTimeout(checkStatus, 5000);
        } else {
          throw new Error('Video generation timed out');
        }
      } catch (err: any) {
        setError(`Veo Status Error: ${err.message}`);
        setGeneratedMedia(prev => prev.slice(1));
        setLoading(false);
      }
    };

    checkStatus();
  };

  const generateVideo = async () => {
    if (videoModel === 'veo') {
      return generateVeoVideo();
    }

    // Existing video generation logic for other providers
    // ... (keep existing code)
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const downloadMedia = (url: string, type: 'image' | 'video') => {
    const link = document.createElement('a');
    link.href = url;
    link.download = `ai-${type}-${Date.now()}.${type === 'image' ? 'png' : 'mp4'}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getProviderLabel = (provider: string) => {
    switch (provider) {
      case 'gemini-bhindi':
        return '✨ Gemini (Free)';
      case 'gemini-pro':
        return '🚀 Gemini Pro';
      case 'dall-e':
        return 'DALL-E 3';
      default:
        return provider;
    }
  };

  const getModelLabel = (model: string) => {
    switch (model) {
      case 'veo':
        return '🎬 Google Veo';
      case 'runway':
        return 'Runway Gen-3';
      case 'stability':
        return 'Stability AI';
      case 'luma':
        return 'Luma Dream Machine';
      default:
        return model;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            <Sparkles className="w-10 h-10 md:w-12 h-12 text-yellow-400" />
            AI Media Generator Pro
          </h1>
          <p className="text-lg text-purple-200">
            Create stunning images and videos with AI - Now with Google Gemini Pro & Veo!
          </p>
        </div>

        {/* Settings Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
          >
            <Settings className="w-5 h-5" />
            API Settings
          </button>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-6 border border-white/20">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Key className="w-6 h-6" />
                API Keys Configuration
              </h2>
              <button
                onClick={() => setShowSettings(false)}
                className="text-white/60 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-white mb-2 font-medium">
                  Google API Key (for Gemini Pro & Veo)
                </label>
                <input
                  type="password"
                  value={googleKey}
                  onChange={(e) => setGoogleKey(e.target.value)}
                  placeholder="Enter your Google API key"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <p className="text-sm text-purple-200 mt-1">
                  Get your key from: <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="underline">Google AI Studio</a>
                </p>
              </div>

              <div>
                <label className="block text-white mb-2 font-medium">
                  OpenAI API Key (for DALL-E 3)
                </label>
                <input
                  type="password"
                  value={openaiKey}
                  onChange={(e) => setOpenaiKey(e.target.value)}
                  placeholder="sk-..."
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-white mb-2 font-medium">
                  Runway API Key
                </label>
                <input
                  type="password"
                  value={runwayKey}
                  onChange={(e) => setRunwayKey(e.target.value)}
                  placeholder="Enter your Runway API key"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-white mb-2 font-medium">
                  Stability AI API Key
                </label>
                <input
                  type="password"
                  value={stabilityKey}
                  onChange={(e) => setStabilityKey(e.target.value)}
                  placeholder="sk-..."
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-white mb-2 font-medium">
                  Luma AI API Key
                </label>
                <input
                  type="password"
                  value={lumaKey}
                  onChange={(e) => setLumaKey(e.target.value)}
                  placeholder="Enter your Luma API key"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <button
                onClick={saveApiKeys}
                className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold rounded-lg transition-all transform hover:scale-105"
              >
                Save API Keys
              </button>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 md:p-8 shadow-2xl border border-white/20">
          {/* Mode Selection */}
          <div className="flex flex-wrap gap-4 mb-6">
            <button
              onClick={() => setMode('image')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 ${
                mode === 'image'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <ImageIcon className="w-5 h-5" />
              Image Generation
            </button>
            <button
              onClick={() => setMode('text-to-video')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 ${
                mode === 'text-to-video'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <Video className="w-5 h-5" />
              Text-to-Video
            </button>
            <button
              onClick={() => setMode('image-to-video')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 ${
                mode === 'image-to-video'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <Upload className="w-5 h-5" />
              Image-to-Video
            </button>
          </div>

          {/* Image Upload for Image-to-Video */}
          {mode === 'image-to-video' && (
            <div className="mb-6">
              <label className="block text-white mb-2 font-medium">Upload Image</label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full px-6 py-4 bg-white/10 hover:bg-white/20 border-2 border-dashed border-white/30 rounded-lg text-white font-semibold transition-all flex items-center justify-center gap-2"
              >
                <Upload className="w-5 h-5" />
                {uploadedImage ? 'Change Image' : 'Upload Image'}
              </button>
              {uploadedImage && (
                <div className="mt-4">
                  <img src={uploadedImage} alt="Uploaded" className="w-full max-w-md mx-auto rounded-lg" />
                </div>
              )}
            </div>
          )}

          {/* Provider/Model Selection */}
          {mode === 'image' && (
            <div className="mb-6">
              <label className="block text-white mb-2 font-medium">Image Provider</label>
              <div className="flex flex-wrap gap-2">
                {IMAGE_PROVIDERS.map((provider) => (
                  <button
                    key={provider}
                    onClick={() => setImageProvider(provider)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      imageProvider === provider
                        ? 'bg-white text-purple-900'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    {getProviderLabel(provider)}
                  </button>
                ))}
              </div>
            </div>
          )}

          {(mode === 'text-to-video' || mode === 'image-to-video') && (
            <div className="mb-6">
              <label className="block text-white mb-2 font-medium">Video Model</label>
              <div className="flex flex-wrap gap-2">
                {VIDEO_MODELS.map((model) => (
                  <button
                    key={model}
                    onClick={() => setVideoModel(model)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      videoModel === model
                        ? 'bg-white text-purple-900'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    {getModelLabel(model)}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Image Settings */}
          {mode === 'image' && (
            <>
              {(imageProvider === 'gemini-bhindi' || imageProvider === 'gemini-pro') && (
                <div className="mb-6">
                  <label className="block text-white mb-2 font-medium">Aspect Ratio</label>
                  <div className="flex flex-wrap gap-2">
                    {GEMINI_ASPECT_RATIOS.map((ratio) => (
                      <button
                        key={ratio}
                        onClick={() => setGeminiAspectRatio(ratio)}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${
                          geminiAspectRatio === ratio
                            ? 'bg-white text-purple-900'
                            : 'bg-white/10 text-white hover:bg-white/20'
                        }`}
                      >
                        {ratio}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {imageProvider === 'dall-e' && (
                <>
                  <div className="mb-6">
                    <label className="block text-white mb-2 font-medium">Style</label>
                    <div className="flex gap-2">
                      {IMAGE_STYLES.map((style) => (
                        <button
                          key={style}
                          onClick={() => setImageStyle(style)}
                          className={`px-4 py-2 rounded-lg font-medium transition-all capitalize ${
                            imageStyle === style
                              ? 'bg-white text-purple-900'
                              : 'bg-white/10 text-white hover:bg-white/20'
                          }`}
                        >
                          {style}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-white mb-2 font-medium">Size</label>
                    <div className="flex flex-wrap gap-2">
                      {IMAGE_SIZES.map((size) => (
                        <button
                          key={size}
                          onClick={() => setImageSize(size)}
                          className={`px-4 py-2 rounded-lg font-medium transition-all ${
                            imageSize === size
                              ? 'bg-white text-purple-900'
                              : 'bg-white/10 text-white hover:bg-white/20'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </>
          )}

          {/* Prompt Input */}
          <div className="mb-6">
            <label className="block text-white mb-2 font-medium">
              {mode === 'image' ? 'Image Prompt' : 'Video Prompt'}
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={
                mode === 'image'
                  ? 'Describe the image you want to create...'
                  : 'Describe the video you want to create...'
              }
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[100px]"
            />
          </div>

          {/* Generate Button */}
          <button
            onClick={mode === 'image' ? generateImage : generateVideo}
            disabled={loading}
            className="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold rounded-lg transition-all transform hover:scale-105 disabled:scale-100 flex items-center justify-center gap-2 text-lg shadow-lg"
          >
            {loading ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Wand2 className="w-6 h-6" />
                Generate {mode === 'image' ? 'Image' : 'Video'}
              </>
            )}
          </button>

          {/* Error Display */}
          {error && (
            <div className="mt-4 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200">
              {error}
            </div>
          )}
        </div>

        {/* Generated Media Gallery */}
        {generatedMedia.length > 0 && (
          <div className="mt-8">
            <h2 className="text-3xl font-bold text-white mb-6">Your Creations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {generatedMedia.map((media, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden border border-white/20 shadow-xl"
                >
                  {media.isGenerating ? (
                    <div className="aspect-square flex items-center justify-center bg-white/5">
                      <div className="flex flex-col items-center gap-4">
                        <Loader2 className="w-12 h-12 animate-spin text-purple-400" />
                        <span className="text-white font-medium">Generating...</span>
                      </div>
                    </div>
                  ) : media.type === 'image' ? (
                    <ImageWithLoader
                      src={media.url}
                      alt={media.prompt}
                      className="w-full h-auto"
                    />
                  ) : (
                    <video
                      src={media.url}
                      controls
                      className="w-full h-auto"
                    />
                  )}
                  <div className="p-4">
                    <p className="text-white text-sm mb-2 line-clamp-2">{media.prompt}</p>
                    <div className="flex items-center justify-between text-xs text-purple-200">
                      <span>
                        {media.type === 'image' 
                          ? getProviderLabel(media.provider || '')
                          : getModelLabel(media.model || '')}
                      </span>
                      <span>{media.timestamp}</span>
                    </div>
                    {media.revisedPrompt && (
                      <p className="text-xs text-purple-300 mt-2 italic">
                        Revised: {media.revisedPrompt}
                      </p>
                    )}
                    {!media.isGenerating && (
                      <button
                        onClick={() => downloadMedia(media.url, media.type)}
                        className="mt-3 w-full px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all flex items-center justify-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        Download
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
