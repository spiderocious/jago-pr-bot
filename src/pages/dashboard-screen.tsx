import { useState } from 'react';
import { Key, LogOut, Settings, Activity, ExternalLink, Bell, Zap, Globe } from 'lucide-react';

const DashboardScreen = () => {
  const [autoGenerate, setAutoGenerate] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [templateDetection, setTemplateDetection] = useState(true);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col px-6 py-8">
      {/* Usage Stats Section */}
      <div className="mb-8">
        <div className="w-20 h-20 mx-auto mb-4 bg-yellow-400 flex items-center justify-center">
          <Activity className="w-10 h-10 text-black" />
        </div>
        <h2 className="text-2xl font-bold text-center mb-2">Dashboard</h2>
        <p className="text-sm text-gray-400 text-center">Monitor your usage and preferences</p>
      </div>

      {/* Usage Card */}
      <div className="bg-gray-900/30 border border-gray-800 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Current Usage</h3>
          <span className="text-2xl font-bold text-yellow-400">850</span>
        </div>
        <div className="mb-3">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>Descriptions used</span>
            <span>850 / 1000</span>
          </div>
          <div className="w-full bg-gray-800 h-2">
            <div className="bg-yellow-400 h-2" style={{ width: '85%' }}></div>
          </div>
        </div>
        <p className="text-xs text-gray-500">150 descriptions remaining</p>
      </div>

      {/* Recent Activity */}
      <div className="bg-gray-900/30 border border-gray-800 p-6 mb-6">
        <h3 className="text-sm font-semibold mb-3 text-gray-300">Recent Activity</h3>
        <div className="space-y-2">
          <div className="text-sm">
            <p className="text-gray-400">Last generated:</p>
            <p className="text-white font-medium">2 hours ago</p>
          </div>
          <div className="text-sm">
            <p className="text-gray-400">Repository:</p>
            <p className="text-white font-medium">company/api-service</p>
          </div>
          <div className="text-sm">
            <p className="text-gray-400">Branch:</p>
            <p className="text-white font-medium">feature/auth-improvements</p>
          </div>
        </div>
      </div>

      {/* Settings Section */}
      <div className="bg-gray-900/30 border border-gray-800 p-6 mb-6">
        <h3 className="text-sm font-semibold mb-4 text-gray-300 flex items-center gap-2">
          <Settings className="w-4 h-4" />
          Settings
        </h3>
        
        {/* Toggle Settings */}
        <div className="space-y-4">
          {/* Auto Generate */}
          <div className="flex items-center justify-between">
            <div className="flex items-start gap-3 flex-1">
              <Zap className="w-4 h-4 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Auto-generate</p>
                <p className="text-xs text-gray-500">Generate on page load</p>
              </div>
            </div>
            <button
              onClick={() => setAutoGenerate(!autoGenerate)}
              className={`relative w-11 h-6 transition-colors ${
                autoGenerate ? 'bg-yellow-400' : 'bg-gray-700'
              }`}
            >
              <div
                className={`absolute top-0.5 w-5 h-5 bg-black transition-transform ${
                  autoGenerate ? 'translate-x-5' : 'translate-x-0.5'
                }`}
              ></div>
            </button>
          </div>

          {/* Notifications */}
          <div className="flex items-center justify-between">
            <div className="flex items-start gap-3 flex-1">
              <Bell className="w-4 h-4 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Notifications</p>
                <p className="text-xs text-gray-500">Get completion alerts</p>
              </div>
            </div>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`relative w-11 h-6 transition-colors ${
                notifications ? 'bg-yellow-400' : 'bg-gray-700'
              }`}
            >
              <div
                className={`absolute top-0.5 w-5 h-5 bg-black transition-transform ${
                  notifications ? 'translate-x-5' : 'translate-x-0.5'
                }`}
              ></div>
            </button>
          </div>

          {/* Template Detection */}
          <div className="flex items-center justify-between">
            <div className="flex items-start gap-3 flex-1">
              <Globe className="w-4 h-4 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Template detection</p>
                <p className="text-xs text-gray-500">Detect pre-filled templates</p>
              </div>
            </div>
            <button
              onClick={() => setTemplateDetection(!templateDetection)}
              className={`relative w-11 h-6 transition-colors ${
                templateDetection ? 'bg-yellow-400' : 'bg-gray-700'
              }`}
            >
              <div
                className={`absolute top-0.5 w-5 h-5 bg-black transition-transform ${
                  templateDetection ? 'translate-x-5' : 'translate-x-0.5'
                }`}
              ></div>
            </button>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3 mb-6">
        <button className="w-full bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium py-3 px-4 transition-colors flex items-center justify-center gap-2">
          <Key className="w-4 h-4" />
          Change API Key
        </button>
        
        <a
          href="https://jagoprbot.com/docs"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium py-3 px-4 transition-colors flex items-center justify-center gap-2"
        >
          Documentation
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {/* Logout Button */}
      <div className="mt-auto pt-6 border-t border-gray-800">
        <button className="w-full bg-red-900/30 hover:bg-red-900/50 border border-red-800 text-red-400 font-medium py-3 px-4 transition-colors flex items-center justify-center gap-2">
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default DashboardScreen;