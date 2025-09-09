import Link from 'next/link';
import { ArrowRight, CheckCircle, Users, Award, BookOpen, TrendingUp, Star } from 'lucide-react';

export default function Home() {
  const features = [
    {
      icon: BookOpen,
      title: "Expert-Led Courses",
      description: "Learn from industry professionals with years of blockchain experience"
    },
    {
      icon: Award,
      title: "Industry Certifications",
      description: "Earn globally recognized certifications that boost your career"
    },
    {
      icon: Users,
      title: "Hands-on Projects",
      description: "Build real-world blockchain applications and smart contracts"
    },
    {
      icon: TrendingUp,
      title: "Career Support",
      description: "Get job placement assistance and career guidance"
    }
  ];

  const stats = [
    { number: "10,000+", label: "Students Trained" },
    { number: "50+", label: "Expert Instructors" },
    { number: "95%", label: "Job Placement Rate" },
    { number: "100+", label: "Partner Companies" }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Blockchain Developer at CryptoTech",
      content: "The comprehensive curriculum and hands-on approach helped me transition into blockchain development. Highly recommended!",
      rating: 5
    },
    {
      name: "Mike Chen",
      role: "Smart Contract Engineer",
      content: "Excellent instructors and real-world projects. The certification opened doors to amazing opportunities.",
      rating: 5
    },
    {
      name: "Emma Wilson",
      role: "DeFi Product Manager",
      content: "The course content is up-to-date with industry trends. Perfect for both beginners and experienced professionals.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Master the Future of 
                <span className="text-yellow-400"> Blockchain Technology</span>
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Join thousands of students who have transformed their careers with our comprehensive 
                blockchain education programs. From fundamentals to advanced development.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/enrollment"
                  className="bg-yellow-400 text-black px-8 py-4 rounded-lg font-semibold hover:bg-yellow-300 transition-colors duration-200 text-center"
                >
                  Enroll Now
                </Link>
                <Link
                  href="/courses"
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-200 text-center"
                >
                  Explore Courses
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-4">Why Choose Us?</h3>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-400" />
                    <span>Industry-recognized certifications</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-400" />
                    <span>100% hands-on learning approach</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-400" />
                    <span>Expert mentorship & support</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-400" />
                    <span>Lifetime access to course materials</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Students Choose Our Platform
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide comprehensive blockchain education with practical experience, 
              expert guidance, and industry connections to accelerate your career.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow duration-200">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Our Students Say
            </h2>
            <p className="text-xl text-gray-600">
              Hear from professionals who transformed their careers with our programs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-md">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6">&ldquo;{testimonial.content}&rdquo;</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Start Your Blockchain Journey?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of students who are already building the future with blockchain technology
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/enrollment"
              className="bg-yellow-400 text-black px-8 py-4 rounded-lg font-semibold hover:bg-yellow-300 transition-colors duration-200 inline-flex items-center justify-center"
            >
              Enroll Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              href="/courses"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-200"
            >
              View All Courses
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
