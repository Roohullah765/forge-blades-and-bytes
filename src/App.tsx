// Main App component with routing and global providers
// This sets up the complete application structure with React Router

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import all pages
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policies from "./pages/Policies";
import NotFound from "./pages/NotFound";

// Import layout components
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import WhatsAppButton from "./components/ui/WhatsAppButton";
import ChatBot from "./components/ui/ChatBot";
import AgeVerificationModal from "./components/ui/AgeVerificationModal";

// Create QueryClient for React Query
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {/* Toast notifications */}
        <Toaster />
        <Sonner />
        
        <BrowserRouter>
          <div className="min-h-screen flex flex-col bg-background">
            {/* Age verification modal - shows on first visit */}
            <AgeVerificationModal />
            
            {/* Main header navigation */}
            <Header />
            
            {/* Main content area */}
            <main className="flex-1">
              <Routes>
                {/* Home page */}
                <Route path="/" element={<Home />} />
                
                {/* Product catalog and categories */}
                <Route path="/catalog" element={<Catalog />} />
                <Route path="/catalog/:category" element={<Catalog />} />
                
                {/* Individual product page */}
                <Route path="/product/:id" element={<ProductDetail />} />
                
                {/* Shopping cart and checkout */}
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/order-success" element={<OrderSuccess />} />
                
                {/* Information pages */}
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/policies" element={<Policies />} />
                
                {/* 404 catch-all route - MUST be last */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            
            {/* Footer */}
            <Footer />
            
            {/* Floating action buttons */}
            <WhatsAppButton />
            <ChatBot />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;