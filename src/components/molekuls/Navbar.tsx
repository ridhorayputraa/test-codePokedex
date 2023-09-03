

import { Link, BrowserRouter } from "react-router-dom";



function Navbar() {
  return (
    
    <div className='w-screen border border-red-400'>
      <p>
        Pokedex
      </p>
  
        <Link to={`/pokemon`}>Favorite</Link>
    
    </div>
    
  )
}

export default Navbar