import { useState } from 'react';
import { Key, Eye, EyeOff, AlertCircle, Mail, Lock, User } from 'lucide-react';

type AuthMode = 'login' | 'signup';

const AuthScreen = () => {
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError('');
    
    // Simulate API call
    // setTimeout(() => {
    //   if (email.length < 5) {
    //     setError('Invalid email format');
    //   }
    //   setIsSubmitting(false);
    // }, 1500);
  };

  const toggleAuthMode = () => {
    setAuthMode(authMode === 'login' ? 'signup' : 'login');
    setError('');
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col px-6 py-8">
      {/* Icon + Title Section */}
      <div className="text-center mb-8">
        <div className="w-20 h-20 mx-auto mb-4 bg-yellow-400 flex items-center justify-center">
          <Key className="w-10 h-10 text-black" />
        </div>
        <h2 className="text-2xl font-bold mb-3">
          {authMode === 'login' ? 'Welcome Back' : 'Create Account'}
        </h2>
        <p className="text-sm text-gray-400 leading-relaxed">
          {authMode === 'login' 
            ? 'Sign in to continue generating PR descriptions'
            : 'Sign up to start generating PR descriptions with AI'}
        </p>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        <div className="bg-gray-900/30 border border-gray-800 p-6 mb-6">
          {/* Name Input (Signup only) */}
          {authMode === 'signup' && (
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2 text-gray-300">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full bg-black border border-gray-700 pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent placeholder-gray-600"
                />
              </div>
            </div>
          )}

          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-black border border-gray-700 pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent placeholder-gray-600"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-black border border-gray-700 pl-10 pr-12 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent placeholder-gray-600"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-950/30 border border-red-800 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-red-300">{error}</p>
            </div>
          )}

        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={!email || !password || (authMode === 'signup' && !name) || isSubmitting}
          className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-800 disabled:text-gray-600 disabled:cursor-not-allowed text-black font-medium py-3 px-4 transition-colors mb-4"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
              {authMode === 'login' ? 'Signing in...' : 'Creating account...'}
            </span>
          ) : (
            authMode === 'login' ? 'Sign In' : 'Create Account'
          )}
        </button>

        {/* Toggle Auth Mode */}
        <div className="text-center mb-6">
          <button
            onClick={toggleAuthMode}
            className="text-sm text-gray-400 hover:text-yellow-400 transition-colors"
          >
            {authMode === 'login' 
              ? "Don't have an account? Sign up" 
              : 'Already have an account? Sign in'}
          </button>
        </div>

        {/* Footer Info */}
        <div className="mt-auto pt-6 border-t border-gray-800">
          <h3 className="text-sm font-medium mb-3 text-gray-300">
            What you get:
          </h3>
          <ul className="text-sm text-gray-400 space-y-2">
            <li>• 1,000 PR descriptions per account</li>
            <li>• Real-time progress tracking</li>
            <li>• GitHub & GitLab support</li>
            <li>• AI-powered code analysis</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen