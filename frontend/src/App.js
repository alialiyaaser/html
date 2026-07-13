import React from "react";
import { Toaster } from "sonner";
import { LangProvider } from "./contexts/LangContext";
import Loader from "./components/sections/Loader";
import Header from "./components/sections/Header";
import Hero from "./components/sections/Hero";
import Products from "./components/sections/Products";
import About from "./components/sections/About";
import WhyUs from "./components/sections/WhyUs";
import Reviews from "./components/sections/Reviews";
import Testimonials from "./components/sections/Testimonials";
import Stats from "./components/sections/Stats";
import FAQ from "./components/sections/FAQ";
import Newsletter from "./components/sections/Newsletter";
import Contact from "./components/sections/Contact";
import Footer from "./components/sections/Footer";
import FloatingWidgets from "./components/sections/FloatingWidgets";

export default function App() {
  return (
    <LangProvider>
      <Loader />
      <div className="grain min-h-screen">
        <Header />
        <main>
          <Hero />
          <Products />
          <About />
          <WhyUs />
          <Stats />
          <Reviews />
          <Testimonials />
          <FAQ />
          <Newsletter />
          <Contact />
        </main>
        <Footer />
        <FloatingWidgets />
      </div>
      <Toaster
        position="top-center"
        theme="dark"
        toastOptions={{
          style: {
            background: "#0f0f0f",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "#fff",
          },
        }}
      />
    </LangProvider>
  );
}
