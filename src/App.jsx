import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import Services from './components/Services'
import MarqueeSection from './components/MarqueeSection'
import Stats from './components/Stats'
import Testimonials from './components/Testimonials'
import WhyUs from './components/WhyUs'
import BookingForm from './components/BookingForm'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="relative min-h-screen bg-noir-950">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Services />
        <MarqueeSection />
        <Stats />
        <Testimonials />
        <WhyUs />
        <BookingForm />
      </main>
      <Footer />
    </div>
  )
}
