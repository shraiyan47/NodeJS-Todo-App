import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal'; //Modal 


export default function Todo() {

  const [TodoId, setTodoId] = useState("");
  const [TodoItem, setTodoItem] = useState("");
  const [FormType, setFormType] = useState("");
  const [ModalView, setModalView] = useState(false);
  const [todo, setTodo] = useState("");
  const [msg, setMsg] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [PostSuccess, setPostSuccess] = useState("");

  const [AllTask, setAllTask] = useState(false);
  const [CompleteTask, setCompleteTask] = useState(false);
  const [IncompleteTask, setIncompleteTask] = useState(true);

  const ModalCloseButton = { "fontSize": '15px', textAlign: 'right', paddingTop: '15px', cursor: 'pointer' }

  // Get all the Todo Items
  useEffect(() => {
    async function fetchData() {

      let my_url = `http://localhost:5000/api/items`
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

      // return fetch(my_url, requestOptions).then((res) => {
      //   return res.json().then((data) => {
      const res = await fetch(my_url, requestOptions);
      const data = await res.json();
      if (res.ok) {
        setTodoList(data);
        // return { ok: true, data }
      } else {
        console.log(data);
      }
    }
    fetchData();
  }, [PostSuccess]);

  // Posting A Todo Item
  async function handleTodo(e) {
    e.preventDefault();

    let my_url = `http://localhost:5000/api/item`

    let my_data = {
      "item": todo,
      "date": Date.now(),
      "complete": false
    }

    const myHeaders = new Headers()
    myHeaders.append("Content-Type", "application/json");
    // myHeaders.append(
    //   "Authorization",
    //   "Bearer " + localStorage.getItem("token")
    // );

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(my_data),
      redirect: "follow",
    }

    const res = await fetch(my_url, requestOptions);
    const data = await res.json();
    if (res.ok) {
      console.log(data);
      setPostSuccess(data);
      setTodo("");
      return { ok: true, data };
    } else {
      setMsg(data);
      return { ok: false, err: res, data };
    }

  }

  async function completeHandler(params, itemName) {

    if (!!params) {
      setModalView(true);
      setFormType("Complete");
      setTodoId(params);
      setTodoItem(itemName);
      console.log(params, itemName);
    }

  }

  async function editHandler(params, itemName) {

    if (!!params) {
      setModalView(true);
      setFormType("Edit");
      setTodoId(params);
      setTodoItem(itemName);
      console.log(params, itemName);
    }

  }

  async function handleTodoEdit(lol) {
    lol.preventDefault();

    let my_url = `http://localhost:5000/api/item/${TodoId}`

    let my_data = {
      "item": TodoItem,
      "date": Date.now()
    }

    const myHeaders = new Headers()
    myHeaders.append("Content-Type", "application/json");
    // myHeaders.append(
    //   "Authorization",
    //   "Bearer " + localStorage.getItem("token")
    // );

    const requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: JSON.stringify(my_data),
      redirect: "follow",
    }

    const res = await fetch(my_url, requestOptions);
    const data = await res.json();
    if (res.ok) {
      console.log(data);
      setPostSuccess(data);
      setTodoId("");
      setTodoItem("");
      setModalView(false);
      setFormType("");
      return { ok: true, data };
    } else {
      setMsg(data);
      return { ok: false, err: res, data };
    }
  }

  async function handleTodoComplete(lol) {
    lol.preventDefault();

    let my_url = `http://localhost:5000/api/item/${TodoId}`

    let my_data = {
      "item": TodoItem,
      "date": Date.now(),
      "complete": true
    }

    const myHeaders = new Headers()
    myHeaders.append("Content-Type", "application/json");
    // myHeaders.append(
    //   "Authorization",
    //   "Bearer " + localStorage.getItem("token")
    // );

    const requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: JSON.stringify(my_data),
      redirect: "follow",
    }

    const res = await fetch(my_url, requestOptions);
    const data = await res.json();
    if (res.ok) {
      console.log(data);
      setPostSuccess(data);
      setTodoId("");
      setTodoItem("");
      setModalView(false);
      setFormType("");
      return { ok: true, data };
    } else {
      setMsg(data);
      return { ok: false, err: res, data };
    }
  }

  async function deleteHandler(params, itemName) {
    if (!!params) {
      setModalView(true);
      setFormType("Delete");
      setTodoId(params);
      setTodoItem(itemName);
      console.log(params, itemName);
    }
  }

  async function handleTodoDelete(lol) {
    lol.preventDefault();

    let my_url = `http://localhost:5000/api/item/${TodoId}`

 

    const myHeaders = new Headers()
    myHeaders.append("Content-Type", "application/json");
    // myHeaders.append(
    //   "Authorization",
    //   "Bearer " + localStorage.getItem("token")
    // );

    const requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      // body: JSON.stringify(my_data),
      redirect: "follow",
    }

    const res = await fetch(my_url, requestOptions);
    const data = await res.json();
    if (res.ok) {
      console.log(data);
      setPostSuccess(data);
      setTodoId("");
      setTodoItem("");
      setModalView(false);
      setFormType("");
      return { ok: true, data };
    } else {
      setMsg(data);
      return { ok: false, err: res, data };
    }
  }


  return (
    <div>
      <div className='text-center bg-light text-dark pt-2'>
        <h1>Todo</h1>
      </div>
      <div className='text-center'>
        {/* Add Task */}
        <div className='card'>
          <div className="card-body">
            <form onSubmit={handleTodo}>
              <div className="row">
                <div className="col-10 mb-3">
                  <label htmlFor="QuestionDetails" className="form-label">
                    Todo
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={todo}
                    onChange={(e) => setTodo(e.target.value)}
                  />

                </div>
                <div className="col-2" style={{ marginTop: "30px" }}>
                  <button type="" className="btn btn-success" >Add</button>
                </div>
              </div>
            </form>

          </div>
        </div>

        {/* Task List */}
        <div className='card'>
          <div className='pt-3'>
            <button className='btn btn-info m-1' onClick={()=> {setAllTask(true);setIncompleteTask(false);setCompleteTask(false);}}>All Task</button>
            <button className='btn btn-info m-1' onClick={()=> {setAllTask(false);setIncompleteTask(true);setCompleteTask(false);}}>Pending Task</button>
            <button className='btn btn-info m-1' onClick={()=> {setAllTask(false);setIncompleteTask(false);setCompleteTask(true);}}>Complete Task</button>
          </div>
          <p>{msg}</p>
          <table className="table  table-hover table-sm table-borderless table-responsive">
            <thead key='1'>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Todo</th>
                <th scope="col">Date</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                todoList.slice(0).reverse().map((todos, index) => (

                  (AllTask) ? 
                    <tr key={index} className={(todos.complete) && "table-danger"}>
                      <th scope="row">{(todos.complete) ? <del> {index + 1} </del> : index + 1}</th>
                      <td>{(todos.complete) ? <del> {todos.item} </del> : todos.item}</td>
                      <td>{(todos.complete) ? <del> {todos.date} </del> : todos.date}</td>
                      <td>
                        <button className='btn btn-success' onClick={() => completeHandler(todos._id, todos.item)}><i className="fa fa-check-square-o"></i></button>
                        <button className='btn btn-warning' onClick={() => editHandler(todos._id, todos.item)}><i className="fa fa-pencil-square-o"></i></button>
                        <button className='btn btn-danger' onClick={() => deleteHandler(todos._id, todos.item)}><i className="fa fa-trash"></i></button>
                      </td>
                    </tr>
                    :
                    (IncompleteTask) ?
                    (todos.complete === false) && <tr key={index} className={(todos.complete) && "table-danger"}><th scope="row"> {index + 1 }</th><td>{ todos.item}</td><td>{ todos.date}</td><td>  <button className='btn btn-success' onClick={() => completeHandler(todos._id, todos.item)}><i className="fa fa-check-square-o"></i></button>  <button className='btn btn-warning' onClick={() => editHandler(todos._id, todos.item)}><i className="fa fa-pencil-square-o"></i></button>  <button className='btn btn-danger' onClick={() => deleteHandler(todos._id)}><i className="fa fa-trash"></i></button></td></tr>
                    :
                    (CompleteTask) && (todos.complete) && <tr key={index} className={(todos.complete) && "table-danger"}><th scope="row">{(todos.complete) ? <del> {index + 1} </del> : index + 1}</th><td>{(todos.complete) ? <del> {todos.item} </del> : todos.item}</td><td>{(todos.complete) ? <del> {todos.date} </del> : todos.date}</td><td>  <button className='btn btn-success' onClick={() => completeHandler(todos._id, todos.item)}><i className="fa fa-check-square-o"></i></button>  <button className='btn btn-warning' onClick={() => editHandler(todos._id, todos.item)}><i className="fa fa-pencil-square-o"></i></button>  <button className='btn btn-danger' onClick={() => deleteHandler(todos._id)}><i className="fa fa-trash"></i></button></td></tr>
                  
                ))
              }
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        show={ModalView}
        onHide={() => setModalView(false)}
        aria-labelledby="example-modal-sizes-title-sm"
        size='lg'
      >
        <Modal.Header>
          <h3>{FormType} Todo</h3>
          <div className='close float-right' style={ModalCloseButton} onClick={() => setModalView(false)}>X</div>

        </Modal.Header>
        <Modal.Body >

          {(FormType === "Edit") &&
            <form onSubmit={handleTodoEdit}>
              <div className="row">
                <div className="col-10 mb-3">
                  <label htmlFor="todos" className="form-label">
                    Task Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={TodoItem}
                    onChange={(e) => setTodoItem(e.target.value)}
                  />

                </div>
                <div className="col" style={{ marginTop: "30px" }}>
                  <button type="" className="btn btn-success" >{FormType}</button>
                </div>
              </div>
            </form>
          }

          {(FormType === "Complete") &&
            <form onSubmit={handleTodoComplete}>
              <div className="row">
                <div className="col-10 mb-3">

                  {TodoItem}

                </div>
                <div className="col" style={{ marginTop: "30px" }}>
                  <button type="" className="btn btn-success" >{FormType}</button>
                </div>
              </div>
            </form>

          }

          {(FormType === "Delete") &&
            <form onSubmit={handleTodoDelete}>
              <div className="row">
                <div className="col-10 mb-3">

                  {TodoItem}

                </div>
                <div className="col" style={{ marginTop: "30px" }}>
                  <button type="" className="btn btn-success" >{FormType}</button>
                </div>
              </div>
            </form>

          }

          <br />
        </Modal.Body>
      </Modal>
    </div>
  )
}
