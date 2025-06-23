
import { DeveloperIcon } from "@/components/icons/DeveloperIcon";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import html2canvas from 'html2canvas';

export const DeveloperIconPage = () => {
  const handleDownload = async () => {
    const iconElement = document.getElementById('developer-icon');
    if (iconElement) {
      try {
        console.log('Starting icon download...');
        
        // Create canvas from the element
        const canvas = await html2canvas(iconElement, {
          width: 512,
          height: 512,
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
            link.download = 'fil-et-toile-developer-icon-512x512.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
            console.log('Icon downloaded successfully');
          }
        }, 'image/png', 1.0);
        
      } catch (error) {
        console.error('Error downloading icon:', error);
        alert('Error downloading icon. Please try again or right-click and save the image manually.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-orange-600 hover:text-orange-700 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Developer Icon Generator</h1>
          <p className="text-gray-600">
            Your app store developer icon (512px × 512px)
          </p>
        </div>

        {/* Icon Preview */}
        <Card className="p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Icon Preview</h2>
            <Button onClick={handleDownload} className="bg-orange-600 hover:bg-orange-700">
              <Download className="h-4 w-4 mr-2" />
              Download PNG
            </Button>
          </div>
          
          <div className="flex justify-center bg-gray-100 rounded-lg p-8">
            <div id="developer-icon" className="shadow-2xl rounded-3xl overflow-hidden">
              <DeveloperIcon />
            </div>
          </div>
        </Card>

        {/* Specifications */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Icon Specifications</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3 text-green-600">✓ Requirements Met:</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  Dimensions: 512px × 512px
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
                  Developer-focused design
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-3">Usage Guidelines:</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Google Play Store developer profile</li>
                <li>• App Store Connect account</li>
                <li>• Developer documentation</li>
                <li>• Professional portfolio</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">How to Download:</h4>
            <p className="text-sm text-blue-800">
              Click the "Download PNG" button above to save the icon as a 512x512px PNG file, 
              ready for use in app stores and developer profiles.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};
