import React, {Component} from 'react'
import { Outlet, Link } from "react-router-dom";

//import 'pages/../index.css'


class HackerNav extends Component {
    

    render() {
        return (
        <div className={"justify-center"}>
            <h1 className={"my-4 text-center h-12 text-4xl text-yellow-600 font-semibold"}>Hacker News Clone</h1>
            <nav>
                <ul className={"my-6 grid grid-cols-3 justify-items-center content-center"}>
                    <div>
                        <Link className={"text-lg text-yellow-600"} to="/">TOP STORIES</Link>
                    </div>
                    <div>
                        <Link className={"text-lg text-yellow-600"} to="/new">LATEST STORIES</Link>
                    </div>
                    <div>
                        <Link className={"text-lg text-yellow-600"} to="/best">BEST STORIES</Link>
                    </div>
                </ul>
            </nav>
    
          <Outlet />
        </div>
        )
    }
}

export default HackerNav


