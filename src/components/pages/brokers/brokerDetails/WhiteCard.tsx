type PropTypes = {
  children: React.ReactNode;
  className?: string;
  forwardedRef?: React.Ref<HTMLDivElement>;
};
const WhiteCard = ({ children, className, forwardedRef }: PropTypes) => (
  <div
    ref={forwardedRef}
    className={`w-full bg-white px-10  pb-10 ${className}`}
  >
    {children}
  </div>
);

export default WhiteCard;
