type PropTypes = {
  children: React.ReactNode;
  className?: string;
};
const WhiteCard = ({ children, className }: PropTypes) => {
  return (
    <div className={`bg-white px-10 pb-10  w-full ${className}`}>
      {children}
    </div>
  );
};

export default WhiteCard;
