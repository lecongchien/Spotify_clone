import { useEffect, useState } from 'react';
import { databate } from '../PasswordLoginWithFirebase/FireBaseConfig';

function NameUser() {
    const [userName, setUserName] = useState('');
    useEffect(() => {
        databate.onAuthStateChanged((user) => {
            if (user) {
                setUserName(user.displayName);
            } else setUserName('');
        });
    });
    return userName;
}

export default NameUser;
