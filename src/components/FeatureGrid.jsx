import React from 'react';

const FeatureCard = ({ imageSrc, altText, title, description, delay }) => (
  <div className={`card-glass p-6 backdrop-blur-lg border border-white/10 animate-slide-up ${delay}`}>
    <div className="h-48 mb-4 bg-white/10 rounded-lg overflow-hidden">
      <img 
        src={imageSrc}
        alt={altText}
        className="w-full h-full object-cover"
        data-image-request={title}
      />
    </div>
    <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
    <p className="text-indigo-200">{description}</p>
  </div>
);

const FeatureGrid = () => {
  const features = [
    {
      imageSrc: 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NjQ4Nzh8MHwxfHNlYXJjaHw0fHxtb2Rlcm4lMjBkaWdpdGFsJTIwZGFzaGJvYXJkJTIwd2l0aCUyMHN0YXR1cyUyMHVwZGF0ZXN8ZW58MHx8fHwxNzM3NDk3MTEwfDA&ixlib=rb-4.0.3&q=80&w=1080',
      altText: 'Real-time updates',
      title: 'Real-Time Status Updates',
      description: 'Instantly communicate schedule changes or availability to your clients.',
      delay: 'delay-150'
    },
    {
      imageSrc: 'https://images.unsplash.com/photo-1535295972055-1c762f4483e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NjQ4Nzh8MHwxfHNlYXJjaHw1fHxoYXBweSUyMGNsaWVudHMlMjB1c2luZyUyMG1vYmlsZSUyMHBob25lcyUyMHRvJTIwY2hlY2slMjBwcm9mZXNzaW9uYWwlMjBzdGF0dXN8ZW58MHx8fHwxNzM3NDk3MTExfDA&ixlib=rb-4.0.3&q=80&w=1080',
      altText: 'Client connection',
      title: 'Client Connection Hub',
      description: 'Maintain all client relationships in one centralized, professional platform.',
      delay: 'delay-200'
    },
    {
      imageSrc: 'https://images.unsplash.com/photo-1499557354967-2b2d8910bcca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NjQ4Nzh8MHwxfHNlYXJjaHwxMHx8bW9kZXJuJTIwbW9iaWxlJTIwaW50ZXJmYWNlJTIwc2hvd2luZyUyMHByb2Zlc3Npb25hbCUyMHByb2ZpbGV8ZW58MHx8fHwxNzM3NDk3MTExfDA&ixlib=rb-4.0.3&q=80&w=1080',
      altText: 'Mobile interface',
      title: 'Mobile-First Design',
      description: 'Manage your professional presence from anywhere, on any device.',
      delay: 'delay-250'
    }
  ];

  return (
    <div className="grid md:grid-cols-3 gap-8 mt-20">
      {features.map((feature, index) => (
        <FeatureCard
          key={index}
          imageSrc={feature.imageSrc}
          altText={feature.altText}
          title={feature.title}
          description={feature.description}
          delay={feature.delay}
        />
      ))}
    </div>
  );
};

export default FeatureGrid;