import React, {useState, useRef, useEffect} from 'react'
import convertTimeHelper from './convertTimeHelper'

//Note functionality Requirements
//  - Be able to add notes
//      - handleAddNote that will store notes into noteList
//        - store it to local storage
//  - Be able to delete the note
//      - create a NoteItem component
//  - Be able to edit note inline
//  - Style the note

function NoteItem(props) {
    const [editMode, setEditMode] = useState(false)
    const [note, setNote] = useState(props.note.text)

    const handleClick = (e) => {
        if (e.target.name === "delete") {
            props.handleDelete(props.note.time)
        } else {
            setEditMode(!editMode)
        }
    }

    const handleChange = (e) => {
        setNote(e.target.value)
    }

    const handleSubmit = (e) => {
        props.handleEdit(note, props.note.time)
        setNote(note)
        setEditMode(!editMode)
        e.preventDefault()
    }

    // Format the unix tiemstamp
    const editableNote = (
        <li>
            <label>{convertTimeHelper(props.note.time)}: </label>
            <form>
                <input type="text" onChange={handleChange} value={note}/>
                <input type="submit" value="Done" name="done" onClick={handleSubmit}/>
            </form>
            <button name="delete" onClick={handleClick}>Delete</button>
        </li>
    )

    const plainNote = (
        <li className="grid-rows-3 mb-3 ml-1">
            <div>
                <label className="ml-1 text-sm text-yellow-700"> {convertTimeHelper(props.note.time)}: </label>
                <label className="text-sm text-yellow-700">{note}</label>
            </div>
            <div>
                <button className="ml-1 text-sm text-yellow-700" name="edit" onClick={handleClick}>Edit</button>
                <button className="ml-2 text-sm text-yellow-700" name="delete" onClick={handleClick}>Delete</button>
            </div>
        </li>
    )

    return (
        editMode ? editableNote : plainNote
    )
}


function Notes(props) {
    //data format [{time: unixTimestamp, text: string}]
    const [noteList, setNoteList ] = useState(localStorage.getItem(props.noteId) ?
                                     JSON.parse(localStorage.getItem(props.noteId)) :
                                     [])
    
    const [note, setNote] = useState("")

    const handleDelete = (date) => {
        const newNoteList = noteList.filter(note => note.time !== date)

        setNoteList(newNoteList)
        localStorage.setItem(props.noteId, JSON.stringify(newNoteList))
    }
    
    const handleEdit = (text, time) => {
        const newNoteList = noteList.map(note => {
           if (note.time === time) {
                return {time: time, text: text}
           } else {
                return {time: note.time, text: note.text}
           }
        })

        localStorage.setItem(props.noteId, JSON.stringify(newNoteList))
    }

    const handleAdd = (e) => {
        if (note) {
            const newNoteList = [...noteList, {time: Math.floor(Date.now()), text: note}]

            setNoteList(newNoteList)
            localStorage.setItem(props.noteId, JSON.stringify(newNoteList))

            setNote("")
        } else alert("Note is empty")
        
        e.preventDefault()
    }

    const handleChange = (e) => {
        setNote(e.target.value)
    }

    return (
        <div className="mt-2">
            <label className="ml-1 text-sm font-semibold text-yellow-700">My Notes:</label>
            <ul>
                {noteList.map(jsonNote => <NoteItem key={jsonNote.time} note={jsonNote} handleDelete={handleDelete} handleEdit={handleEdit}/>)}
            </ul>
            <form onSubmit={handleAdd}>
                <input classname="ml-1 accent-slate-200" type="text" value={note} onChange={handleChange} />
                <input className="ml-1 text-sm cursor-pointer text-yellow-700" type="submit" value="Add Note" />
            </form>
        </div>

        
    )
}

export default Notes