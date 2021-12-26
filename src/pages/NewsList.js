import React, {useState, useEffect} from 'react'
import Comments from './Comments'
import {MdOutlineBookmarkBorder, MdOutlineBookmark} from "react-icons/md";
import {IconContext} from "react-icons";

//1. Show news items that are bookmarked
//  - event.target.id to bubble up id
//  - store id in state & local storage 
//  - render bookmark icon state based on stored ids
//  - Create NewsItem component. This should make it easier to render components rather then re-rendering whole list.


//2. List news items are bookmarked
// - pass stored news id list from state into newsList component
// - Make newsList component generic to accept a arbitrary child component

//3. Add notes to news items that are bookmarked 


function LikeIcn(props) {
    if (props.isActive) {
        return (
            <IconContext.Provider value={{ style: {fontSize: '24px', color: "rgb(202 138 4)"}}}>
                <MdOutlineBookmark />
            </IconContext.Provider>
        )
    } else {
        return (
            <IconContext.Provider value={{ style: {fontSize: '24px', color: "rgb(202 138 4)"}}}>
                <MdOutlineBookmarkBorder />
            </IconContext.Provider>
        )
    }
}

const checkActive = (likedList, id) => {
     const newsIds = likedList.map(news => news.id)
     return newsIds.includes(id)
}


function NewsList(props) {
    const [newsList, setNewsList] = useState([])
    const [likedList, setLikedList] = useState([])

    useEffect(() => {
        fetchNewsList(props.selected)
    }, [props.selected, likedList])

    const handleLike = (id) => {
        if (checkActive(likedList, id)) {
            // check if ID aleady exists then set Icn to false 
            // TODO icon status doesn't change after removing element
            setLikedList(likedList.filter(news => news.id === id))
            console.log("removed bookmark")
        } else {
            // If ID does not exist store and set Icn to true
            setLikedList([...likedList, {id: id, notes: 'oppai'}])
            console.log("added bookmark")
        }
    }

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
                    <li className={"grid-rows-3"} key={item?.id}>
                        <div className='grid grid-cols-2'>
                            <div>
                                <a className={"text-lg text-yellow-600"} href={item?.url}>{item?.title}</a>
                            </div>  
                            <div className='justify-self-end'>
                                <button onClick={() => handleLike(item?.id)}>
                                    <LikeIcn isActive={checkActive(likedList, item?.id)}/>
                                </button>
                            </div>
                        </div>
                        <div>
                            <label className={"ml-1 text-sm text-yellow-700"}>by {item?.by} | {mon}/{day}/{yr}, {hr > 12 ? hr - 12 : hr}:{min} {hr > 12 ? "PM" : "AM"} | {item?.descendants} comments</label>
                        </div>
                        <div>
                            <Comments commentIds={item?.kids} isActive={false}/>
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