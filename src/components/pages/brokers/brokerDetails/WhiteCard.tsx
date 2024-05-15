type PropTypes = {
  children: React.ReactNode;
  className?: string;
  forwardedRef?: React.Ref<HTMLDivElement>;
};
const WhiteCard = ({ children, className, forwardedRef }: PropTypes) => {
  return (
    <div
      ref={forwardedRef}
      className={`bg-white px-10 pb-10  w-full ${className}`}
    >
      {children}
    </div>
  );
};

export default WhiteCard;
