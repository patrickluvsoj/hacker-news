import React from 'react'
import { Outlet, NavLink } from "react-router-dom";


function HackerNav(){

    return (
        <div className={"justify-center"}>
            <h1 className={"my-4 text-center h-12 text-4xl text-yellow-600 font-semibold"}>Hacker News Clone</h1>
            <nav>
                <ul className={"my-6 grid grid-cols-3 justify-items-center content-center"}>
                    <div>
                        <NavLink 
                            className={({isActive}) => "tracking-wider text-lg text-yellow-600" + (isActive ? " font-bold" : " ")}
                            to="/">
                            TOP STORIES
                        </NavLink>
                    </div>
                    <div>
                        <NavLink 
                            className={({isActive}) => "tracking-wider text-lg text-yellow-600" + (isActive ? " font-bold" : " ")}
                            to="/new">
                            LATEST STORIES
                        </NavLink>
                    </div>
                    <div>
                        <NavLink 
                            className={({isActive}) => "tracking-wider text-lg text-yellow-600" + (isActive ? " font-bold" : " ")}
                            to="/best">
                            BEST STORIES
                        </NavLink>
                    </div>
                </ul>
            </nav>
    
          <Outlet />
        </div>
    )
}

export default HackerNav


