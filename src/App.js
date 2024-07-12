import DetailsCardComponent from "./components/DetailsCardComponent";
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [recordData, setRecordData] = useState([]);

  console.log("process.env:", process.env);
  console.log("process.env.REACT_APP_NODE_ENV:", process.env.REACT_APP_NODE_ENV);
  console.log("process.env.REACT_APP_SERVER_BASE_URL:", process.env.REACT_APP_SERVER_BASE_URL);
  const base_url = process.env.REACT_APP_SERVER_BASE_URL;
  console.log("Base URL: ", base_url);

  useEffect(() => {
    axios.get(`${base_url}/getUsers`).then(res => { setRecordData(res.data) }).catch(err => alert(`Some error occured ==>${err}`));
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    axios.post(`${base_url}/addUser`, formData).then(res => { setFormData({ name: "", email: "" }); alert("User created successfully") }).catch(err => alert(`Some error occured ==>${err}`));
  };

  return (
    <div className="App" style={{ fontFamily: 'Arial, sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <nav className="navbar navbar-light" style={{ backgroundColor: '#007bff', width: '100%', padding: '1rem', marginBottom: '2rem' }}>
        <h1 style={{ color: '#fff', textAlign: 'center', margin: '0 auto' }}>User Management</h1>
      </nav>
      <div className='container' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', padding: '2rem', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', width: '80%' }}>
        <div className="row" style={{ width: '100%', display: 'flex' }}>
          <div className="col" style={{ flex: 1, textAlign: 'center', borderRight: '1px solid #007bff', paddingRight: '2rem' }}>
            <h3 style={{ color: '#007bff', marginBottom: '1.5rem' }}>Users List</h3>
            <ul style={{ listStyleType: 'none', paddingLeft: '0' }}>
              {recordData.map((r, i) => <li key={i} style={{ marginBottom: '0.5rem' }}><DetailsCardComponent email={r.email} sn={i + 1} userN={r.name} /></li>)}
            </ul>
          </div>
          <div className="col" style={{ flex: 1, paddingLeft: '2rem' }}>
            <h2 style={{ color: '#007bff', textAlign: 'center', marginBottom: '1.5rem' }}>Add Users</h2>
            <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
              <div className="form-group">
                <label htmlFor="exampleInputUser">User Name</label>
                <input type="text" name="name" className="form-control" id="exampleInputUser" value={formData.name} onChange={handleChange} placeholder="Enter user name" style={{ marginBottom: '1rem', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ced4da', width: '100%' }} />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail">Email</label>
                <input type="email" name="email" className="form-control" id="exampleInputEmail" value={formData.email} onChange={handleChange} placeholder="Enter email" style={{ marginBottom: '1rem', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ced4da', width: '100%' }} />
              </div>
              <button type="submit" className="btn btn-primary mt-2" style={{ backgroundColor: '#007bff', borderColor: '#007bff', padding: '0.5rem 1rem', borderRadius: '4px', width: '100%' }}>Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
