import React, {useState, useEffect} from 'react'
import {MdExpandMore, MdExpandLess} from "react-icons/md";
import {IconContext} from "react-icons";

function ExpandIcon(props) {
    if (props.isActive) {
        return (
            <IconContext.Provider value={{ style: {fontSize: '24px', color: "rgb(202 138 4)"}}}>
                <MdExpandMore />
            </IconContext.Provider>
        )
    } else {
        return (
            <IconContext.Provider value={{ style: {fontSize: '24px', color: "rgb(202 138 4)"}}}>
                <MdExpandLess />
            </IconContext.Provider>
        )
    }
}

function Comments(props) {

    const [isActive, setActive] = useState(props.isActive)
    const [commentList, setComments] = useState("")

    useEffect(() => {
        fetchComments(props.commentIds)
    }, [])

    async function fetchComments(commentIds) {
        if (commentIds) {
            const jsonComments = await Promise.all(commentIds.slice(0,5).map(id => {
                return fetch(`https://hacker-news.firebaseio.com/v0/item/${id.toString()}.json?print=pretty`)
                        .then(comment => comment.json())
            }))
    
            const commentList = jsonComments.map(comment => {
                return (
                    <li key={comment.id} >
                        <label className={"ml-1 mb-2 text-sm text-yellow-700"}>{"By " + comment.by + ": "}</label>
                        <div className={"ml-3 mb-2 text-sm text-yellow-700"} dangerouslySetInnerHTML={{__html: comment.text}} />
                    </li>
                    
                )
    
            })

            setComments(commentList)

        } else {
            const commentList = <li className={"ml-3 mb-2 text-sm text-yellow-700"}>"no comments"</li>
            setComments(commentList)
        }        
    }

    const handleClick = async () => {
        setActive(!isActive)
    }
    
    return(
        <div>
            <button className="justify-end" onClick={handleClick}>
                <ExpandIcon isActive={isActive}/>
            </button>
            <ul className={isActive ? "" : "hidden"}>
                {commentList}
            </ul>
        </div>

    )
}

export default Comments