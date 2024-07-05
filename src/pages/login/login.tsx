import { Link } from 'iconsax-react';
import Router from 'next/dist/shared/lib/router/router';
import Row from 'rc-table/lib/Footer/Row';
import { useState } from 'react';
import { Form } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';

function LoginPage() {
  const [phase, setPhase] = useState(1);
  const [username, setUsername] = useState('');
  const [errorUsername, setErrorUsername] = useState('');
  const [code, setCode] = useState('');
  const [errorCode, setErrorcode] = useState('');

  function handleDescChange(name: any, val: any) {
    const value = func.toEnglishDigits(val);

    let error = '';
    switch (name) {
      case 'username':
        if (!func.validateEmail(value)) {
          error = 'Invalid email';
        } else {
          error = '';
        }
        setErrorUsername(error);
        setUsername(value);
        return error;

      case 'code':
        if (value == '') {
          error = 'Enter code';
        } else {
          error = '';
        }
        setErrorcode(error);
        setCode(value);

        return error;
    }
  }

  const sendVerificationCode = () => {
    urlFetch2(
      Urls.webLogin,
      {
        username,
      },
      'POST',
    )
      .then((response) => {
        const res = JSON.parse(response._bodyText);
        if (res.status === 200) {
          toast.success(res.message);
          setPhase(2);
        } else {
          toast.error(res.message);
        }
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  const submitLogin = () => {
    setLoading(true);
    func
      .urlFetch2(
        Urls.verifyLogin,
        {
          username,
          otp: code,
        },
        'POST',
      )
      .then((response) => {
        setLoading(false);
        const res = JSON.parse(response._bodyText);
        if (res.status === 200) {
          setUserInfo(res.data);
          toast.success(res.message);
          Router.push('/business-dashboard/dashboard');
          localStorage.setItem('token', JSON.stringify(res.token));
        } else {
          toast.error(res.message);
        }
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err);
      });
  };

  return (
    <Row
      className='w-100 bgImageCover position-relative loginSection m-0'
      style={{ height: '100vh' }}
    >
      <Image
        alt='back'
        src={loginBack}
        fill
        sizes='100vw'
        style={{
          objectFit: 'cover',
        }}
      />
      {/* <div className="position-absolute w-100 h-100" style={{backgroundImage:"url('/image/pages/rectangle.png')"}}></div> */}

      <Row className='w-100 m-0' style={{ zIndex: 999, height: 80 }}>
        {/* <a> */}
        <div
          className='h-100 ml-auto'
          style={{ marginRight: 'auto', cursor: 'pointer' }}
        >
          <Link href='/'>
            <p
              className='bigger-Font float-right  p-5 pl-0 text-white'
              style={{ fontSize: '1.5em' }}
            >
              Back
            </p>
          </Link>
          <div
            className='bigger-Font mr-xl-5  mr-lg-5 mr-md-4 mr-sm-3 d-flex justify-content-center  align-items-center float-right mr-2 text-white'
            style={{ padding: '3rem .9rem 3rem' }}
          >
            <Link href='/'>
              <div
                className='bgImageContain float-right'
                style={{
                  position: 'relative',
                  width: 30,
                  height: 35,
                }}
              >
                <Image
                  alt='back'
                  src={backImg}
                  fill
                  sizes='100vw'
                  style={{
                    objectFit: 'contain',
                  }}
                />
              </div>
            </Link>
          </div>
        </div>
        {/* </a> */}
      </Row>
      <Row className='w-100 m-0' style={{ zIndex: 999 }}>
        <div
          className=' row position-relative loginForm bg-white p-4'
          style={{ borderRadius: 12, width: 370, margin: '-90px auto auto' }}
        >
          <Row
            className='d-flex justify-content-center align-item-center position-absolute rounded-circle d-flex justify-content-center align-item-center loginFormIcon m-0 bg-white pb-2'
            style={{ width: 100, height: 100, top: -50, left: 135 }}
          >
            <div
              className='bgImageContain m-auto'
              style={{
                width: 80,
                height: 80,
              }}
            >
              <Image src={bagImg} alt='logo' className='p-2' fill />
            </div>
          </Row>
          {/* {renderIf(loginMessageBox == 'loginMessageBox')(
            <Row className="messageTxt">
              <div id="loginMessageBox" className="m-auto">
                <p className="biggest-Font greenColor d-flex justify-content-center align-items-center text-center w-100 h-100">
                  Your message has been sent successfully!
                </p>
              </div>
            </Row>
          )} */}
          {phase === 1 ? (
            <Form className='p-xl-2 p-lg-2 p-md-2 p-sm-2 w-100 position-relative  mt-4 p-0'>
              <Form.Group>
                <Row className='inputBorder  m-0 py-2'>
                  <Form.Control
                    className='big-Font border-0'
                    type='text'
                    name='username'
                    value={username}
                    placeholder='Username'
                    onChange={(e) =>
                      handleDescChange('username', e.target.value)
                    }
                  />
                </Row>
                <Row className='redColor medium-Font  formError  m-0 pt-2'>
                  {errorUsername}
                </Row>
              </Form.Group>
              <Row className='w-100 m-0'>
                <Button
                  className='green-bg big-Font  w-100 mt-3 border-0 text-white'
                  type='submit'
                  onClick={sendVerificationCode}
                  disabled={
                    errorUsername.length !== 0 || username.length < 5 || loading
                  }
                  style={{
                    borderRadius: 12,
                    height: '48px',
                    borderColor: '#015248',
                  }}
                >
                  {loading ? (
                    <Spinner
                      animation='border'
                      style={{ width: '20px', height: '20px' }}
                    />
                  ) : (
                    'Next'
                  )}
                </Button>
              </Row>
            </Form>
          ) : (
            <Form className='p-xl-2 p-lg-2 p-md-2 p-sm-2 w-100 position-relative p-0'>
              <Form.Group>
                <div className='w-100' onClick={() => setPhase(1)}>
                  <p
                    className='pointer'
                    style={{ margin: '1rem auto auto', width: 'fit-content' }}
                  >
                    Edit username
                  </p>
                </div>
                <Row className='inputBorder  m-0 py-2'>
                  <Form.Control
                    className='big-Font border-0'
                    type='text'
                    name='code'
                    value={code}
                    placeholder='Verification code'
                    onChange={(e) => handleDescChange('code', e.target.value)}
                  />
                </Row>
                <Row className='redColor medium-Font formError m-0 pt-2'>
                  {errorCode}
                </Row>
              </Form.Group>
              <Row className='w-100 m-0'>
                {/* <div className='d-flex w-50'>
              <div style={{ margin: 'auto', width: 'fit-content' }}>{_renderFormattedTime()}</div>
            </div> */}
                <Button
                  className='green-bg d-flex justify-content-center align-items-center big-Font w-100 mt-3 border-0 text-white'
                  type='submit'
                  onClick={submitLogin}
                  disabled={code.length !== 5 || loading}
                  style={{
                    borderRadius: 12,
                    height: '48px',
                    borderColor: '#015248',
                  }}
                >
                  {loading ? (
                    <Spinner
                      animation='border'
                      style={{ width: '20px', height: '20px' }}
                    />
                  ) : (
                    'Submit'
                  )}
                </Button>
                {/* <Button
              className="text-white green-bg big-Font w-50 border-0"
              onClick={sendVerificationCode}
              disabled={time !== 0}
              style={{ borderRadius: 12, borderColor: '#015248' }}>
              Resend
            </Button> */}
                <div className='d-flex w-100 pointer mt-2'>
                  <div
                    style={{ margin: 'auto', width: 'fit-content' }}
                    onClick={sendVerificationCode}
                  >
                    Didn&apos;t get the code?
                  </div>
                </div>
              </Row>
            </Form>
          )}
        </div>
      </Row>
    </Row>
  );
}

LoginPage.Layout = LoginLayout;

export default withRedux(LoginPage);
