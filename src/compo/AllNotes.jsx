import React, { useContext, useRef, useState, useEffect } from 'react'
import contextValue from '../context/notes/noteContext'
import Noteitem from './Noteitem';
import { useHistory } from 'react-router'
// import Button from '@mui/material/Button';
export const AllNotes = () => {
    let history = useHistory();
    
    const ref = useRef(null)
    const context = useContext(contextValue);
    const { notes, updateNote, setAlertShow, setAlert } = context;
    const [TagActive, setTagActive] = useState("All")
    const [note, setNote] = useState({ id: "", title: "", description: "", tag: "" });

    useEffect(() => {
        if (!localStorage.getItem("login-token")) {
            history.push("/login");
        }
        // eslint-disable-next-line
    }, [])

    //this is props for opening modal
    const updateNotes = (currentNote) => {
        console.log(currentNote);
        setNote({ id: currentNote._id, title: currentNote.title, description: currentNote.description, tag: currentNote.tag });
        ref.current.click();
    }
    //btn after click update save in data-base 
    let Update = (e) => {
        e.preventDefault();
        console.log(note.id)
        updateNote(note.id, note.title, note.description, note.tag);
        setAlertShow(true);
        setTimeout(() => {
            setAlertShow(false)
        }, 2000);
        setAlert('Your note has been updated');
    }

    let tag = new Set();
    for (const key in notes) {
        tag.add(notes[key].tag);
    }
    console.log(tag);

    let ft = Array.from(tag);
    let setTag = (e) => {
        console.log(this);
        console.log(e.target.name);
        setTagActive(e.target.name);
    }
    return (
        <div>
            <h2 className="text-muted text-center my-2"> Your Notes collections:</h2> <hr />
            <div className="container mx-2 text-muted ">

                <div className="btn-group btn-group-sm " role="group" aria-label="Basic example">
                    <button className={`btn ${TagActive === 'All' ? 'btn-primary' : 'btn-outline-primary'}  btn-sm mx-2`} onClick={setTag} name="All">All</button>

                    {
                        ft.map((e) => {
                            return (
                                <button className={`btn ${TagActive === e ? 'btn-primary' : 'btn-outline-primary'}  btn-sm mx-2`} onClick={setTag} name={e} key={e}>{e}</button>
                            )
                        })

                    }
                </div>
                {notes.length === 0 && "Nothing to show here.. Just simply add Your first Note...."}
            </div>
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                Launch static backdrop modal
            </button>
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Add title</label>
                                    <input type="email" className="form-control" value={note.title}  id="title" name="title" aria-describedby="emailHelp" onChange={onchange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Add description</label>
                                    <input type="etext" className="form-control" value={note.description} name="description" id="description" onChange={onchange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Add Tag</label>
                                    <input type="text" className="form-control" value={note.tag} name="tag" id="tag" onChange={onchange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={Update}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                {
                    notes.map((e) => {
                        if (TagActive === "All") {
                            return <Noteitem key={e._id} updateNotes={updateNote} note={e} />
                        }
                        else {
                            if (e.tag === TagActive) {
                                return <Noteitem key={e._id} updateNotes={updateNotes} note={e} />
                            }
                        }

                        return true
                    })
                }
            </div>

        </div>
    )
}
