import React from 'react';
import { Link } from 'react-router-dom';
import { Target, Eye, Heart, Users, Book, Award, ArrowRight } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            About Quezon City University
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A leading institution of higher education committed to academic excellence, 
            innovation, and community service in the heart of Quezon City.
          </p>
        </div>

        {/* Mission, Vision, Core Values */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-8 bg-white rounded-lg shadow-lg">
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Target className="h-8 w-8 text-blue-700" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Our Mission</h3>
            <p className="text-gray-600">
              To provide quality education that develops competent professionals and 
              responsible citizens who contribute to the progress of society.
            </p>
          </div>

          <div className="text-center p-8 bg-white rounded-lg shadow-lg">
            <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Eye className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Our Vision</h3>
            <p className="text-gray-600">
              To be a premier university recognized for academic excellence, 
              research innovation, and community engagement.
            </p>
          </div>

          <div className="text-center p-8 bg-white rounded-lg shadow-lg">
            <div className="bg-yellow-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Heart className="h-8 w-8 text-yellow-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Core Values</h3>
            <p className="text-gray-600">
              Excellence, Integrity, Innovation, Service, and Compassion guide 
              everything we do as an educational institution.
            </p>
          </div>
        </div>

        {/* History Section */}
        <div className="mb-16">
          <div className="bg-gray-50 rounded-lg p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Our History</h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-gray-600 text-lg mb-6">
                Founded in 1994, Quezon City University has grown from a small local college to 
                a comprehensive university serving thousands of students from across the Philippines 
                and beyond. Our commitment to accessible, quality education has made us a trusted 
                institution in the National Capital Region.
              </p>
              <p className="text-gray-600 text-lg">
                Over the years, we have expanded our academic offerings, modernized our facilities, 
                and strengthened our research capabilities while maintaining our core mission of 
                providing excellent education to all students, regardless of their background.
              </p>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-blue-700" />
            </div>
            <div className="text-3xl font-bold text-gray-800 mb-2">15,000+</div>
            <div className="text-gray-600">Students Enrolled</div>
          </div>

          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Book className="h-8 w-8 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-gray-800 mb-2">50+</div>
            <div className="text-gray-600">Academic Programs</div>
          </div>

          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <div className="bg-yellow-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-yellow-600" />
            </div>
            <div className="text-3xl font-bold text-gray-800 mb-2">500+</div>
            <div className="text-gray-600">Faculty Members</div>
          </div>

          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Award className="h-8 w-8 text-purple-600" />
            </div>
            <div className="text-3xl font-bold text-gray-800 mb-2">30+</div>
            <div className="text-gray-600">Years of Excellence</div>
          </div>
        </div>

        {/* Campus Life */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Campus Life</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Student Organizations</h3>
              <p className="text-gray-600 mb-4">
                Join over 50 student organizations spanning academic, cultural, sports, 
                and service-oriented activities. Develop leadership skills and build 
                lifelong friendships.
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Student Government Association</li>
                <li>Academic Honor Societies</li>
                <li>Cultural and Arts Groups</li>
                <li>Sports Teams and Clubs</li>
                <li>Community Service Organizations</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Facilities</h3>
              <p className="text-gray-600 mb-4">
                Our modern campus provides state-of-the-art facilities to support 
                your academic and personal growth throughout your university experience.
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Digital Libraries and Learning Commons</li>
                <li>Science and Computer Laboratories</li>
                <li>Sports Complex and Gymnasium</li>
                <li>Student Center and Cafeteria</li>
                <li>Medical and Dental Clinic</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-700 to-blue-900 rounded-lg p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">
              Join the QCU Community
            </h2>
            <p className="text-xl mb-6 opacity-90">
              Become part of our vibrant academic community and start your journey towards success.
            </p>
            <Link
              to="/apply"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-semibold inline-flex items-center gap-2 transition-colors"
            >
              Apply Today <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;