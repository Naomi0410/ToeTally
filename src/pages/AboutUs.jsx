import { Subscribe } from "../components";
import Hero from "../components/aboutUs/Hero";
import Mission from "../components/aboutUs/Mission";
import Testimonials from "../components/aboutUs/Testimonials";

export default function AboutUs() {
  return (
    <>
      <div>
        <Hero />
        <Mission />
        <Testimonials />
        <Subscribe/>
      </div>
    </>
  );
}
