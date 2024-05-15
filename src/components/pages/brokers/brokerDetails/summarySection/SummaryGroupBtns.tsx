import { cn } from "@/lib/utils";

type PropsType = {
  className?: string;
  hideBtn?: boolean;
};
const SummaryGroupBtns = ({ className, hideBtn }: PropsType) => {
  const buttonClasses = `border border-level1-foreground hover:bg-level1-foreground text-sm font-bold text-black w-[150px] p-2`;
  const rateButtonClasses =
    "border border-level1-foreground bg-level1-foreground text-sm font-bold text-black w-[150px] p-2";
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-4 2xl:absolute left-0 top-[14px] mt-[6px]",
        className
      )}
    >
      <button className={buttonClasses}>Become an IB</button>
      <button className={cn(buttonClasses, hideBtn ? "hidden" : "")}>
        Rate and Review
      </button>
      <button className={buttonClasses}>Demo Account</button>
      <button className={rateButtonClasses}>Real Account</button>
    </div>
  );
};

export default SummaryGroupBtns;
