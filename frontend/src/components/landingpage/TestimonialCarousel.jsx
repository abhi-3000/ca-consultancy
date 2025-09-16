import { motion } from "framer-motion";

// --- DUMMY DATA: You can easily replace this with your actual testimonials ---
const testimonials = [
  {
    photo: "https://placehold.co/100x100/2c5364/ffffff?text=RS",
    name: "Rohan Sharma",
    role: "Director, Tech Solutions Pvt. Ltd.",
    review:
      "The professionalism and efficiency are unmatched. They simplified our entire GST filing process, saving us countless hours.",
  },
  {
    photo: "https://placehold.co/100x100/2c5364/ffffff?text=PS",
    name: "Priya Singh",
    role: "Independent Consultant",
    review:
      "As a freelancer, I was always worried about ITR filing. Their team made it incredibly easy and stress-free. A truly five-star service.",
  },
  {
    photo: "https://placehold.co/100x100/2c5364/ffffff?text=AV",
    name: "Amit Verma",
    role: "Startup Founder",
    review:
      "From company formation to compliance, their guidance has been invaluable. An essential partner for any new business.",
  },
  {
    photo: "https://placehold.co/100x100/2c5364/ffffff?text=SM",
    name: "Sunita Mehta",
    role: "Small Business Owner",
    review:
      "Their transparent process and secure platform gave me complete peace of mind. I can finally focus on my business.",
  },
  {
    photo: "https://placehold.co/100x100/2c5364/ffffff?text=VK",
    name: "Vikram Kumar",
    role: "Salaried Professional",
    review:
      "They helped me maximize my tax savings through smart planning and meticulous filing. Highly recommended for professionals.",
  },
  {
    photo: "https://placehold.co/100x100/2c5364/ffffff?text=AC",
    name: "Arjun Chatterjee",
    role: "Software Engineer, TCS",
    review:
      "Finally, a service that understands the needs of a salaried professional. My ITR filing was handled with incredible efficiency and expertise. The platform is so easy to use.",
  },
  {
    photo: "https://placehold.co/100x100/2c5364/ffffff?text=PR",
    name: "Priya Roy",
    role: "Marketing Manager, Wipro",
    review:
      "Their tax savings advisory is top-notch. The team is professional, and the digital process is seamless. I've saved more this year than ever before. Highly recommended!",
  },
  {
    photo: "https://placehold.co/100x100/2c5364/ffffff?text=RB",
    name: "Rohan Banerjee",
    role: "Project Lead, Infosys",
    review:
      "The entire process was completely hassle-free. I just uploaded my Form-16, and everything was taken care of. The peace of mind is invaluable. Excellent service.",
  },
  {
    photo: "https://placehold.co/100x100/2c5364/ffffff?text=AD",
    name: "Ananya Dasgupta",
    role: "HR Executive, Cognizant",
    review:
      "As a first-time filer, I was very nervous. NK's platform made it so simple to understand, and their support was fantastic. I couldn't have done it without them.",
  },
  {
    photo: "https://placehold.co/100x100/2c5364/ffffff?text=SM",
    name: "Sayan Mukherjee",
    role: "Data Analyst, Capgemini",
    review:
      "The convenience of having a dedicated CA manage my filings through a modern dashboard is a game-changer. Professional, fast, and completely trustworthy.",
  },

  // --- Other Professionals ---
  {
    photo: "https://placehold.co/100x100/2c5364/ffffff?text=BS",
    name: "Bipasha Sen",
    role: "Startup Founder",
    review:
      "From company formation to our initial GST registration, NK has been an essential partner. Their guidance is clear, and the platform keeps everything organized.",
  },
  {
    photo: "https://placehold.co/100x100/2c5364/ffffff?text=IG",
    name: "Indranil Ghosh",
    role: "Small Business Owner",
    review:
      "Managing GST returns used to be a monthly headache. With NK, it's a smooth, automated process. Their expertise is evident in every interaction.",
  },
  {
    photo: "https://placehold.co/100x100/2c5364/ffffff?text=MB",
    name: "Malaika Basu",
    role: "Freelance Graphic Designer",
    review:
      "Filing ITR as a freelancer with multiple clients was always confusing. This platform simplified everything. The document checklist was a lifesaver!",
  },
  {
    photo: "https://placehold.co/100x100/2c5364/ffffff?text=AS",
    name: "Dr. Arijit Saha",
    role: "Medical Practitioner",
    review:
      "Their team handles my professional income tax returns with precision and care, allowing me to focus on my practice. A truly reliable and professional service.",
  },
  {
    photo: "https://placehold.co/100x100/2c5364/ffffff?text=DM",
    name: "Debjani Majumdar",
    role: "Restaurant Owner",
    review:
      "Getting our FSSAI and Trade Licenses was a breeze with their help. They navigated all the complexities for us. We were operational in record time!",
  },
];

// --- MAIN COMPONENT ---
const TestimonialCarousel = () => {
  // We duplicate the testimonials to create a seamless loop
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 12 },
    },
  };

  return (
    <section className="py-20 md:py-28 bg-gradient-to-t from-dark-primary to-dark-secondary overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-poppins text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-light-primary to-light-secondary">
            Trusted by Businesses & Individuals
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-light-secondary font-inter">
            Hear what our clients have to say about our services.
          </p>
        </motion.div>

        <div
          className="relative w-full max-w-full mx-auto"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          }}
        >
          <div className="group flex flex-col gap-8">
            {/* --- First Row (Right to Left) --- */}
            <div className="flex justify-center items-stretch animate-infinite-scroll group-hover:[animation-play-state:paused]">
              {duplicatedTestimonials.map((testimonial, index) => (
                <motion.div
                  key={`r1-${index}`}
                  className="relative w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 flex-shrink-0 px-4"
                  variants={cardVariants}
                >
                  <div className="h-full bg-dark-secondary border border-white/10 rounded-xl p-6 transition-all duration-300 hover:!scale-105 hover:shadow-xl hover:shadow-accent-blue/10">
                    <div className="flex items-center gap-4">
                      <img
                        src={testimonial.photo}
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full border-2 border-accent-blue/50"
                      />
                      <div>
                        <h3 className="font-poppins font-semibold text-light-primary">
                          {testimonial.name}
                        </h3>
                        <p className="font-inter text-sm text-light-secondary/70">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                    <p className="font-inter text-sm text-light-secondary mt-4 italic">
                      "{testimonial.review}"
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* --- Second Row (Left to Right) --- */}
            <div className="flex justify-center items-stretch animate-infinite-scroll-reverse group-hover:[animation-play-state:paused]">
              {duplicatedTestimonials.map((testimonial, index) => (
                <motion.div
                  key={`r2-${index}`}
                  className="relative w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 flex-shrink-0 px-4"
                  variants={cardVariants}
                >
                  <div className="h-full bg-dark-secondary border border-white/10 rounded-xl p-6 transition-all duration-300 hover:!scale-105 hover:shadow-xl hover:shadow-accent-blue/10">
                    <div className="flex items-center gap-4">
                      <img
                        src={testimonial.photo}
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full border-2 border-accent-blue/50"
                      />
                      <div>
                        <h3 className="font-poppins font-semibold text-light-primary">
                          {testimonial.name}
                        </h3>
                        <p className="font-inter text-sm text-light-secondary/70">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                    <p className="font-inter text-sm text-light-secondary mt-4 italic">
                      "{testimonial.review}"
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
