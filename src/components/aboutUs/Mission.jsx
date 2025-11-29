import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";

// Custom Hook for Auto-Scrolling Carousel
const useAutoScroll = (intervalTime = 3000) => {
  const carouselRef = useRef(null);
  const currentIndexRef = useRef(0);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const items = Array.from(carousel.children);
    if (items.length === 0) return;

    const scrollToItem = (index) => {
      const item = items[index];
      if (!item) return;

      const itemCenter = item.offsetLeft + item.offsetWidth / 2;
      const carouselCenter = carousel.offsetWidth / 2;

      carousel.scrollTo({
        left: itemCenter - carouselCenter,
        behavior: "smooth",
      });
    };

    const interval = setInterval(() => {
      currentIndexRef.current = (currentIndexRef.current + 1) % items.length;
      scrollToItem(currentIndexRef.current);
    }, intervalTime);

    return () => clearInterval(interval);
  }, [intervalTime]);

  return carouselRef;
};

// Stats Component
const Mission = () => {
  const missionCarouselRef = useAutoScroll(3500);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { value: "6", label: "Years Active", suffix: "" },
    { value: "10,000", label: "Orders", suffix: "+" },
    { value: "8", label: "Stores", suffix: "" },
    { value: "20,000", label: "Satisfied Customers", suffix: "+" },
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

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const countUpVariants = {
    hidden: { scale: 0.5, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.34, 1.56, 0.64, 1],
      },
    },
  };

  return (
    <div className="py-2 font-family-2">
      <div className="py-8 md:py-12 font-family-2" ref={ref}>
        {/* Stats Section */}
        <section
          className="bg-gradient-to-r from-[#01497C] to-[#0369a1] text-white relative overflow-hidden"
          aria-labelledby="stats-heading"
        >
          {/* Decorative Background Elements */}
          <div className="absolute inset-0 opacity-10" aria-hidden="true">
            <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
          </div>

          {/* Mobile Carousel */}
          <div
            ref={missionCarouselRef}
            className="lg:hidden flex overflow-x-auto snap-x snap-mandatory scrollbar-hide relative z-10 py-6"
            role="region"
            aria-label="Company statistics carousel"
            aria-live="polite"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="min-w-full flex-shrink-0 snap-center flex flex-col items-center justify-center px-6"
                role="group"
                aria-label={`${stat.value}${stat.suffix} ${stat.label}`}
              >
                <motion.div
                  whileInView={{ scale: [1, 1.2, 1] }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-4xl md:text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100"
                  aria-hidden="true"
                >
                  {stat.value}
                  {stat.suffix}
                </motion.div>
                <p className="text-lg md:text-xl text-blue-100">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Scroll Indicators for Mobile */}
          <div
            className="lg:hidden flex justify-center gap-2 pb-6 relative z-10"
            role="tablist"
            aria-label="Statistics carousel navigation"
          >
            {stats.map((_, index) => (
              <div
                key={index}
                role="tab"
                aria-label={`View ${stats.label}`}
                className="w-2 h-2 rounded-full bg-white/40 transition-all duration-300"
              ></div>
            ))}
          </div>

          {/* Desktop Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="hidden lg:grid lg:grid-cols-4 py-12 relative z-10"
            role="list"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.3 },
                }}
                className={`flex flex-col items-center justify-center px-8 ${
                  index !== stats.length - 1 ? "border-r border-white/20" : ""
                }`}
                role="listitem"
                aria-label={`${stat.value}${stat.suffix} ${stat.label}`}
              >
                <motion.div
                  variants={countUpVariants}
                  className="text-4xl xl:text-5xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-br from-white via-blue-50 to-blue-100"
                  aria-hidden="true"
                >
                  {stat.value}
                  {stat.suffix}
                </motion.div>
                <p className="text-base xl:text-lg text-blue-100 font-medium">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </div>

      <section className="grid md:grid-cols-2 items-center md:pt-8 md:px-6 lg:px-12 mx-auto">
        <div className="md:py-2 lg:py-12 p-3 lg:w-11/12 mx-auto">
          <img
            src="/mission.svg"
            className="rounded-lg w-full"
            alt="mission img"
          />
        </div>
        <div className="hidden md:block lg:w-5/6 lg:mx-auto">
          <h1 className="font-family-3 mt-4 md:mt-0 md:text-3xl lg:text-4xl xl:text-5xl">
            Mission
          </h1>
          <p className="font-family-2 mt-3 md:text-sm lg:text-sm xl:text-base">
            At Toetally, our mission is to provide an unparalleled online
            shopping experience, offering a vast selection of high-quality,
            authentic branded shoes. We strive to deliver exceptional customer
            service, ensuring timely and efficient order fulfillment, while
            fostering a culture of trust, reliability, and style.
          </p>
        </div>
        {/* for small screens */}
        <div className="md:hidden px-3 md:px-0 lg:w-5/6 text-center lg:mx-auto">
          <h1 className="font-family-3 mt-2 text-2xl">Mission</h1>
          <p className="font-family-2 mt-2 text-sm">
            At Toetally, our mission is to provide an unparalleled online
            shopping experience, offering a vast selection of high-quality,
            authentic branded shoes. We strive to deliver exceptional customer
            service, ensuring timely and efficient order fulfillment, while
            fostering a culture of trust, reliability, and style.
          </p>
        </div>
      </section>

      {/* Meet the Team Section */}
      <section
        aria-labelledby="team-heading"
        className="flex flex-col justify-center items-center px-3 lg:w-11/12 mx-auto py-10 md:py-12"
      >
        <h1
          id="team-heading"
          className="font-family-3 mx-auto mb-4 text-2xl md:text-3xl lg:text-4xl xl:text-5xl"
        >
          Meet The Team
        </h1>

        {/* Static Grid Layout */}
        <div
          role="list"
          className="grid md:flex md:flex-grow lg:grid lg:grid-cols-3 justify-center items-center gap-4"
        >
          {[
            { name: "Ademola Spellz", role: "Founder", img: "/Frame1.svg" },
            { name: "Temitope Abiola", role: "Founder", img: "/Frame2.svg" },
            { name: "Uchenna Daniels", role: "Founder", img: "/Frame3.svg" },
          ].map((member, index) => (
            <article
              key={index}
              role="listitem"
              className="w-full md:w-auto text-center"
            >
              <img src={member.img} alt={member.name} className="w-full" />
              <p className="text-center mt-2">{member.name}</p>
              <p className="font-semibold text-center -mt-4">{member.role}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Mission;
