import StarIcon from "public/images/svg/star.svg";
import text from "public/locales/fa/brokerDetails.json";
type PropsType = {
  rate: string;
  reviews: string;
  color: string;
};
const RateBroker = ({ rate, reviews, color }: PropsType) => {
  return (
    <div className="grid grid-cols-2 gap-2 w-[300px]">
      <RateIcon bgColor="#000" starColor={color} percent={+rate * 10} />
      <div className="flex items-center gap-2">
        <p className={`text-[#e2a18b] text-lg font-bold`}>{`${rate}`}</p>
        <span
          className={`text-[#e2a18b] text-lg `}
        >{`(${reviews} ${text.summarySection.reviews})`}</span>
      </div>
    </div>
  );
};

export default RateBroker;

type RateIconPropsType = {
  starColor: string;
  bgColor: string;
  percent: number;
};
const RateIcon = ({ starColor, bgColor, percent }: RateIconPropsType) => {
  const count = Math.ceil(percent / 20);
  return (
    <div className={`flex items-center relative bg-[#dcdce6] h-7`}>
      <div
        style={{ width: `${percent.toString()}%`, backgroundColor: bgColor }}
        className={`h-full absolute flex items-center `}
      >
        {[...new Array(count)].map((_, index) => (
          <div className="p-2 border-l-2 border-white z-40">
            <StarIcon color={starColor} key={index} />
          </div>
        ))}
      </div>
      {5 - count > 0 && (
        <div className="w-full h-full flex items-center justify-end">
          {[...new Array(5 - count)].map((_, index) => (
            <div className="p-2 border-l-2 border-white z-20">
              <StarIcon color="white" key={index} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
