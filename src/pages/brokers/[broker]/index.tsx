import BrokerAcountTypeSection from "@/components/pages/brokers/brokerDetails/acountTypeSection/BrokerAcountTypeSection";
import BrokerSummarySection from "@/components/pages/brokers/brokerDetails/summarySection/BrokerSummarySection";
import StickySummarySection from "@/components/pages/brokers/brokerDetails/summarySection/StickySummarySection";
import BrokerDepositAndWithdrawal from "@/components/pages/brokers/brokerDetails/withdrawalAndDepositSection/BrokerDepositAndWithdrawal";
import { getTextColorClass } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

const Broker = () => {
  const brokerLevel = "1";
  const colorClasses = getTextColorClass(brokerLevel);
  const summaryRef = useRef(null);
  const [currentSection, setCurrentSection] = useState("account");
  const [showStickySummary, setShowStickySummary] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const currentEntry = entries.find((entry) => entry.isIntersecting);
        const brokerSummaryEntry = entries.find(
          (entry) => entry.target === summaryRef.current
        );
        if (brokerSummaryEntry?.isIntersecting) {
          setShowStickySummary(false);
        } else {
          setShowStickySummary(true);
        }
        if (currentEntry?.target.id) {
          console.log("here");
          setCurrentSection(currentEntry.target.id);
        }
      },
      {
        root: null,
        threshold: 0.5,
      }
    );

    const sections = ["account", "deposit"];
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });
    summaryRef.current && observer.observe(summaryRef.current);
    return () => {
      sections.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      });
      summaryRef.current && observer.unobserve(summaryRef.current);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const position = element.getBoundingClientRect();
      window.scrollTo({
        left: position.left,
        top: position.top + window.scrollY - 190,
        behavior: "smooth",
      });
    }
  };
  console.log("currentSection", currentSection);
  return (
    <div className="min-w-[450px]  flex items-center justify-center flex-col gap-5 py-20 lg:p-20 bg-black">
      <div className="w-full">
        <h1
          className={`mr-10 lg:mr-[250px]  font-bold text-4xl ${colorClasses}`}
        >
          wetrade
        </h1>
      </div>
      <BrokerSummarySection brokerLevel={brokerLevel} ref={summaryRef} />
      {showStickySummary && (
        <StickySummarySection
          scrollToSection={scrollToSection}
          currentSection={currentSection}
        />
      )}
      <BrokerAcountTypeSection id="account" />
      <BrokerDepositAndWithdrawal id="deposit" />
    </div>
  );
};

export default Broker;
