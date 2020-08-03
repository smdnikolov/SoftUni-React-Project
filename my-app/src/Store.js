import React, { useState } from 'react'


export const UserContext = React.createContext(null)


const Store = ({ children }) => {

    const [user, setUser] = useState(`${localStorage.getItem('user')}`)

    return (
        <UserContext.Provider value={[user, setUser]}>
            {children}
        </UserContext.Provider>
    )
}
export default Store