import React from 'react';
import styled from 'styled-components';

const ButtonFb = styled.div`
    display: inline-block;
    color: white;
    font-size: 24px;
    padding: 16px 66px;
    background-color: #4267B2;
    border-radius: 4px 0 0 4px;
    :hover {
        cursor: pointer;
    }
`;

const ButtonGoogle= styled.div`
    display: inline-block;
    color: white;
    font-size: 24px;
    padding: 16px 66px;
    background-color: #E74847;
    border-radius: 0 4px 4px 0;
    :hover {
        cursor: pointer;
    }
`;
const LoginDiv = styled.div`
    font-size: 34px;
    color: white;
    font-weight: bold;
    text-align: center;
    margin-bottom: 60px;
`;

const Login = ({email, pass, signIn, changeHandler, errorMessage, remember}) => {

    return (
        <div>
            <div className='login'>
                <div className='Logwrapper'>
                    <LoginDiv>LOGIN</LoginDiv>
                    {errorMessage !== "" && <div className="errorMessage">{errorMessage}</div>}
                    <form onSubmit={signIn}>
                        <input
                            className='info-field'
                            type="email"
                            placeholder='EMAIL *'
                            value={email}
                            onChange={(e) => changeHandler(e, 'email')}
                        />
                        <input
                            className='info-field'
                            type="password"
                            placeholder='PASSWORD *'
                            value={pass}
                            onChange={(e) => changeHandler(e, 'pass')}
                        />
                        <div className='remembering'>
                            <div className='remember'>
                                <label htmlFor="Remember Me">Remember Me</label>
                                <input type="checkbox" onChange={(e => remember(e))} name="Remember Me" value="Remember Me"/>
                            </div>
                            <a href="">Forgot Password?</a>
                        </div>
                        <input type="submit" value="LOGIN" className='submit'/>
                        <p>You can also log in with one of this accounts</p>
                        <div className='facgo'>
                            <ButtonFb>Facebook</ButtonFb>
                            <ButtonGoogle>Google</ButtonGoogle>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    );
};


export default Login;
