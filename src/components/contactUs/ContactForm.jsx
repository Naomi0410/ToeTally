import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaPaperPlane,
  FaPhone,
  FaEnvelope,
  FaUser,
  FaEdit,
} from "react-icons/fa";
import Alert from "../alert/Alert";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    let newErrors = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First Name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message cannot be empty";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });

      try {
        const response = await fetch("https://formspree.io/f/mzzepprw", {
          method: "POST",
          body: formDataToSend,
          headers: { Accept: "application/json" },
        });

        if (response.ok) {
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            subject: "",
            message: "",
          });
          setAlert({
            message: "Your message has been sent successfully!",
            type: "success",
          });
        } else {
          setAlert({
            message: "Something went wrong. Please try again.",
            type: "error",
          });
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        setAlert({
          message: "There was an error submitting your form.",
          type: "error",
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="px-3 py-8 md:py-12" aria-labelledby="contact-heading">
      <div role="region" aria-live="polite" aria-atomic="true">
        {alert && (
          <Alert
            message={alert.message}
            type={alert.type}
            onClose={() => setAlert(null)}
          />
        )}
      </div>

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="flex flex-col md:flex-row gap-8 lg:gap-12 lg:px-12 font-family-2"
        >
          {/* Left Section - Info */}
          <motion.div
            variants={itemVariants}
            aria-labelledby="contact-info-heading"
            className="py-6  md:my-auto md:w-1/2 lg:w-2/5"
          >
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2
                id="contact-info-heading"
                className="font-bold text-2xl md:text-3xl lg:text-4xl xl:text-5xl bg-gradient-to-r from-[#01497C] to-[#0369a1] bg-clip-text text-transparent mb-4"
              >
                Reach Out To Us
              </h2>
              <p className="text-gray-600 md:w-5/6 lg:w-4/6 text-sm md:text-sm xl:text-base leading-relaxed mb-4">
                Reach out to us for any queries or support. Our team is here to
                help you with your shopping experience and ensure your
                satisfaction.
              </p>
            </motion.div>

            {/* Contact Info Cards */}
            <address className="space-y-4 font-medium not-italic">
              <motion.div
                whileHover={{ scale: 1.02, x: 10 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-3 bg-white p-2 w-72 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              >
                <div
                  aria-hidden="true"
                  className="bg-gradient-to-br from-[#01497C] to-[#0369a1] p-3 rounded-lg"
                >
                  <FaPhone className="text-white text-xl" />
                </div>
                <p
                  aria-label="Call us at +234 7089 9000"
                  className="text-sm lg:text-base font-semibold text-gray-800"
                >
                  +234 7089 9000
                </p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02, x: 10 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-3 bg-white p-2 w-72 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              >
                <div
                  aria-hidden="true"
                  className="bg-gradient-to-br from-[#01497C] to-[#0369a1] p-3 rounded-lg"
                >
                  <FaEnvelope className="text-white text-xl" />
                </div>

                <p
                  aria-label="Email us at Domain@company.com"
                  className="text-sm lg:text-base font-semibold text-gray-800"
                >
                  Domain@company.com
                </p>
              </motion.div>
            </address>
          </motion.div>

          {/* Right Section - Form */}
          <motion.div variants={itemVariants} className="md:w-1/2 lg:w-3/5 ">
            <form
              onSubmit={handleSubmit}
              className="relative"
              noValidate
              aria-labelledby="contact-heading"
            >
              <h2 id="contact-heading" className="visually-hidden">
                Contact Form
              </h2>
              {/* Decorative gradient background */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-br from-[#01497C]/5 to-[#0369a1]/5 rounded-2xl blur-xl"
              ></div>

              <div className="relative bg-white p-6 lg:p-8 rounded-2xl shadow-xl border border-gray-100">
                <div className="flex flex-col gap-3">
                  {/* Name Fields */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="relative">
                      <label htmlFor="firstName" className="visually-hidden">
                        First Name
                      </label>
                      <div
                        aria-hidden="true"
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      >
                        <FaUser className="text-sm" />
                      </div>
                      <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="First Name"
                        aria-required="true"
                        aria-invalid={!!errors.firstName}
                        aria-describedby={
                          errors.firstName ? "firstName-error" : undefined
                        }
                        className={`w-full bg-gray-50 text-sm md:text-base pl-10 pr-4 py-3 outline-none border-2 rounded-xl transition-all duration-300 focus:border-[#01497C] focus:bg-white focus:shadow-md ${
                          errors.firstName
                            ? "border-red-400"
                            : "border-gray-200"
                        }`}
                      />
                      {errors.firstName && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          role="alert"
                          className="text-red-500 text-xs mt-1 ml-1"
                        >
                          {errors.firstName}
                        </motion.p>
                      )}
                    </div>
                    <div className="relative">
                      <label htmlFor="lastName" className="visually-hidden">
                        Last Name
                      </label>
                      <div
                        aria-hidden="true"
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      >
                        <FaUser className="text-sm" />
                      </div>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Last Name"
                        aria-required="true"
                        aria-invalid={!!errors.lastName}
                        aria-describedby={
                          errors.lastName ? "lastName-error" : undefined
                        }
                        className={`w-full bg-gray-50 text-sm md:text-base pl-10 pr-4 py-3 outline-none border-2 rounded-xl transition-all duration-300 focus:border-[#01497C] focus:bg-white focus:shadow-md ${
                          errors.lastName ? "border-red-400" : "border-gray-200"
                        }`}
                      />
                      {errors.lastName && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          role="alert"
                          className="text-red-500 text-xs mt-1 ml-1"
                        >
                          {errors.lastName}
                        </motion.p>
                      )}
                    </div>
                  </div>

                  {/* Email */}
                  <div className="relative">
                    <label htmlFor="email" className="visually-hidden">
                      Email Address
                    </label>
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <FaEnvelope aria-hidden="true" className="text-sm" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email Address"
                      aria-required="true"
                      aria-invalid={!!errors.email}
                      aria-describedby={
                        errors.email ? "email-error" : undefined
                      }
                      className={`w-full bg-gray-50 text-sm md:text-base pl-10 pr-4 py-3 outline-none border-2 rounded-xl transition-all duration-300 focus:border-[#01497C] focus:bg-white focus:shadow-md ${
                        errors.email ? "border-red-400" : "border-gray-200"
                      }`}
                    />
                    {errors.email && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        role="alert"
                        className="text-red-500 text-xs mt-1 ml-1"
                      >
                        {errors.email}
                      </motion.p>
                    )}
                  </div>

                  {/* Subject */}
                  <div className="relative">
                    <label htmlFor="subject" className="visually-hidden">
                      Subject
                    </label>
                    <div
                      aria-hidden="true"
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    >
                      <FaEdit className="text-sm" />
                    </div>
                    <input
                      type="text"
                      name="subject"
                      id="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Subject"
                      aria-required="true"
                      aria-invalid={!!errors.subject}
                      aria-describedby={
                        errors.subject ? "subject-error" : undefined
                      }
                      className={`w-full bg-gray-50 text-sm md:text-base pl-10 pr-4 py-3 outline-none border-2 rounded-xl transition-all duration-300 focus:border-[#01497C] focus:bg-white focus:shadow-md ${
                        errors.subject ? "border-red-400" : "border-gray-200"
                      }`}
                    />
                    {errors.subject && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        role="alert"
                        className="text-red-500 text-xs mt-1 ml-1"
                      >
                        {errors.subject}
                      </motion.p>
                    )}
                  </div>

                  {/* Message */}
                  <div className="relative">
                    <label htmlFor="message" className="visually-hidden">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Enter your message here..."
                      rows="5"
                      aria-required="true"
                      aria-invalid={!!errors.message}
                      aria-describedby={
                        errors.message ? "message-error" : undefined
                      }
                      className={`w-full bg-gray-50 text-sm md:text-base px-4 py-3 outline-none border-2 rounded-xl transition-all duration-300 focus:border-[#01497C] focus:bg-white focus:shadow-md resize-none ${
                        errors.message ? "border-red-400" : "border-gray-200"
                      }`}
                    />
                    {errors.message && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        role="alert"
                        className="text-red-500 text-xs mt-1 ml-1"
                      >
                        {errors.message}
                      </motion.p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    aria-busy={isSubmitting}
                    className="w-full bg-[#01497C]  text-white rounded-xl py-4 text-sm md:text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div
                          role="status"
                          aria-label="Sending message"
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"
                        ></div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <FaPaperPlane className="text-sm" aria-hidden="true" />
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactForm;
