import React from 'react';
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import {useNavigate} from "react-router-dom";


const Login = (props) => {

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [Err, setErr] = React.useState("")
    const navigate = useNavigate();


    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const login = async() => {
       try {
           await props.login({ username, password });
           setErr("Login-success");
           navigate("/");

        } catch (error) {
          console.error("Login error:", error);
        }
    }
    return (
        <Container>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter username" value={username} onChange={onChangeUsername}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={onChangePassword}/>
                </Form.Group>
                <Button variant="primary" onClick={login}>Login</Button>
                <p>{Err}</p>
            </Form>
        </Container>
    );
}
export default Login;