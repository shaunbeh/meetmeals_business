import { forwardRef } from "react";
import WhiteCard from "../WhiteCard";
import ContactCard from "./ContactCard";
import LicenceCard from "./LicenceCard";
import ScoreCard from "./ScoreCard";
import SummaryInfo from "./SummaryInfo";

type PropsType = { brokerLevel: string };
const BrokerSummarySection = forwardRef<HTMLDivElement, PropsType>(
  ({ brokerLevel }: PropsType, ref) => {
    const colorClasses =
      brokerLevel === "1"
        ? "bg-level1-foreground"
        : brokerLevel === "2"
        ? ""
        : "";
    return (
      <WhiteCard forwardedRef={ref}>
        <SummaryInfo brokerLevel={brokerLevel} />
        <div className="grid 2xl:grid-cols-3 gap-4">
          <ScoreCard />
          <LicenceCard bgColor={colorClasses} />
          <ContactCard />
        </div>
      </WhiteCard>
    );
  }
);

export default BrokerSummarySection;
