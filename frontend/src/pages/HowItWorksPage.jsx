import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
// CORRECTED: Using the specific import path for Font Awesome 6 icons which is more stable
import {
  FaMousePointer,
  FaFileUpload,
  FaFileInvoiceDollar,
  FaCreditCard,
  FaSyncAlt,
  FaFileDownload,
  FaPlus,
  FaMinus,
} from "react-icons/fa";

// --- Data for the step-by-step process ---
const processSteps = [
  {
    icon: <FaMousePointer className="h-6 w-6 text-accent-blue" />,
    title: "1. Select Your Service",
    description:
      "Browse our detailed list of services. Find the one that fits your needs and click 'Apply' to begin the process.",
  },
  {
    icon: <FaFileUpload className="h-6 w-6 text-accent-blue" />,
    title: "2. Submit Your Details",
    description:
      "After signing in, you'll be directed to a secure, dynamic form. Fill in the required details and upload your documents directly through our encrypted platform.",
  },
  {
    icon: <FaFileInvoiceDollar className="h-6 w-6 text-accent-blue" />,
    title: "3. Review & Invoice",
    description:
      "Our team reviews your submission for completeness. We then issue a secure invoice, and your request status will update to 'Payment Due' on your dashboard.",
  },
  {
    icon: <FaCreditCard className="h-6 w-6 text-accent-blue" />,
    title: "4. Make a Secure Payment",
    description:
      "Complete the payment directly on your dashboard using our secure Razorpay integration. We accept all major payment methods.",
  },
  {
    icon: <FaSyncAlt className="h-6 w-6 text-accent-blue" />,
    title: "5. We Get to Work",
    description:
      "Once your payment is confirmed, your request status automatically updates to 'In Progress', and our expert team begins working on your service immediately.",
  },
  {
    icon: <FaFileDownload className="h-6 w-6 text-accent-blue" />,
    title: "6. Download Your Documents",
    description:
      "You'll be notified upon completion. Log in to your dashboard to securely download your final documents and receipts at any time.",
  },
];

// --- Data for the FAQ Section ---
const faqData = [
  {
    question: "Is my data secure on this platform?",
    answer:
      "Absolutely. We use industry-standard encryption for all data, both in transit and at rest. Your financial documents are stored securely in the cloud, and we will never share your information.",
  },
  {
    question: "How do I track the status of my service request?",
    answer:
      "You can track the real-time status of all your requests directly from your personal dashboard after logging in. The statuses include 'Pending', 'Payment Due', 'In Progress', and 'Completed'.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major payment methods through our secure Razorpay gateway, including credit cards, debit cards, UPI, and net banking.",
  },
  {
    question: "Can I upload documents after submitting a request?",
    answer:
      "Yes. In your dashboard, you can view the details of any 'In Progress' request and upload additional documents as needed.",
  },
  {
    question: "What if I choose the wrong service?",
    answer:
      "No problem. Please contact us immediately through the contact page. We can assist you in canceling the incorrect request and creating the right one.",
  },
  {
    question: "How will I receive my final documents?",
    answer:
      "Once a service is marked as 'Completed', the final documents will be uploaded by our team directly to your service request, which you can access and download from your dashboard anytime.",
  },
  {
    question: "Is there a real person I can talk to?",
    answer:
      "Yes. While this is a digital platform, it is backed by the expertise of CA. Nirmal Kumar Mandal. You can reach out via the contact information on our contact page for any complex queries.",
  },
  {
    question:
      "What are the benefits of using this platform over traditional methods?",
    answer:
      "This platform offers the best of both worlds: the expertise and trust of a seasoned CA combined with the convenience, speed, and transparency of a modern digital interface. You get 24/7 access to your documents and status updates.",
  },
  {
    question: "What is the average turnaround time?",
    answer:
      "Turnaround times vary by service and are listed on each service's detail page. Our digital process is designed to be as efficient as possible, and we begin work as soon as your payment is confirmed.",
  },
  {
    question: "What if I need a custom service not listed?",
    answer:
      "We are happy to discuss custom requirements. Please get in touch with us via our contact page, and we will arrange a consultation to understand your needs.",
  },
];

// --- Reusable Accordion Component for the FAQ ---
const AccordionItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-white/10">
      <button
        className="w-full flex justify-between items-center text-left py-6"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-poppins font-medium text-lg text-light-primary">
          {question}
        </span>
        <motion.div animate={{ rotate: isOpen ? 45 : 0 }}>
          {isOpen ? (
            <FaMinus className="text-accent-blue" />
          ) : (
            <FaPlus className="text-light-secondary" />
          )}
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-6 font-inter text-light-secondary/80 pr-8">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Main "How It Works" Page Component ---
const HowItWorksPage = () => {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-t from-dark-primary to-dark-secondary">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header Section */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-poppins text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-light-primary to-light-secondary">
            The Future of Financial Services
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-light-secondary font-inter text-lg">
            I've combined decades of expert CA guidance with a modern, secure
            digital platform to bring you a seamless and transparent experience
            from start to finish.
          </p>
        </motion.div>

        {/* Step-by-Step Process Grid */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {processSteps.map((step, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-t from-dark-primary to-dark-secondary border border-white/10 rounded-xl p-8 text-center transition-all duration-300 hover:border-accent-blue/50 hover:-translate-y-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-dark-primary border border-white/10 mb-4">
                {step.icon}
              </div>
              <h3 className="font-poppins font-bold text-xl text-light-primary">
                {step.title}
              </h3>
              <p className="font-inter text-sm text-light-secondary/100 mt-2">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-20 md:mt-28">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-poppins text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-light-primary to-light-secondary">
              Frequently Asked Questions
            </h2>
          </motion.div>
          <div className="space-y-4">
            {faqData.map((item, index) => (
              <AccordionItem
                key={index}
                question={item.question}
                answer={item.answer}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksPage;
