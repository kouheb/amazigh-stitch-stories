import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Share2, Copy } from "lucide-react";
import { toast } from "sonner";

// Import all generated graphics
import appIcon from "@/assets/playstore/app-icon-512.png";
import featureGraphic from "@/assets/playstore/feature-graphic-1024x512.png";
import phoneScreenshot1 from "@/assets/playstore/phone-screenshot-1.png";
import phoneScreenshot2 from "@/assets/playstore/phone-screenshot-2.png";
import phoneScreenshot3 from "@/assets/playstore/phone-screenshot-3.png";
import phoneScreenshot4 from "@/assets/playstore/phone-screenshot-4.png";
import phoneScreenshot5 from "@/assets/playstore/phone-screenshot-5.png";
import tabletScreenshot1 from "@/assets/playstore/tablet-screenshot-1.png";
import tabletScreenshot2 from "@/assets/playstore/tablet-screenshot-2.png";
import promoBanner from "@/assets/playstore/promo-banner-1200x600.png";
import heroGraphic from "@/assets/playstore/hero-graphic-1920x1080.png";
import squarePromo from "@/assets/playstore/square-promo-1080x1080.png";
import downloadBadge from "@/assets/playstore/download-badge-1024x512.png";

export const PlayStoreGraphicsPage = () => {
  const downloadImage = async (imageSrc: string, filename: string) => {
    try {
      const response = await fetch(imageSrc);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success(`${filename} downloaded successfully!`);
    } catch (error) {
      console.error('Download failed:', error);
      toast.error("Download failed. Please right-click and 'Save image as...'");
    }
  };

  const copyImageUrl = (imageSrc: string) => {
    navigator.clipboard.writeText(window.location.origin + imageSrc);
    toast.success("Image URL copied to clipboard!");
  };

  const downloadAll = () => {
    const images = [
      { src: appIcon, name: "app-icon-512x512.png" },
      { src: featureGraphic, name: "feature-graphic-1024x512.png" },
      { src: phoneScreenshot1, name: "phone-screenshot-1-1080x1920.png" },
      { src: phoneScreenshot2, name: "phone-screenshot-2-1080x1920.png" },
      { src: phoneScreenshot3, name: "phone-screenshot-3-1080x1920.png" },
      { src: phoneScreenshot4, name: "phone-screenshot-4-1080x1920.png" },
      { src: phoneScreenshot5, name: "phone-screenshot-5-1080x1920.png" },
      { src: tabletScreenshot1, name: "tablet-screenshot-1-1920x1440.png" },
      { src: tabletScreenshot2, name: "tablet-screenshot-2-1920x1440.png" },
      { src: promoBanner, name: "promo-banner-1200x600.png" },
      { src: heroGraphic, name: "hero-graphic-1920x1080.png" },
      { src: squarePromo, name: "square-promo-1080x1080.png" },
      { src: downloadBadge, name: "download-badge-1024x512.png" }
    ];

    images.forEach((image, index) => {
      setTimeout(() => {
        downloadImage(image.src, image.name);
      }, index * 500); // Stagger downloads to avoid overwhelming the browser
    });
  };

  const GraphicCard = ({ 
    title, 
    description, 
    imageSrc, 
    filename, 
    dimensions 
  }: {
    title: string;
    description: string;
    imageSrc: string;
    filename: string;
    dimensions: string;
  }) => (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <div className="text-sm text-gray-500">{dimensions}</div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 bg-gray-50 rounded-lg p-4 flex items-center justify-center">
          <img 
            src={imageSrc} 
            alt={title}
            className="max-w-full max-h-48 object-contain shadow-lg rounded"
          />
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={() => downloadImage(imageSrc, filename)}
            size="sm"
            variant="outline"
          >
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
          <Button 
            onClick={() => copyImageUrl(imageSrc)}
            size="sm"
            variant="outline"
          >
            <Copy className="h-4 w-4 mr-2" />
            Copy URL
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Google Play Store Graphics</h1>
          <p className="text-gray-600 mb-4">
            Complete set of graphics for your Google Play Console app listing
          </p>
          <Button onClick={downloadAll} className="bg-orange-600 hover:bg-orange-700">
            <Download className="h-4 w-4 mr-2" />
            Download All Graphics
          </Button>
        </div>

        {/* App Icon Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">App Icon</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <GraphicCard
              title="App Icon"
              description="High-resolution app icon for Google Play Store"
              imageSrc={appIcon}
              filename="app-icon-512x512.png"
              dimensions="512 x 512 px"
            />
          </div>
        </div>

        {/* Feature Graphics Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Feature Graphics & Banners</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <GraphicCard
              title="Feature Graphic"
              description="Main banner for Google Play Store listing"
              imageSrc={featureGraphic}
              filename="feature-graphic-1024x512.png"
              dimensions="1024 x 512 px"
            />
            <GraphicCard
              title="Promotional Banner"
              description="Wide promotional banner for marketing"
              imageSrc={promoBanner}
              filename="promo-banner-1200x600.png"
              dimensions="1200 x 600 px"
            />
            <GraphicCard
              title="Hero Graphic"
              description="Large hero image for presentations and web"
              imageSrc={heroGraphic}
              filename="hero-graphic-1920x1080.png"
              dimensions="1920 x 1080 px"
            />
            <GraphicCard
              title="Square Promo"
              description="Square format for social media promotion"
              imageSrc={squarePromo}
              filename="square-promo-1080x1080.png"
              dimensions="1080 x 1080 px"
            />
            <GraphicCard
              title="Download Badge"
              description="Call-to-action download promotion"
              imageSrc={downloadBadge}
              filename="download-badge-1024x512.png"
              dimensions="1024 x 512 px"
            />
          </div>
        </div>

        {/* Phone Screenshots Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Phone Screenshots</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            <GraphicCard
              title="Main Dashboard"
              description="App home screen with artisan profiles"
              imageSrc={phoneScreenshot1}
              filename="phone-screenshot-1.png"
              dimensions="1080 x 1920 px"
            />
            <GraphicCard
              title="Marketplace"
              description="Shopping interface with crafts for sale"
              imageSrc={phoneScreenshot2}
              filename="phone-screenshot-2.png"
              dimensions="1080 x 1920 px"
            />
            <GraphicCard
              title="Learning Center"
              description="Workshops and tutorials interface"
              imageSrc={phoneScreenshot3}
              filename="phone-screenshot-3.png"
              dimensions="1080 x 1920 px"
            />
            <GraphicCard
              title="Messaging"
              description="Chat interface between artisans"
              imageSrc={phoneScreenshot4}
              filename="phone-screenshot-4.png"
              dimensions="1080 x 1920 px"
            />
            <GraphicCard
              title="Events"
              description="Workshop and event discovery"
              imageSrc={phoneScreenshot5}
              filename="phone-screenshot-5.png"
              dimensions="1080 x 1920 px"
            />
          </div>
        </div>

        {/* Tablet Screenshots Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Tablet Screenshots</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <GraphicCard
              title="Portfolio Gallery"
              description="Expanded view of artisan portfolios"
              imageSrc={tabletScreenshot1}
              filename="tablet-screenshot-1.png"
              dimensions="1920 x 1440 px"
            />
            <GraphicCard
              title="Workshop Interface"
              description="Learning platform optimized for tablets"
              imageSrc={tabletScreenshot2}
              filename="tablet-screenshot-2.png"
              dimensions="1920 x 1440 px"
            />
          </div>
        </div>

        {/* Usage Guidelines */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Google Play Console Upload Guidelines</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Required Assets:</h4>
                <ul className="text-sm space-y-1 text-gray-600">
                  <li>• App Icon: 512 x 512 px (PNG, 32-bit)</li>
                  <li>• Feature Graphic: 1024 x 500 px (JPG or PNG)</li>
                  <li>• Phone Screenshots: At least 2, up to 8 (16:9 or 9:16)</li>
                  <li>• Tablet Screenshots: Optional (recommended)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">File Requirements:</h4>
                <ul className="text-sm space-y-1 text-gray-600">
                  <li>• Maximum file size: 8MB</li>
                  <li>• Format: PNG (recommended) or JPG</li>
                  <li>• No transparency for feature graphics</li>
                  <li>• High quality, professional appearance</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Video Recommendation */}
        <Card>
          <CardHeader>
            <CardTitle>Promotional Video (Recommended)</CardTitle>
            <CardDescription>
              Consider creating a 30-second promotional video showcasing your app's key features
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-gray-600 space-y-2">
              <p><strong>Video Specs:</strong> MP4, Maximum 30 seconds, 16:9 aspect ratio</p>
              <p><strong>Content Ideas:</strong></p>
              <ul className="ml-4 space-y-1">
                <li>• Show artisans using the app to connect and collaborate</li>
                <li>• Highlight the marketplace with beautiful craft items</li>
                <li>• Demonstrate the learning features with workshop previews</li>
                <li>• Show the community aspect with messaging and events</li>
              </ul>
              <p className="text-orange-600 font-medium">
                Pro tip: Use tools like Canva, Adobe After Effects, or Figma to create animated promotional videos
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};