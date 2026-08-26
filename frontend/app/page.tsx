import Hero from "./components/Hero";
import AboutUs from "./components/AboutUs";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import Stats from "./components/Stats";
import Catalog from "./components/Catalog";
import CTA from "./components/CTA";

export default function Home() {
  return (
    <main>
      <Hero />
      <AboutUs />
      <Features />
      <HowItWorks />
      <Stats />
      <Catalog />
      <CTA />
    </main>
  );
}
