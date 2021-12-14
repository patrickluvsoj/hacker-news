import React, {useState, useEffect} from 'react'

function NewsList(props) {
    const [newsList, setNewsList] = useState([])

    useEffect(() => {
        fetchNews(props.selected)
        console.log("loading news list for: " + props.selected)
    }, [props.selected])

    async function fetchNews(selected) {
        const response = await fetch(`https://hacker-news.firebaseio.com/v0/${selected}.json?print=pretty`)
        const jsonObj = await response.json()
        setNewsList(jsonObj.map(news => <li>{news}</li>))
    }
    
    return (
        <ul>
            {newsList}
        </ul>
    )
}

export default NewsList