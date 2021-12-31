import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "https://inotebook-b.herokuapp.com"

  let notesinitial = [];

  const [notes, setNotes] = useState(notesinitial)
  const [alertShow, setAlertShow] = useState(false);
  const [alert, setAlert] = useState(false,"This is React notes projects...","warning");
  const [alerttype, setAlerttype] = useState("warning");

  //get all notes
  const getNotes = async () => {
    //api call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('login-token'),
        // 'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE4MjE5NWI2MzRmMDRiYzc2YTRhYTM3In0sImlhdCI6MTYzNTkxNjE1Mn0.fYyqdoqXOBApXq2hN5wRTEr_O4luRhTBtSs4Ox8CvXQ",
      }
    });
    let json = await response.json();

    console.log(json)
    setNotes(json);
  }

  const [getdetail, setGetdetail] = useState("");
  //get user details
  const getdetails = async () => {
    //api call
    const response = await fetch(`${host}/api/auth/getuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('login-token'),
        // 'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE4MjE5NWI2MzRmMDRiYzc2YTRhYTM3In0sImlhdCI6MTYzNTkxNjE1Mn0.fYyqdoqXOBApXq2hN5wRTEr_O4luRhTBtSs4Ox8CvXQ",
      }
    });
     setGetdetail(await response.json());
    // console.log(getdetail)
    // console.log(getdetail.name)
  }

  //add notes
  const addNote = async (title, description, tag) => {
    //api call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('login-token'),
      },
      body: JSON.stringify({ title, description,tag: tag ? tag : "general" })
    });
    const newnote = await response.json();
    setNotes(notes.concat(newnote))
  }

  // delete notes
  const deleteNote = async (id) => {
    //api call
    // eslint-disable-next-line
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('login-token'),
      }
    });
    // let json = response.json();
    // setNotes(json);


    console.log("delete note:", id)
    let newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }

  //update notes
  const updateNote = async (id, title, description, tag) => {
    //api call
    // eslint-disable-next-line
     await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('login-token'),
      },
      body: JSON.stringify({ title, description, tag })
    });

    //logic
    let newNotes = JSON.parse(JSON.stringify(notes))
    // Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag; 
        break; 
      }
    }  
    setNotes(newNotes);
  }
  
  return (
    <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, updateNote, getNotes, getdetails, setGetdetail,getdetail ,alertShow,setAlertShow , alert , alerttype , setAlert , setAlerttype }}>
      {props.children}
    </NoteContext.Provider>
  );
}

export default NoteState;