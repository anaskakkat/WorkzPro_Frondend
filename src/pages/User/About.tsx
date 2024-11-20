
    import { Wrench, Clock, Calendar, MapPin, Phone, Mail } from 'lucide-react';
    import { Card, CardContent } from '@/components/ui/card';
    import { motion } from 'framer-motion';
    
    const fadeInUp = {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
    };
    
    const staggerContainer = {
      animate: {
        transition: {
          staggerChildren: 0.2
        }
      }
    };
    
    const About = () => {
      const services = [
        {
          icon: <Wrench className="w-6 h-6 text-blue-600" />,
          title: "Professional Maintenance",
          description: "Expert maintenance services for your home and business needs"
        },
        {
          icon: <Clock className="w-6 h-6 text-blue-600" />,
          title: "24/7 Service",
          description: "Round-the-clock availability for emergency maintenance"
        },
        {
          icon: <Calendar className="w-6 h-6 text-blue-600" />,
          title: "Easy Booking",
          description: "Simple online booking system for your convenience"
        }
      ];
    
      return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-16 px-4">
          {/* Hero Section */}
          <motion.div 
            className="max-w-6xl mx-auto mb-20 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text">
              About Our Service
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Your trusted partner for professional maintenance services. We provide expert solutions
              for all your maintenance needs with reliability and excellence.
            </p>
          </motion.div>
    
          {/* Services Grid */}
          <motion.div 
            className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                transition={{ duration: 0.5 }}
              >
                <Card className="hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-8 text-center">
                    <div className="mb-6 flex justify-center">
                      <div className="p-4 bg-blue-50 rounded-full">
                        {service.icon}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-800">{service.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{service.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
    
          {/* Company Info */}
          <motion.div 
            className="max-w-6xl mx-auto bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-12 mb-20"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-gray-800">Our Story</h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  With over a decade of experience in maintenance services, we've built our reputation
                  on trust, quality, and customer satisfaction. Our team of certified professionals
                  is dedicated to providing top-notch maintenance solutions.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  We understand that maintenance issues can be stressful, which is why we focus on
                  delivering prompt, reliable, and efficient services to all our clients.
                </p>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-blue-50 rounded-2xl -rotate-3 transform"></div>
                <div className="relative bg-white rounded-2xl p-8 shadow-md">
                  <h2 className="text-3xl font-bold mb-6 text-gray-800">Contact Information</h2>
                  <div className="space-y-6">
                    <div className="flex items-center group">
                      <div className="p-3 bg-blue-50 rounded-full mr-4 group-hover:bg-blue-100 transition-colors">
                        <MapPin className="w-6 h-6 text-blue-600" />
                      </div>
                      <span className="text-gray-600">123  Street, Calicut, Kerala</span>
                    </div>
                    <div className="flex items-center group">
                      <div className="p-3 bg-blue-50 rounded-full mr-4 group-hover:bg-blue-100 transition-colors">
                        <Phone className="w-6 h-6 text-blue-600" />
                      </div>
                      <span className="text-gray-600">+1 (555) 123-4567</span>
                    </div>
                    <div className="flex items-center group">
                      <div className="p-3 bg-blue-50 rounded-full mr-4 group-hover:bg-blue-100 transition-colors">
                        <Mail className="w-6 h-6 text-blue-600" />
                      </div>
                      <span className="text-gray-600">contact@workzpro.com</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
    
          {/* Call to Action */}
          <motion.div 
            className="max-w-6xl mx-auto text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Ready to Book a Service?</h2>
            <button className="bg-blue-600 text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200">
              Book Now
            </button>
          </motion.div>
        </div>
      );
    };
    
    export default About;