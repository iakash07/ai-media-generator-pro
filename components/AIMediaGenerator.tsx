'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Wand2, Loader2, Download, Sparkles, Upload, Video, Image as ImageIcon, Settings, Key, X, Play } from 'lucide-react';

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
  isEdited?: boolean;
  fromImage?: boolean;
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
  const [imageStyle, setImageStyle] = useState('vivid');
  const [imageSize, setImageSize] = useState('1024x1024');
  const [videoModel, setVideoModel] = useState('runway');
  const [loading, setLoading] = useState(false);
  const [generatedMedia, setGeneratedMedia] = useState<GeneratedMedia[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  
  // API Keys - stored in localStorage
  const [openaiKey, setOpenaiKey] = useState('');
  const [runwayKey, setRunwayKey] = useState('');
  const [stabilityKey, setStabilityKey] = useState('');
  const [lumaKey, setLumaKey] = useState('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load API keys from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setOpenaiKey(localStorage.getItem('openai_key') || '');
      setRunwayKey(localStorage.getItem('runway_key') || '');
      setStabilityKey(localStorage.getItem('stability_key') || '');
      setLumaKey(localStorage.getItem('luma_key') || '');
    }
  }, []);

  // Save API keys to localStorage
  const saveApiKeys = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('openai_key', openaiKey);
      localStorage.setItem('runway_key', runwayKey);
      localStorage.setItem('stability_key', stabilityKey);
      localStorage.setItem('luma_key', lumaKey);
    }
    setShowSettings(false);
  };

  const generateImage = async () => {
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

    try {
      const response = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${openaiKey}`
        },
        body: JSON.stringify({
          model: 'dall-e-3',
          prompt: prompt,
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
      setError(`DALL-E Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const editImage = async () => {
    if (!prompt.trim() || !uploadedImage) {
      setError('Please upload an image and provide editing instructions');
      return;
    }

    if (!openaiKey) {
      setError('Please add your OpenAI API key in settings');
      setShowSettings(true);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Convert base64 to blob
      const response = await fetch(uploadedImage);
      const blob = await response.blob();
      
      // Create a square image with transparent background for editing
      const formData = new FormData();
      formData.append('image', blob, 'image.png');
      formData.append('prompt', prompt);
      formData.append('n', '1');
      formData.append('size', imageSize);

      const apiResponse = await fetch('https://api.openai.com/v1/images/edits', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openaiKey}`
        },
        body: formData
      });

      if (!apiResponse.ok) {
        const errorData = await apiResponse.json();
        throw new Error(errorData.error?.message || 'Failed to edit image');
      }

      const data = await apiResponse.json();
      
      const newMedia: GeneratedMedia = {
        type: 'image',
        url: data.data[0].url,
        prompt: prompt,
        size: imageSize,
        timestamp: new Date().toLocaleString(),
        isEdited: true
      };
      
      setGeneratedMedia([newMedia, ...generatedMedia]);
      setUploadedImage(null);
      setPrompt('');
      
    } catch (err: any) {
      setError(`Image Edit Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const generateTextToVideo = async () => {
    if (!prompt.trim()) {
      setError('Please enter a video description');
      return;
    }

    const apiKey = videoModel === 'runway' ? runwayKey : videoModel === 'stability' ? stabilityKey : lumaKey;
    
    if (!apiKey) {
      setError(`Please add your ${videoModel} API key in settings`);
      setShowSettings(true);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      if (videoModel === 'runway') {
        await generateRunwayVideo(prompt, null);
      } else if (videoModel === 'stability') {
        await generateStabilityVideo(prompt, null);
      } else {
        await generateLumaVideo(prompt, null);
      }
      setPrompt('');
    } catch (err: any) {
      setError(`Video Generation Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const generateImageToVideo = async () => {
    if (!uploadedImage) {
      setError('Please upload an image first');
      return;
    }

    const apiKey = videoModel === 'runway' ? runwayKey : videoModel === 'stability' ? stabilityKey : lumaKey;
    
    if (!apiKey) {
      setError(`Please add your ${videoModel} API key in settings`);
      setShowSettings(true);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      if (videoModel === 'runway') {
        await generateRunwayVideo(prompt || 'Animate this image', uploadedImage);
      } else if (videoModel === 'stability') {
        await generateStabilityVideo(prompt || 'Animate this image', uploadedImage);
      } else {
        await generateLumaVideo(prompt || 'Animate this image', uploadedImage);
      }
      setUploadedImage(null);
      setPrompt('');
    } catch (err: any) {
      setError(`Video Generation Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const generateRunwayVideo = async (promptText: string, imageData: string | null) => {
    // Runway Gen-3 API implementation
    const requestBody: any = {
      promptText: promptText,
      model: 'gen3a_turbo',
      duration: 5,
      ratio: '16:9'
    };

    if (imageData) {
      requestBody.promptImage = imageData;
    }

    const response = await fetch('https://api.runwayml.com/v1/image_to_video', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${runwayKey}`,
        'X-Runway-Version': '2024-11-06'
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || errorData.message || 'Runway API error');
    }

    const data = await response.json();
    
    // Poll for completion
    const taskId = data.id;
    let videoUrl = null;
    
    for (let i = 0; i < 60; i++) {
      await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds
      
      const statusResponse = await fetch(`https://api.runwayml.com/v1/tasks/${taskId}`, {
        headers: {
          'Authorization': `Bearer ${runwayKey}`,
          'X-Runway-Version': '2024-11-06'
        }
      });
      
      const statusData = await statusResponse.json();
      
      if (statusData.status === 'SUCCEEDED') {
        videoUrl = statusData.output?.[0] || statusData.artifacts?.[0]?.url;
        break;
      } else if (statusData.status === 'FAILED') {
        throw new Error('Video generation failed');
      }
    }

    if (!videoUrl) {
      throw new Error('Video generation timed out');
    }

    const newMedia: GeneratedMedia = {
      type: 'video',
      url: videoUrl,
      prompt: promptText,
      model: 'runway',
      timestamp: new Date().toLocaleString(),
      fromImage: !!imageData
    };
    
    setGeneratedMedia([newMedia, ...generatedMedia]);
  };

  const generateStabilityVideo = async (promptText: string, imageData: string | null) => {
    if (!imageData) {
      throw new Error('Stability AI requires an image for video generation');
    }

    // Convert base64 to blob
    const base64Data = imageData.split(',')[1];
    const buffer = Buffer.from(base64Data, 'base64');
    
    const formData = new FormData();
    const blob = new Blob([buffer], { type: 'image/png' });
    formData.append('image', blob, 'image.png');
    formData.append('seed', '0');
    formData.append('cfg_scale', '1.8');
    formData.append('motion_bucket_id', '127');

    const response = await fetch('https://api.stability.ai/v2beta/image-to-video', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${stabilityKey}`
      },
      body: formData
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Stability API error');
    }

    const data = await response.json();
    const generationId = data.id;

    // Poll for completion
    let videoUrl = null;
    
    for (let i = 0; i < 60; i++) {
      await new Promise(resolve => setTimeout(resolve, 10000)); // Wait 10 seconds
      
      const resultResponse = await fetch(`https://api.stability.ai/v2beta/image-to-video/result/${generationId}`, {
        headers: {
          'Authorization': `Bearer ${stabilityKey}`,
          'Accept': 'application/json'
        }
      });

      if (resultResponse.status === 202) {
        continue; // Still processing
      }

      if (resultResponse.ok) {
        const resultData = await resultResponse.json();
        videoUrl = resultData.video;
        break;
      } else {
        throw new Error('Video generation failed');
      }
    }

    if (!videoUrl) {
      throw new Error('Video generation timed out');
    }

    const newMedia: GeneratedMedia = {
      type: 'video',
      url: videoUrl,
      prompt: promptText,
      model: 'stability',
      timestamp: new Date().toLocaleString(),
      fromImage: true
    };
    
    setGeneratedMedia([newMedia, ...generatedMedia]);
  };

  const generateLumaVideo = async (promptText: string, imageData: string | null) => {
    const requestBody: any = {
      prompt: promptText,
      aspect_ratio: '16:9',
      loop: false
    };

    if (imageData) {
      requestBody.keyframes = {
        frame0: {
          type: 'image',
          url: imageData
        }
      };
    }

    const response = await fetch('https://api.lumalabs.ai/dream-machine/v1/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${lumaKey}`
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Luma API error');
    }

    const data = await response.json();
    const generationId = data.id;

    // Poll for completion
    let videoUrl = null;
    
    for (let i = 0; i < 120; i++) {
      await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds
      
      const statusResponse = await fetch(`https://api.lumalabs.ai/dream-machine/v1/generations/${generationId}`, {
        headers: {
          'Authorization': `Bearer ${lumaKey}`
        }
      });

      const statusData = await statusResponse.json();
      
      if (statusData.state === 'completed') {
        videoUrl = statusData.assets?.video;
        break;
      } else if (statusData.state === 'failed') {
        throw new Error('Video generation failed');
      }
    }

    if (!videoUrl) {
      throw new Error('Video generation timed out');
    }

    const newMedia: GeneratedMedia = {
      type: 'video',
      url: videoUrl,
      prompt: promptText,
      model: 'luma',
      timestamp: new Date().toLocaleString(),
      fromImage: !!imageData
    };
    
    setGeneratedMedia([newMedia, ...generatedMedia]);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      setError('Image must be less than 10MB');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadedImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleGenerate = () => {
    if (mode === 'image') {
      if (uploadedImage) {
        editImage();
      } else {
        generateImage();
      }
    } else if (mode === 'text-to-video') {
      generateTextToVideo();
    } else {
      generateImageToVideo();
    }
  };

  const handleDownload = async (url: string, index: number, type: 'image' | 'video') => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `${type}-${index + 1}.${type === 'image' ? 'png' : 'mp4'}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      setError('Failed to download file');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            <Sparkles className="w-12 h-12 text-yellow-400" />
            AI Media Generator Pro
          </h1>
          <p className="text-xl text-white/80">Create stunning images and videos with AI</p>
        </div>

        {/* API Settings Modal */}
        {showSettings && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <Key className="w-6 h-6" />
                    API Settings
                  </h2>
                  <button
                    onClick={() => setShowSettings(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      OpenAI API Key (for images)
                    </label>
                    <input
                      type="password"
                      value={openaiKey}
                      onChange={(e) => setOpenaiKey(e.target.value)}
                      placeholder="sk-..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                    <p className="text-xs text-gray-500 mt-1">Get your key from: platform.openai.com</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Runway API Key (for videos)
                    </label>
                    <input
                      type="password"
                      value={runwayKey}
                      onChange={(e) => setRunwayKey(e.target.value)}
                      placeholder="key_..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                    <p className="text-xs text-gray-500 mt-1">Get your key from: runwayml.com</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Stability AI API Key (for image-to-video)
                    </label>
                    <input
                      type="password"
                      value={stabilityKey}
                      onChange={(e) => setStabilityKey(e.target.value)}
                      placeholder="sk-..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                    <p className="text-xs text-gray-500 mt-1">Get your key from: platform.stability.ai</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Luma AI API Key (for videos)
                    </label>
                    <input
                      type="password"
                      value={lumaKey}
                      onChange={(e) => setLumaKey(e.target.value)}
                      placeholder="luma_..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                    <p className="text-xs text-gray-500 mt-1">Get your key from: lumalabs.ai</p>
                  </div>
                </div>

                <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-900 mb-2">💡 Getting Started:</h3>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• For images: You only need an OpenAI API key</li>
                    <li>• For videos: Choose one video provider (Runway, Stability, or Luma)</li>
                    <li>• API keys are stored locally in your browser</li>
                    <li>• Never share your API keys with anyone</li>
                    <li>• Stability AI only supports image-to-video (not text-to-video)</li>
                  </ul>
                </div>

                <button
                  onClick={saveApiKeys}
                  className="w-full mt-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium transition-colors"
                >
                  Save & Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Panel */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-2xl p-8 mb-8 border border-white/20">
          
          {/* Settings Button */}
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setShowSettings(true)}
              className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all"
            >
              <Settings className="w-4 h-4" />
              API Settings
            </button>
          </div>

          {/* Mode Selection */}
          <div className="mb-6">
            <label className="block text-white font-medium mb-3">Generation Mode</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <button
                onClick={() => {
                  setMode('image');
                  setUploadedImage(null);
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
                onClick={() => setMode('image-to-video')}
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

          {/* Upload Section for Image-to-Video or Image Editing */}
          {(mode === 'image-to-video' || (mode === 'image' && uploadedImage)) && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <label className="block text-white font-medium">
                  {mode === 'image-to-video' ? 'Upload Image to Animate' : 'Upload Image to Edit'}
                </label>
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

          {/* Image Upload Button for Image Mode */}
          {mode === 'image' && !uploadedImage && (
            <div className="mb-4">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="text-white/80 hover:text-white text-sm flex items-center gap-2"
              >
                <Upload className="w-4 h-4" />
                Or upload an image to edit
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          )}

          {/* Prompt Input */}
          <div className="mb-6">
            <label className="block text-white font-medium mb-2">
              {mode === 'image' ? (uploadedImage ? 'Editing Instructions' : 'Image Description') : 
               mode === 'text-to-video' ? 'Video Description' : 'Animation Instructions (Optional)'}
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={
                mode === 'image' ? (uploadedImage ? 'Make the sky more dramatic...' : 'A serene landscape with mountains at sunset...') :
                mode === 'text-to-video' ? 'A butterfly flying through a magical forest...' :
                'Camera zooms in slowly, gentle movement...'
              }
              className="w-full px-4 py-3 bg-white/90 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-purple-500 resize-none focus:outline-none"
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
                  className="w-full px-4 py-2 bg-white/90 border border-indigo-300 rounded-lg focus:outline-none"
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
                <p className="text-yellow-300 text-sm mt-2">⚠️ Stability AI only supports image-to-video. Please switch to image-to-video mode.</p>
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
                Generating... This may take 30-120 seconds
              </>
            ) : (
              <>
                <Wand2 className="w-5 h-5" />
                Generate {mode === 'image' ? (uploadedImage ? 'Edited Image' : 'Image') : 'Video'}
              </>
            )}
          </button>

          {/* Error Message */}
          {error && (
            <div className="mt-4 bg-red-500/20 border border-red-500 rounded-lg p-3 text-red-200 text-sm">
              {error}
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
                    <ImageWithLoader 
                      src={media.url} 
                      alt={media.prompt} 
                      className="w-full h-64 object-cover" 
                    />
                  ) : (
                    <video src={media.url} controls className="w-full h-64 object-cover bg-black" />
                  )}
                  <div className="p-4">
                    <p className="text-gray-800 font-medium mb-2 line-clamp-2">{media.prompt}</p>
                    {media.revisedPrompt && (
                      <p className="text-gray-600 text-xs mb-2">DALL-E: {media.revisedPrompt.substring(0, 100)}...</p>
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
