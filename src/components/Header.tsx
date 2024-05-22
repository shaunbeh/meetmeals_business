import SearchIcon from 'public/images/svg/search.svg'
import NetIcon from 'public/images/svg/net.svg'
import DownloadIcon from 'public/images/svg/download.svg'
const menuItemsList=[
  {
    title:'brokers'
  },
  {
    title:'scam'
  },
  {
    title:'BV Assessment'
  },
  {
    title:'rankings'
  },
  {
    title:'regulators'
  },
  {
    title:'news'
  },
  {
    title:'claims'
  },
  {
    title:'expo'
  },
  {
    title:'event'
  },
  {
    title:'awards'
  }
]
const Header=()=>{
  return(
    <div className="flex items-center justify-between bg-black h-[64px] px-4 fixed top-0 w-full z-50">
      <span className="h-7 w-[190px] text-primary text-xl">PLATFORMHA</span>
      <div className="ml-[60px] hidden xl:flex items-center">
        {menuItemsList.map(item=>(
        <MenuItems title={item.title}/>
        ))}
      </div>
      <div className='flex items-center gap-3'>
        <div className="size-10 bg-secondary-foreground flex items-center justify-center text-white cursor-pointer"><SearchIcon className='size-6'/></div>
        <div className="size-10 bg-secondary-foreground flex items-center justify-center text-white cursor-pointer"><DownloadIcon className='size-6'/></div>
        <div className="size-10 bg-secondary-foreground flex items-center justify-center text-white cursor-pointer"><NetIcon className='size-6'/></div>
        <button className="w-[90px] bg-primary text-white ml-3 flex justify-center items-center h-10 text-sm ">Sign In</button>
      </div>
    </div>
  )
}

export default Header


const MenuItems=({title}:{title:string})=>{
  return(
    <div key={title} className="hover:bg-secondary-foreground h-10 px-3 whitespace-nowrap capitalize text-white text-sm font-bold flex items-center justify-center cursor-pointer">
      {title}
    </div>
  )
}
