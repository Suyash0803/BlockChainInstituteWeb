'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Award, Clock, Users, CheckCircle, BookOpen, Target, Send } from 'lucide-react';

interface Certification {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: string;
  price: number;
  creditsRequired: number;
  examDuration: string;
  passingScore: number;
  validityPeriod: string;
  prerequisites: string[];
  benefits: string[];
  curriculum: string[];
  examTopics: string[];
}

const CertificationPage = () => {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCert, setSelectedCert] = useState<string>('');
  const [showApplication, setShowApplication] = useState(false);
  const [applicationData, setApplicationData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    certificationId: '',
    experience: '',
    motivation: '',
    studyPlan: '',
    examDate: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCertifications();
  }, []);

  const fetchCertifications = async () => {
    try {
      const response = await fetch('/api/certifications');
      const data = await response.json();
      setCertifications(data.certifications);
    } catch (error) {
      console.error('Failed to fetch certifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setApplicationData(prev => ({ ...prev, [name]: value }));
  };

  const handleApply = (certId: string) => {
    setSelectedCert(certId);
    setApplicationData(prev => ({ ...prev, certificationId: certId }));
    setShowApplication(true);
  };

  const handleSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/certifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(applicationData),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSubmitted(true);
        setShowApplication(false);
      } else {
        setError(data.error || 'Something went wrong');
      }
    } catch {
      setError('Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      case 'expert': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Application Submitted!</h1>
            <p className="text-lg text-gray-600 mb-6">
              Your certification application has been submitted successfully. We&apos;ll review your application and get back to you within 48 hours.
            </p>
            <button
              onClick={() => {
                setIsSubmitted(false);
                setShowApplication(false);
                setApplicationData({
                  firstName: '',
                  lastName: '',
                  email: '',
                  phone: '',
                  certificationId: '',
                  experience: '',
                  motivation: '',
                  studyPlan: '',
                  examDate: ''
                });
              }}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Apply for Another Certification
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showApplication) {
    const selectedCertification = certifications.find(cert => cert.id === selectedCert);
    
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="mb-8">
              <button
                onClick={() => setShowApplication(false)}
                className="text-blue-600 hover:text-blue-700 mb-4"
              >
                ← Back to Certifications
              </button>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Apply for Certification</h1>
              <p className="text-lg text-gray-600">
                {selectedCertification?.title}
              </p>
            </div>

            <form onSubmit={handleSubmitApplication} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={applicationData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={applicationData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={applicationData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={applicationData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">
                  Relevant Experience
                </label>
                <textarea
                  id="experience"
                  name="experience"
                  value={applicationData.experience}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Describe your relevant experience in blockchain or related fields"
                />
              </div>

              <div>
                <label htmlFor="motivation" className="block text-sm font-medium text-gray-700 mb-2">
                  Why do you want this certification? *
                </label>
                <textarea
                  id="motivation"
                  name="motivation"
                  value={applicationData.motivation}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Explain your motivation and career goals"
                />
              </div>

              <div>
                <label htmlFor="studyPlan" className="block text-sm font-medium text-gray-700 mb-2">
                  Study Plan
                </label>
                <textarea
                  id="studyPlan"
                  name="studyPlan"
                  value={applicationData.studyPlan}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="How do you plan to prepare for this certification?"
                />
              </div>

              <div>
                <label htmlFor="examDate" className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Exam Date
                </label>
                <input
                  type="date"
                  id="examDate"
                  name="examDate"
                  value={applicationData.examDate}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-600">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Submitting Application...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Submit Application
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Blockchain Certifications
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto">
              Earn industry-recognized certifications that validate your blockchain expertise 
              and advance your career in the decentralized economy.
            </p>
          </div>
        </div>
      </section>

      {/* Certifications Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">
              Available Certifications
            </h2>
            <p className="text-xl text-gray-600 text-center">
              Choose from our comprehensive certification programs
            </p>
          </div>

          <div className="space-y-8">
            {certifications.map((cert) => (
              <div key={cert.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="p-8">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(cert.level)}`}>
                          {cert.level}
                        </span>
                        <div className="text-3xl font-bold text-blue-600">
                          ${cert.price}
                        </div>
                      </div>

                      <h3 className="text-2xl font-bold text-gray-900 mb-3">{cert.title}</h3>
                      <p className="text-gray-600 mb-6">{cert.description}</p>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div className="flex items-center space-x-3">
                          <Clock className="w-5 h-5 text-blue-600" />
                          <div>
                            <div className="text-sm text-gray-500">Duration</div>
                            <div className="font-medium">{cert.duration}</div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <BookOpen className="w-5 h-5 text-blue-600" />
                          <div>
                            <div className="text-sm text-gray-500">Credits Required</div>
                            <div className="font-medium">{cert.creditsRequired} hours</div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <Target className="w-5 h-5 text-blue-600" />
                          <div>
                            <div className="text-sm text-gray-500">Passing Score</div>
                            <div className="font-medium">{cert.passingScore}%</div>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">Benefits:</h4>
                          <ul className="space-y-2">
                            {cert.benefits.slice(0, 3).map((benefit, index) => (
                              <li key={index} className="flex items-center text-sm text-gray-600">
                                <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                                {benefit}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">Exam Details:</h4>
                          <div className="space-y-2 text-sm text-gray-600">
                            <div>Duration: {cert.examDuration}</div>
                            <div>Validity: {cert.validityPeriod}</div>
                            <div>Format: Online proctored</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 lg:mt-0 lg:ml-8">
                      <button
                        onClick={() => handleApply(cert.id)}
                        className="w-full lg:w-auto bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                      >
                        Apply Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Get Certified */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Get Certified?
            </h2>
            <p className="text-xl text-gray-600">
              Industry-recognized credentials that open doors to new opportunities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Industry Recognition</h3>
              <p className="text-gray-600">
                Our certifications are recognized by leading blockchain companies and organizations worldwide.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Career Advancement</h3>
              <p className="text-gray-600">
                95% of our certified professionals report career advancement or salary increases within 6 months.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Continuous Learning</h3>
              <p className="text-gray-600">
                Access to exclusive resources, communities, and continuing education opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Get Certified?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who have advanced their careers with our blockchain certifications.
          </p>
          <Link
            href="/courses"
            className="bg-yellow-400 text-black px-8 py-4 rounded-lg font-semibold hover:bg-yellow-300 transition-colors duration-200 inline-flex items-center"
          >
            Start Learning Today
          </Link>
        </div>
      </section>
    </div>
  );
};

export default CertificationPage;
