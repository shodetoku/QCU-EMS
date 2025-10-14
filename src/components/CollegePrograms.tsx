import React from 'react';
import { GraduationCap, Users, BookOpen, Calculator, Monitor, Building } from 'lucide-react';

interface College {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  programs: string[];
  description: string;
  logoPlaceholder: string;
}

const CollegePrograms: React.FC = () => {
  const colleges: College[] = [
    {
      id: 'education',
      name: 'College of Education',
      icon: Users,
      programs: [
        'Bachelor of Early Childhood Education (BECED)',
        'General Education Courses',
        'Core Education Subjects'
      ],
      description: 'Preparing future educators and child development specialists.',
      logoPlaceholder: '/educ-logo.png'
    },
    {
      id: 'engineering',
      name: 'College of Engineering',
      icon: Building,
      programs: [
        'Bachelor of Science in Industrial Engineering (BSIE)',
        'Bachelor of Science in Electronics and Communications Engineering (BSECE)'
      ],
      description: 'Engineering excellence through innovation and practical application.',
      logoPlaceholder: '/engineering-logo.png'
    },
    {
      id: 'computer-studies',
      name: 'College of Computer Studies',
      icon: Monitor,
      programs: [
        'Bachelor of Science in Information Technology (BSIT)',
        'Bachelor of Science in Computer Science (BSCS)',
        'Bachelor of Science in Information Systems (BSIS)'
      ],
      description: 'Leading the digital transformation through cutting-edge technology education.',
      logoPlaceholder: '/computer-logo.png'
    },
    {
      id: 'business',
      name: 'College of Business Administration and Accountancy',
      icon: Calculator,
      programs: [
        'Bachelor of Science in Accountancy (BSA)',
        'Bachelor of Science in Entrepreneurship (BSENT)'
      ],
      description: 'Developing business leaders and financial experts for the global market.',
      logoPlaceholder: '/business-logo.png'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold section-title mb-6">
            Our Colleges & Programs
          </h2>
          <p className="text-qcu-gray-600 text-xl max-w-3xl mx-auto body-text">
            Discover our comprehensive range of academic programs across four distinguished colleges.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {colleges.map((college) => {
            const Icon = college.icon;
            return (
              <div
                key={college.id}
                className="bg-white rounded-2xl shadow-xl border border-qcu-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="relative">
                      <img
                        src={college.logoPlaceholder}
                        alt={`${college.name} Logo`}
                        className="w-16 h-16 rounded-full object-cover border-4 border-qcu-bronze"
                      />
                      <div className="absolute -bottom-2 -right-2 bg-qcu-secondary rounded-full p-2">
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-bold text-qcu-secondary section-title">
                        {college.name}
                      </h3>
                    </div>
                  </div>

                  <p className="text-qcu-gray-600 mb-6 body-text leading-relaxed">
                    {college.description}
                  </p>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-qcu-deep readable-text">Programs Offered:</h4>
                    <ul className="space-y-2">
                      {college.programs.map((program, index) => (
                        <li key={index} className="flex items-start">
                          <GraduationCap className="h-5 w-5 text-qcu-bronze mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-qcu-gray-700 readable-text">{program}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 pt-6 border-t border-qcu-gray-200">
                    <button className="text-qcu-secondary hover:text-qcu-bronze font-semibold readable-text inline-flex items-center gap-2 transition-colors">
                      <BookOpen className="h-4 w-4" />
                      Learn More About Programs
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CollegePrograms;