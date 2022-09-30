import React, { useEffect, useState } from "react";
import './RegisterScreen.css'
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import MainScreen from "../../components/MainScreen";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../actions/userActions";

const RegisterScreen = () => {
  const history = useNavigate();
const [email, setEmail] = useState("");
const [name, setName] = useState("");
const [pic, setPic] = useState(
"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
);
const [password, setPassword] = useState("");
const [confirmpassword, setConfirmpassword] = useState("");
const [message, setMessage] = useState(null);
const [picMessage,setPicMessage] = useState(null);
const dispatch = useDispatch();
const userRegister = useSelector((state) => state.userRegister);
const {loading, error, userInfo } = userRegister;
useEffect(() => {
  if(userInfo) {
    history("/mynotes");
  }
}, [history,userInfo]);

const submitHandler = async (e) => {
  e.preventDefault();
  if(password != confirmpassword){
    setMessage("Password do not match");
  }else{
    dispatch(register(name,email,password,pic));
  }
};
const postDetails = (pics) => {
  if(!pics){
    return setPicMessage("please set an image");
  }
  setPicMessage(null);
const data = new FormData();
data.append('file',pics);
data.append('upload_preset','notescenter');
data.append('cloud_name','keshavkaal');
fetch("https://api.cloudinary.com/v1_1/keshavkaal/image/upload",{
  method: "post",
  body: data,
}).then((res) => res.json()).then((data) => {
  console.log(data);
  setPic(data.url.toString());
}).catch((err) => {
  console.log(err);
});
}

  return (
    <MainScreen title="REGISTER">
      <div className="loginContainer">
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
        {loading && <Loading />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Control type="name" placeholder="Enter name"
            onChange={(e) => setName(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email Address</Form.Label>
            <Form.Control type="email" 
            value={email}
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" 
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password"
            value={confirmpassword}
             placeholder="confirm Password"
             onChange={(e) => setConfirmpassword(e.target.value)} />
          </Form.Group>
          {picMessage && (
            <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
          )}
          <Form.Group controlId="pic">
            <Form.Label>Profile Picture</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => postDetails(e.target.files[0])}
              label="Upload profile picture"
              custom="true"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Register
          </Button>
        </Form>
        <Row className="py-3">
          <Col>
            Have an Account ? <Link to="/login">Login</Link>
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
};

export default RegisterScreen;
