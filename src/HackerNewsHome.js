import React, {Component} from 'react'
import NewsBar from './NewsBar'
import NewsList from './NewsList'
import './index.css'


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