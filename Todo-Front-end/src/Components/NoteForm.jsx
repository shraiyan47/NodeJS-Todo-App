import React, { useEffect, useState } from 'react'

export default function NoteForm(params) {

    const [Title, setTitle] = useState("");
    const [Note, setNote] = useState("");

    // Get the Note by ID
    useEffect(() => {
        async function fetchData() {

            let my_url = `http://localhost:5000/api/notes/${params.noteId}`
            const myHeaders = new Headers()
            myHeaders.append("Content-Type", "application/json");

            const requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: "follow",
            }

            const res = await fetch(my_url, requestOptions);
            const data = await res.json();
            if (res.ok) {
                setTitle(data.title);
                setNote(data.details);
            } else {
                console.log(data);
            }
        }
        fetchData();
    }, [params.noteId]);


    // Posting A Todo Item
    async function handleNote(e) {
        e.preventDefault();
        let my_url = '';
        (params.type === "Edit") ? my_url = `http://localhost:5000/api/note/${params.noteId}` : my_url = `http://localhost:5000/api/note/`


        let my_data = {
            "title": Title,
            "details": Note,
            "image": '',
            "todo_tags": ''
        }

        const myHeaders = new Headers()
        myHeaders.append("Content-Type", "application/json");
        // myHeaders.append(
        //     "Authorization",
        //     "Bearer " + localStorage.getItem("token")
        // );

        const requestOptions = {
            method: (params.type === "Edit") ? 'PUT' : 'POST',
            headers: myHeaders,
            body: JSON.stringify(my_data),
            redirect: "follow",
        }

        const res = await fetch(my_url, requestOptions);
        const data = await res.json();
        if (res.ok) {
            console.log(data);
            params.onSuccess("Successfully "+params.type+"ed");
            setNote("");
            setTitle("");
            return { ok: true, data };
        } else {
            console.log(data);
            return { ok: false, err: res, data };
        }

    }

    // Delete Note
    function deleteHandler(d) {
        if (!!d) {
            async function fetchData() {

                let my_url = `http://localhost:5000/api/note/${d}`
                const myHeaders = new Headers()
                myHeaders.append("Content-Type", "application/json");

                const requestOptions = {
                    method: 'DELETE',
                    headers: myHeaders,
                    redirect: "follow",
                }

                const res = await fetch(my_url, requestOptions);
                const data = await res.json();
                if (res.ok) {
                    setTitle("");
                    setNote("");
                    params.onSuccess("Successfully Deleted");

                } else {
                    console.log(data);
                }
            }
            fetchData();
        }
    }


    return (
        <div>
            {(params.type !== "View") ?
                <>
                    <form onSubmit={handleNote}>
                        <div className="row">
                            <div className="col-10 mb-3">
                                <label htmlFor="Note" className="form-label">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={Title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                            <div className="col-10 mb-3">
                                <label htmlFor="Note" className="form-label">
                                    Details
                                </label>
                                <textarea
                                    type="text"
                                    className="form-control"
                                    value={Note}
                                    onChange={(e) => setNote(e.target.value)}

                                />
                            </div>
                            <div className="col-2" style={{ marginTop: "30px" }}>
                        <button type="" className="btn btn-success" >{params.type}</button>
                            </div>
                        </div>
                    </form>
                </>
                :
                <div>
                    <h3>
                        {Title}
                    </h3>
                    <p>
                        {Note}
                    </p>
                    <div className="col-2" style={{ marginTop: "30px" }}>
                        <button type="" className="btn btn-danger" onClick={() => deleteHandler(params.noteId)}>Delete <i className="fa fa-trash"></i></button>
                    </div>

                </div>
            }

        </div>
    )
}
