import StarIcon from 'public/images/svg/star.svg';
import text from 'public/locales/fa/brokerDetails.json';

type PropsType = {
  rate: string;
  reviews: string;
  color: string;
};

const RateIcon = ({ starColor, bgColor, percent }: RateIconPropsType) => {
  const count = Math.ceil(percent / 20);
  return (
    <div className='relative flex h-7 items-center bg-secondary-foreground/20'>
      <div
        style={{ width: `${percent.toString()}%`, backgroundColor: bgColor }}
        className={`absolute flex h-full items-center `}
      >
        {[...new Array(count)].map((_, index) => (
          <div key={index} className='z-40 border-l-2 border-white p-2'>
            <StarIcon color={starColor} />
          </div>
        ))}
      </div>
      {5 - count > 0 && (
        <div className='flex size-full items-center justify-end'>
          {[...new Array(5 - count)].map((_, index) => (
            <div key={index} className='z-20 border-l-2 border-white p-2'>
              <StarIcon color='white' />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
const RateBroker = ({ rate, reviews, color }: PropsType) => (
  <div className='grid w-[300px] grid-cols-2 gap-2'>
    <RateIcon bgColor='#000' starColor={color} percent={+rate * 10} />
    <div className='flex items-center gap-2'>
      <p className='text-lg font-bold text-level1-foreground'>{`${rate}`}</p>
      <span
        className={`text-lg text-level1-foreground `}
      >{`(${reviews} ${text.summarySection.reviews})`}</span>
    </div>
  </div>
);

export default RateBroker;

type RateIconPropsType = {
  starColor: string;
  bgColor: string;
  percent: number;
};
