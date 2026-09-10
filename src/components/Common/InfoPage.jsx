import React from 'react';
import { Mail, MapPin, MessageSquare } from 'lucide-react';
import { PageHeader } from './PageHeader';
import '../../styles/components/info-page.css';

export const infoPageContent = {
  contact: {
    badge: 'GET IN TOUCH',
    title: 'Contact Us',
    subtitle: 'Have a question about training, nutrition, or your RepFuelAI experience? Our team is here to help.',
    sections: [
      { heading: 'General Support', body: 'Email our support desk at hello@repfuelai.example and expect a reply within two business days.' },
      { heading: 'Partnerships', body: 'For coaching, research, and brand partnerships, reach out to partnerships@repfuelai.example.' },
      { heading: 'Office Hours', body: 'Monday through Friday, 9:00 AM to 5:00 PM Pacific Time.' }
    ],
    contactDetails: true
  },
  privacy: {
    badge: 'LEGAL & TRUST',
    title: 'Privacy Policy',
    subtitle: 'A plain-language overview of how RepFuelAI handles information in this demo experience.',
    sections: [
      { heading: 'Information We Collect', body: 'This demo may process information you enter into tools such as the BMI calculator. We do not sell personal information.' },
      { heading: 'How We Use Information', body: 'Information is used to provide features, improve the experience, and respond to support requests.' },
      { heading: 'Your Choices', body: 'You can request access, correction, or deletion of information by contacting privacy@repfuelai.example.' }
    ]
  },
  terms: { badge: 'LEGAL & TRUST', title: 'Terms of Service', subtitle: 'The basic rules for using RepFuelAI.', sections: [{ heading: 'Use of the Service', body: 'Use RepFuelAI responsibly and only for lawful personal or professional fitness planning.' }, { heading: 'No Medical Advice', body: 'Training and nutrition content is educational and is not a substitute for advice from a qualified healthcare professional.' }] },
  cookies: { badge: 'LEGAL & TRUST', title: 'Cookie Settings', subtitle: 'A simple overview of the technologies used by this demo.', sections: [{ heading: 'Essential Storage', body: 'RepFuelAI may use local browser storage to remember preferences such as your theme selection.' }, { heading: 'Your Control', body: 'You can clear stored preferences at any time through your browser settings.' }] },
  disclaimer: { badge: 'HEALTH & SAFETY', title: 'Health & Safety Disclaimer', subtitle: 'Please make informed decisions about your health and training.', sections: [{ heading: 'Before You Begin', body: 'Consult a qualified healthcare professional before starting a new exercise or nutrition program, especially if you have a medical condition.' }, { heading: 'Listen to Your Body', body: 'Stop an activity if you experience pain, dizziness, or unusual symptoms and seek professional guidance.' }] },
  careers: { badge: 'JOIN THE TEAM', title: 'Careers', subtitle: 'We are building thoughtful tools for people who take performance seriously.', sections: [{ heading: 'Open Roles', body: 'There are no active openings right now, but you can send a short introduction to careers@repfuelai.example.' }] },
  press: { badge: 'COMPANY', title: 'Press & Media', subtitle: 'A small resource desk for journalists and creators.', sections: [{ heading: 'Media Inquiries', body: 'For product information, interviews, or brand assets, contact press@repfuelai.example.' }] },
  science: { badge: 'OUR APPROACH', title: 'Science & Methodology', subtitle: 'RepFuelAI combines established training principles with practical, readable guidance.', sections: [{ heading: 'Evidence-Informed', body: 'Our educational content is designed around progressive overload, recovery, consistency, and balanced fueling.' }, { heading: 'Built for Practice', body: 'Recommendations are presented as adaptable starting points, not rigid prescriptions.' }] }
};

export function InfoPage({ type }) {
  const content = infoPageContent[type] || infoPageContent.contact;

  return (
    <div className="info-page">
      <PageHeader badge={content.badge} title={content.title} subtitle={content.subtitle} currentPage={content.title} />
      <section className="info-page-content" aria-label={`${content.title} details`}>
        <div className="info-page-grid">
          {content.sections.map((section) => (
            <article className="info-page-section" key={section.heading}>
              <h2>{section.heading}</h2>
              <p>{section.body}</p>
            </article>
          ))}
        </div>
        {content.contactDetails && (
          <div className="info-contact-details">
            <a href="mailto:hello@repfuelai.example"><Mail size={18} /> hello@repfuelai.example</a>
            <span><MapPin size={18} /> Portland, Oregon</span>
            <span><MessageSquare size={18} /> Replies within two business days</span>
          </div>
        )}
      </section>
    </div>
  );
}