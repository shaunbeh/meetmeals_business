const SummaryGroupBtns = () => {
  const buttonClasses = `border border-[#eea890] hover:bg-[#eea890] text-sm font-bold text-black w-[150px] p-2`;
  const rateButtonClasses =
    "border border-[#eea890] bg-[#eea890] text-sm font-bold text-black w-[150px] p-2";
  return (
    <div className="flex flex-wrap items-center gap-4 2xl:absolute left-0 top-[14px] mt-[6px]">
      <button className={buttonClasses}>Become an IB</button>
      <button className={buttonClasses}>Rate and Review</button>
      <button className={buttonClasses}>Demo Account</button>
      <button className={rateButtonClasses}>Real Account</button>
    </div>
  );
};

export default SummaryGroupBtns;
