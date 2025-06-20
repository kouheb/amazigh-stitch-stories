
import { PlayStoreBanner } from "@/components/marketing/PlayStoreBanner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, Share2 } from "lucide-react";

export const PlayStoreBannerPage = () => {
  const handleDownload = () => {
    // Create canvas and download functionality
    const banner = document.getElementById('playstore-banner');
    if (banner) {
      // You can use html2canvas library or similar to convert to image
      console.log("Download banner functionality - integrate with html2canvas for actual download");
      alert("To download: Right-click on the banner and select 'Save image as...' or use browser's screenshot feature");
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Fil et Toile Studio - Play Store Banner',
        text: 'Check out our app banner for the Amazigh craft community platform!',
        url: window.location.href,
      });
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Play Store Banner</h1>
          <p className="text-gray-600">
            Your promotional banner for app store listings (1024x500px)
          </p>
        </div>

        <Card className="p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Banner Preview</h2>
            <div className="flex gap-2">
              <Button onClick={handleDownload} variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              <Button onClick={handleShare} variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div id="playstore-banner" className="transform scale-75 origin-top-left">
              <PlayStoreBanner />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Banner Specifications</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium mb-2">Dimensions:</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• Width: 1024px</li>
                <li>• Height: 500px</li>
                <li>• Aspect Ratio: 2.048:1</li>
                <li>• Format: PNG/JPG</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Usage:</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• Google Play Store feature graphic</li>
                <li>• App promotional materials</li>
                <li>• Social media promotion</li>
                <li>• Website hero banner</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
