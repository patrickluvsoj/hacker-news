import React, {useState, useEffect} from 'react'

function BookmarkList() {

    const [bookmrkList, setBookmrkList] = useState(localStorage.getItem("bookmarks") 
                                        ? JSON.parse(localStorage.getItem("bookmarks")) 
                                        : [])   

    return (
        <ul>
            {bookmrkList.map(news => <li>{news.id}</li>)}
        </ul>
    )
}

export default BookmarkList