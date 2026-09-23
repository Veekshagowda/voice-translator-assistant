import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/hero/hero";
import Stats from "../../components/Stats/Stats";
import Features from "../../components/Features/Features";
import About from "../../components/About/About";
import Footer from "../../components/footer/footer";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Stats />
      <Features />
      <About />
      <Footer />
    </>
  );
}

export default Home;