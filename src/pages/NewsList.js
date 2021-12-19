import React, {useState, useEffect} from 'react'

function NewsList(props) {
    const [newsList, setNewsList] = useState([])

    useEffect(() => {
        fetchNewsList(props.selected)
    }, [props.selected])

    async function fetchNewsList(selected) {
        const ids = await fetch(`https://hacker-news.firebaseio.com/v0/${selected}.json?print=pretty`)
                                .then(response => response.json())

        const jsonItems = await Promise.all(ids.slice(0,20).map(id => {
            return fetch(`https://hacker-news.firebaseio.com/v0/item/${id.toString()}.json?print=pretty`)
                    .then(items => items.json())
        }))

        const news = jsonItems.map(item => {
            const d = new Date(item?.time*1000)
            const day = d.getDay()
            const mon = d.getMonth()
            const yr = d.getFullYear()
            const hr = d.getHours()
            const min = d.getMinutes()

            return (
                <div className={"m-2 p-2 border rounded border-gray-400"}>
                    <li className={"grid-rows-2"} key={item?.id}>
                        <div>
                            <a className={"text-lg text-yellow-600"} href={item?.url}>{item?.title}</a>
                        </div>
                        <div>
                            <label className={"ml-1 text-sm text-yellow-700"}>by {item?.by} | {mon}/{day}/{yr}, {hr > 12 ? hr - 12 : hr}:{min} {hr > 12 ? "PM" : "AM"} | {item?.score} comments</label>
                        </div>
                    </li>
                </div>
            )
        })

        setNewsList(news)
    }
    
    return (
        <ul>
            {newsList}
        </ul>
    )
}

export default NewsList