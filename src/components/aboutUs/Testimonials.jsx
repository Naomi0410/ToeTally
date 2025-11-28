import { motion } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      text: "I recently purchased the Nike Air Max 270 from ToeTally, and I couldn't be happier! The shoes arrived promptly, and the quality is top-notch. The website's customer service team was also super responsive and helpful. 10/10 would recommend.",
      name: "Nike wunds",
      image: "/testy1.svg",
      rating: 5,
    },
    {
      id: 2,
      text: "I've been searching for the perfect pair of Adidas Yeezy Boost 350 V2, and ToeTally had them in stock! The ordering process was seamless, and the shoes arrived in pristine condition. The website's authenticity guarantee gave me peace of mind.",
      name: "Chuks Nnamdi",
      image: "/testy2.svg",
      rating: 5,
    },
    {
      id: 3,
      text: "As a busy professional, ToeTally's selection of Clarks shoes is impressive, and I found the perfect pair to match my work attire. The website's filtering options made it easy to find what I was looking for. Thank you for fast delivery too.",
      name: "Victoria Tolulope",
      image: "/testy3.svg",
      rating: 5,
    },
    {
      id: 4,
      text: "I recently purchased the Nike Air Max 270 from ToeTally, and I couldn't be happier! The shoes arrived promptly, and the quality is top-notch. The website's customer service team was also super responsive and helpful. 10/10 would recommend.",
      name: "Miraj Toye",
      image: "/testy4.svg",
      rating: 5,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="md:pb-6 px-3 lg:px-12">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8 md:mb-12 lg:mb-16"
      >
        <h1 className="font-family-3 text-2xl md:text-3xl lg:text-4xl xl:text-5xl mb-2">
          Testimonials
        </h1>
        <p className="font-family-2 text-sm md:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto">
          Don't just take our word for it - hear from our satisfied customers
        </p>
      </motion.div>

      {/* Desktop Grid - 2 columns */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        className="hidden md:grid md:grid-cols-2 lg:gap-8 md:gap-6 max-w-4xl lg:max-w-4xl xl:max-w-6xl mx-auto"
      >
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.id}
            variants={cardVariants}
            whileHover={{
              y: -8,
              transition: { duration: 0.3 },
            }}
            className={`bg-white rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-100 relative overflow-hidden ${
              index === 0 ? "md:col-span-1 lg:col-span-1" : ""
            }`}
          >
            {/* Quote Icon */}
            <div className="absolute top-4 right-4 opacity-10">
              <FaQuoteLeft className="text-6xl text-blue-600" />
            </div>

            {/* Stars Rating */}
            <div className="flex gap-1 mb-4">
              {[...Array(testimonial.rating)].map((_, i) => (
                <svg
                  key={i}
                  className="w-5 h-5 text-yellow-400 fill-current"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              ))}
            </div>

            {/* Testimonial Text */}
            <p className="font-family-2 text-gray-700 text-sm lg:text-base leading-relaxed mb-6 relative z-10">
              "{testimonial.text}"
            </p>

            {/* Customer Info */}
            <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-12 h-12 lg:w-14 lg:h-14 rounded-full object-cover border-2 border-blue-100"
              />
              <div>
                <p className="font-family-2 font-bold text-gray-900 text-base lg:text-lg">
                  {testimonial.name}
                </p>
                <p className="font-family-2 text-sm text-gray-500">
                  Verified Buyer
                </p>
              </div>
            </div>

            {/* Accent Line */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
          </motion.div>
        ))}
      </motion.div>

      {/* Mobile Horizontal Scroll */}
      <div className="md:hidden">
        <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory">
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex-shrink-0 w-[85vw] bg-white rounded-2xl p-6 shadow-lg border border-gray-100 relative overflow-hidden snap-center"
            >
              {/* Quote Icon */}
              <div className="absolute top-4 right-4 opacity-10">
                <FaQuoteLeft className="text-5xl text-blue-600" />
              </div>

              {/* Stars Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-4 h-4 text-yellow-400 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="font-family-2 text-gray-700 text-sm leading-relaxed mb-6 relative z-10">
                "{testimonial.text}"
              </p>

              {/* Customer Info */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-blue-100"
                />
                <div>
                  <p className="font-family-2 font-bold text-gray-900 text-base">
                    {testimonial.name}
                  </p>
                  <p className="font-family-2 text-xs text-gray-500">
                    Verified Buyer
                  </p>
                </div>
              </div>

              {/* Accent Line */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
            </motion.div>
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, index) => (
            <div
              key={index}
              className="w-2 h-2 rounded-full bg-gray-300"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;