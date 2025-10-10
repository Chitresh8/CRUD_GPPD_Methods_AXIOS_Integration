// import { Fragment, useEffect, useState } from "react";
// import "./axios.css";
// import axios from "axios";

// export const Axios = () => {
//   const [formData, setFormData] = useState({
//     userId: "",
//     id: "",
//     title: "",
//     body: "",
//   });
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [editing, setEditing] = useState(false);
//   const [error, setError] = useState("");

//   const { userId, id, title, body } = formData;

//   const handleChange = (event) => {
//     setFormData({ ...formData, [event.target.name]: event.target.value });
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     if (!userId || !id || !title || !body) {
//       setError("Please fill all the details");
//       return;
//     }
//     setLoading(true);
//     setError("");
//     try {
//       if (editing) {
//         await axios.put(
//           `https://jsonplaceholder.typicode.com/posts/${id}`,
//           formData
//         );
//       } else {
//         await axios.post(
//           "https://jsonplaceholder.typicode.com/posts",
//           formData
//         );
//       }
//       getData();
//       setFormData({
//         userId: "",
//         id: "",
//         title: "",
//         body: "",
//       });
//       setEditing(false);
//     } catch (error) {
//       setError("An error occurred. Please try again.");
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEdit = (editId) => {
//     const item = data.find((el) => el.id === editId);
//     if (item) {
//       setFormData(item);
//       setEditing(true);
//     }
//   };

//   const getData = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
//       setData(res.data);
//     } catch (err) {
//       setError("Failed to load data.");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getData();
//   }, []);

//   const handleDelete = async (editId) => {
//     setLoading(true);
//     try {
//       await axios.delete(
//         `https://jsonplaceholder.typicode.com/posts/${editId}`
//       );
//       getData();
//     } catch (err) {
//       setError("Failed to delete item.");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Fragment>
//       <div className="heading">
//         <h1>CRUD Project by using AXIOS Request (GET,POST,PUT,DELETE)</h1>
//       </div>
//       <div className="content">
//         {error && <p style={{ color: "red" }}>{error}</p>}
//         {loading && <p>Loading...</p>}
//         <form
//           className="content"
//           onSubmit={handleSubmit}
//         >
//           <p>User ID</p>
//           <input
//             type="text"
//             name="userId"
//             value={userId}
//             onChange={handleChange}
//             placeholder="Enter User ID here..."
//           />
//           <p>ID</p>
//           <input
//             type="text"
//             name="id"
//             value={id}
//             onChange={handleChange}
//             placeholder="Enter ID here..."
//           />
//           <p>Title</p>
//           <input
//             type="text"
//             name="title"
//             value={title}
//             onChange={handleChange}
//             placeholder="Enter Title here..."
//           />
//           <p>Body</p>
//           <input
//             type="text"
//             name="body"
//             value={body}
//             onChange={handleChange}
//             placeholder="Enter Body here..."
//           />
//           <button
//             className="submit"
//             type="submit"
//             disabled={loading}
//           >
//             {editing ? "Update" : "Submit"}
//           </button>
//         </form>
//         <table className="table">
//           <thead>
//             <tr>
//               <th>User ID</th>
//               <th>ID</th>
//               <th>Title</th>
//               <th>Body</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.map((el) => (
//               <tr key={el.id}>
//                 <td>{el.userId}</td>
//                 <td>{el.id}</td>
//                 <td>{el.title}</td>
//                 <td>{el.body}</td>
//                 <td>
//                   <button onClick={() => handleEdit(el.id)}>Edit</button>
//                   <button onClick={() => handleDelete(el.id)}>Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//           <tfoot>
//             <tr>
//               <td>
//                 <p>Powered by @!#$%^&*</p>
//               </td>
//             </tr>
//           </tfoot>
//         </table>
//       </div>
//     </Fragment>
//   );
// };

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
      const headers = {
        "Content-Type": "application/json", // Assuming JSON data
        // Add any other headers as needed
        "Access-Control-Allow-Origin": "*",
      };
      axios
        .post(
          "https://back-end-data-api-default-rtdb.firebaseio.com/crudData",
          formData,
          { headers: headers }
        )
        .then((response) => console.log("Response==>", response.data))
        .catch((error) => ("Error==>", error));
      setData([...data, formData]);
      setFormData({
        userId: "",
        id: "",
        title: "",
        body: "",
      });
    } else {
      alert("Please fill all the details");
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

  function getData() {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    //get method- to receive  data
    // axios
    //   .get("https://jsonplaceholder.typicode.com/posts")
    //   .then((res) => {
    //     console.log("res===>", setData(res.data));
    //   })
    //   .catch((err) => console.log("err===>", err));
  }, []);

  const handleDelete = (editId) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/posts/${editId}`)
      .then((res) => console.log(res.data))
      // .then(getData())
      .catch((err) => {
        console.log(err);
      });
  };

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
                        handleDelete(el.id);
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
