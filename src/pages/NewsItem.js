import React, {useState, useEffect} from 'react'
import Comments from './Comments'
import Notes from './Notes'
import {MdOutlineBookmarkBorder, MdOutlineBookmark} from "react-icons/md";
import {IconContext} from "react-icons";
import convertTimeHelper from './convertTimeHelper'

//Conditional component that renders a bookmark icon
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

//conditinal component that renders Comments or Personal Notes
function Details(props) {
    if (props.selected !== 'bookmark') {
        return <Comments commentIds={props.item?.kids} isActive={false}/>
    } else {
        return <Notes noteId={props.item?.id}/>
    }
}

function NewsItem(props) {
    const [isActive, setIsActive] = useState(props.isBookmrked)
    //console.log(isActive)

    useEffect(() => {
        setIsActive(props.isBookmrked)
    }, [props.selected])

    //Formatting date
    const item = props.item
    const formattedTimeStr = convertTimeHelper(item?.time * 1000)

    const handleClick = () => {
        props.handleLike(item?.id)
        setIsActive(!isActive)
    }

    return (
        <div className={"m-2 p-2 border rounded border-gray-400"}>
            <li className={"grid-rows-3"}>
                <div className='grid grid-cols-2'>
                    <div>
                        <a className={"text-lg text-yellow-600"} href={item?.url}>{item?.title}</a>
                    </div>  
                    <div className='justify-self-end'>
                        <button onClick={handleClick}>
                            <LikeIcn isActive={isActive}/>
                        </button>
                    </div>  
                </div>
                <div>
                    <label className={"ml-1 text-sm text-yellow-700"}>by {item?.by} | {formattedTimeStr} | {item?.descendants} comments</label>
                </div>
                <div>
                    <Details selected={props.selected} item={item}/>
                </div>
            </li>
        </div>
    )
}

export default NewsItem












