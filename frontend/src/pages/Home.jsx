﻿import { useEffect, useState } from "react"
import api from '../api'
import Note from '../components/Note'
import '../styles/Home.css'

function Home(){

    const [notes,setNotes] = useState([])
    const [content,setContent] = useState("")
    const [title,setTitle] = useState("")

    useEffect(()=>{
        getNotes()
    },[])

    const getNotes = () => {
        api
        .get("/api/notes/")
        .then((res)=>res.data)
        .then((data)=>{setNotes(data);console.log(data)})
        .catch((err)=>alert(err))
    }

    const deleteNote = (id) => {
        api
        .delete(`api/notes/delete/${id}/`)
        .then((res)=>{
            if(res.status === 204) alert("Note Deleted")
            else alert("Failed to Delete Note")
            getNotes()
        }).catch((error) => alert(error))

    }

    const createNote = (e) => {
        e.preventDefault()
        api.post("api/notes/",{content,title})
        .then((res)=>{
            if(res.status === 201) alert("Note Created")
            else alert("Failed To Create Note")
            getNotes()
        }).catch((err)=>alert(err))
    }

    return (<>
        <div>
            <h2>Notes</h2>
            {notes.map((note)=>
            <Note note={note} onDelete={deleteNote} key={note.id} />
            )}

        </div>
        <form onSubmit={createNote}>
            <label htmlFor="title">Title </label><br />
            <input type="text" id="title" name="title" required onChange={(e)=>setTitle(e.target.value)} value={title}/>

            <label htmlFor="title">Content </label><br />
            <textarea id="content" name="content" required onChange={(e)=>setContent(e.target.value)} value={content}>
            </textarea>
            <br />

            <input type="submit" value="Submit"/>

        </form>
        
        </>)
}



export default Home