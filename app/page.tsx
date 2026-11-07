import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import Programs from "./sections/Programs";
import LabBooking from "./sections/LabBooking";
import Gallery from "./sections/Gallery";
import Ecosystem from "./sections/Ecosystem";
import About from "./sections/About";
import People from "./sections/People";
import Footer from "./sections/Footer";
import ScrollAnimator from "./components/ScrollAnimator";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <People />
        <Programs />
        <LabBooking />
        <Gallery />
        <Ecosystem />
      </main>
      <Footer />
      <ScrollAnimator />
    </>
  );
}
