import React, { useContext, useState ,useEffect } from 'react'
import Alert from './Alert'
import Notes from './Notes'
import contextValue from '../context/notes/noteContext'

export const Home = () => {
    const context = useContext(contextValue);
    const {alertShow ,setAlertShow, addNote , alert , alerttype , setAlert , setAlerttype  } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" });
    
    useEffect(() => {
        
        if(note.length === 0){
            // setAlertShow(true);
            setAlert('Nothing to show here.Add Your First Note...')
            // setAlerttype('warning')
            // setAlert('Nothing to show here.Add Your First Note...')
        }
        else{
            // setAlertShow(true);
            setAlert('This is React Notes App...')
            // setAlerttype('warning')
        }
        setAlertShow(true)
        setTimeout(() => {
            setAlertShow(false);
        }, 3000);
        //eslint-disable-next-line
    }, [])

    let add = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" })
        setAlertShow(true);
        setTimeout(() => {
            setAlertShow(false)
        }, 2000);
        setAlert("your Note has been addded Successfully...")
        setAlerttype('success');
    }
    let onchange = (e) => {
        console.log(e.target.name, e.target.value);
        setNote({ ...note, [e.target.name]: e.target.value });
    }
    return (
        <>
        <div className="container my-3">
            {alertShow && <Alert sms={alert}  color={alerttype}/> }
            <h1 className="text-center text-muted mt-5">Add a Note</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label ">Add title :</label>
                    <input type="email" className="form-control text-primary" id="title" required value={note.title} name="title" aria-describedby="emailHelp" onChange={onchange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Add description :</label>
                    <input type="text" className="form-control text-primary" name="description" required value={note.description} id="exampleInputPassword1" onChange={onchange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Add Tag :</label>
                    <input type="text" className="form-control text-success" name="tag" value={note.tag} id="tag" onChange={onchange} />
                </div>

                <button type="submit" disabled={note.title.length === 0 || note.description.length ===0} className="btn btn-primary" onClick={add}>Add</button>
            </form>
            <Notes />
        </div>
        </>
    )
}
