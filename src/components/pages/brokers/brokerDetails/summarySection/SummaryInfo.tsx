import Image from "next/image";
import RateBroker from "./RateBroker";
import SummaryGroupBtns from "./SummaryGroupBtns";
import BrokerLogo from "public/images/png/brokerLogo.jpeg";
import BrokerLevel from "public/images/png/brokerLevel.png";
import text from "public/locales/fa/brokerDetails.json";
const SummaryInfo = ({ brokerLevel }: { brokerLevel: string }) => {
  return (
    <div className="pb-10 flex items-center gap-7">
      {/* img part */}
      <div
        className={`${
          brokerLevel === "1"
            ? "[border-image:linear-gradient(to_top_left,#c45f51,_#fae6da_24%,_#ffaa87_44%,_#ffc3b3_66%,_#ffbeb2_85%,_#e99a7f)_10_10]"
            : ""
        } border-8 -translate-y-3/4 2xl:-translate-y-1/2 hidden lg:block`}
      >
        <Image
          className=" border-4 border-black w-[200px]"
          alt="broker-logo"
          width={100}
          height={100}
          src={BrokerLogo}
          quality={100}
        />
      </div>
      {/* info part */}
      <div className="flex gap-5 flex-col relative w-full">
        <div
          className={`p-2 flex gap-2 items-center  px-2 w-fit mt-5 ${
            brokerLevel === "1" ? "bg-level1" : ""
          }`}
        >
          <Image src={BrokerLevel} alt="primium-logo" width={16} height={16} />
          <span className="text-xs font-bold">
            {text.summarySection.brokerLevel}
          </span>
        </div>
        <RateBroker rate="7.5" reviews="29" color="#e2a18b" />
        <div className="grid grid-cols-2 items-center gap-4 w-[420px]">
          <p className="text-sm min-w-[244px]">
            {text.summarySection.founded}:
            <span className="font-bold mr-1">2019</span>
          </p>
          <p className="text-sm min-w-[244px]">
            {text.summarySection.headquarters}:
            <span className="font-bold mr-1">seycheles</span>
          </p>
          <p className="text-sm min-w-[244px]">
            {text.summarySection.minDeposit}:
            <span className="font-bold mr-1">10 USD</span>
          </p>
          <p className="text-sm min-w-[244px] flex">
            {text.summarySection.maxLev}:
            <span className="font-bold mr-1">1:1000</span>
          </p>
        </div>
        <SummaryGroupBtns />
      </div>
    </div>
  );
};

export default SummaryInfo;
