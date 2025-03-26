import FindUs from "../components/aboutUs/FindUs";
import Hero from "../components/aboutUs/Hero";
import Mission from "../components/aboutUs/Mission";
import Testimonials from "../components/aboutUs/Testimonials";

export default function AboutUs() {
    return (
        <>
        <div className="w-full mx-auto  2xl:container">
            <Hero/>
            <Mission/>
            <Testimonials/>
            <FindUs/>
            
        </div>

            
        </>
    );
}
