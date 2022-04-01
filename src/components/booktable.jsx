import React from "react";
function BookTable({ showEdit, books, requestToDelete }) {

    function editData(book) {
        showEdit(book);
    }

    function deleteData(book){
        requestToDelete(book);
    }

    return(
        <div>
            <h4>Book Table</h4>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th className="col-3">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book, index)=>(
                        <tr key={index}>
                        <td>{index + 1}</td>
                        <td> {book.title} </td>
                        <td> {book.author} </td>
                        <td>
                            <button className="btn-sm btn-warning mx-2" onClick={() => editData(book) } >Edit</button>
                            <button className="btn-sm btn-danger" onClick={ () => deleteData(book) } >Delete</button>
                        </td>
                    </tr>
                    ))}
                    
                </tbody>
            </table>
        </div>
    )
}

export default BookTable;