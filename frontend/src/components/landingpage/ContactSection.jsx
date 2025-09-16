import { motion } from "framer-motion";
// CORRECTED: Using the specific import path for Font Awesome 6 icons
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const ContactSection = () => {
  // Animation for elements to slide and fade in
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

  return (
    <section className="py-20 md:py-28 bg-gradient-to-t from-dark-secondary to-dark-primary">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-poppins text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-light-primary to-light-secondary">
            Let's Get Started
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-light-secondary font-inter">
            Have a question or need assistance with your financial services?
            Reach out, and I’ll respond promptly.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column: Contact Details */}
          <motion.div
            className="flex flex-col justify-center space-y-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={itemVariants}
          >
            <div className="flex items-start gap-5">
              <div className="mt-1 flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-dark-secondary border border-white/10">
                <FaPhoneAlt className="h-5 w-5 text-accent-blue" />
              </div>
              <div>
                <h3 className="font-poppins text-lg font-semibold text-light-primary">
                  Phone
                </h3>
                <p className="text-light-secondary font-inter mt-1">
                  Direct and professional assistance for your urgent queries.
                </p>
                <a
                  href="tel:+911234567890"
                  className="mt-2 inline-block text-accent-blue font-medium text-xl hover:text-light-primary transition-colors"
                >
                  +91 9470195174
                </a>
              </div>
            </div>
            <div className="flex items-start gap-5">
              <div className="mt-1 flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-dark-secondary border border-white/10">
                <FaEnvelope className="h-5 w-5 text-accent-blue" />
              </div>
              <div>
                <h3 className="font-poppins text-lg font-semibold text-light-primary">
                  Email
                </h3>
                <p className="text-light-secondary font-inter mt-1">
                  For detailed inquiries and document submissions.
                </p>
                <a
                  href="mailto:contact@cacounsultancy.com"
                  className="mt-2 inline-block text-accent-blue font-medium text-xl hover:text-light-primary transition-colors"
                >
                  nirmal.fcma@gmail.com
                </a>
              </div>
            </div>
            <div className="flex items-start gap-5">
              <div className="mt-1 flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-dark-secondary border border-white/10">
                <FaMapMarkerAlt className="h-5 w-5 text-accent-blue" />
              </div>
              <div>
                <h3 className="font-poppins text-lg font-semibold text-light-primary">
                  Office Address
                </h3>
                <p className="text-light-secondary font-inter mt-1 text-base">
                  Maa Durga Apartment, Parsudih, Jamshedpur, Jharkhand
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            className="bg-gradient-to-br from-dark-secondary/60 to-dark-secondary/30 p-8 rounded-xl border border-white/10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={itemVariants}
          >
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="sr-only">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Your Name"
                  className="w-full bg-dark-primary border border-white/10 rounded-md px-4 py-3 text-light-primary placeholder-light-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent-blue transition-all"
                />
              </div>
              <div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Your Email"
                  className="w-full bg-dark-primary border border-white/10 rounded-md px-4 py-3 text-light-primary placeholder-light-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent-blue transition-all"
                />
              </div>
              <div>
                <label htmlFor="message" className="sr-only">
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows="5"
                  placeholder="Your Message"
                  className="w-full bg-dark-primary border border-white/10 rounded-md px-4 py-3 text-light-primary placeholder-light-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent-blue transition-all"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full font-poppins font-semibold text-dark-primary bg-light-primary hover:bg-light-secondary transition-colors duration-300 py-3 px-8 rounded-md shadow-lg"
              >
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
