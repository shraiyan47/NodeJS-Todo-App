import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal'; //Modal 
import NoteForm from './NoteForm';

export default function Notes() {


  const [ModalView, setModalView] = useState(false);
  const [FormType, setFormType] = useState("");
  const [NoteId, setNoteId] = useState("");
  const [NoteList, setNoteList] = useState([]);
  const [PostSuccess, setPostSuccess] = useState("");

  const ModalCloseButton = { "fontSize": '15px', textAlign: 'right', paddingTop: '15px', cursor: 'pointer' }

  // Get all the Notes
  useEffect(() => {
    console.log(PostSuccess);
    async function fetchData() {

      let my_url = `http://localhost:5000/api/notes`
      const myHeaders = new Headers()
      myHeaders.append("Content-Type", "application/json");
      // myHeaders.append(
      //   "Authorization",
      //   "Bearer " + localStorage.getItem("token")
      // );

      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: "follow",
      }

      const res = await fetch(my_url, requestOptions);
      const data = await res.json();
      if (res.ok) {
        setNoteList(data);
        setModalView(false);
      } else {
        console.log(data);
      }
    }
    fetchData();
  }, [PostSuccess]);


  function AddNoteHandler() {
    setModalView(true);
    setFormType("Add");
  }

  function editNoteHandler(params) {
    setModalView(true);
    setFormType("Edit");
    setNoteId(params);
    console.log(params);
  }

  function viewNoteHandler(params) {
    console.log(typeof params);
    if(!!params) {
      setNoteId(params); setModalView(true); setFormType("View"); 
    } 
  }

  const editbtn = {borderRadius:"100%", width:"20px", paddingLeft:"-10px", position: "absolute", right: "-23px", bottom: "18px"}
  const viewbtn = {borderRadius:"100%", width:"20px", paddingLeft:"17px", position: "absolute", right: "20px", bottom: "18px"}


  return (
    <div>
      <div className='text-center bg-light text-dark pt-2 '>
        <h1>Notes</h1>
      </div>
      <div className='container'>
        <button type='button' className='btn btn-primary' onClick={AddNoteHandler}>Add Note</button>
        <div className='row pt-3'>


          {
            NoteList.slice(0).reverse().map((notes, index) => (
              <div className='col-4' key={index}>

                <div className='card'>
                  <div className='card-body'>
                    <div className="card-title" style={{position: "relative"}}>
                      {notes.title}

                      <button className="btn btn-primary btn-sm" value={notes._id} onClick={(e) => editNoteHandler(e.target.value)} style={editbtn}>
                        <i className="fa fa-pencil-square-o" ></i>
                      </button>
                      <button className="btn btn-primary btn-sm" value={notes._id} onClick={(e) => viewNoteHandler(e.target.value)} style={viewbtn}>
                        <i className="fa fa-file-text-o"></i>
                      </button>
                    </div>
                    <div className="card-text">
                      {(notes.details.length > 150) ? notes.details.substring(0,150)+"...": notes.details}
                    </div>
                  </div>
                </div>
              </div> 
            ))
          }

        </div>
      </div>


      <Modal
        show={ModalView}
        onHide={() => setModalView(false)}
        aria-labelledby="example-modal-sizes-title-sm"
        size='lg'
      >
        <Modal.Header>
          <h3>{FormType} Note</h3>
          <div className='close float-right' style={ModalCloseButton} onClick={() => setModalView(false)}>X</div>

        </Modal.Header>
        <Modal.Body > 

          <NoteForm type={FormType} onSuccess={setPostSuccess} noteId={NoteId} />

          <br />
        </Modal.Body>
      </Modal>
    </div>
  )
}
