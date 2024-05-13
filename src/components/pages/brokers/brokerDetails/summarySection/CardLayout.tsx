import ArrowIcon from "public/images/svg/arrow.svg";
type PropsType = {
  title: string;
  bgColor: string;
  children: React.ReactNode;
  showIcon?: boolean;
};
const CardLayout = ({ title, bgColor, showIcon, children }: PropsType) => {
  return (
    <div style={{ background: bgColor }} className="flex flex-col p-5 gap-5">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold capitalize ">{title}</h2>
        {showIcon && <ArrowIcon className="rotate-180 cursor-pointer" />}
      </div>
      {children}
    </div>
  );
};

export default CardLayout;
