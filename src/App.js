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
    axios.get(`${base_url}/getUsers`)
      .then(res => { setRecordData(res.data) })
      .catch(err => alert(`Some error occurred ==> ${err}`));
  }, [base_url]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    axios.post(`${base_url}/addUser`, formData)
      .then(res => { setFormData({ name: "", email: "" }); alert("User created successfully") })
      .catch(err => alert(`Some error occurred ==> ${err}`));
  };

  return (
    <div className="App" style={styles.app}>
      <nav className="navbar navbar-light bg-light mb-2" style={styles.navbar}>
        <h1 style={styles.navbarTitle}>User Management</h1>
      </nav>
      <div className='container' style={styles.container}>
        <div className="row" style={styles.row}>
          <div className="col" style={styles.column}>
            <h3 className="text-center" style={styles.heading}>Users List</h3>
            <ul style={styles.list}>
              {recordData.map((r, i) => 
                <li key={i} style={styles.listItem}>
                  <DetailsCardComponent email={r.email} sn={i + 1} userN={r.name} />
                </li>
              )}
            </ul>
          </div>
          <div className="col" style={styles.column}>
            <h2 style={styles.heading}>Add Users</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
              <div className="form-group" style={styles.formGroup}>
                <label htmlFor="exampleInputUser" style={styles.label}>User Name</label>
                <input type="text" name="name" className="form-control" id="exampleInputUser" value={formData.name} onChange={handleChange} placeholder="Enter user name" style={styles.input} />
              </div>
              <div className="form-group" style={styles.formGroup}>
                <label htmlFor="exampleInputEmail" style={styles.label}>Email</label>
                <input type="email" name="email" className="form-control" id="exampleInputEmail" value={formData.email} onChange={handleChange} placeholder="Enter email" style={styles.input} />
              </div>
              <button type="submit" className="btn btn-primary mt-2" style={styles.button}>Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  app: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f8f9fa',
    padding: '20px',
    textAlign: 'center',
  },
  navbar: {
    padding: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
  },
  navbarTitle: {
    margin: '0',
  },
  container: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#fff',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    borderRadius: '5px',
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  column: {
    flex: '1',
    padding: '20px',
  },
  heading: {
    marginBottom: '20px',
    color: '#007bff',
  },
  list: {
    listStyleType: 'none',
    padding: '0',
  },
  listItem: {
    marginBottom: '10px',
    padding: '10px',
    backgroundColor: '#f1f1f1',
    borderRadius: '5px',
    textAlign: 'left',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '15px',
    display: 'flex',
    alignItems: 'center',
  },
  label: {
    flex: '1',
    textAlign: 'left',
    marginRight: '10px',
  },
  input: {
    flex: '2',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ced4da',
  },
  button: {
    alignSelf: 'flex-start',
    backgroundColor: '#007bff',
    borderColor: '#007bff',
    padding: '10px 20px',
    borderRadius: '5px',
    color: '#fff',
  }
};

export default App;
