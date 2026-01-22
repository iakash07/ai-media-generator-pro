'use client';

import React, { useState, useRef } from 'react';
import { Wand2, Loader2, Download, Sparkles, Upload, Video, Image as ImageIcon, X, Play, AlertCircle } from 'lucide-react';

const IMAGE_STYLES = ['vivid', 'natural'];
const IMAGE_SIZES = ['1024x1024', '1792x1024', '1024x1792'];
const VIDEO_MODELS = ['runway', 'stability', 'luma'];

interface GeneratedMedia {
  type: 'image' | 'video';
  url: string;
  prompt: string;
  style?: string;
  size?: string;
  model?: string;
  timestamp: string;
  revisedPrompt?: string;
  fromImage?: boolean;
}

export default function AIMediaGeneratorServerless() {
  const [mode, setMode] = useState<'image' | 'text-to-video' | 'image-to-video'>('image');
  const [prompt, setPrompt] = useState('');
  const [imageStyle, setImageStyle] = useState('vivid');
  const [imageSize, setImageSize] = useState('1024x1024');
  const [videoModel, setVideoModel] = useState('runway');
  const [loading, setLoading] = useState(false);
  const [generatedMedia, setGeneratedMedia] = useState<GeneratedMedia[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const generateImage = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Try OpenAI first
      let response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: prompt,
          size: imageSize,
          style: imageStyle
        })
      });

      // If OpenAI fails due to missing key, try Bhindi fallback
      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.error?.includes('not configured')) {
          console.log('OpenAI not configured, using Bhindi fallback...');
          response = await fetch('/api/generate-image-bhindi', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              prompt: prompt,
              size: imageSize,
              style: imageStyle
            })
          });
        }
        
        if (!response.ok) {
          const fallbackError = await response.json();
          throw new Error(fallbackError.error || 'Failed to generate image');
        }
      }

      const data = await response.json();
      
      const newMedia: GeneratedMedia = {
        type: 'image',
        url: data.data[0].url,
        prompt: prompt,
        style: imageStyle,
        size: imageSize,
        timestamp: new Date().toLocaleString(),
        revisedPrompt: data.data[0].revised_prompt
      };
      
      setGeneratedMedia([newMedia, ...generatedMedia]);
      setPrompt('');
      
    } catch (err: any) {
      setError(`Image Generation Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const generateVideo = async () => {
    if (mode === 'text-to-video' && !prompt.trim()) {
      setError('Please enter a video description');
      return;
    }

    if (mode === 'image-to-video' && !uploadedImage) {
      setError('Please upload an image first');
      return;
    }

    if (videoModel === 'stability' && mode === 'text-to-video') {
      setError('Stability AI only supports image-to-video. Please switch mode or choose a different model.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Step 1: Initiate video generation
      const response = await fetch('/api/generate-video', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: prompt || 'Animate this image',
          model: videoModel,
          imageData: uploadedImage
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to start video generation');
      }

      const { taskId, provider } = await response.json();

      // Step 2: Poll for completion
      let videoUrl = null;
      let attempts = 0;
      const maxAttempts = 60; // 5 minutes max

      while (attempts < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds
        
        const statusResponse = await fetch('/api/check-video-status', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ taskId, provider })
        });

        if (!statusResponse.ok) {
          throw new Error('Failed to check video status');
        }

        const statusData = await statusResponse.json();

        if (statusData.status === 'SUCCEEDED') {
          videoUrl = statusData.videoUrl;
          break;
        } else if (statusData.status === 'FAILED') {
          throw new Error('Video generation failed');
        }

        attempts++;
      }

      if (!videoUrl) {
        throw new Error('Video generation timed out. Please try again.');
      }

      const newMedia: GeneratedMedia = {
        type: 'video',
        url: videoUrl,
        prompt: prompt || 'Animated video',
        model: videoModel,
        timestamp: new Date().toLocaleString(),
        fromImage: !!uploadedImage
      };
      
      setGeneratedMedia([newMedia, ...generatedMedia]);
      setUploadedImage(null);
      setPrompt('');
      
    } catch (err: any) {
      setError(`Video Generation Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
        setError(null);
      };
      reader.readAsDataURL(file);
    } else {
      setError('Please upload a valid image file');
    }
  };

  const handleGenerate = () => {
    if (mode === 'image') {
      generateImage();
    } else {
      generateVideo();
    }
  };

  const handleDownload = async (url: string, index: number, type: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `ai-generated-${type}-${index}-${Date.now()}.${type === 'video' ? 'mp4' : 'png'}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      const link = document.createElement('a');
      link.href = url;
      link.download = `ai-generated-${type}-${index}.${type === 'video' ? 'mp4' : 'png'}`;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-10 h-10 text-yellow-400" />
            <h1 className="text-4xl font-bold text-white">AI Media Generator Pro</h1>
          </div>
          <p className="text-indigo-200">Free for Everyone • No API Keys Required</p>
          <p className="text-indigo-300 text-sm mt-2">DALL-E 3 Images • Runway Gen-3 • Stability AI • Luma AI</p>
        </div>

        {/* Main Panel */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-2xl p-8 mb-8 border border-white/20">
          
          {/* Mode Selection */}
          <div className="mb-6">
            <label className="block text-white font-medium mb-3">Generation Mode</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <button
                onClick={() => {
                  setMode('image');
                  setUploadedImage(null);
                  setError(null);
                }}
                className={`p-4 rounded-lg font-medium transition-all ${
                  mode === 'image'
                    ? 'bg-purple-600 text-white shadow-lg scale-105'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                <ImageIcon className="w-6 h-6 mx-auto mb-2" />
                Image Generation
              </button>
              <button
                onClick={() => {
                  setMode('text-to-video');
                  setUploadedImage(null);
                  setError(null);
                }}
                className={`p-4 rounded-lg font-medium transition-all ${
                  mode === 'text-to-video'
                    ? 'bg-purple-600 text-white shadow-lg scale-105'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                <Video className="w-6 h-6 mx-auto mb-2" />
                Text to Video
              </button>
              <button
                onClick={() => {
                  setMode('image-to-video');
                  setError(null);
                }}
                className={`p-4 rounded-lg font-medium transition-all ${
                  mode === 'image-to-video'
                    ? 'bg-purple-600 text-white shadow-lg scale-105'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                <Play className="w-6 h-6 mx-auto mb-2" />
                Image to Video
              </button>
            </div>
          </div>

          {/* Upload Section */}
          {mode === 'image-to-video' && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <label className="block text-white font-medium">Upload Image to Animate</label>
                {uploadedImage && (
                  <button
                    onClick={() => setUploadedImage(null)}
                    className="text-red-300 hover:text-red-100 flex items-center gap-1 text-sm"
                  >
                    <X className="w-4 h-4" />
                    Clear
                  </button>
                )}
              </div>
              
              {!uploadedImage ? (
                <div className="border-2 border-dashed border-white/30 rounded-lg p-6 text-center hover:border-white/50 transition-all cursor-pointer">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center gap-2">
                    <Upload className="w-8 h-8 text-white/60" />
                    <span className="text-white/80">Click to upload an image</span>
                    <span className="text-white/60 text-sm">PNG, JPG, WebP up to 10MB</span>
                  </label>
                </div>
              ) : (
                <div className="relative rounded-lg overflow-hidden bg-white/5 p-2">
                  <img src={uploadedImage} alt="Uploaded" className="w-full max-h-64 object-contain rounded" />
                </div>
              )}
            </div>
          )}

          {/* Prompt Input */}
          <div className="mb-6">
            <label className="block text-white font-medium mb-2">
              {mode === 'image' ? 'Image Description' : 
               mode === 'text-to-video' ? 'Video Description' : 'Animation Instructions (Optional)'}
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={
                mode === 'image' ? 'A serene landscape with mountains at sunset...' :
                mode === 'text-to-video' ? 'A butterfly flying through a magical forest...' :
                'Camera zooms in slowly, gentle movement...'
              }
              className="w-full px-4 py-3 bg-white/90 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-purple-500 resize-none focus:outline-none text-gray-800"
              rows={3}
            />
          </div>

          {/* Image Settings */}
          {mode === 'image' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-white font-medium mb-2 text-sm">Style</label>
                <div className="flex gap-2">
                  {IMAGE_STYLES.map((style) => (
                    <button
                      key={style}
                      onClick={() => setImageStyle(style)}
                      className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all capitalize ${
                        imageStyle === style ? 'bg-purple-600 text-white' : 'bg-white/20 text-white hover:bg-white/30'
                      }`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-white font-medium mb-2 text-sm">Size</label>
                <select
                  value={imageSize}
                  onChange={(e) => setImageSize(e.target.value)}
                  className="w-full px-4 py-2 bg-white/90 border border-indigo-300 rounded-lg focus:outline-none text-gray-800"
                >
                  {IMAGE_SIZES.map((size) => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Video Settings */}
          {(mode === 'text-to-video' || mode === 'image-to-video') && (
            <div className="mb-6">
              <label className="block text-white font-medium mb-2">Video Model</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {VIDEO_MODELS.map((model) => (
                  <button
                    key={model}
                    onClick={() => setVideoModel(model)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all capitalize ${
                      videoModel === model ? 'bg-purple-600 text-white' : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    {model}
                  </button>
                ))}
              </div>
              {videoModel === 'stability' && mode === 'text-to-video' && (
                <div className="mt-3 bg-yellow-500/20 border border-yellow-400/30 rounded-lg p-3 flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-yellow-300 flex-shrink-0 mt-0.5" />
                  <p className="text-yellow-200 text-sm">
                    Stability AI only supports image-to-video. Please switch mode or choose a different model.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={loading || !prompt.trim() || (mode === 'image-to-video' && !uploadedImage) || (videoModel === 'stability' && mode === 'text-to-video')}
            className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold text-lg hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-xl transition-all"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Generating... {mode !== 'image' && 'This may take 30-120 seconds'}
              </>
            ) : (
              <>
                <Wand2 className="w-5 h-5" />
                Generate {mode === 'image' ? 'Image' : 'Video'}
              </>
            )}
          </button>

          {/* Info Banner */}
          <div className="mt-4 bg-blue-500/20 border border-blue-400/30 rounded-lg p-3 text-blue-100 text-sm">
            <p className="font-semibold mb-1">✨ Free Service - No API Keys Needed!</p>
            <p>All AI generation is handled server-side. Just enter your prompt and create!</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-4 bg-red-500/20 border border-red-500 rounded-lg p-3 flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-red-300 flex-shrink-0 mt-0.5" />
              <div className="text-red-200 text-sm">
                <p className="font-semibold mb-1">Error:</p>
                <p>{error}</p>
              </div>
            </div>
          )}
        </div>

        {/* Generated Media Gallery */}
        {generatedMedia.length > 0 && (
          <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-2xl p-8 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-yellow-400" />
              Your Creations ({generatedMedia.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {generatedMedia.map((media, idx) => (
                <div key={idx} className="bg-white rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-all">
                  {media.type === 'image' ? (
                    <img src={media.url} alt={media.prompt} className="w-full h-64 object-cover" />
                  ) : (
                    <video src={media.url} controls className="w-full h-64 object-cover bg-black" />
                  )}
                  <div className="p-4">
                    <p className="text-gray-800 font-medium mb-2 line-clamp-2">{media.prompt}</p>
                    {media.revisedPrompt && media.revisedPrompt !== media.prompt && (
                      <p className="text-gray-600 text-xs mb-2">Enhanced: {media.revisedPrompt.substring(0, 100)}...</p>
                    )}
                    <div className="flex items-center justify-between text-xs text-gray-600 mb-3">
                      <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded">
                        {media.type === 'video' ? media.model : media.style}
                      </span>
                      <span>{media.timestamp}</span>
                    </div>
                    <button
                      onClick={() => handleDownload(media.url, idx, media.type)}
                      className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center justify-center gap-2 font-medium transition-colors"
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
      </div>
    </div>
  );
}
