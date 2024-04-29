import { useEffect, useState } from "react"
import { useDispatch,useSelector,UseSelector } from "react-redux"
import {toast} from 'react-toastify'
import Loader from "../../components/Loader"
import { setCredientials } from "../../redux/features/auth/AuthSlice"
import { Link } from "react-router-dom"
import {useProfileMutation} from "../../redux/api/UsersApiSlice"

const Profile = () => {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [userInfo]= useSelector((state)=>state.auth)

    const {updateProfile,isLoading} = useProfileMutation()

    useEffect(()=>{
        setUsername(userInfo.username)
        setEmail(userInfo.email)
    }, [userInfo.email,userInfo.username])

    const dispatch = useDispatch()

    const submiHandler = async (e) => {
        e.preventDefault()
        if(password !== confirmPassword){
            toast.error('Passwords do not match')
        } else {
            try{
                const res = await updateProfile({_id: userInfo._id, username, email, password}).unwrap();
                dispatch(setCredientials({...res}));
                toast.success('Profile updated successfully')
            } catch (error){
                toast.error(error?.data?.message || error.error)
            }
        }
    }
    

return (
    <div className="container mx-auto p-4 mt-[10rem]">
        <div className="flex justify-center align-center md:62ex md: space-x-4">
            <h2 className="text-2x2 font-semibold mb-4">Update Profile</h2>

            <form onSubmit={submiHandler}>


                <div className="mb-4">
                    <label className="block text-white mb-2">Name</label>
                    <input
                        type="text"
                        placeholder="Enter your name"
                        className="form-input p-4 rounded-sm w-fuee"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                <div className="mb-4">
                <label className="block text-white mb-2">Email</label>
                <input
                    type="email"
                    placeholder="Enter your email"
                    className="form-input p-4 rounded-sm w-fuee"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                </div>

                <div className="mb-4">
                <label className="block text-white mb-2">Password</label>
                <input
                    type="password"
                    placeholder="Enter your password"
                    className="form-input p-4 rounded-sm w-fuee"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                </div>

                <div className="mb-4">
                <label className="block text-white mb-2">Confirm Password</label>
                <input
                    type="password"
                    placeholder="Confirm your password"
                    className="form-input p-4 rounded-sm w-fuee"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                </div>

                <div className="flex justify-between">
                    <button 
                        type="submit"
                        className="bg-pink-500 text-white py-2 px-4 rounded hover: bg-pink-600"
                    >   Update
                    </button>

                    <Link
                        to="/user-orders"
                        className="bg-pink-600 text-white py-2 px-4 rounded hover:bg-pink-700"
                    >   My Orders
                    </Link>
                </div>


            </form>

        {loadingUpdateProfile && <Loader />}
        </div>
    </div>
)
}

export default Profile
