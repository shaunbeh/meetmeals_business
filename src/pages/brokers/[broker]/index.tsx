import { useEffect, useRef, useState } from 'react';

import BrokerAcountTypeSection from '@/components/pages/brokers/brokerDetails/acountTypeSection/BrokerAcountTypeSection';
import BrokerSummarySection from '@/components/pages/brokers/brokerDetails/summarySection/BrokerSummarySection';
import StickySummarySection from '@/components/pages/brokers/brokerDetails/summarySection/StickySummarySection';
import BrokerDepositAndWithdrawal from '@/components/pages/brokers/brokerDetails/withdrawalAndDepositSection/BrokerDepositAndWithdrawal';
import { getTextColorClass } from '@/lib/utils';
import BrokerCompanyAndServicesSection from '@/components/pages/brokers/brokerDetails/companyAndServicesSection';
import BrokerNewsSection from '@/components/pages/brokers/brokerDetails/newsSection';
import BrokerQuestionsAndAnswersSection from '@/components/pages/brokers/brokerDetails/questionsSection';
import Header from '@/components/Header';

const SingleBroker = () => {
  const brokerLevel = '1';
  const colorClasses = getTextColorClass(brokerLevel);
  const [currentSection, setCurrentSection] = useState('account');
  const [showStickySummary, setShowStickySummary] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const currentEntry = entries.find((entry) => entry.isIntersecting);
        if (currentEntry?.target.id==='summary' ) {
          setShowStickySummary(false);
        } else {
          if(currentEntry?.target.id){
            setShowStickySummary(true);
            setCurrentSection(currentEntry?.target.id);
          }
          
        }
      },
      {
        root: null,
        threshold: 0.5,
      },
    );

    const sections = ['summary','account', 'deposit','company','news','Q&A'];
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });
  
    return () => {
      sections.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      });
     
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const position = element.getBoundingClientRect();
      window.scrollTo({
        left: position.left,
        top: position.top + window.scrollY - 190,
        behavior: 'smooth',
      });
    }
  };
  return (
    <>
    <Header/>
    <div className='flex dir-rtl  min-w-[450px] flex-col items-center justify-center gap-5 bg-black/90 py-20 lg:p-20'>
      <div className='w-full'>
        <h1
          className={`mr-10 text-4xl  font-bold lg:mr-[250px] ${colorClasses}`}
        >
          wetrade
        </h1>
      </div>
      <BrokerSummarySection brokerLevel={brokerLevel}  />
      {showStickySummary && (
        <StickySummarySection
          scrollToSection={scrollToSection}
          currentSection={currentSection}
        />
      )}
      <BrokerAcountTypeSection id='account' />
      <BrokerDepositAndWithdrawal id='deposit' />
      <BrokerCompanyAndServicesSection id="company"/>
      <BrokerNewsSection id="news"/>
      <BrokerQuestionsAndAnswersSection id="Q&A"/>
    </div>
    </>

  );
};

export default SingleBroker;
