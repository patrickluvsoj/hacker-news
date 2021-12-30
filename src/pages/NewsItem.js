import React, {useState, useEffect} from 'react'
import Comments from './Comments'
import {MdOutlineBookmarkBorder, MdOutlineBookmark} from "react-icons/md";
import {IconContext} from "react-icons";

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

function NewsItem(props) {
    const [isActive, setIsActive] = useState(props.isBookmrked)
    //console.log(isActive)

    useEffect(() => {
        setIsActive(props.isBookmrked)
    }, [props.selected])

    //Formatting date
    const item = props.item
    const d = new Date(item?.time*1000)
    const day = d.getDay()  
    const mon = d.getMonth()
    const yr = d.getFullYear()
    const hr = d.getHours()
    const min = d.getMinutes()

    const handleClick = () => {
        props.handleLike(item?.id)
        setIsActive(!isActive)
    }

    return (
        <div className={"m-2 p-2 border rounded border-gray-400"}>
            <li className={"grid-rows-3"} key={item?.id}>
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
                    <label className={"ml-1 text-sm text-yellow-700"}>by {item?.by} | {mon}/{day}/{yr}, {hr > 12 ? hr - 12 : hr}:{min} {hr > 12 ? "PM" : "AM"} | {item?.descendants} comments</label>
                </div>
                <div>
                    <Comments commentIds={item?.kids} isActive={false}/>
                </div>
            </li>
        </div>
    )
}

export default NewsItem












