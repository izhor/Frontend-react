import React ,{useEffect, useState} from "react";
import BookTable from "./booktable";
import axios from "axios";
import swal from "sweetalert";


function BookManagement() {
    
    //part data code here
    const [formMode, setFormMode] = useState("");
    const [books, setBooks] = useState([]);
    const [inputForm, setInputForm] = useState("");

    
    function showCreateForm() {
        setInputForm("");
        setFormMode("create");
    }

    function showEditForm(book) {
        setInputForm(book);
        setFormMode("edit");
    }

    useEffect(() => {
        retrieveData();
    }, []);

    function retrieveData(){
        axios.get("http://localhost:4000/book")
        .then((response) => {setBooks(response.data) })
        .catch(function (error) {console.log(error.response.data)});
    }

    function handleTitle(e){
        setInputForm({...inputForm, title: e.target.value});
    }

    function handleAuthor(e){
        setInputForm({...inputForm, author: e.target.value});
    }

    function submitForm(event){
        event.preventDefault();

        if (formMode === "create") {
            axios.post("http://localhost:4000/book/add", inputForm)
        .then(()=>{
            swal({
                title: "Success!",
                text: "Data successfully added",
                icon: 'success',
            });
        })
        .catch(
            swal({
                title: "Failed adding new data",
                text: "Error Ocurred",
                icon: 'error',
            })
        );
        retrieveData();
        setFormMode("create");
        }

        if (formMode === "edit") {

            swal({
                title: "Are you sure?",
                text: "Once edited, you'll never be able undo the changes",
                icon: "warning",
                buttons: true

            })
            .then((willEdit) => {
                if(willEdit){
                    axios.put("http://localhost:4000/book/update/" + inputForm._id, inputForm)
                    .then(() => {
                        swal({
                            title: "Success!",
                            text: "Data successfully updated",
                            icon: 'success',
                        });
                    })
                    .catch(
                        swal({
                            title: "Failed!",
                            text: "Error ocurred!",
                            icon: "error",
                        })

                    )
                }else{
                    swal("Action has been cancelled!");
                }
                setInputForm("");
                retrieveData();
            });
        }
        
    }

    function deleteOne(book){

        swal({
            title: "Are you sure?",
            text: "Once Deleted, you'll never be able to recover the data!",
            icon: "warning",
            buttons : true
        })
        .then((willDelete) => {
            if(willDelete){
                axios.delete("http://localhost:4000/book/delete/"+book._id)
                .then(() => {
                    swal({
                        title: "Success!",
                        text: "Data successfully deleted",
                        icon: 'success',
                    });
                })
                .catch(
                    swal({
                        title: "Failed!",
                        text: "Error ocurred!",
                        icon: "error",
                    })
                )
            }else{
                swal("Action Has been cancelled.");
            }
            retrieveData();
        }

        )

        
    }

    
    return (
        <div className="container mt-4">
            <h1 className="text-center mt-4">Book Management</h1>

            <button className=" d-flex justify-content-start btn btn-sm btn-primary my-2" onClick={showCreateForm}>
                Add books
            </button>

            {/**input form */}

            {formMode !== "show" && (
                <div className="card py-2 my-3" id="form">
                <div className="card-body">
                    <h4>Book Form</h4>
                    <form className="row" onSubmit={submitForm}>
                        <div className="col-6">
                            <input type="text" placeholder="Title..." className="form-control mx-2" onChange={handleTitle} value={ inputForm.title || ""}  />
                        </div>
                        <div className="col-4">
                            <input type="text" placeholder="Author..." className="form-control mx-2" onChange={handleAuthor} value={ inputForm.author || ""} />
                        </div>
                        <div className="col-2">
                            <input type="submit" className="btn btn-success" value="Submit" />
                        </div>
                    </form>
                </div>
            </div>
            )}

            {/**book table */}
            <BookTable showEdit={showEditForm} books={books} requestToDelete={deleteOne} />
           
        </div>
    )
}
export default BookManagement;