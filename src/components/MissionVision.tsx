import React from 'react';
import { Target, Eye, Heart } from 'lucide-react';

const MissionVision: React.FC = () => {
  return (
<section 
  className="relative py-32 bg-cover bg-center bg-fixed"
  style={{
    backgroundImage: `linear-gradient(rgba(55, 79, 161, 0.8), rgba(57, 66, 97, 0.8)), url('/qcu-banner2.png')`
  }}
>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold section-title mb-6">
            Our Foundation
          </h2>
          <p className="text-white text-xl max-w-3xl mx-auto body-text">
            Guided by our mission, vision, and core values in shaping tomorrow's leaders.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Mission */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/20 hover:bg-white/15 transition-all duration-300">
            <div className="bg-qcu-bronze/20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <Target className="h-10 w-10 text-qcu-bronze" />
            </div>
            <h3 className="text-2xl font-bold text-qcu-bronze mb-4 section-title">Our Mission</h3>
            <p className="text-white leading-relaxed body-text">
              To provide a comprehensive education that enhances the lives of QCU students for nation-building and as world citizens.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/20 hover:bg-white/15 transition-all duration-300">
            <div className="bg-qcu-bronze/20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <Eye className="h-10 w-10 text-qcu-bronze" />
            </div>
            <h3 className="text-2xl font-bold text-qcu-bronze mb-4 section-title">Our Vision</h3>
            <p className="text-white leading-relaxed body-text">
              To be recognized as the #1 local University of employable graduates.


            </p>
          </div>

          {/* Core Values */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/20 hover:bg-white/15 transition-all duration-300">
            <div className="bg-qcu-bronze/20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <Heart className="h-10 w-10 text-qcu-bronze" />
            </div>
            <h3 className="text-2xl font-bold text-qcu-bronze mb-4 section-title">Core Values</h3>
<div className="text-white leading-relaxed body-text">
  <p className="mb-2">
    <strong className="text-qcu-bronze">E</strong>mbrace the;
  </p>
  <p className="mb-2">
    <strong className="text-qcu-bronze">N</strong>ew Normal with;
  </p>
  <p className="mb-2">
    <strong className="text-qcu-bronze">J</strong>ointness of Undertakings,
  </p>
  <p className="mb-2">
    <strong className="text-qcu-bronze">O</strong>rganizational Adaptability,
  </p>
  <p>
    <strong className="text-qcu-bronze">Y</strong>oke of Efficiency and Effectiveness
  </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;