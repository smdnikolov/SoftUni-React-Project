import React, { useState, } from 'react'

export const UserContext = React.createContext(null)
export const ToastContext = React.createContext(null)


const Store = ({ children }) => {

    const [user, setUser] = useState(null)
    const [toast, setToast] = useState('')

    return (
        <UserContext.Provider value={[user, setUser]}>
            <ToastContext.Provider value={[toast, setToast]}>
                {children}
            </ToastContext.Provider>
        </UserContext.Provider>
    )
}
export default Store