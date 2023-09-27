import { createContext, useState } from 'react';

export const LoginAndRegister = createContext();

export const Login = ({ children }) => {
    const [handleLogin, setHandleLogin] = useState();
    return (
        <LoginAndRegister.Provider value={{ login: handleLogin, LoginRegister: (value) => setHandleLogin(value) }}>
            {children}
        </LoginAndRegister.Provider>
    );
};
