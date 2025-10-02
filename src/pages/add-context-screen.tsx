import { useState, useRef } from 'react';
import { FileText, Upload, X, Image, FileCode, Sparkles, AlertCircle } from 'lucide-react';

const AddContextScreen = () => {
  const [contextText, setContextText] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const fileUploadEnabled = false;
  const [error, setError] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    setError('');
    
    // Validate file type
    const validTypes = ['text/markdown', 'image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/webp'];
    const validExtensions = ['.md', '.markdown', '.png', '.jpg', '.jpeg', '.gif', '.webp'];
    
    const hasValidType = validTypes.includes(file.type);
    const hasValidExtension = validExtensions.some(ext => file.name.toLowerCase().endsWith(ext));
    
    if (!hasValidType && !hasValidExtension) {
      setError('Invalid file type. Only .md and image files are allowed.');
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB');
      return;
    }

    setUploadedFile(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleGenerate = () => {
    console.log('Generating with context:', { contextText, uploadedFile });
    // This will be replaced with actual generation logic
  };

  const getFileIcon = () => {
    if (!uploadedFile) return null;
    
    if (uploadedFile.type.startsWith('image/')) {
      return <Image className="w-5 h-5 text-blue-400" />;
    } else if (uploadedFile.name.endsWith('.md') || uploadedFile.name.endsWith('.markdown')) {
      return <FileCode className="w-5 h-5 text-green-400" />;
    }
    return <FileText className="w-5 h-5 text-gray-400" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="w-20 h-20 mx-auto mb-4 bg-yellow-400 flex items-center justify-center">
          <Sparkles className="w-10 h-10 text-black" />
        </div>
        <h2 className="text-2xl font-bold text-center mb-2">Add Context</h2>
        <p className="text-sm text-gray-400 text-center">
          Provide additional context to improve your PR description
        </p>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Text Context Input */}
        <div className="bg-gray-900/30 border border-gray-800 p-6 mb-6">
          <label className="block text-sm font-medium mb-2 text-gray-300">
            Additional Context (Optional)
          </label>
          <textarea
            value={contextText}
            onChange={(e) => setContextText(e.target.value)}
            placeholder="Add any additional context, requirements, or notes that should be included in the PR description..."
            rows={6}
            className="w-full bg-black border border-gray-700 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent placeholder-gray-600 resize-none"
          />
          <p className="text-xs text-gray-500 mt-2">
            {contextText.length} characters
          </p>
        </div>

        {/* File Upload Section */}
        {fileUploadEnabled && (
          <div className="bg-gray-900/30 border border-gray-800 p-6 mb-6">
            <label className="block text-sm font-medium mb-3 text-gray-300">
              Upload File (Optional)
            </label>

            {!uploadedFile ? (
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed p-8 text-center cursor-pointer transition-colors ${
                  isDragging
                    ? 'border-yellow-400 bg-yellow-400/10'
                    : 'border-gray-700 hover:border-gray-600 hover:bg-gray-900/50'
                }`}
              >
                <Upload className="w-8 h-8 text-gray-500 mx-auto mb-3" />
                <p className="text-sm text-gray-400 mb-1">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-gray-600">
                  Markdown (.md) or images (PNG, JPG, GIF, WebP)
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  Max file size: 5MB
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".md,.markdown,image/*"
                  onChange={handleFileInputChange}
                  className="hidden"
                />
              </div>
            ) : (
              <div className="border border-gray-700 p-4 bg-black">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    {getFileIcon()}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-300 truncate">
                        {uploadedFile.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatFileSize(uploadedFile.size)}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleRemoveFile}
                    className="text-gray-400 hover:text-red-400 transition-colors ml-2"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mt-3 p-3 bg-red-950/30 border border-red-800 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-red-300">{error}</p>
              </div>
            )}
          </div>
        )}

        {/* Info Box */}
        <div className="bg-gray-900/30 border border-gray-800 p-4 mb-6">
          <h3 className="text-sm font-medium mb-2 text-gray-300">
            💡 Tips for better descriptions
          </h3>
          <ul className="text-xs text-gray-500 space-y-1">
            <li>• Add context about design decisions or architecture changes</li>
            <li>• Dump the contents of any related tickets or issues</li>
            <li>• Mention any breaking changes or migration steps</li>
            <li>• Upload screenshots for UI changes</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 mt-auto">
          <button
            className="bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium py-3 px-4 transition-colors"
          >
            Skip
          </button>
          <button
            onClick={handleGenerate}
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-3 px-4 transition-colors"
          >
            Generate
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddContextScreen;