import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';

interface Campus {
  id: string;
  name: string;
  location: string;
  address: string;
  phone?: string;
  email?: string;
  logoPlaceholder: string;
  description: string;
}

const CampusesList: React.FC = () => {
  const campuses: Campus[] = [
    {
      id: 'san-bartolome',
      name: 'San Bartolome Campus',
      location: 'Main Campus',
      address: '673 Quirino Highway, San Bartolome, Novaliches, Quezon City',
      phone: '(02) 8806-3000',
      email: 'sanbartolome@qcu.edu.ph',
      logoPlaceholder: '/sbcampus.png',
      description: 'Our main campus featuring state-of-the-art facilities and comprehensive academic programs.'
    },
    {
      id: 'san-francisco',
      name: 'San Francisco Campus',
      location: 'Extension Campus',
      address: 'San Francisco del Monte, Quezon City',
      phone: '(02) 8951-4916',
      email: 'sanfrancisco@qcu.edu.ph',
      logoPlaceholder: '/sfcampus.png',
      description: 'Specialized programs and community-focused education in the heart of San Francisco del Monte.'
    },
    {
      id: 'batasan',
      name: 'Batasan Campus',
      location: 'Extension Campus',
      address: 'Batasan Hills, Quezon City',
      phone: '(02) 8123-4567',
      email: 'batasan@qcu.edu.ph',
      logoPlaceholder: '/batasancampus.png',
      description: 'Modern facilities serving the educational needs of the Batasan Hills community.'
    }
  ];

  return (
    <section className="py-20 bg-qcu-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6" style={{ fontFamily: 'Cinzel, serif' }}>
            Our Campuses
          </h2>
          <p className="text-qcu-gray-600 text-xl max-w-3xl mx-auto body-text">
            Three strategically located campuses serving the educational needs of Quezon City and beyond.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {campuses.map((campus) => (
            <div
              key={campus.id}
              className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative">
                <img
                  src={campus.logoPlaceholder}
                  alt={`${campus.name} Building`}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4 bg-qcu-secondary/90 backdrop-blur-sm rounded-full px-3 py-1">
                  <span className="text-white text-sm font-medium readable-text">{campus.location}</span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-gradient-to-br from-qcu-primary to-qcu-secondary rounded-full w-12 h-12 flex items-center justify-center mr-4">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800" style={{ fontFamily: 'Cinzel, serif' }}>
                      {campus.name}
                    </h3>
                  </div>
                </div>

                <p className="text-qcu-gray-600 mb-4 body-text leading-relaxed">
                  {campus.description}
                </p>

                <div className="space-y-3">
                  <div className="flex items-start">
                    <MapPin className="h-4 w-4 text-qcu-primary mr-2 mt-1 flex-shrink-0" />
                    <span className="text-gray-700 text-sm readable-text">{campus.address}</span>
                  </div>

                  {campus.phone && (
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 text-qcu-primary mr-2 flex-shrink-0" />
                      <span className="text-gray-700 text-sm readable-text">{campus.phone}</span>
                    </div>
                  )}

                  {campus.email && (
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 text-qcu-primary mr-2 flex-shrink-0" />
                      <span className="text-gray-700 text-sm readable-text">{campus.email}</span>
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-qcu-gray-200">
                  <button className="text-blue-600 hover:text-blue-800 font-semibold readable-text transition-colors">
                    Visit Campus →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CampusesList;