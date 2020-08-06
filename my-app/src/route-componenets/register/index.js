// import React, { useState, useContext } from 'react'
// import { Link, useHistory } from 'react-router-dom'
// import firebase from '../../firebase'
// import { UserContext, ToastContext } from '../../Store'
// import Loader from '../../components/loader'
// import ErrorAlert from '../../components/error-alert'


// function Register() {
//     const [user, setUser] = useContext(UserContext)
//     const [, setToast] = useContext(ToastContext)
//     const [error, setError] = useState('')
//     const [loading, setLoading] = useState(false)
//     const history = useHistory()

//     async function register(event) {
//         event.preventDefault()
//         const { email, password, rePassword } = event.target.elements
//         if (rePassword.value === password.value) {
//             setLoading(true)
//             await firebase.register(email.value, password.value).then(() => {
//                 firebase.auth.onAuthStateChanged((res) => {
//                     res ? setUser(firebase.auth.currentUser) : setUser(null)
//                     setToast('logged')
//                     history.push('/profile')
//                 })
//             }).catch(err => {
//                 setLoading(false)
//                 console.log(err)
//                 setError(err.message)
//             })
//         } else {
//             setError('The passwords must match!')
//         }
//     }

// }

// // if (user) {
// //     return <Redirect to='/' />
// // }

// return (
//     <div className="container">
//         <div
//             {error ? <ErrorAlert message={error} /> : null}
//         <div className="row">
//         <div className="col">
//             <form className="form" onSubmit={register}>
//                 <h1 className="title">Register</h1>
//                 <input type="text" name="email" className="form-control mb-4" placeholder="E-mail" />
//                 <input type="password" name="password" className="form-control mb-4" placeholder="Password" />
//                 <input type="password" name="rePassword" className="form-control mb-4" placeholder="Repeat Password" />
//                 <button className="btn" type="submit">Register</button>
//                 {loading ? <div><Loader /></div> : null}
//                 <p>Already a member?&nbsp;
//                         <Link to="/login">Login</Link>
//                 </p>
//             </form>
//         </div>
//     </div>
//     </div >
// )


// export default Register

import React, { useState, useContext, useEffect } from 'react'
import { Link, useHistory, } from 'react-router-dom'
import firebase from '../../firebase'
import { ToastContext } from '../../Store'
import Loader from '../../components/loader'
import ErrorAlert from '../../components/error-alert'


function Register() {
    const [, setToast] = useContext(ToastContext)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function register(event) {
        event.preventDefault()
        const { email, password, rePassword } = event.target.elements
        if (rePassword.value === password.value) {
            setLoading(true)
            await firebase.register(email.value, password.value).then(() => {
                localStorage.setItem('logged', 'yes')
                setToast('logged')
                history.push('/profile')

            }).catch(err => {
                console.log(err)
                setError(err.message)
                setLoading(false)
            })
        } else {
            setError('The passwords must match!')
        }
        
    }
    useEffect(() => {
        if (localStorage.getItem('logged') === 'yes') {
            setToast('logged')
            history.push('/')
        }
    }, [history,setToast])

    return (
        <div className="container">
            {error ? <ErrorAlert message={error} /> : null}
            <div className="row">
                <div className="col">
                    <form className="form" onSubmit={register}>
                        <h1 className="title">Register</h1>
                        <input type="text" name="email" className="form-control mb-4" placeholder="E-mail" />
                        <input type="password" name="password" className="form-control mb-4" placeholder="Password" />
                        <input type="password" name="rePassword" className="form-control mb-4" placeholder="Repeat Password" />
                        <button className="btn" type="submit">Register</button>
                        {loading ? <div><Loader /></div> : null}
                        <p>Already a member?&nbsp;
                        <Link to="/login">Login</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register