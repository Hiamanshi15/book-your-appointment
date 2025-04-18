import React from 'react';
import SuperSupportImg from '../Assets/images/Super-Support.svg';
import MultiLocationImg from '../Assets/images/Multi-location-management.svg';
import SetupImg from '../Assets/images/Frame-14.svg';
import SecurityImg from '../Assets/images/Security.svg';


const IndustryCard = ({ image, title, link }) => {
  return (
    <div className="p-4 text-center">
      {link ? (
        <a href={link} target="_blank" rel="noopener noreferrer" style={{textDecoration: 'none', color: 'black'}}>
          <img src={image} alt={title} width={60} height={60} className="mx-auto mb-4" />
          <h3 className="text-lg font-semibold" style={{textDecoration: 'none'}}>{title}</h3>
        </a>
      ) : (
        <>
          <img src={image} alt={title} width={60} height={60} className="mx-auto mb-4" />
          <h3 className="text-lg font-semibold" style={{textDecoration: 'none'}}>{title}</h3>
        </>
      )}
    </div>
  );
};

export default IndustryCard;

