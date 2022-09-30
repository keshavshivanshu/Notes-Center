import React, { useEffect } from 'react'
import { Button, Container, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';
const LandingPage = () => {
  const history = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      history("/mynotes");
    }
  }, [history, userInfo]);
  return (
    <div className='main'>
        <Container>
            <Row>
                <div className='intro-text'>
                  <div>
                    <h1 className='title'>Welcome to Note Center</h1>
                    <p className='subtitle'>Notes by experienced and for experience...</p>
                  </div>
                  <div className='buttonContainer'>
                    <a href='/login'>
                      <Button size='lg' className='landingbutton'>Login</Button>
                    </a>
                    <a href='/register'>
                      <Button size='lg' className='landingbutton' variant='primary'>SignUp</Button>
                    </a>
                  </div>
                </div>
            </Row>
        </Container>
    </div>
  )
}

export default LandingPage;