import React from 'react';
import { Salad, Droplets, Fish, Check } from 'lucide-react';

const getTipIcon = (iconName) => {
  switch (iconName) {
    case 'Salad':
      return <Salad size={24} />;
    case 'Droplets':
      return <Droplets size={24} />;
    case 'Fish':
      return <Fish size={24} />;
    default:
      return <Salad size={24} />;
  }
};

export const TipCard = ({
  icon = "Salad",
  category,
  title,
  description,
  bulletPoints = []
}) => {
  return (
    <article className="tip-card" aria-label={`Nutrition Tip: ${title}`}>
      <div className="tip-card-header">
        <div className="tip-icon-box" aria-hidden="true">
          {getTipIcon(icon)}
        </div>
        <div>
          <span className="tip-category-tag">{category}</span>
        </div>
      </div>

      <h3 className="tip-title">{title}</h3>
      <p className="tip-description">{description}</p>

      {bulletPoints.length > 0 && (
        <ul className="tip-bullets">
          {bulletPoints.map((bullet, idx) => (
            <li key={idx} className="tip-bullet-item">
              <span className="tip-bullet-dot" aria-hidden="true"></span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
};
