import React, { useState, useEffect, } from 'react'
import firebase from './firebase'
export const UserContext = React.createContext(atob(localStorage.getItem('Zx1%sa3@R--26Z')))

const Store = ({ children }) => {
    const [user, setUser] = useState(atob(localStorage.getItem('Zx1%sa3@R--26Z')))

    useEffect(() => {
        (() => {
            firebase.auth.onAuthStateChanged((res) => {
                if (res) {
                    localStorage.setItem(`Zx1%sa3@R--26Z`, `${btoa(firebase.auth.currentUser.email)}`)
                    setUser(firebase.auth.currentUser.email)
                } else {
                    localStorage.setItem('Zx1%sa3@R--26Z', '')
                }
            })
        })()
    })

    return (
        <UserContext.Provider value={[user, setUser]}>
            {children}
        </UserContext.Provider>
    )
}
export default Store