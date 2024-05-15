import Image from "next/image";
import WhiteCard from "../WhiteCard";
import BrokerLogo from "public/images/png/brokerLogo.jpeg";
import RateBroker from "./RateBroker";
import SummaryGroupBtns from "./SummaryGroupBtns";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/Tabs";
const StickySummarySection = ({
  scrollToSection,
  currentSection,
}: {
  scrollToSection: (sectionId: string) => void;
  currentSection: string;
}) => {
  const TabsTriggerClasses =
    "data-[state=active]:border-b-4 border-level1-foreground h-full data-[state=active]:text-md data-[state=active]:font-bold data-[state=active]:transition-colors";
  return (
    <WhiteCard className="px-5 !pb-0 hidden lg:block fixed top-0 shadow-xl z-50">
      <div className="flex items-center justify-between py-5">
        <div className="flex items-center gap-2">
          <Image
            className="w-[100px]"
            alt="broker-logo"
            width={100}
            height={75}
            src={BrokerLogo}
            quality={100}
          />
          <div className="flex flex-col">
            <span className="text-xl font-bold">wetrade</span>
            <RateBroker rate="7.5" reviews="29" color="#e2a18b" />
          </div>
        </div>
        <SummaryGroupBtns className={"2xl:static"} hideBtn />
      </div>
      <Tabs value={currentSection} defaultValue="account" dir="rtl">
        <TabsList className="p-0">
          <TabsTrigger
            className={TabsTriggerClasses}
            value="account"
            onClick={() => scrollToSection("account")}
          >
            Account & Cost
          </TabsTrigger>
          <TabsTrigger
            className={TabsTriggerClasses}
            value="deposit"
            onClick={() => scrollToSection("deposit")}
          >
            Deposit & Withdrawal
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </WhiteCard>
  );
};

export default StickySummarySection;
