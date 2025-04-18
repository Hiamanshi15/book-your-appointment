import React, { useState } from 'react';

const FaqAccordion = ({ faqList }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <section className="faq-section">
      <div className="container">
        <h3 className="faq-title">Frequently Asked Questions</h3>
        {faqList.map((faq, index) => (
          <div className="accordion-item" key={index}>
            <button className="accordion-header" onClick={() => toggleAccordion(index)}>
              <div className="question">{faq.question}</div>
              <span className="icon">{activeIndex === index ? '-' : '+'}</span>
            </button>
            {activeIndex === index && (
              <div className="accordion-body">
                <p dangerouslySetInnerHTML={{ __html: faq.answer }} />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FaqAccordion;
