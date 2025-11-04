import React from 'react';

const services = [
  {
    icon: '🎉',
    title: 'Petreceri vesele',
    description: 'Organizăm petreceri tematice pline de distracție și jocuri.',
  },
  {
    icon: '🎨',
    title: 'Ateliere creative',
    description: 'Copiii pot învăța să picteze, să modeleze și să creeze opere de artă.',
  },
  {
    icon: '🤹‍♂️',
    title: 'Jocuri interactive',
    description: 'Jocuri dinamice și educative pentru toate vârstele.',
  },
  {
    icon: '🦄',
    title: 'Petreceri vesele',
    description: 'Organizăm petreceri tematice pline de distracție și jocuri.',
  },
  {
    icon: '🎠',
    title: 'Ateliere creative',
    description: 'Copiii pot învăța să picteze, să modeleze și să creeze opere de artă.',
  },
  {
    icon: '🎭',
    title: 'Jocuri interactive',
    description: 'Jocuri dinamice și educative pentru toate vârstele.',
  },
];

export default function Services() {
  return (
    <section className="services-section">
      <h2 className="section-title">Ce oferim</h2>
      <div className="services-cards">
        {services.map(({ icon, title, description }, idx) => (
          <div key={idx} className="service-card">
            <div className="service-icon">{icon}</div>
            <h3 className="service-title">{title}</h3>
            <p className="service-desc">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
