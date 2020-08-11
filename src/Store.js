import React, { useState, useEffect, } from 'react'
import firebase from './firebase'
export const UserContext = React.createContext(atob(localStorage.getItem('Zx1%sa3@R--26Z')))
export const QueryContext = React.createContext(JSON.parse(localStorage.getItem('query')))

const Store = ({ children }) => {
    const [user, setUser] = useState(atob(localStorage.getItem('Zx1%sa3@R--26Z')))
    const [query, setQuery] = useState(JSON.parse(localStorage.getItem('query')))

    useEffect(() => {
        (() => {
            firebase.auth.onAuthStateChanged((res) => {
                if (res) {
                    localStorage.setItem(`Zx1%sa3@R--26Z`, `${btoa(firebase.auth.currentUser.email)}`)
                    setUser(firebase.auth.currentUser.email)
                } else {
                    localStorage.setItem('Zx1%sa3@R--26Z', '')
                    setUser(null)
                }
            })
        })()
    })

    return (
        <UserContext.Provider value={[user, setUser]}>
            <QueryContext.Provider value={[query, setQuery]}>
                {children}
            </QueryContext.Provider>
        </UserContext.Provider>
    )
}
export default Store