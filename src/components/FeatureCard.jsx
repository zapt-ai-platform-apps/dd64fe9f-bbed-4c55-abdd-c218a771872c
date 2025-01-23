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

export default FeatureCard;