import { useState } from 'react';
import { CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type QRCodeCustomizerProps = {
  bgColor: string;
  fgColor: string;
  setBgColor: (color: string) => void;
  setFgColor: (color: string) => void;
};

const predefinedColors = [
  '#000000', '#FFFFFF', '#FF5733', '#33FF57', '#3357FF',
  '#FF33A8', '#33FFF5', '#F5FF33', '#9D33FF', '#FF8333'
];

export default function QRCodeCustomizer({
  bgColor,
  fgColor,
  setBgColor,
  setFgColor
}: QRCodeCustomizerProps) {
  const [openBgColor, setOpenBgColor] = useState(false);
  const [openFgColor, setOpenFgColor] = useState(false);

  return (
    <CardContent className="pt-6 space-y-6">
      <div className="space-y-3">
        <Label htmlFor="bg-color">Background Color</Label>
        <div className="flex items-center gap-3">
          <Popover open={openBgColor} onOpenChange={setOpenBgColor}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-12 h-8 p-0 border-2",
                  bgColor === "#FFFFFF" && "border-input"
                )}
                style={{ background: bgColor }}
              >
                <span className="sr-only">Pick a color</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64">
              <div className="flex flex-wrap gap-2 py-2">
                {predefinedColors.map((color) => (
                  <Button
                    key={`bg-${color}`}
                    variant="outline"
                    className="w-8 h-8 p-0 rounded-md border"
                    style={{ background: color }}
                    onClick={() => {
                      setBgColor(color);
                      setOpenBgColor(false);
                    }}
                  >
                    <span className="sr-only">{color}</span>
                  </Button>
                ))}
              </div>
              <div className="flex items-center pt-4">
                <Input
                  id="bg-color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="col-span-2 h-8"
                />
              </div>
            </PopoverContent>
          </Popover>
          <Input
            id="bg-color-hex"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
            className="h-9"
          />
        </div>
      </div>

      <div className="space-y-3">
        <Label htmlFor="fg-color">Foreground Color</Label>
        <div className="flex items-center gap-3">
          <Popover open={openFgColor} onOpenChange={setOpenFgColor}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-12 h-8 p-0 border-2"
                style={{ background: fgColor }}
              >
                <span className="sr-only">Pick a color</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64">
              <div className="flex flex-wrap gap-2 py-2">
                {predefinedColors.map((color) => (
                  <Button
                    key={`fg-${color}`}
                    variant="outline"
                    className="w-8 h-8 p-0 rounded-md border"
                    style={{ background: color }}
                    onClick={() => {
                      setFgColor(color);
                      setOpenFgColor(false);
                    }}
                  >
                    <span className="sr-only">{color}</span>
                  </Button>
                ))}
              </div>
              <div className="flex items-center pt-4">
                <Input
                  id="fg-color"
                  value={fgColor}
                  onChange={(e) => setFgColor(e.target.value)}
                  className="col-span-2 h-8"
                />
              </div>
            </PopoverContent>
          </Popover>
          <Input
            id="fg-color-hex"
            value={fgColor}
            onChange={(e) => setFgColor(e.target.value)}
            className="h-9"
          />
        </div>
      </div>

      <div className="pt-2">
        <div className="p-4 bg-muted rounded-md">
          <p className="text-sm font-medium mb-2">Preview</p>
          <div className="flex items-center justify-center bg-background p-4 rounded">
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <div 
                className="w-[150px] h-[150px] rounded"
                style={{ background: bgColor, border: "1px solid #e2e8f0" }}
              >
                <div 
                  className="w-full h-full flex items-center justify-center"
                  style={{ color: fgColor }}
                >
                  <div className="w-16 h-16 border-8 rounded-lg" style={{ borderColor: fgColor }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  );
}