import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, CheckCircle, ArrowRight } from 'lucide-react';
import { mockPrograms as programs } from '../data/mockData';

const ProgramsPage: React.FC = () => {
  return (
    <div className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Our Programs
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our comprehensive range of undergraduate programs designed to prepare you for success in your chosen career path.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="space-y-8">
          {programs.map((program) => (
            <div
              key={program.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="p-8">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                        {program.code}
                      </div>
                      <div className="flex items-center text-gray-500 text-sm">
                        <Clock className="h-4 w-4 mr-1" />
                        {program.duration}
                      </div>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-gray-800 mb-3">
                      {program.name}
                    </h2>
                    
                    <p className="text-gray-600 text-lg mb-6">
                      {program.description}
                    </p>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">
                        Admission Requirements:
                      </h3>
                      <ul className="space-y-2">
                        {program.requirements.map((requirement, index) => (
                          <li key={index} className="flex items-center gap-2 text-gray-600">
                            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                            {requirement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="lg:ml-8 mt-6 lg:mt-0">
                    <Link
                      to="/apply"
                      className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-lg font-semibold inline-flex items-center gap-2 transition-colors"
                    >
                      Apply for {program.code} <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-700 to-blue-900 rounded-lg p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl mb-6 opacity-90">
              Take the first step towards your future career with QCU.
            </p>
            <Link
              to="/apply"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-semibold inline-flex items-center gap-2 transition-colors"
            >
              Apply Now <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramsPage;