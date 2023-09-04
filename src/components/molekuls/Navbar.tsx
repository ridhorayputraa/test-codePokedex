

import { Link, BrowserRouter } from "react-router-dom";



function Navbar() {
  return (
    
    <div className='w-screen bg-slate-200 border  justify-center  border-red-400'>
      <div className=" max-w-screen-xl flex flex-row  justify-around">

      <p>
        Pokedex
      </p>
  
        <Link to={`/pokemon`}>Favorite</Link>
      </div>
    
    </div>
    
  )
}

export default Navbar