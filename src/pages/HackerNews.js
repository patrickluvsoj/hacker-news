import React, {Component} from 'react'
import { Outlet, Link } from "react-router-dom";

//import 'pages/../index.css'


class HackerNews extends Component {
    // state = {
    //     newsList: []
    // }

    // fetchNews = async (selected) => {
    //     const url = `https://hacker-news.firebaseio.com/v0/${selected}.json?print=pretty`
    //     const response = await fetch(url)
    //     const newsObjects = await response.json()

    //     const newsList = newsObjects.map(news => {
    //         return <li>{news}</li>
    //     })

    //     this.setState({
    //         newsList: newsList
    //     })
    // }


    render() {
        return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link to="/top">Top Stories</Link>
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


