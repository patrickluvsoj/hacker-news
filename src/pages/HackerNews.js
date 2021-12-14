import React, {Component} from 'react'
import { Outlet, Link } from "react-router-dom";

//import 'pages/../index.css'


class HackerNews extends Component {

    render() {
        return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Top Stories</Link>
                    </li>
                    <li>
                        <Link to="/new">Latest Stories</Link>
                    </li>
                    <li>
                        <Link to="/best">Best Stories</Link>
                    </li>
                </ul>
            </nav>
    
          <Outlet />
        </>
        )
    }
}

export default HackerNews


