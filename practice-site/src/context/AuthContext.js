import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../firebase';


const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();

    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password);
    }

    // If 'currentUser' state changes, setCurrentUser will be set to the active user
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
        setCurrentUser(user);
    })

    // Unsubscribes from the onAuthStateChanged listener whenever the component is unmounted
    return unsubscribe;
    }, [])

    const value = {
        currentUser,
        signup
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}