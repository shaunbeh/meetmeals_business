type PropTypes = {
  children: React.ReactNode;
  className?: string;
};
const WhiteCard = ({ children, className }: PropTypes) => (
  <div
    className={`w-full bg-white px-10  pb-10 ${className}`}
  >
    {children}
  </div>
);

export default WhiteCard;
