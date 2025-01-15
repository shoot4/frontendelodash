import { Button } from "../ui/button"

const Hero = () => {
  return (
    <section className="relative">
      {/* Background with overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent">
        <img
          src="/hero-bg.jpg" // You'll need to add this image
          alt="Marvel Rivals Background"
          className="h-full w-full object-cover opacity-50"
        />
      </div>

      {/* Content */}
      <div className="container relative py-24 md:py-32">
        <div className="max-w-2xl">
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Level Up Your Game with Professional Boosting
          </h1>
          <p className="mb-8 text-lg text-gray-300">
            Achieve your gaming goals faster with our professional Marvel Rivals boosting services. 
            Competitive prices, fast delivery, and 24/7 support.
          </p>
          <div className="flex space-x-4">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              View Services
            </Button>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero 