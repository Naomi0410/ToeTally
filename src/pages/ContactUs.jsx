import ContactForm from "../components/contactUs/ContactForm";
import Hero from "../components/contactUs/Hero";
import MapComponent from "../components/map/MapComponent";
import Subscribe from "../components/Subscribe";

export default function ContactUs() {
    return (
        <>
        <div className="w-full mx-auto 2xl:container relative">
            
         
            

            <Hero />
            <ContactForm />

            <div className="mt-4">
                <MapComponent height="250px" />
            </div>


            <div className="mx-auto lg:w-11/12 lg:-mt-10">
        
      <Subscribe/>

      </div>

        </div>
        </>
    );
}

