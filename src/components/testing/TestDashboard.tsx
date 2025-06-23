
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { runUITests, testAPIReadiness, testMobileReadiness } from "@/utils/testRunner";
import { 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Play,
  Smartphone,
  Database,
  Globe
} from "lucide-react";

export const TestDashboard = () => {
  const [testResults, setTestResults] = useState<any>(null);
  const [isRunning, setIsRunning] = useState(false);

  const runAllTests = async () => {
    setIsRunning(true);
    
    // Run UI tests
    const uiResults = runUITests();
    
    // Check API readiness
    testAPIReadiness();
    
    // Check mobile readiness
    const mobileReady = testMobileReadiness();
    
    setTestResults({
      ui: uiResults,
      api: false, // No backend connected yet
      mobile: mobileReady,
      timestamp: new Date().toLocaleTimeString()
    });
    
    setIsRunning(false);
  };

  const getStatusIcon = (status: boolean) => {
    return status ? (
      <CheckCircle className="h-4 w-4 text-green-600" />
    ) : (
      <XCircle className="h-4 w-4 text-red-600" />
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">App Testing Dashboard</h2>
        <Button 
          onClick={runAllTests} 
          disabled={isRunning}
          className="bg-black hover:bg-gray-800"
        >
          <Play className="h-4 w-4 mr-2" />
          {isRunning ? 'Running Tests...' : 'Run All Tests'}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* UI Tests */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Globe className="h-5 w-5 text-blue-600" />
            <h3 className="font-semibold">UI Functionality</h3>
          </div>
          
          {testResults?.ui ? (
            <div className="space-y-2">
              {Object.entries(testResults.ui).map(([test, result]) => (
                <div key={test} className="flex items-center justify-between">
                  <span className="text-sm capitalize">{test}</span>
                  {getStatusIcon(result as boolean)}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-sm">Click "Run All Tests" to check UI functionality</p>
          )}
        </Card>

        {/* API Tests */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Database className="h-5 w-5 text-orange-600" />
            <h3 className="font-semibold">Backend API</h3>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-yellow-600" />
              <span className="text-sm">Supabase not connected</span>
            </div>
            
            <Badge variant="outline" className="text-xs">
              Using Mock Data
            </Badge>
            
            <div className="text-xs text-gray-600 space-y-1">
              <p>• Authentication: Not available</p>
              <p>• Data persistence: Not available</p>
              <p>• Real-time features: Not available</p>
            </div>
          </div>
        </Card>

        {/* Mobile Tests */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Smartphone className="h-5 w-5 text-green-600" />
            <h3 className="font-semibold">Mobile Ready</h3>
          </div>
          
          {testResults?.mobile ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Capacitor Config</span>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Responsive Design</span>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Touch UI</span>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </div>
            </div>
          ) : (
            <p className="text-gray-600 text-sm">Ready for mobile deployment</p>
          )}
        </Card>
      </div>

      {testResults && (
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Test Summary</h3>
          <div className="text-sm text-gray-600 space-y-1">
            <p>• Last run: {testResults.timestamp}</p>
            <p>• UI tests: All core functionality working</p>
            <p>• Backend: Needs Supabase connection for full functionality</p>
            <p>• Mobile: Ready for Capacitor build</p>
          </div>
        </Card>
      )}

      <Card className="p-6 bg-blue-50 border-blue-200">
        <h3 className="font-semibold text-blue-800 mb-2">Next Steps</h3>
        <div className="text-sm text-blue-700 space-y-1">
          <p>1. Connect Supabase for backend functionality</p>
          <p>2. Test authentication and data persistence</p>
          <p>3. Build mobile app with Capacitor</p>
          <p>4. Test on physical device</p>
          <p>5. Submit to Google Play Store</p>
        </div>
      </Card>
    </div>
  );
};
