import ContactForm from "../components/contactUs/ContactForm";
import Hero from "../components/contactUs/Hero";
import MapComponent from "../components/map/MapComponent";
import Subscribe from "../components/Subscribe";

export default function ContactUs() {
  return (
    <>
      <div>
        <Hero />
        <ContactForm />
        <div className="mt-4">
          <MapComponent height="250px" />
        </div>
        <Subscribe />
      </div>
    </>
  );
}
