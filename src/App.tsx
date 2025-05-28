import { Toaster } from '@/components/ui/toaster';
import QRCodeGenerator from '@/components/QRCodeGenerator';
import AppHeader from '@/components/AppHeader';
import { ThemeProvider } from '@/components/ThemeProvider';

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="qr-generator-theme">
      <div className="min-h-screen bg-background flex flex-col">
        <AppHeader />
        <main className="flex-1 container mx-auto py-8 px-4 sm:px-6 md:py-12 max-w-5xl">
          <QRCodeGenerator />
        </main>
        <Toaster />
      </div>
    </ThemeProvider>
  );
}

export default App;