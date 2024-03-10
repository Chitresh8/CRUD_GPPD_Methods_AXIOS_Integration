import { Fragment, useEffect, useState } from "react";
import "./axios.css";
import axios from "axios";

export const Axios = () => {
  const [formData, setFormData] = useState({
    userId: "",
    id: "",
    title: "",
    body: "",
  });
  const [data, setData] = useState([]);

  const { userId, id, title, body } = formData;

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    //post method - to send  data to server
    if (userId && id && title && body) {
      axios
        .post("https://jsonplaceholder.typicode.com/posts", formData)
        .then((response) => console.log("Response==>", response.data))
        .catch((error) => ("Error==>", error));
      setData([...data, formData]);
      setFormData({
        userId: "",
        id: "",
        title: "",
        body: "",
      });
    }
  };

  const handleSubmitt = () => {};

  //editing the data - update the data crUd
  const handleEdit = (editId) => {
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${editId}`)
      .then((res) => {
        setFormData(res.data);
      })
      .catch((err) => console.log("error=>", err));
    // axios.get('https://jsonplaceholder.typicode.com/posts'+editId); we can use this method also
  };

  useEffect(() => {
    //get method- to receive  data
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        console.log("res===>", setData(res.data));
      })
      .catch((err) => console.log("err===>", err));
  }, [data]);

  return (
    <Fragment>
      <div className="heading">
        <h1>CRUD Project by using AXIOS Request (GET,POST,PUT,DELETE)</h1>
      </div>
      <div className="content">
        <form
          className="content"
          onSubmit={handleSubmit}
        >
          <p>User ID</p>
          <input
            type="text"
            name="userId"
            value={userId}
            onChange={handleChange}
            placeholder="Enter User ID here..."
          />
          <p>ID</p>
          <input
            type="text"
            name="id"
            value={id}
            onChange={handleChange}
            placeholder="Enter ID here..."
          />
          <p>Title</p>
          <input
            type="text"
            name="title"
            value={title}
            onChange={handleChange}
            placeholder="Enter Title here..."
          />
          <p>Body</p>
          <input
            type="text"
            name="body"
            value={body}
            onChange={handleChange}
            placeholder="Enter Body here..."
          />
          <button
            className="submit"
            type="submit"
            onClick={handleSubmitt}
          >
            Submit
          </button>
        </form>
        <table className="table">
          <thead>
            <tr>
              <th>User ID</th>
              <th>ID</th>
              <th>Title</th>
              <th>Body</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((el, index) => {
              return (
                <tr key={index}>
                  <td>{el.userId}</td>
                  <td>{el.id}</td>
                  <td>{el.title}</td>
                  <td>{el.body}</td>
                  <td>
                    <button
                      onClick={() => {
                        handleEdit(el.id);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        handleDelete(index);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td>
                <p>Powered by @!#$%^&*</p>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </Fragment>
  );
};
