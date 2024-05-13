import { Progress } from "@/components/ui/Progress";
import CardLayout from "./CardLayout";
import text from "public/locales/fa/brokerDetails.json";
const ScoreCard = () => {
  const containerClasses = "flex items-center gap-2 w-full";
  const textClasses = "w-[200px] text-sm";
  const scoreClasses = "mr-7 text-sm";
  return (
    <CardLayout title={text.summarySection.score} bgColor="#fff8f3">
      <div className={containerClasses}>
        <span className={textClasses}>{text.summarySection.businessScope}</span>
        <div className={containerClasses}>
          <Progress value={80} />
          <span className={scoreClasses}>{(8).toFixed(1)}</span>
        </div>
      </div>
      <div className={containerClasses}>
        <span className={textClasses}>{text.summarySection.tradingCost}</span>
        <div className={containerClasses}>
          <Progress value={80} />
          <span className={scoreClasses}>{(8).toFixed(1)}</span>
        </div>
      </div>
      <div className={containerClasses}>
        <span className={textClasses}>
          {text.summarySection.tradingPlatforms}
        </span>
        <div className={containerClasses}>
          <Progress value={80} />
          <span className={scoreClasses}>{(8).toFixed(1)}</span>
        </div>
      </div>
      <div className={containerClasses}>
        <span className={textClasses}>{text.summarySection.support}</span>
        <div className={containerClasses}>
          <Progress value={80} />
          <span className={scoreClasses}>{(8).toFixed(1)}</span>
        </div>
      </div>
    </CardLayout>
  );
};

export default ScoreCard;
