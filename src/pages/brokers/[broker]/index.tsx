import BrokerAcountTypeSection from "@/components/pages/brokers/brokerDetails/acountTypeSection/BrokerAcountTypeSection";
import BrokerSummarySection from "@/components/pages/brokers/brokerDetails/summarySection/BrokerSummarySection";
import BrokerDepositAndWithdrawal from "@/components/pages/brokers/brokerDetails/withdrawalAndDepositSection/BrokerDepositAndWithdrawal";

const Broker = () => {
  const brokerLevel = "1";
  const colorClasses =
    brokerLevel === "1"
      ? "text-level1-foreground"
      : brokerLevel === "2"
      ? ""
      : "";
  return (
    <div className="min-w-[450px]  flex items-center justify-center flex-col gap-5 py-20 lg:p-20 bg-black">
      <div className="w-full">
        <h1
          className={`mr-10 lg:mr-[250px]  font-bold text-4xl ${colorClasses}`}
        >
          wetrade
        </h1>
      </div>
      <BrokerSummarySection brokerLevel={brokerLevel} />
      <BrokerAcountTypeSection />
      <BrokerDepositAndWithdrawal />
    </div>
  );
};

export default Broker;
