import React from 'react';

const Login = ({email, pass, signIn, changeHandler}) => {

    return (
        <div>
            <div className='login'>
                <h5>LOGIN</h5>
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
                            <input type="checkbox" name="Remember Me" value="Remember Me"/>
                        </div>
                        <a href="">Forgot Password?</a>
                    </div>
                    <input type="submit" value="LOGIN" className='submit'/>
                    <p>You can also log in with one of this accounts</p>
                    <div className='facgo'>
                        <button className='fac'>Facebook</button>
                        <button className='go'>Google</button>
                    </div>
                </form>
            </div>
        </div>
    );
};


export default Login;
