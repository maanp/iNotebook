import React, { useContext, useEffect, useRef , useState } from 'react'
import contextValue from '../context/notes/noteContext'
import Noteitem from './Noteitem';
import { useHistory } from 'react-router'

const Notes = () => {
    
    let history = useHistory();
    const context = useContext(contextValue);
    const { notes, getNotes , updateNote ,setAlertShow , setAlert } = context;
    useEffect(() => {
        if(!localStorage.getItem("login-token")){
            history.push("/login");

        }
        else{
            getNotes()

        }
        // eslint-disable-next-line
    }, [])
    const ref = useRef(null)

    const [note, setNote] = useState({id:"", title: "", description: "", tag: "" });
    //this is props for opening modal
    const updateNotes = (currentNote) => {
        console.log(currentNote);
        setNote({id:currentNote._id , title:currentNote.title , description : currentNote.description , tag:currentNote.tag});
        ref.current.click();
    }
    //btn after click update save in data-base 
    let Update = (e) => {
        e.preventDefault();
        console.log(note.id)
        updateNote(note.id,note.title, note.description, note.tag);
        setAlertShow(true);
    setTimeout(() => {
      setAlertShow(false)
    }, 2000);
    setAlert('Your note has been updated');
    }

    //on changing note value then save
    let onchange = (e) => {
        // console.log(e.target.name, e.target.value);
        setNote({ ...note, [e.target.name]: e.target.value });
    }

    return (
        <div className="my-3 row">
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
            <h2>Your Notes</h2>
            <div className="container mx-2 text-muted">
            {notes.length === 0 && "Nothing to show here.. Just simply add Your first Note...."}
            </div>
            {notes.map((e) => {
                return <Noteitem key={e._id} updateNotes={updateNotes} note={e} />
            })}
        </div>
    )
}

export default Notes
