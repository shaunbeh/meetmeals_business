type PropTypes = {
  children: React.ReactNode;
};
const WhiteCard = ({ children }: PropTypes) => {
  return <div className="bg-white px-10 pb-10  w-full">{children}</div>;
};

export default WhiteCard;
