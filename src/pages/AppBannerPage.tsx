
import { AppBanner } from "@/components/marketing/AppBanner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, Share2, Copy } from "lucide-react";
import { toast } from "sonner";

export const AppBannerPage = () => {
  const handleDownload = async () => {
    const banner = document.getElementById('app-banner');
    if (banner) {
      try {
        const html2canvas = (await import('html2canvas')).default;
        const canvas = await html2canvas(banner, {
          scale: 2,
          useCORS: true,
          allowTaint: true
        });
        
        const link = document.createElement('a');
        link.download = 'fil-et-toile-app-banner.png';
        link.href = canvas.toDataURL();
        link.click();
        
        toast.success("Banner downloaded successfully!");
      } catch (error) {
        console.error('Download failed:', error);
        toast.error("Download failed. Please right-click and 'Save image as...'");
      }
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Fil et Toile Studio - App Banner',
        text: 'Check out our beautiful app banner for the Amazigh artisan community platform!',
        url: window.location.href,
      });
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  const handleCopyBanner = async () => {
    try {
      // Copy the banner HTML for embedding
      const bannerHtml = `<div style="width: 1200px; height: 600px; background: linear-gradient(to bottom right, #f97316, #ef4444, #ea580c); position: relative; border-radius: 16px; overflow: hidden;">
  <!-- Add your banner content here -->
  <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: white; text-align: center;">
    <h1 style="font-size: 3rem; font-weight: bold; margin-bottom: 1rem;">Fil et Toile Studio</h1>
    <p style="font-size: 1.5rem;">Connect with Amazigh Artisans</p>
  </div>
</div>`;
      
      await navigator.clipboard.writeText(bannerHtml);
      toast.success("Banner HTML copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy banner HTML");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">App Banner</h1>
          <p className="text-gray-600">
            Your promotional banner for marketing materials and app store listings (1200x600px)
          </p>
        </div>

        <Card className="p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Banner Preview</h2>
            <div className="flex gap-2">
              <Button onClick={handleDownload} variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              <Button onClick={handleCopyBanner} variant="outline" size="sm">
                <Copy className="h-4 w-4 mr-2" />
                Copy HTML
              </Button>
              <Button onClick={handleShare} variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div id="app-banner" className="transform scale-75 origin-top-left">
              <AppBanner />
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Banner Specifications</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="font-medium">Width:</span>
                <span className="text-gray-600">1200px</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Height:</span>
                <span className="text-gray-600">600px</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Aspect Ratio:</span>
                <span className="text-gray-600">2:1</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Format:</span>
                <span className="text-gray-600">PNG/JPG/WebP</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Resolution:</span>
                <span className="text-gray-600">High DPI Ready</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Usage Guidelines</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Perfect for social media promotion</li>
              <li>• Website hero banner</li>
              <li>• App store feature graphics</li>
              <li>• Marketing presentations</li>
              <li>• Email campaign headers</li>
              <li>• Print materials (business cards, flyers)</li>
              <li>• Conference and event displays</li>
            </ul>
          </Card>
        </div>

        <Card className="p-6 mt-6">
          <h3 className="text-lg font-semibold mb-4">Design Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <h4 className="font-medium mb-2 text-orange-600">Visual Elements:</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• Gradient background with brand colors</li>
                <li>• Geometric pattern overlay</li>
                <li>• Mobile app mockup preview</li>
                <li>• Floating craft icons</li>
                <li>• Professional typography</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2 text-red-600">Key Messages:</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• Heritage preservation focus</li>
                <li>• Community connection</li>
                <li>• Learning opportunities</li>
                <li>• Artisan collaboration</li>
                <li>• Cultural authenticity</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2 text-yellow-600">Trust Indicators:</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• 4.9-star rating</li>
                <li>• 15K+ active users</li>
                <li>• Award recognition</li>
                <li>• Professional branding</li>
                <li>• Quality craftsmanship focus</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
