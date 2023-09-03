import classNames from 'classnames/bind';
import styles from './RegisterandLogin.module.scss';
import { databate } from './FireBaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { LoginAndRegister } from '~/App';
import { useEffect, useState } from 'react';
import Button from '../button/Button';
const cx = classNames.bind(styles);

function Register() {
    const history = useNavigate();
    const [changes, setChanges] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        setChanges(true);
        signInWithEmailAndPassword(databate, email, password)
            .then((data) => {
                history('/');
                setChanges(false);
                console.log(data);
            })
            .catch((err) => {
                alert(err.code);
                setChanges(false);
            });
    };
    return (
        <div className={cx('form_login')}>
            <LoginAndRegister.Consumer>
                {(context) => {
                    context.LoginRegister(changes);
                }}
            </LoginAndRegister.Consumer>
            <h1>Đăng nhập vào Spotify</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className={cx('email')}>
                    <label for="Email">Email hoặc tên người dùng</label>
                    <input name="email" placeholder="Nhập email người dùng" />
                </div>
                <div className={cx('password')}>
                    <label for="password">Mật khẩu</label>
                    <input name="password" type="password" placeholder="Mật khẩu" />
                </div>
                <button className={cx('login')}>Đăng nhập</button>
                <p>
                    Bạn chưa có tài khoản? <Button to="/register">Đăng ký Spotify</Button>
                </p>
            </form>
        </div>
    );
}
export default Register;
