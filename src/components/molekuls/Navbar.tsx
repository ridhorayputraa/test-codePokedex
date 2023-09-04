

import { Link, BrowserRouter } from "react-router-dom";



function Navbar() {
  return (
    
    <nav  className='sticky top-0 z-10 bg-green-200 opacity-90  items-center flex w-full justify-around  '>
      <div className=" max-w-screen-md w-full items-center text-center content-center justify-items-center  flex flex-row justify-around">


      <p className="font-poppins text-xl font-bold text-slate-900 ">
<Link to={'/'}>
        Pokedex
</Link>
      </p>
  
        <Link className="font-poppins text-lg text-slate-900" to={`/pokemon`}>Favorite</Link>
      

      </div>
    
    </nav>
    
  )
}

export default Navbar

