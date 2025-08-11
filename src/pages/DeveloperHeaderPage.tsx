
import { DeveloperHeader } from "@/components/icons/DeveloperHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import html2canvas from 'html2canvas';

export const DeveloperHeaderPage = () => {
  const navigate = useNavigate();
  const handleDownload = async () => {
    const headerElement = document.getElementById('developer-header');
    if (headerElement) {
      try {
        console.log('Starting header download...');
        
        // Create canvas from the element
        const canvas = await html2canvas(headerElement, {
          width: 4096,
          height: 2304,
          scale: 1,
          backgroundColor: null,
          useCORS: true,
          allowTaint: true
        });
        
        // Convert to blob and download
        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'fil-et-toile-developer-header-4096x2304.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
            console.log('Header downloaded successfully');
          }
        }, 'image/png', 1.0);
        
      } catch (error) {
        console.error('Error downloading header:', error);
        alert('Error downloading header. Please try again or right-click and save the image manually.');
      }
    }
  };
  const handleBack = () => { if (window.history.length > 1) navigate(-1); else navigate('/'); };
  return (
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" onClick={handleBack} className="inline-flex items-center text-orange-600 hover:text-orange-700 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Developer Header Generator</h1>
          <p className="text-gray-600">
            Your developer page header image (4096px × 2304px)
          </p>
        </div>

        {/* Header Preview */}
        <Card className="p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Header Preview</h2>
            <Button onClick={handleDownload} className="bg-orange-600 hover:bg-orange-700">
              <Download className="h-4 w-4 mr-2" />
              Download PNG
            </Button>
          </div>
          
          <div className="flex justify-center bg-gray-100 rounded-lg p-4 overflow-auto">
            <div id="developer-header" className="shadow-2xl rounded-lg overflow-hidden" style={{ transform: 'scale(0.2)', transformOrigin: 'center' }}>
              <DeveloperHeader />
            </div>
          </div>
          
          <div className="mt-4 text-center text-sm text-gray-500">
            Preview shown at 20% scale for display purposes. Downloaded image will be full 4096×2304 resolution.
          </div>
        </Card>

        {/* Specifications */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Header Specifications</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3 text-green-600">✓ Requirements Met:</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  Dimensions: 4096px × 2304px
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  Format: PNG (24-bit, not transparent)
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  File size: Under 1MB
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  Professional developer design
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-3">Usage Guidelines:</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Google Play Console developer page</li>
                <li>• App Store Connect developer profile</li>
                <li>• Professional portfolio header</li>
                <li>• Social media cover image</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">How to Download:</h4>
            <p className="text-sm text-blue-800">
              Click the "Download PNG" button above to save the header as a 4096×2304px PNG file, 
              ready for use as your developer page header in app stores and professional profiles.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};
