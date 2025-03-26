const Testimonials = () => {
    return (
        <>
            <div className="md:px-3 lg:px-16">
                <div>
                    <h1 className="font-font-family-3 text-center">Testimonials</h1>
                </div>

                <div className="second-div flex overflow-x-auto scrollbar-hide">
                    <div className="testimonial-item relative">
                        <p className="font-font-family-2">
                            I recently purchased the Nike Air Max 270 from ToeTally, and I couldn't be happier! The shoes arrived promptly, and the quality is top-notch. The website's customer service team was also super responsive and helpful. 10/10 would recommend.
                        </p>
                        <div className="absolute bottom-6 w-full flex items-center gap-2">
                            <img src="/testy1.svg" alt="Nike wunds" />
                            <p className="font-semibold font-font-family-2 my-auto">Nike wunds</p>
                        </div>
                    </div>

                    <div className="testimonial-item relative">
                        <p className="font-font-family-2">
                            I've been searching for the perfect pair of Adidas Yeezy Boost 350 V2, and [Shoe Website Name] had them in stock! The ordering process was seamless, and the shoes arrived in pristine condition. The website's authenticity guarantee gave me peace of mind.
                        </p>
                        <div className="absolute bottom-6 w-full flex items-center gap-2">
                            <img src="/testy2.svg" alt="Nike wunds" />
                            <p className="font-semibold font-font-family-2">Chuks Nnamdi</p>
                        </div>
                    </div>

                    <div className="testimonial-item relative">
                        <p className="font-font-family-2">
                            As a busy professional, ToeTally’s selection of Clarks shoes is impressive, and I found the perfect pair to match my work attire. The website's filtering options made it easy to find what I was looking for. Thank you for fast delivery too.
                        </p>
                        <div className="absolute bottom-6 w-full flex items-center gap-2">
                            <img src="/testy3.svg" alt="Nike wunds" />
                            <p className="font-semibold font-font-family-2">Victoria Tolulope</p>
                        </div>
                    </div>

                    <div className="testimonial-item relative">
                        <p className="font-font-family-2">
                            I recently purchased the Nike Air Max 270 from ToeTally, and I couldn't be happier! The shoes arrived promptly, and the quality is top-notch. The website's customer service team was also super responsive and helpful. 10/10 would recommend.
                        </p>
                        <div className="absolute bottom-6 w-full flex items-center gap-2">
                            <img src="/testy4.svg" alt="Nike wunds" />
                            <p className="font-semibold font-font-family-2">Miraj Toye</p>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .second-div {
                    display: flex;
                    overflow-x: auto;
                    scroll-snap-type: x mandatory;
                    gap: 1rem;
                    padding: 1rem;
                }

                .testimonial-item {
                    flex: 0 0 95%; /* Default to 100% width (mobile) */
                    scroll-snap-align: center;
                    background: #f9f9f9;
                    border-radius: 8px;
                    padding: 1rem;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    height: 340px;
                }

                /* Hide scrollbar */
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }

                .scrollbar-hide {
                    -ms-overflow-style: none; /* IE and Edge */
                    scrollbar-width: none; /* Firefox */
                }

                /* Tablet: Show 2 items at a time */
                @media (min-width: 768px) {
                    .testimonial-item {
                        flex: 0 0 45%;
                        height: 310px;
                    }
                }

                /* Laptop: Show 3 items at a time */
                @media (min-width: 1024px) {
                    .testimonial-item {
                        flex: 0 0 30.33%;
                        height: 330px;
                    }
                }
            `}</style>
        </>
    );
};

export default Testimonials;
