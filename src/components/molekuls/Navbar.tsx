

import { Link, BrowserRouter } from "react-router-dom";



function Navbar() {
  return (
    
    <div className=' bg-slate-200 border items-center flex w-full justify-around  border-red-400'>
      <div className=" max-w-screen-md w-full items-center text-center content-center justify-items-center  flex flex-row border border-red-600 justify-around">

      <p className="font-poppins text-xl font-bold text-slate-900 ">
        Pokedex
      </p>
  
        <Link className="font-poppins text-lg text-slate-900" to={`/pokemon`}>Favorite</Link>
      </div>
    
    </div>
    
  )
}

export default Navbar

