import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import TryIt from "@/components/TryIt";
import HowItWorks from "@/components/HowItWorks";
import Benchmarks from "@/components/Benchmarks";
import CodeSnippets from "@/components/CodeSnippets";
import SelfHost from "@/components/SelfHost";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <div className="h-16 sm:h-24" />
        <TryIt />
        <div className="h-16 sm:h-24" />
        <HowItWorks />
        <div className="h-16 sm:h-24" />
        <Benchmarks />
        <div className="h-16 sm:h-24" />
        <CodeSnippets />
        <div className="h-16 sm:h-24" />
        <SelfHost />
        <div className="h-16 sm:h-24" />
      </main>
      <Footer />
    </>
  );
}
