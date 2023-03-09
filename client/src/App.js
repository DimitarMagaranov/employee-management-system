import logo from './logo.svg';
import './App.css';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import { auth } from './utils/firebase';
import AuthContext from './contexts/AuthContext';
import { Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from './components/Header/Header';
import Logout from './components/Logout/Logout';

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        auth.onAuthStateChanged(setUser);
    }, []);

    const authInfo = {
        isAuthenticated: !!user,
        userEmail: user?._delegate.email,
    };

    return (
        <div id="container">
            <Header userEmail={authInfo.userEmail} isAuthenticated={authInfo.isAuthenticated} />
            {/* <AuthContext.Provider value={authInfo}> */}
              <Routes>
                <Route index element={<Dashboard />}></Route>
                <Route path='/login' element={<Login />}></Route>
                <Route path='/logout' element={<Logout />}></Route>
              </Routes>
            {/* </AuthContext.Provider> */}
        </div>
    );
}

export default App;
