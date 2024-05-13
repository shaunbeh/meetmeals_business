import Image from "next/image";
import CardLayout from "./CardLayout";
import FlagImg from "public/images/png/flagIcon.png";
import text from "public/locales/fa/brokerDetails.json";
type PropsType = {
  bgColor: string;
};
const LicenceCard = ({ bgColor }: PropsType) => {
  return (
    <CardLayout
      title={text.summarySection.licenceStatus}
      bgColor="#fff8f3"
      showIcon
    >
      <div className="flex gap-4 items-center">
        <div
          className={`text-center text-sm font-bold w-[60px] h-6 uppercase ${bgColor}`}
        >
          c
        </div>
        <Image src={FlagImg} alt="flag" width={24} height={16} />
        <span className="truncate text-sm ">seycheles</span>
        <span className="text-sm font-bold">SD055</span>
        <div className="text-center capitalize bg-blue text-blue-foreground font-medium text-sm px-2 h-5 truncate">
          Authorised
        </div>
      </div>
    </CardLayout>
  );
};

export default LicenceCard;
