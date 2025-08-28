'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Save, FileText, Edit3 } from 'lucide-react';
import Link from 'next/link';

export default function ContentEditor() {
  const [contentFiles, setContentFiles] = useState<Record<string, any>>({});
  const [activeFile, setActiveFile] = useState<string>('hero.md');
  const [content, setContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    loadContent();
  }, []);

  useEffect(() => {
    if (contentFiles[activeFile]) {
      setContent(contentFiles[activeFile].content);
    }
  }, [activeFile, contentFiles]);

  const loadContent = async () => {
    try {
      const response = await fetch('/api/admin/content');
      if (response.ok) {
        const data = await response.json();
        setContentFiles(data);
        if (data['hero.md']) {
          setContent(data['hero.md'].content);
        }
      }
    } catch (error) {
      console.error('Error loading content:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveContent = async () => {
    setIsSaving(true);
    setSaveStatus('idle');
    
    try {
      const response = await fetch('/api/admin/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fileName: activeFile,
          content: content,
        }),
      });

      if (response.ok) {
        setSaveStatus('success');
        // Reload content to get updated data
        await loadContent();
        setTimeout(() => setSaveStatus('idle'), 3000);
      } else {
        setSaveStatus('error');
      }
    } catch (error) {
      console.error('Error saving content:', error);
      setSaveStatus('error');
    } finally {
      setIsSaving(false);
    }
  };

  const getFileDisplayName = (fileName: string) => {
    const names: Record<string, string> = {
      'hero.md': 'Hero Section',
      'about.md': 'About Section',
      'impact.md': 'Impact Section'
    };
    return names[fileName] || fileName;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading content editor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <Link 
                href="/admin" 
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Dashboard</span>
              </Link>
              <div className="w-px h-6 bg-gray-300"></div>
              <div className="flex items-center space-x-3">
                <Edit3 className="w-6 h-6 text-blue-600" />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Content Editor</h1>
                  <p className="text-sm text-gray-600">Edit website content</p>
                </div>
              </div>
            </div>
            
            <button
              onClick={saveContent}
              disabled={isSaving}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Save Status */}
        {saveStatus === 'success' && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 text-green-800">
              <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
              <span className="font-medium">Content saved successfully!</span>
            </div>
          </div>
        )}

        {saveStatus === 'error' && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 text-red-800">
              <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✕</span>
              </div>
              <span className="font-medium">Error saving content. Please try again.</span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* File List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Content Files</h3>
              <div className="space-y-2">
                {Object.keys(contentFiles).map((fileName) => (
                  <button
                    key={fileName}
                    onClick={() => setActiveFile(fileName)}
                    className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-colors ${
                      activeFile === fileName
                        ? 'bg-blue-50 border border-blue-200 text-blue-900'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <FileText className="w-4 h-4 text-gray-500" />
                    <span className="font-medium">{getFileDisplayName(fileName)}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Editor */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Editing: {getFileDisplayName(activeFile)}
                </h3>
                <p className="text-sm text-gray-600">
                  Edit the content below. Use Markdown syntax for formatting.
                </p>
              </div>

              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full h-96 p-4 border border-gray-300 rounded-lg font-mono text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder:text-gray-500"
                placeholder="Enter your content here..."
              />

              <div className="mt-4 text-sm text-gray-500">
                <p><strong>Markdown Tips:</strong></p>
                <ul className="mt-2 space-y-1">
                  <li>• Use <code>---</code> at the top for frontmatter (title, subtitle, etc.)</li>
                  <li>• Use <code># Heading</code> for headings</li>
                  <li>• Use <code>**bold**</code> for bold text</li>
                  <li>• Use <code>[link text](url)</code> for links</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


