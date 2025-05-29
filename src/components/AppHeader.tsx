import { useTheme } from '@/components/ThemeProvider';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Moon, Sun, QrCode, Palette as Paypal } from 'lucide-react';

export default function AppHeader() {
  const { setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="w-full flex items-center justify-between h-16 px-4 sm:px-6">

        {/* Izquierda: logo + título */}
        <div className="flex items-center space-x-2">
          <QrCode className="h-6 w-6" />
          <span className="hidden font-medium sm:inline-block">
            QR Code Generator
          </span>
        </div>

        {/* Derecha: botón de tema */}
        <div className="flex items-center space-x-2">

          <a
            href="https://www.paypal.com/paypalme/NAUTBOL"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-md bg-[#0070BA] px-3 py-2 text-sm font-medium text-white hover:bg-[#005ea6] transition-colors"
          >
            <Paypal size={16} className="mr-1" />
            Donate
          </a>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme('light')}>Light</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('dark')}>Dark</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('system')}>System</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

      </div>
    </header>
  );
}