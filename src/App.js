import logo from './logo.svg';
import './App.css';
import {Routes, Route, Link} from 'react-router-dom';
import React, {useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Signup from "./components/Signup";


import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from "react-bootstrap/Navbar";
import BlogsDataService from "./services/blogs";
import axios from "axios";

function App() {
    const [user, setUser] = React.useState(null);
    const [token, setToken] = React.useState('');
    const [error, setError] = React.useState('');

    // App.js
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    if (savedToken) {
      axios.defaults.headers.common["Authorization"] = `Token ${savedToken}`; // ✅ 注意前缀是 Token 不是 token
      setToken(savedToken);
      setUser(savedUser);
    }
  }, []);

  async function signup(user = null) {
      BlogsDataService.signup(user).then((response) => {
        setToken(response.data.token);
        setUser(user.username);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', user.username);
      }).catch(e => {
        console.log(e);
        setError(e.toString());
      })
    }

  return (
    <div className="App">
    <Navbar bg="primary" variant="dark">
      <div className="container-fluid">
        <Navbar.Brand>BlogApp</Navbar.Brand>
        <Nav className="me-auto">
          <Container>
            <Link to={"/blogs"} className="nav-link">Blogs</Link>

                <Link to="/login" className="nav-link">Login</Link>
                <Link to="/signup" className="nav-link">Signup</Link>

          </Container>
        </Nav>
      </div>
    </Navbar>

      <div className="container mt-4">
        <Routes>
          <Route path="/signup" element={<Signup signup={signup} />} />
        </Routes>
      </div>

      <footer className="text-center text-lg-start bg-light text-muted mt-4">
        <div className="text-center p-4">© Copyright
          - <a target="_blank" className="text-reset fw-bold text-decoration-none" href="https://www.ais.ac.nz">Anisha Baskota</a>
          - <a target="_blank" className="text-reset fw-bold text-decoration-none" href="https://www.ais.ac.nz">Dianji Chen</a>
          - <a target="_blank" className="text-reset fw-bold text-decoration-none" href="https://www.ais.ac.nz">Hao Han</a>
          - <a target="_blank" className="text-reset fw-bold text-decoration-none" href="https://www.ais.ac.nz">Huashan Li</a>
        </div>
      </footer>

    </div>
  );
}

export default App;
