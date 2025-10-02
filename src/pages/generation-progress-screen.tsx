import { useState, useEffect } from 'react';
import { CheckCircle, Loader2, FileCode, Upload, ChevronDown, ChevronUp, XCircle } from 'lucide-react';

type GenerationStage = 
  | 'retrieving_template'
  | 'checking_diffs'
  | 'analyzing_files'
  | 'uploading'
  | 'processing'
  | 'ready'
  | 'error';

interface FileProgress {
  name: string;
  status: 'pending' | 'analyzing' | 'done';
}

const GenerationProgressScreen = () => {
  const [stage, setStage] = useState<GenerationStage>('retrieving_template');
  const [filesFound, setFilesFound] = useState(0);
  const [currentFileIndex, setCurrentFileIndex] = useState(0);
  const [files, setFiles] = useState<FileProgress[]>([]);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [generatedDescription, setGeneratedDescription] = useState('');

  // Simulate the generation process
  useEffect(() => {
    const mockFiles = [
      'src/components/Button.tsx',
      'src/utils/api.ts',
      'src/hooks/useAuth.ts',
      'src/pages/Dashboard.tsx',
      'src/styles/globals.css',
      'README.md',
      'package.json',
      'src/components/Modal.tsx',
      'src/lib/validation.ts',
      'src/types/index.ts',
      'tests/auth.test.ts'
    ];

    if (stage === 'retrieving_template') {
      setTimeout(() => setStage('checking_diffs'), 1500);
    } else if (stage === 'checking_diffs') {
      setTimeout(() => {
        setFilesFound(mockFiles.length);
        setFiles(mockFiles.map(name => ({ name, status: 'pending' })));
        setStage('analyzing_files');
      }, 2000);
    } else if (stage === 'analyzing_files') {
      if (currentFileIndex < mockFiles.length) {
        setTimeout(() => {
          setFiles(prev => prev.map((file, idx) => {
            if (idx === currentFileIndex) return { ...file, status: 'done' };
            if (idx === currentFileIndex + 1) return { ...file, status: 'analyzing' };
            return file;
          }));
          setCurrentFileIndex(prev => prev + 1);
        }, 800);
      } else {
        setTimeout(() => setStage('uploading'), 500);
      }
    } else if (stage === 'uploading') {
      setTimeout(() => setStage('processing'), 1500);
    } else if (stage === 'processing') {
      setTimeout(() => {
        setGeneratedDescription(`## Summary
This PR implements authentication improvements and refactors the dashboard components for better maintainability.

## Changes
- Added JWT token validation middleware
- Refactored Button component with improved TypeScript types
- Updated Dashboard layout with responsive grid system
- Enhanced error handling in API utility functions
- Added comprehensive test coverage for auth flows

## Testing
- All existing tests pass
- Added 15 new unit tests for authentication
- Manual testing completed on Chrome, Firefox, and Safari

## Breaking Changes
None

## Additional Notes
This change improves security by adding token expiration handling and better error messages for authentication failures.`);
        setStage('ready');
      }, 2500);
    }
  }, [stage, currentFileIndex, files.length]);

  const handleInsertDescription = () => {
    console.log('Inserting description into textarea...');
    // This will be replaced with actual insertion logic
  };

  const handleCancel = () => {
    console.log('Cancelling generation...');
    // This will be replaced with actual cancellation logic
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="w-20 h-20 mx-auto mb-4 bg-yellow-400 flex items-center justify-center">
          {stage === 'ready' ? (
            <CheckCircle className="w-10 h-10 text-black" />
          ) : stage === 'error' ? (
            <XCircle className="w-10 h-10 text-black" />
          ) : (
            <Loader2 className="w-10 h-10 text-black animate-spin" />
          )}
        </div>
        <h2 className="text-2xl font-bold text-center mb-2">
          {stage === 'ready' ? 'Description Ready!' : stage === 'error' ? 'Generation Failed' : 'Generating Description'}
        </h2>
        <p className="text-sm text-gray-400 text-center">
          {stage === 'ready' 
            ? 'Review and insert your PR description' 
            : stage === 'error'
            ? 'Something went wrong'
            : 'Please wait while we analyze your changes'}
        </p>
      </div>

      {/* Progress Steps */}
      {stage !== 'ready' && stage !== 'error' && (
        <div className="bg-gray-900/30 border border-gray-800 p-6 mb-6">
          <div className="space-y-4">
            {/* Step 1: Retrieving Template */}
            <div className="flex items-start gap-3">
              {stage === 'retrieving_template' ? (
                <Loader2 className="w-5 h-5 text-yellow-400 animate-spin flex-shrink-0 mt-0.5" />
              ) : (
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              )}
              <div className="flex-1">
                <p className="text-sm font-medium">Getting your merge template</p>
              </div>
            </div>

            {/* Step 2: Checking Diffs */}
            {['checking_diffs', 'analyzing_files', 'uploading', 'processing'].includes(stage) && (
              <div className="flex items-start gap-3">
                {stage === 'checking_diffs' ? (
                  <Loader2 className="w-5 h-5 text-yellow-400 animate-spin flex-shrink-0 mt-0.5" />
                ) : (
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                )}
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    Checking diffs... 
                    {filesFound > 0 && <span className="text-gray-400"> (discovered {filesFound} files)</span>}
                  </p>
                </div>
              </div>
            )}

            {/* Step 3: Analyzing Files */}
            {['analyzing_files', 'uploading', 'processing'].includes(stage) && (
              <div className="flex items-start gap-3">
                {stage === 'analyzing_files' ? (
                  <Loader2 className="w-5 h-5 text-yellow-400 animate-spin flex-shrink-0 mt-0.5" />
                ) : (
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                )}
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    Analyzing files
                    {stage === 'analyzing_files' && (
                      <span className="text-gray-400"> ({currentFileIndex}/{filesFound})</span>
                    )}
                  </p>
                  
                  {/* File List */}
                  {stage === 'analyzing_files' && files.length > 0 && (
                    <div className="mt-3 space-y-1.5 max-h-48 overflow-y-auto">
                      {files.map((file, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs">
                          {file.status === 'done' ? (
                            <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                          ) : file.status === 'analyzing' ? (
                            <Loader2 className="w-3 h-3 text-yellow-400 animate-spin flex-shrink-0" />
                          ) : (
                            <div className="w-3 h-3 border border-gray-700 flex-shrink-0"></div>
                          )}
                          <span className={file.status === 'done' ? 'text-gray-500' : file.status === 'analyzing' ? 'text-yellow-400' : 'text-gray-600'}>
                            {file.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 4: Uploading to API */}
            {['uploading', 'processing'].includes(stage) && (
              <div className="flex items-start gap-3">
                {stage === 'uploading' ? (
                  <Upload className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5 animate-pulse" />
                ) : (
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                )}
                <div className="flex-1">
                  <p className="text-sm font-medium">Uploading to API</p>
                </div>
              </div>
            )}

            {/* Step 5: Processing Description */}
            {stage === 'processing' && (
              <div className="flex items-start gap-3">
                <Loader2 className="w-5 h-5 text-yellow-400 animate-spin flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Processing description...</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Ready State - Description Preview */}
      {stage === 'ready' && (
        <div className="bg-gray-900/30 border border-gray-800 mb-6">
          <button
            onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
            className="w-full p-6 flex items-center justify-between hover:bg-gray-900/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <FileCode className="w-5 h-5 text-yellow-400" />
              <span className="text-sm font-medium">Preview Description</span>
            </div>
            {isDescriptionExpanded ? (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </button>
          
          {isDescriptionExpanded && (
            <div className="px-6 pb-6 border-t border-gray-800">
              <div className="mt-4 bg-black border border-gray-700 p-4 max-h-80 overflow-y-auto">
                <pre className="text-xs text-gray-300 whitespace-pre-wrap font-mono">
                  {generatedDescription}
                </pre>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Summary Stats (Ready State) */}
      {stage === 'ready' && (
        <div className="bg-gray-900/30 border border-gray-800 p-6 mb-6">
          <h3 className="text-sm font-semibold mb-3 text-gray-300">Summary</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-yellow-400">{filesFound}</p>
              <p className="text-xs text-gray-500">Files analyzed</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-yellow-400">234</p>
              <p className="text-xs text-gray-500">Lines changed</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-yellow-400">2.3s</p>
              <p className="text-xs text-gray-500">Generation time</p>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="mt-auto">
        {stage === 'ready' ? (
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleCancel}
              className="bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium py-3 px-4 transition-colors"
            >
              Regenerate
            </button>
            <button
              onClick={handleInsertDescription}
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-3 px-4 transition-colors"
            >
              Insert Description
            </button>
          </div>
        ) : stage === 'error' ? (
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleCancel}
              className="bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium py-3 px-4 transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => setStage('retrieving_template')}
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-3 px-4 transition-colors"
            >
              Retry
            </button>
          </div>
        ) : (
          <button
            onClick={handleCancel}
            className="w-full bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium py-3 px-4 transition-colors"
          >
            Cancel
          </button>
        )}
      </div>

      {/* Usage Counter */}
      <div className="mt-6 pt-6 border-t border-gray-800 text-center">
        <p className="text-xs text-gray-500">
          {stage === 'ready' ? '849/1000 descriptions used' : '850/1000 descriptions used'}
        </p>
      </div>
    </div>
  );
};

export default GenerationProgressScreen;