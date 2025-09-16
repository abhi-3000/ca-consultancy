import AboutSection from "./AboutSection";
import ContactSection from "./ContactSection";
import CTASection from "./CTASection";
import HeroSection from "./HeroSection";
import ServicesSection from "./ServicesSection";
import TestimonialCarousel from "./TestimonialCarousel";
import WhoWeServe from "./WhoWeServe";

const LandingPage = () => {
  return (
    <div className="bg-dark-primary">
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <WhoWeServe />
      <TestimonialCarousel />
      <ContactSection />
      <CTASection />
    </div>
  );
};

export default LandingPage;
