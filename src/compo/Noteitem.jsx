import React, { useContext } from 'react'
import contextValue from '../context/notes/noteContext'

const Noteitem = (props) => {
  const context = useContext(contextValue);
  const {  setAlertShow, deleteNote, setAlert, setAlerttype } = context;

  const { note, updateNotes } = props;

  const deletethisNote = () => {
    setAlertShow(true);
    setTimeout(() => {
      setAlertShow(false)
    }, 2000);
    setAlert('Your note has been deleted');
     setAlerttype('danger');
      deleteNote(note._id)
  }

  const updatethisNote = ()=>{
    setAlerttype('info'); 
    updateNotes(note)
    
  }
  return (
    <div className="mx-4 my-3 col-md-3">
      <div className={`card ${note.tag === 'personal' ? 'border-danger' : 'border-info'}  border `} style={{ width: "18rem" }}>
          <h6 className={`badge bg-${note.tag === 'personal' ? 'danger': 'primary'} py-1 rounded-3  `}>{note.tag}</h6>
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-between">
            <h5 className="card-title  text-primary">{note.title}</h5>
            <div className="notes__icon d-flex justify-contant-end">
              <i className="far fa-trash-alt" onClick={deletethisNote}></i>
              <i className="far fa-edit mx-2" aria-hidden="true" onClick={updatethisNote}></i>
            </div>
          </div>
          <p className="card-text text-success">{note.description}</p>
          {/* <span>Last Edited:</span> */}
          <span className="text-muted justify-content-between d-flex"><strong className="pr-1">Last Edited: </strong>  {note.date.slice(0,10)}</span>
        </div>
      </div>
    </div>
  )
}

export default Noteitem
