import { useState, useRef, useEffect } from 'react';
import QRCode from 'qrcode.react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import {
  Download,
  Copy,
  Check,
  ScanLine,
  Sparkles,
  Palette,
  FileImage,
  FileCode
} from 'lucide-react';
import QRCodeCustomizer from './QRCodeCustomizer';
import { cn } from '@/lib/utils';
import { API_URL } from '@/core/config';

export default function QRCodeGenerator() {
  const [text, setText] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [bgColor, setBgColor] = useState('#FFFFFF');
  const [fgColor, setFgColor] = useState('#000000');
  const [format, setFormat] = useState<'canvas' | 'svg'>('canvas');
  const qrRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const [counter, setCounter] = useState(0);

  const fetchCounterData = async () => {
    const url = API_URL + "counters/total/ip";
    const response = await fetch(url);
    if (!response.ok) {
      setCounter(0);
    }
    const data = await response.json();
    setCounter(data.counter);
  };

  const formatViews = (num: number) => {
    return new Intl.NumberFormat('en', {
      notation: 'compact',
      compactDisplay: 'short',
    }).format(num);
  };

  useEffect(() => {
    fetchCounterData();
  }, []);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleDownload = () => {
    if (!text.trim()) {
      toast({
        title: 'Cannot download empty QR code',
        description: 'Please enter some text first.',
        variant: 'destructive',
      });
      return;
    }

    if (format === 'canvas') {
      const canvas = qrRef.current?.querySelector('canvas');
      if (!canvas) return;

      const pngUrl = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.href = pngUrl;
      downloadLink.download = `qrcode-${Date.now()}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    } else {
      const svg = qrRef.current?.querySelector('svg');
      if (!svg) return;

      const svgData = new XMLSerializer().serializeToString(svg);
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const svgUrl = URL.createObjectURL(svgBlob);

      const downloadLink = document.createElement('a');
      downloadLink.href = svgUrl;
      downloadLink.download = `qrcode-${Date.now()}.svg`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(svgUrl);
    }

    toast({
      title: 'QR Code downloaded',
      description: `Your QR code has been saved as a ${format.toUpperCase()} file.`,
    });
  };

  const copyToClipboard = async () => {
    if (!text.trim()) {
      toast({
        title: 'Cannot copy empty text',
        description: 'Please enter some text first.',
        variant: 'destructive',
      });
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      toast({
        title: 'Copied to clipboard',
        description: 'Text has been copied to your clipboard.',
      });

      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (err) {
      toast({
        title: 'Failed to copy',
        description: 'Could not copy text to clipboard.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="flex flex-col items-center animate-in fade-in-50 duration-500">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">QR Code Generator</h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          Generate QR codes instantly from any text, URL, or message.
        </p>
      </div>

      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ScanLine className="h-5 w-5" />
            <span>Create Your QR Code</span>
          </CardTitle>
          <CardDescription>
            Enter text or a URL to generate a QR code in real-time.
          </CardDescription>
        </CardHeader>

        <Tabs defaultValue="generate" className="w-full">
          <TabsList className="grid grid-cols-2 mx-6">
            <TabsTrigger value="generate" className="flex items-center gap-1">
              <Sparkles className="h-4 w-4" />
              Generate
            </TabsTrigger>
            <TabsTrigger value="customize" className="flex items-center gap-1">
              <Palette className="h-4 w-4" />
              Customize
            </TabsTrigger>
          </TabsList>

          <TabsContent value="generate" className="p-0">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="qr-text">Enter text or URL</Label>
                  <div className="flex">
                    <Input
                      id="qr-text"
                      placeholder="Enter text to generate QR code..."
                      value={text}
                      onChange={handleTextChange}
                      className="rounded-r-none focus-visible:ring-1"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      className={cn(
                        "rounded-l-none border-l-0",
                        isCopied && "text-green-500"
                      )}
                      onClick={copyToClipboard}
                    >
                      {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div
                  ref={qrRef}
                  className={`qr-container flex justify-center items-center p-4 transition-all duration-300 ${text ? 'opacity-100 scale-100' : 'opacity-70 scale-95'
                    }`}
                >
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <QRCode
                      value={text || ' '}
                      size={200}
                      bgColor={bgColor}
                      fgColor={fgColor}
                      level="H"
                      includeMargin
                      renderAs={format}
                      className="rounded-sm"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </TabsContent>

          <TabsContent value="customize">
            <QRCodeCustomizer
              bgColor={bgColor}
              fgColor={fgColor}
              setBgColor={setBgColor}
              setFgColor={setFgColor}
            />
          </TabsContent>

          <CardFooter className="flex justify-center gap-4 border-t p-6">
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setFormat('canvas')}
                className={cn(format === 'canvas' && "bg-primary text-primary-foreground hover:bg-primary/90")}
              >
                <FileImage className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setFormat('svg')}
                className={cn(format === 'svg' && "bg-primary text-primary-foreground hover:bg-primary/90")}
              >
                <FileCode className="h-4 w-4" />
              </Button>
            </div>
            <Button
              onClick={handleDownload}
              disabled={!text.trim()}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" /> Download QR Code
            </Button>
          </CardFooter>
        </Tabs>
      </Card>

      <div className="mt-8 text-center text-sm text-muted-foreground">
        <p>
          Scan this QR code with any QR code reader app on your smartphone or tablet.
        </p>
      </div>
      <p className="text-lg sm:text-xl font-bold">
        <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Loved by +{formatViews(counter)}
        </span>
      </p>
    </div>
  );
}