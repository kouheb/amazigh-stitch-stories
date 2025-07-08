
import { IconBanner } from "@/components/marketing/IconBanner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, Share2, Copy } from "lucide-react";
import { toast } from "sonner";

export const IconBannerPage = () => {
  const handleDownload = async () => {
    const banner = document.getElementById('icon-banner');
    if (banner) {
      try {
        const html2canvas = (await import('html2canvas')).default;
        const canvas = await html2canvas(banner, {
          scale: 2,
          useCORS: true,
          allowTaint: true
        });
        
        const link = document.createElement('a');
        link.download = 'fil-et-toile-icon-banner.png';
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
        title: 'Fil et Toile Studio - Icon Banner',
        text: 'Check out our beautiful icon banner for the Amazigh artisan community platform!',
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  const handleCopyBanner = async () => {
    try {
      const bannerHtml = `<div style="width: 1200px; height: 600px; background: linear-gradient(to bottom right, #f97316, #ef4444, #ea580c); display: flex; flex-direction: column; align-items: center; justify-content: center; color: white; text-align: center; border-radius: 16px; overflow: hidden;">
  <div style="margin-bottom: 2rem;">
    <div style="width: 10rem; height: 10rem; background: rgba(255,255,255,0.2); backdrop-filter: blur(4px); border-radius: 1.5rem; padding: 1.5rem; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);">
      <div style="width: 100%; height: 100%; background: white; border-radius: 1rem; display: flex; align-items: center; justify-content: center;">
        <div style="width: 5rem; height: 5rem; background: #1f2937; border-radius: 0.75rem; display: flex; align-items: center; justify-content: center;">
          <span style="color: white; font-weight: bold; font-size: 1.5rem;">FT</span>
        </div>
      </div>
    </div>
  </div>
  <h1 style="font-size: 3.75rem; font-weight: bold; margin-bottom: 0.5rem; filter: drop-shadow(0 4px 3px rgba(0,0,0,0.07));">Fil et Toile</h1>
  <p style="font-size: 1.875rem; font-weight: 500; color: #fed7aa; filter: drop-shadow(0 4px 3px rgba(0,0,0,0.07));">Studio</p>
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
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Icon Banner</h1>
          <p className="text-gray-600">
            A clean, icon-focused banner design inspired by your app branding (1200x600px)
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
            <div id="icon-banner" className="transform scale-75 origin-top-left">
              <IconBanner />
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Design Features</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Clean, centered layout inspired by your app icon</li>
              <li>• Orange gradient background matching your brand</li>
              <li>• Prominent app icon representation</li>
              <li>• Code symbol highlighting tech focus</li>
              <li>• Clear typography and branding</li>
              <li>• Feature tags with emojis</li>
              <li>• Subtle background pattern</li>
            </ul>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Usage</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• App store feature graphics</li>
              <li>• Social media posts</li>
              <li>• Website headers</li>
              <li>• Presentation slides</li>
              <li>• Marketing materials</li>
              <li>• Email campaigns</li>
              <li>• Conference displays</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
};
