import WhiteCard from "../WhiteCard"
import ClockIcon from 'public/images/svg/clock.svg'

const BrokerNewsSection=({id}:{id:string})=>{
  return(
    <WhiteCard className='pt-10 min-h-[400px] flex flex-col justify-between'>
  <h2 className='text-2xl font-bold' id={id}>
       Broker News
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-2" >
        <NewsCard 
        title='Congratulations to the Excellent Brokers for Winning the Live Trading Assessment Awards at the 2024 Award for BrokersView with Outstanding Assessment Ceremony'
        date='2024-05-10'
        content="Cheer for the excellence presented by the amazing brokers and look forward to a brighter future in the online trading arena."
        />
         <NewsCard 
        title='Congratulations to the Excellent Brokers for Winning the Live Trading Assessment Awards at the 2024 Award for BrokersView with Outstanding Assessment Ceremony'
        date='2024-05-10'
        content="Cheer for the excellence presented by the amazing brokers and look forward to a brighter future in the online trading arena."
        />
      </div>
      <div className="flex w-full items-center justify-center mt-6">
      <button
            className="border border-black/20 hover:bg-level1-foreground hover:border-level1-foreground w-[180px] h-10 flex items-center justify-center"
          >
            See all  
          </button>
      </div>
    </WhiteCard>
  )
}

export default BrokerNewsSection
type NewsCardPropsType={
  title:string
  date:string
  content:string
}
const NewsCard=({title,date,content}:NewsCardPropsType)=>{
  return(
<div className="p-5 bg-secondary/50 min-h-[127px] cursor-pointer">
  <div className="flex items-center justify-between">
    <span className="font-bold truncate ml-4 overflow-hidden w-[367px] ">{title}</span>
    <div className="flex items-center whitespace-nowrap gap-1 text-xs text-secondary-foreground/50">
      <ClockIcon className='size-4 t'/>
      <span>{date}</span>
    </div>
  </div>
<span>{content}</span>
</div>
  )
}