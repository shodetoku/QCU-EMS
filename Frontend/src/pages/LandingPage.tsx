import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, Award, MapPin, Phone, Mail, ArrowRight } from 'lucide-react';
import MissionVision from '../components/MissionVision';
import CollegePrograms from '../components/CollegePrograms';
import CampusesList from '../components/CampusesList';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
  className="relative py-16 md:py-20 lg:py-24 xl:py-28 min-h-[70vh] md:min-h-[80vh] lg:min-h-[90vh] xl:min-h-screen bg-cover bg-center bg-fixed flex items-center"
  style={{
    backgroundImage: `linear-gradient(rgba(55, 79, 161, 0.8), rgba(57, 66, 97, 0.8)), url('/qcu-banner.png')`
  }}
>


        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl text-white font-bold mb-8 university-title">
              Welcome to Quezon City University
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-white max-w-4xl mx-auto body-text">
              Shaping Tomorrow's Leaders Through Excellence in Education
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/apply"
                className="bg-white hover:bg-blue-50 text-qcu-primary px-8 py-4 rounded-2xl text-lg font-semibold inline-flex items-center justify-center gap-2 transition-colors shadow-lg readable-text border-2 border-white"
              >
                Apply Now <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/programs"
                className="border-2 border-white hover:bg-white hover:text-qcu-primary text-white px-8 py-4 rounded-2xl text-lg font-semibold inline-flex items-center justify-center transition-colors readable-text"
              >
                View Programs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Core Values */}
      <MissionVision />

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-blue-700 mb-6" style={{ fontFamily: 'Cinzel, serif' }}>
              Why Choose QCU?
            </h2>
            <p className="text-qcu-gray-600 text-xl max-w-3xl mx-auto body-text">
              Discover what makes Quezon City University the perfect choice for your academic journey.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-white border border-qcu-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="bg-qcu-primary/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <BookOpen className="h-10 w-10 text-qcu-primary" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4" style={{ fontFamily: 'Cinzel, serif' }}>
                Academic Excellence
              </h3>
              <p className="text-qcu-gray-600 leading-relaxed body-text">
                Comprehensive programs designed to meet industry standards with experienced faculty members.
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-white border border-qcu-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <Users className="h-10 w-10 text-blue-700" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4" style={{ fontFamily: 'Cinzel, serif' }}>
                Vibrant Campus Life
              </h3>
              <p className="text-qcu-gray-600 leading-relaxed body-text">
                Active student organizations, sports programs, and cultural activities for holistic development.
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-white border border-qcu-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="bg-qcu-secondary/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <Award className="h-10 w-10 text-qcu-secondary" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4" style={{ fontFamily: 'Cinzel, serif' }}>
                Career Success
              </h3>
              <p className="text-qcu-gray-600 leading-relaxed body-text">
                Strong industry partnerships and career services to ensure successful job placement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Colleges & Programs */}
      <CollegePrograms />

      {/* Campuses */}
      <CampusesList />

      {/* Admissions Guidelines */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-blue-700 mb-8" style={{ fontFamily: 'Cinzel, serif' }}>
                Admissions Guidelines
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-qcu-primary rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-qcu-deep mb-2 text-lg readable-text">Submit Online Application</h3>
                    <p className="text-qcu-gray-600 body-text">Complete the online application form with required documents.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-qcu-primary rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-qcu-deep mb-2 text-lg readable-text">Take Entrance Examination</h3>
                    <p className="text-qcu-gray-600 body-text">Attend the scheduled entrance exam at the designated venue.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-qcu-primary rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-qcu-deep mb-2 text-lg readable-text">Wait for Results</h3>
                    <p className="text-qcu-gray-600 body-text">Results will be available through your student dashboard.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-qcu-primary rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold text-sm">4</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-qcu-deep mb-2 text-lg readable-text">Complete Enrollment</h3>
                    <p className="text-qcu-gray-600 body-text">Submit final requirements and complete your enrollment process.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-qcu-primary/5 p-8 rounded-2xl border border-qcu-primary/20">
              <h3 className="text-2xl font-semibold text-blue-700 mb-6" style={{ fontFamily: 'Cinzel, serif' }}>
                Application Requirements
              </h3>
              <ul className="space-y-3 text-gray-800 body-text">
                <li>• High School Diploma or equivalent</li>
                <li>• Transcript of Records</li>
                <li>• Birth Certificate (PSA Copy)</li>
                <li>• 2x2 ID Pictures (4 copies)</li>
                <li>• Medical Certificate</li>
                <li>• Certificate of Good Moral Character</li>
              </ul>
              
              <div className="mt-6">
                <Link
                  to="/apply"
                  className="bg-gradient-to-r from-qcu-primary to-qcu-secondary hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-2xl font-semibold inline-flex items-center gap-2 transition-colors shadow-lg readable-text"
                >
                  Start Application <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-br from-qcu-primary via-blue-700 to-qcu-secondary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white" style={{ fontFamily: 'Cinzel, serif' }}>
              Contact Information
            </h2>
            <p className="text-white text-xl body-text font-medium">
              Get in touch with us for any inquiries about admissions and programs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="bg-white rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6 shadow-xl hover:scale-110 transition-transform duration-300">
                <MapPin className="h-12 w-12 text-qcu-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white" style={{ fontFamily: 'Cinzel, serif' }}>Address</h3>
              <p className="text-white leading-relaxed body-text text-lg">
                673 Quirino Highway, San Bartolome, Novaliches<br />
                Quezon City
              </p>
            </div>

            <div className="text-center">
              <div className="bg-white rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6 shadow-xl hover:scale-110 transition-transform duration-300">
                <Phone className="h-12 w-12 text-qcu-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white" style={{ fontFamily: 'Cinzel, serif' }}>Phone</h3>
              <p className="text-white leading-relaxed body-text text-lg">
                (02) 8806-3000<br />
                (02) 8951-4916
              </p>
            </div>

            <div className="text-center">
              <div className="bg-white rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6 shadow-xl hover:scale-110 transition-transform duration-300">
                <Mail className="h-12 w-12 text-qcu-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white" style={{ fontFamily: 'Cinzel, serif' }}>Email</h3>
              <p className="text-white leading-relaxed body-text text-lg">
                admissions@qcu.edu.ph<br />
                info@qcu.edu.ph
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;