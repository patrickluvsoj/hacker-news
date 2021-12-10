import React, {Component} from 'react'
import NewsBar from './NewsBar'
import NewsList from './NewsList'
import './index.css'

/* 
TODO
    Need to figure out an way to update the URL path
        check the URL before component loads then pass that down as prop to NewsBar
        Separate the NavBar to 3 separate NavLinks and use conditional rendering
        

 */


class App extends Component {
    state = {
        newsList: []
    }

    fetchNews = async (selected) => {
        const url = `https://hacker-news.firebaseio.com/v0/${selected}.json?print=pretty`
        const response = await fetch(url)
        const newsObjects = await response.json()

        const newsList = newsObjects.map(news => {
            return <li>{news}</li>
        })

        this.setState({
            newsList: newsList
        })
    }


    render() {
        return (

                <div>
                    <h1>Hacker News</h1>
                    <NewsBar fetchNews={this.fetchNews}/>
                    <NewsList newsList={this.state.newsList}/>
                </div>
        )
    }
}

export default App