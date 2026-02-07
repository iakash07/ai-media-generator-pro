'use client';

import React, { useState, useEffect } from 'react';
import { Download, Wand2, Video, Image as ImageIcon, Upload, Settings, X } from 'lucide-react';

type GenerationMode = 'image' | 'text-to-video' | 'image-to-video';
type ImageProvider = 'gemini' | 'dalle';
type VideoModel = 'runway' | 'stability' | 'luma';

interface ApiKeys {
  openai: string;
  runway: string;
  stability: string;
  luma: string;
}

export default function AIMediaGenerator() {
  const [mode, setMode] = useState<GenerationMode>('image');
  const [prompt, setPrompt] = useState('');
  const [imageProvider, setImageProvider] = useState<ImageProvider>('gemini');
  const [videoModel, setVideoModel] = useState<VideoModel>('runway');
  const [aspectRatio, setAspectRatio] = useState<string>('1:1');
  const [imageStyle, setImageStyle] = useState<'vivid' | 'natural'>('vivid');
  const [imageSize, setImageSize] = useState<'1024x1024' | '1792x1024' | '1024x1792'>('1024x1024');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [generatedMedia, setGeneratedMedia] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [apiKeys, setApiKeys] = useState<ApiKeys>({
    openai: '',
    runway: '',
    stability: '',
    luma: ''
  });

  // Load API keys from localStorage on mount
  useEffect(() => {
    const savedKeys = {
      openai: localStorage.getItem('openai_api_key') || '',
      runway: localStorage.getItem('runway_api_key') || '',
      stability: localStorage.getItem('stability_api_key') || '',
      luma: localStorage.getItem('luma_api_key') || ''
    };
    setApiKeys(savedKeys);
  }, []);

  const saveApiKeys = () => {
    localStorage.setItem('openai_api_key', apiKeys.openai);
    localStorage.setItem('runway_api_key', apiKeys.runway);
    localStorage.setItem('stability_api_key', apiKeys.stability);
    localStorage.setItem('luma_api_key', apiKeys.luma);
    setShowSettings(false);
    alert('API keys saved successfully!');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateImage = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }

    setIsGenerating(true);
    setError(null);
    setGeneratedMedia(null);

    try {
      if (imageProvider === 'gemini') {
        // Use Bhindi's FREE Gemini API
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
          throw new Error(errorData.error || 'Failed to generate image with Gemini');
        }

        const data = await response.json();
        setGeneratedMedia(data.imageUrl);
      } else {
        // DALL-E 3
        if (!apiKeys.openai) {
          throw new Error('OpenAI API key is required for DALL-E 3. Please add it in API Settings.');
        }

        const response = await fetch('/api/generate-image', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompt,
            provider: 'dalle',
            style: imageStyle,
            size: imageSize,
            apiKey: apiKeys.openai
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to generate image');
        }

        const data = await response.json();
        setGeneratedMedia(data.imageUrl);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Generation error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const generateVideo = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }

    if (mode === 'image-to-video' && !uploadedImage) {
      setError('Please upload an image first');
      return;
    }

    // Check for required API key
    const requiredKey = videoModel === 'runway' ? apiKeys.runway : 
                       videoModel === 'stability' ? apiKeys.stability : 
                       apiKeys.luma;

    if (!requiredKey) {
      setError(`${videoModel.charAt(0).toUpperCase() + videoModel.slice(1)} API key is required. Please add it in API Settings.`);
      return;
    }

    setIsGenerating(true);
    setError(null);
    setGeneratedMedia(null);

    try {
      const response = await fetch('/api/generate-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          model: videoModel,
          imageUrl: mode === 'image-to-video' ? uploadedImage : undefined,
          apiKey: requiredKey
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate video');
      }

      const data = await response.json();

      // Poll for video completion
      if (data.taskId) {
        await pollVideoStatus(data.taskId, videoModel, requiredKey);
      } else if (data.videoUrl) {
        setGeneratedMedia(data.videoUrl);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Generation error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const pollVideoStatus = async (taskId: string, model: string, apiKey: string) => {
    const maxAttempts = 60;
    let attempts = 0;

    const poll = async () => {
      try {
        const response = await fetch('/api/check-video-status', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ taskId, model, apiKey }),
        });

        if (!response.ok) {
          throw new Error('Failed to check video status');
        }

        const data = await response.json();

        if (data.status === 'completed' && data.videoUrl) {
          setGeneratedMedia(data.videoUrl);
          setIsGenerating(false);
        } else if (data.status === 'failed') {
          throw new Error('Video generation failed');
        } else if (attempts < maxAttempts) {
          attempts++;
          setTimeout(poll, 5000);
        } else {
          throw new Error('Video generation timed out');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setIsGenerating(false);
      }
    };

    poll();
  };

  const handleGenerate = () => {
    if (mode === 'image') {
      generateImage();
    } else {
      generateVideo();
    }
  };

  const downloadMedia = () => {
    if (!generatedMedia) return;

    const link = document.createElement('a');
    link.href = generatedMedia;
    link.download = `ai-${mode}-${Date.now()}.${mode === 'image' ? 'png' : 'mp4'}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            <Wand2 className="w-12 h-12" />
            AI Media Generator Pro
          </h1>
          <p className="text-xl text-purple-200">
            Create stunning images and videos with FREE Gemini AI
          </p>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="mt-4 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg flex items-center gap-2 mx-auto transition-colors"
          >
            <Settings className="w-5 h-5" />
            API Settings
          </button>
        </div>

        {/* API Settings Modal */}
        {showSettings && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 max-w-md w-full">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">API Keys</h2>
                <button onClick={() => setShowSettings(false)} className="text-gray-500 hover:text-gray-700">
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    OpenAI API Key (for DALL-E 3)
                  </label>
                  <input
                    type="password"
                    value={apiKeys.openai}
                    onChange={(e) => setApiKeys({ ...apiKeys, openai: e.target.value })}
                    placeholder="sk-..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-800"
                  />
                  <p className="text-xs text-gray-500 mt-1">Get from: platform.openai.com</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Runway API Key
                  </label>
                  <input
                    type="password"
                    value={apiKeys.runway}
                    onChange={(e) => setApiKeys({ ...apiKeys, runway: e.target.value })}
                    placeholder="your-runway-key"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-800"
                  />
                  <p className="text-xs text-gray-500 mt-1">Get from: runwayml.com</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Stability AI API Key
                  </label>
                  <input
                    type="password"
                    value={apiKeys.stability}
                    onChange={(e) => setApiKeys({ ...apiKeys, stability: e.target.value })}
                    placeholder="sk-..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-800"
                  />
                  <p className="text-xs text-gray-500 mt-1">Get from: stability.ai</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Luma AI API Key
                  </label>
                  <input
                    type="password"
                    value={apiKeys.luma}
                    onChange={(e) => setApiKeys({ ...apiKeys, luma: e.target.value })}
                    placeholder="your-luma-key"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-800"
                  />
                  <p className="text-xs text-gray-500 mt-1">Get from: lumalabs.ai</p>
                </div>

                <button
                  onClick={saveApiKeys}
                  className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
                >
                  Save API Keys
                </button>

                <p className="text-xs text-gray-500 text-center">
                  ✨ Gemini is FREE - No API key needed!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Mode Selection */}
        <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 mb-6">
          <h2 className="text-xl font-semibold text-white mb-4">Generation Mode</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => setMode('image')}
              className={`p-4 rounded-lg flex items-center gap-3 transition-all ${
                mode === 'image'
                  ? 'bg-purple-600 text-white shadow-lg scale-105'
                  : 'bg-white bg-opacity-20 text-purple-100 hover:bg-opacity-30'
              }`}
            >
              <ImageIcon className="w-6 h-6" />
              <span className="font-medium">Image Generation</span>
            </button>
            <button
              onClick={() => setMode('text-to-video')}
              className={`p-4 rounded-lg flex items-center gap-3 transition-all ${
                mode === 'text-to-video'
                  ? 'bg-purple-600 text-white shadow-lg scale-105'
                  : 'bg-white bg-opacity-20 text-purple-100 hover:bg-opacity-30'
              }`}
            >
              <Video className="w-6 h-6" />
              <span className="font-medium">Text-to-Video</span>
            </button>
            <button
              onClick={() => setMode('image-to-video')}
              className={`p-4 rounded-lg flex items-center gap-3 transition-all ${
                mode === 'image-to-video'
                  ? 'bg-purple-600 text-white shadow-lg scale-105'
                  : 'bg-white bg-opacity-20 text-purple-100 hover:bg-opacity-30'
              }`}
            >
              <Upload className="w-6 h-6" />
              <span className="font-medium">Image-to-Video</span>
            </button>
          </div>
        </div>

        {/* Configuration */}
        <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 mb-6">
          <h2 className="text-xl font-semibold text-white mb-4">Configuration</h2>
          
          {mode === 'image' ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-purple-200 mb-2">
                  Image Provider
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setImageProvider('gemini')}
                    className={`p-3 rounded-lg transition-all ${
                      imageProvider === 'gemini'
                        ? 'bg-purple-600 text-white'
                        : 'bg-white bg-opacity-20 text-purple-100 hover:bg-opacity-30'
                    }`}
                  >
                    ✨ Gemini (Free)
                  </button>
                  <button
                    onClick={() => setImageProvider('dalle')}
                    className={`p-3 rounded-lg transition-all ${
                      imageProvider === 'dalle'
                        ? 'bg-purple-600 text-white'
                        : 'bg-white bg-opacity-20 text-purple-100 hover:bg-opacity-30'
                    }`}
                  >
                    DALL-E 3
                  </button>
                </div>
              </div>

              {imageProvider === 'gemini' && (
                <div>
                  <label className="block text-sm font-medium text-purple-200 mb-2">
                    Aspect Ratio
                  </label>
                  <select
                    value={aspectRatio}
                    onChange={(e) => setAspectRatio(e.target.value)}
                    className="w-full px-4 py-2 bg-white bg-opacity-20 text-white rounded-lg focus:ring-2 focus:ring-purple-500 border border-purple-300"
                  >
                    <option value="1:1">1:1 (Square)</option>
                    <option value="16:9">16:9 (Landscape)</option>
                    <option value="4:3">4:3 (Standard)</option>
                    <option value="3:4">3:4 (Portrait)</option>
                    <option value="9:16">9:16 (Vertical)</option>
                  </select>
                </div>
              )}

              {imageProvider === 'dalle' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-purple-200 mb-2">
                      Style
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={() => setImageStyle('vivid')}
                        className={`p-3 rounded-lg transition-all ${
                          imageStyle === 'vivid'
                            ? 'bg-purple-600 text-white'
                            : 'bg-white bg-opacity-20 text-purple-100 hover:bg-opacity-30'
                        }`}
                      >
                        Vivid
                      </button>
                      <button
                        onClick={() => setImageStyle('natural')}
                        className={`p-3 rounded-lg transition-all ${
                          imageStyle === 'natural'
                            ? 'bg-purple-600 text-white'
                            : 'bg-white bg-opacity-20 text-purple-100 hover:bg-opacity-30'
                        }`}
                      >
                        Natural
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-purple-200 mb-2">
                      Size
                    </label>
                    <select
                      value={imageSize}
                      onChange={(e) => setImageSize(e.target.value as any)}
                      className="w-full px-4 py-2 bg-white bg-opacity-20 text-white rounded-lg focus:ring-2 focus:ring-purple-500 border border-purple-300"
                    >
                      <option value="1024x1024">1024x1024 (Square)</option>
                      <option value="1792x1024">1792x1024 (Landscape)</option>
                      <option value="1024x1792">1024x1792 (Portrait)</option>
                    </select>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-purple-200 mb-2">
                  Video Model
                </label>
                <div className="grid grid-cols-3 gap-4">
                  <button
                    onClick={() => setVideoModel('runway')}
                    className={`p-3 rounded-lg transition-all ${
                      videoModel === 'runway'
                        ? 'bg-purple-600 text-white'
                        : 'bg-white bg-opacity-20 text-purple-100 hover:bg-opacity-30'
                    }`}
                  >
                    Runway Gen-3
                  </button>
                  <button
                    onClick={() => setVideoModel('stability')}
                    className={`p-3 rounded-lg transition-all ${
                      videoModel === 'stability'
                        ? 'bg-purple-600 text-white'
                        : 'bg-white bg-opacity-20 text-purple-100 hover:bg-opacity-30'
                    }`}
                  >
                    Stability AI
                  </button>
                  <button
                    onClick={() => setVideoModel('luma')}
                    className={`p-3 rounded-lg transition-all ${
                      videoModel === 'luma'
                        ? 'bg-purple-600 text-white'
                        : 'bg-white bg-opacity-20 text-purple-100 hover:bg-opacity-30'
                    }`}
                  >
                    Luma Dream Machine
                  </button>
                </div>
              </div>

              {mode === 'image-to-video' && (
                <div>
                  <label className="block text-sm font-medium text-purple-200 mb-2">
                    Upload Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full px-4 py-2 bg-white bg-opacity-20 text-white rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-purple-600 file:text-white hover:file:bg-purple-700"
                  />
                  {uploadedImage && (
                    <img src={uploadedImage} alt="Uploaded" className="mt-4 rounded-lg max-h-48" />
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Prompt Input */}
        <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 mb-6">
          <label className="block text-sm font-medium text-purple-200 mb-2">
            Prompt
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={`Describe what you want to ${mode === 'image' ? 'see' : 'create'}...`}
            className="w-full px-4 py-3 bg-white bg-opacity-20 text-white placeholder-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 border border-purple-300 min-h-[100px]"
          />
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-4 px-6 rounded-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3 mb-6"
        >
          {isGenerating ? (
            <>
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
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
          <div className="bg-red-500 bg-opacity-20 border border-red-500 text-white px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Generated Media Display */}
        {generatedMedia && (
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Your Creation</h2>
            {mode === 'image' ? (
              <img
                src={generatedMedia}
                alt="Generated"
                className="w-full rounded-lg mb-4"
              />
            ) : (
              <video
                src={generatedMedia}
                controls
                className="w-full rounded-lg mb-4"
              />
            )}
            <button
              onClick={downloadMedia}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" />
              Download {mode === 'image' ? 'Image' : 'Video'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
