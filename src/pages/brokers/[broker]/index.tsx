import BrokerSummarySection from "@/components/pages/brokers/brokerDetails/summarySection/BrokerSummarySection";

const Broker = () => {
  const brokerLevel = "1";
  const colorClasses =
    brokerLevel === "1"
      ? "text-level1-foreground"
      : brokerLevel === "2"
      ? ""
      : "";
  return (
    <div className="min-w-[450px]  flex items-center justify-center flex-col gap-2 m-20">
      <div className="w-full">
        <h1 className={`lg:mr-[250px] mb-3 font-bold text-4xl ${colorClasses}`}>
          wetrade
        </h1>
      </div>
      <BrokerSummarySection brokerLevel={brokerLevel} />
    </div>
  );
};

export default Broker;
