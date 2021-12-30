import React, {useState, useEffect, useRef} from 'react'
import NewsItem from './NewsItem'

//1. Show news items that are bookmarked
//  - create a state object model that stores newsID and Notes about a newsItem
//  - create a new NewsItem component that has a bookmark icon which will change based on click
//  - create a handleLike function that will store which newsId are bookmarked/liked THEN pass it to NewsItem
//      - the function needs to check if the newsID is already store or not
//  - store the likedList state to local storage so that it persists after refresh


//2. List news items are bookmarked
// - pass stored news id list from state into newsList component
// - Make newsList component generic to accept a arbitrary child component

//3. Add notes to news items that are bookmarked 


const isBookmrked = (bookmrkList, id) => {
    const bookmrkIds = bookmrkList.map(news => news.id)
    //check news Ids that are stored in bookmarkList state
    console.log(`bookmarked Ids: ${bookmrkIds}\nadded Id: ${id}`)
    return bookmrkIds.includes(id)
}


function NewsList(props) {
    const [newsList, setNewsList] = useState([])
    // const [bookmrkList, setBookmrkList] = useState(localStorage.getItem("bookmarks") 
    //                                     ? JSON.parse(localStorage.getItem("bookmarks")) 
    //                                     : [])
    const bookmrkList = useRef(localStorage.getItem("bookmarks") 
                                        ? JSON.parse(localStorage.getItem("bookmarks")) 
                                        : [])   


    useEffect(() => {
        fetchNewsList(props.selected)
    }, [props.selected])

    // useEffect(() => {
    //     console.log("bookmarkList updated\nlocal storage:\n" + localStorage.getItem("bookmarks") + "\nbookmarkList:\n" + bookmrkList)
    // }, [bookmrkList])


    const handleLike = (id) => {
        let newBookmrkList;

        if (isBookmrked(bookmrkList.current, id)) {
            newBookmrkList = bookmrkList.current.filter(news => news.id !== id)
        } else {
            newBookmrkList = [...bookmrkList.current, {id: id, notes: ""}]
        }

        // setBookmrkList(newBookmrkList)
        bookmrkList.current = newBookmrkList
        localStorage.setItem("bookmarks", JSON.stringify(newBookmrkList))
        // Check local storage information with below
        //console.log("bookmarkList updated\nlocal storage:\n" + localStorage.getItem("bookmarks") + "\nbookmarkList:\n" + bookmrkList)
    }

    async function fetchNewsList(selected) {
        const ids = await fetch(`https://hacker-news.firebaseio.com/v0/${selected}.json?print=pretty`)
                                .then(response => response.json())

        const jsonItems = await Promise.all(ids.slice(0,20).map(id => {
            return fetch(`https://hacker-news.firebaseio.com/v0/item/${id.toString()}.json?print=pretty`)
                    .then(items => items.json())
        }))

        const news = jsonItems.map(item => {
            return (
                <NewsItem 
                    item={item} 
                    handleLike={handleLike}
                    selected={props.selected}
                    isBookmrked={isBookmrked(bookmrkList.current, item?.id)}
                />
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