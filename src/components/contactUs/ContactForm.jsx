import React, { useState } from "react";
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
    const [alert, setAlert] = useState(null); // State to manage alerts

    const validateForm = () => {
        let newErrors = {};

        if (!formData.firstName.trim()) newErrors.firstName = "First Name is required";
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
                    setFormData({ firstName: "", lastName: "", email: "", subject: "", message: "" });
                    setAlert({ message: "Your message has been sent successfully!", type: "success" });
                } else {
                    setAlert({ message: "Something went wrong. Please try again.", type: "error" });
                }
            } catch (error) {
                console.error("Error submitting form:", error);
                setAlert({ message: "There was an error submitting your form.", type: "error" });
            }
        }
    };

    return (
        <div className="px-3">
            {alert && <Alert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}

            <div className="flex flex-col md:flex-row lg:px-16 font-family-2">
                <div className="py-6 md:my-auto md:w-3/6">
                    <h1 className="font-bold">Reach Out To Us</h1>
                    <p className="md:w-4/6 lg:w-4/6 xl:w-3/6">
                        Reach out to us for any queries or support. Our team is here to help you with your shopping experience and ensure your satisfaction.
                    </p>
                    <div className="font-medium">
                        <div className="flex gap-3 items-center">
                            <img src="/call.svg" alt="call icon" />
                            <p className="my-auto">+234 789 9000</p>
                        </div>
                        <div className="flex gap-3 items-center mt-2">
                            <img src="/mail.svg" alt="mail icon" />
                            <p className="my-auto ml-1">Domain@company.com</p>
                        </div>
                    </div>
                </div>

                <div className="md:w-3/6 py-4">
                    <form onSubmit={handleSubmit} className="p-3 border-[1px] border-[#888888] rounded-lg bg-[#EFF6FE] flex flex-col gap-3">
                        <div className="flex gap-3">
                            <div className="w-3/6 flex flex-col">
                                <input 
                                    type="text" 
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    placeholder="First Name" 
                                    className="w-full bg-[#EFF6FE] text-[12px] md:text-[16px] h-full px-2 py-2 outline-none border-[1px] border-[#888888] rounded-md"
                                />
                                {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName}</p>}
                            </div>
                            <div className="w-3/6 flex flex-col">
                                <input 
                                    type="text" 
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    placeholder="Last Name" 
                                    className="w-full bg-[#EFF6FE] text-[12px] md:text-[16px] h-full px-2 py-2 outline-none border-[1px] border-[#888888] rounded-md"
                                />
                                {errors.lastName && <p className="text-red-500 text-xs">{errors.lastName}</p>}
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <input 
                                type="email" 
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email Address" 
                                className="w-full bg-[#EFF6FE] text-[12px] md:text-[16px] h-full px-2 py-2 outline-none border-[1px] border-[#888888] rounded-md"
                            />
                            {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
                        </div>

                        <div className="flex flex-col">
                            <input 
                                type="text" 
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                placeholder="Subject" 
                                className="w-full bg-[#EFF6FE] text-[12px] md:text-[16px] h-full px-2 py-2 outline-none border-[1px] border-[#888888] rounded-md"
                            />
                            {errors.subject && <p className="text-red-500 text-xs">{errors.subject}</p>}
                        </div>

                        <div className="flex flex-col">
                            <textarea 
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Enter message here" 
                                className="w-full h-[100px] bg-[#EFF6FE] text-[12px] md:text-[16px] px-2 py-2 outline-none border-[1px] border-[#888888] rounded-md"
                            />
                            {errors.message && <p className="text-red-500 text-xs">{errors.message}</p>}
                        </div>

                        <div>
                            <button 
                                type="submit" 
                                className="w-full bg-[#01497C] text-[#FFFFFF] rounded-md py-2 text-[12px] md:text-[14px] 
                                transition-all duration-300 ease-in-out transform hover:bg-[#013366] hover:scale-105"
                            >
                                Send Message
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactForm;
