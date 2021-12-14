import React, {useState, useEffect} from 'react'

function NewsList(props) {
    const [newsList, setNewsList] = useState([])

    useEffect(() => {
        fetchNews(props.selected)
        console.log("loading news list for: " + props.selected)
    }, [props.selected])

    async function fetchId(selected) {
        const response = await fetch(`https://hacker-news.firebaseio.com/v0/${selected}.json?print=pretty`)
        const jsonObj = await response.json()
        //setNewsList(jsonObj.map(news => <li>{news}</li>))
        const items = jsonObj.map(id => {
            return fetchNews(id)
        })

        return items.maps(item => {
            <li key={item.id}>
                <a href={item.url}>{item.title}</a>
                by {item.by} | {item.time} | {item.score}
            </li>
        })
    }

    async function fetchNews(id) {
        const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
        return await response.json()
    }
    
    return (
        <ul>
            {newsList}
        </ul>
    )
}

export default NewsList