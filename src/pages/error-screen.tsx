import { useState } from 'react';
import { XCircle, RefreshCw, Home, AlertTriangle } from 'lucide-react';

type ErrorType = 'api' | 'network' | 'auth' | 'limit' | 'unknown';

interface ErrorScreenProps {
  title?: string;
  description?: string;
  errorType?: ErrorType;
  onRetry?: () => void;
  onGoHome?: () => void;
}

const ErrorScreen = ({
  title = 'Something went wrong',
  description = 'An unexpected error occurred. Please try again.',
  errorType = 'unknown',
  onRetry,
  onGoHome
}: ErrorScreenProps) => {
  const [isRetrying, setIsRetrying] = useState(false);

  const handleRetry = async () => {
    setIsRetrying(true);
    if (onRetry) {
      await onRetry();
    }
    setTimeout(() => setIsRetrying(false), 1000);
  };

  // Get icon based on error type
  const getErrorIcon = () => {
    switch (errorType) {
      case 'limit':
        return <AlertTriangle className="w-10 h-10 text-black" />;
      case 'auth':
        return <XCircle className="w-10 h-10 text-black" />;
      default:
        return <XCircle className="w-10 h-10 text-black" />;
    }
  };

  // Get icon color based on error type
  const getIconBgColor = () => {
    switch (errorType) {
      case 'limit':
        return 'bg-yellow-400';
      case 'auth':
        return 'bg-red-500';
      default:
        return 'bg-red-500';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col px-6 py-8">
      {/* Error Icon */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className={`w-20 h-20 mb-6 ${getIconBgColor()} flex items-center justify-center`}>
          {getErrorIcon()}
        </div>

        {/* Error Title */}
        <h2 className="text-2xl font-bold text-center mb-3">
          {title}
        </h2>

        {/* Error Description */}
        <p className="text-sm text-gray-400 text-center leading-relaxed max-w-sm mb-8">
          {description}
        </p>

        {/* Error Details Card (Optional) */}
        {errorType !== 'unknown' && (
          <div className="w-full bg-gray-900/30 border border-gray-800 p-4 mb-8">
            <h3 className="text-sm font-medium mb-2 text-gray-300">
              Error Details
            </h3>
            <p className="text-xs text-gray-500">
              {errorType === 'api' && 'The server returned an unexpected response. Our team has been notified.'}
              {errorType === 'network' && 'Unable to connect to the server. Please check your internet connection.'}
              {errorType === 'auth' && 'Your session has expired or your credentials are invalid. Please sign in again.'}
              {errorType === 'limit' && 'You have reached your usage limit. Upgrade your plan to continue generating descriptions.'}
            </p>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        {onRetry && (
          <button
            onClick={handleRetry}
            disabled={isRetrying}
            className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-800 disabled:text-gray-600 disabled:cursor-not-allowed text-black font-medium py-3 px-4 transition-colors flex items-center justify-center gap-2"
          >
            {isRetrying ? (
              <>
                <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                Retrying...
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4" />
                Retry
              </>
            )}
          </button>
        )}

        {onGoHome && (
          <button
            onClick={onGoHome}
            className="w-full bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium py-3 px-4 transition-colors flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            Go to Dashboard
          </button>
        )}

        {/* Contact Support Link */}
        <div className="text-center pt-4 border-t border-gray-800">
          <p className="text-xs text-gray-500 mb-2">
            Still having issues?
          </p>
          <a
            href="https://jagoprbot.com/support"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-400 hover:text-yellow-400 transition-colors"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
};

export default ErrorScreen;