import Navbar from "../../components/navbar/navbar";
import Hero from "../../components/hero/hero";
import Stats from "../../components/stats/stats";
import Features from "../../components/features/features";
import About from "../../components/about/about";
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