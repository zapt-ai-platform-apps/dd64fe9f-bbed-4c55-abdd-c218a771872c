import React from 'react';
import FeatureCard from './FeatureCard';
import featureData from '../data/featureData';

const FeatureGrid = () => {
  return (
    <div className="grid md:grid-cols-3 gap-8 mt-20">
      {featureData.map((feature, index) => (
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