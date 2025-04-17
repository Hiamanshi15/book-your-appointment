import React from 'react';
import IndustryCard from './IndustryCard';
import SalonImg from '../Assets/images/Salon.svg';
import BarberImg from '../Assets/images/Barber.svg';
import SpaImg from '../Assets/images/Spa.svg';
import HealthWellnessImg from '../Assets/images/Health-Wellness.svg';
import FitnessSportsImg from '../Assets/images/Fitness-Sports.svg';
import ProfessionalServicesImg from '../Assets/images/professional-services.svg';
import TutoringImg from '../Assets/images/tutoring.svg';
import EducationNonProfitsImg from '../Assets/images/education-and-non-profits.svg';
import BankingFinanceImg from '../Assets/images/Frame.svg';

const industries = [
    {
      title: 'Salon & Beauty',
      image: SalonImg,
      link: 'https://www.appointy.com/salon-scheduling-software/'
    },
    {
      title: 'Barber',
      image: BarberImg,
      link: 'https://www.appointy.com/barbershop-software/'
    },
    {
      title: 'Spa',
      image: SpaImg,
      link: 'https://www.appointy.com/spa-scheduling-software/'
    },
    {
      title: 'Health & Wellness',
      image: HealthWellnessImg,
      link: 'https://www.appointy.com/health-and-wellness-scheduling-software/'
    },
    {
      title: 'Fitness & Sports',
      image: FitnessSportsImg,
      link: 'https://www.appointy.com/fitness-class-scheduling-software/'
    },
    {
      title: 'Professional Services',
      image: ProfessionalServicesImg,
      link: 'https://www.appointy.com/professional-services-scheduling-software/'
    },
    {
      title: 'Tutoring Services',
      image: TutoringImg,
      link: 'https://www.appointy.com/online-tutoring-software-for-scheduling-tutoring-lessons/'
    },
    {
      title: 'Education & Non-profits',
      image: EducationNonProfitsImg,
      link: 'https://www.appointy.com/education-scheduling-software/'
    },
    {
      title: 'Banking & Finance',
      image: BankingFinanceImg,
      link: ''
    }
  ];
  
const IndustriesServed = () => {
  return (
    <section className="py-12 bg-white">
      <div className="text-center " style={{ marginBottom: '3rem'}}>
        <h2 className="text-3xl font-bold" style={{color:'#0056b3'}}>Appointy can serve almost any industry segment</h2>
        <p className="text-gray-600 mt-2" style={{color:'#0056b3'}}>
          Our appointment booking system is fit for all service-based local businesses, multi-location enterprises, franchises, and more.
        </p>
      </div>

      <div className="class-service-grid">
        {industries.map((item, index) => (
            <IndustryCard
            key={index}
            image={item.image}
            title={item.title}
            link={item.link}
            />
        ))}
       </div>

    </section>
  );
};

export default IndustriesServed;
