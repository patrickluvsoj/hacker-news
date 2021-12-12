import React from 'react'

function NewsList(props) {
    function fetchNews(selected) {
        const url = `https://hacker-news.firebaseio.com/v0/${selected}.json?print=pretty`
        const response = fetch(url)
        const jsonObj = response.json()
        const newsList = jsonObj.map(news => <li>{news}</li>)
        console.log('Inside async function: \n' + newsList)
        return newsList
    }

    console.log('Outside async function: \n' + fetchNews(props.selected))

    return (
        <ul>
            {fetchNews(props.selected)}
        </ul>
    )
}

export default NewsList