

import { Link, BrowserRouter } from "react-router-dom";



function Navbar() {
  return (
    
    <div className='w-screen max-w-screen-xl border flex flex-row justify-center  border-red-400'>
      <div className=" max-w-screen-xl">

      <p>
        Pokedex
      </p>
  
        <Link to={`/pokemon`}>Favorite</Link>
      </div>
    
    </div>
    
  )
}

export default Navbar