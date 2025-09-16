import { motion } from "framer-motion";

const CTASection = () => {
  return (
    <section className="bg-gradient-to-b from-dark-secondary to-dark-primary">
      <div className="max-w-4xl mx-auto px-4 py-20 md:py-28 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h2 className="font-poppins text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-light-primary to-light-secondary">
            Trusted by Professionals & Businesses for 15+ Years.
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-light-secondary font-inter">
            Join hundreds of satisfied clients who rely on our expertise for
            seamless financial compliance. Let's handle the complexity, so you
            can focus on your growth.
          </p>
          <div className="mt-10">
            <a
              href="/services"
              className="inline-block font-poppins font-semibold text-dark-primary bg-light-primary hover:bg-light-secondary transition-colors duration-300 py-4 px-10 rounded-full shadow-lg shadow-light-primary/10"
            >
              Start Your Filing Today
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
