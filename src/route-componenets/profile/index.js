import React, { useContext, useState, useEffect } from 'react'
import icon from '../../utils/portfolio.png'
import AdsListing from '../../components/ad-listing'
import Loader from '../../components/loader'
import firebase from '../../firebase.js'
import { UserContext } from '../../Store'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Img, } from 'react-image'
import ImageLoader from '../../components/image-loader'

const Profile = () => {
    const styles = { 'marginTop': '140px' }
    const history = useHistory()
    const [ads, setAds] = useState(null)
    const [myAds, setMyAds] = useState(null)
    const [myFollowedAds, setFollowedAds] = useState(null)
    const [user, setUser] = useContext(UserContext)
    const [loading, setLoading] = useState(true)
    const [flag, setFlag] = useState(true)
    const [toggle, setToggle] = useState(false)
    const [message, setMessage] = useState('')
    const [name, setName] = useState('')

    useEffect(() => {
        setTimeout(() => {
            localStorage.removeItem('loggingIn')
        }, 1000)

        setLoading(true)
        let mount = true;
        firebase.getAds().then((res) => {
            if (mount) {
                let fetched = []
                for (let key in res.data) {
                    fetched.unshift({
                        id: key,
                        ...res.data[key]
                    })
                }
                setFollowedAds(fetched.filter(x => x.followingUsers.includes(user)))
                setMyAds(fetched.filter(x => x.email === user))
                setLoading(false)
                setFlag(false)
            }
        }).catch((err) => {
            console.log(err)
            toast.error(err.message)
            history.push('/network-error')
        })
        return () => {
            localStorage.removeItem('page')
            localStorage.removeItem('sort')
            mount = false
        }
    }, [user, history, ads])

    const logout = () => {
        firebase.auth.signOut()
        localStorage.removeItem('page')
        localStorage.removeItem('sort')
        toast.success('Successfully logged out')
        setUser(null)
        history.push('/login')
    }
    const toggleSection = (e) => {
        localStorage.removeItem('page')
        localStorage.removeItem('sort')
        if (e.target.textContent === 'My Ads') {
            setAds(myAds)
            setName('My')
            setMessage('You have not posted any Ads yet')
        } else {
            setAds(myFollowedAds)
            setName('Followed')
            setMessage('You have not followed any Ads yet')
        }
        setToggle(true)
    }

    return (
        <div className="container search">
            {flag
                ? <div className="jumbotron" style={styles}><h1>Loading</h1><Loader /></div>
                : <div>
                    <div className="row">
                        <div className="col">
                            <div className="jumbotron prof">
                                <p className="title">{user}'s Profile:</p>
                                <Img src={icon} alt="" width="150px" loader={<ImageLoader />} />
                                <div className="profile">
                                    <button id="myAds" onClick={(e) => toggleSection(e)} className="btn-primary shadow-none">My Ads</button>
                                    <button id="followedAds" onClick={(e) => toggleSection(e)} className="btn-primary shadow-none">Followed Ads</button>
                                    <button onClick={logout} className="btn-primary shadow-none">Logout</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        {toggle
                            ? <div> {loading
                                ? <div className="jumbotron"><h1>Loading</h1><Loader /></div>
                                : <AdsListing ads={ads} name={name} message={message} />}
                            </div>
                            : null
                        }
                    </div>
                </div>
            }
        </div>
    )
}

export default Profile