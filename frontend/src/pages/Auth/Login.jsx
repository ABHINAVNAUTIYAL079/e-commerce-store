import { useState , useEffect } from "react"
import { Link , useLocation, useNavigate } from "react-router-dom"
import { useSelector , useDispatch } from "react-redux"
import { setCredentials } from "../../redux/features/auth/authSlice"
import { useLoginMutation } from "../../redux/api/usersApiSlice"
import { toast } from "react-toastify"
import Loader from "../../components/Loader"

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { userInfo } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [login, { isLoading }] = useLoginMutation();
    const {search} = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/';

    useEffect(() => {
        if(userInfo) {
            navigate(redirect);
        }
    },[userInfo, navigate, redirect])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await login({email, password}).unwrap();
            dispatch(setCredentials(res));
            toast.success('Login successful');
            navigate(redirect);
        } catch (error) {
            toast.error(error?.data?.message || error.message);
        }
    }

    return (
        <div>
            <section className="pl-[10rem] flex flex-wrap">
                <div className="mr-[4rem] mt-[5rem]">
                    <h1 className="text-2xl font-semibold mb-4">
                        Login
                    </h1>
                    <form className="container w-[40rem] " onSubmit={handleSubmit}>
                        <div className="py-4">
                            <label 
                            htmlFor="email"
                            className="block text-sm font-medium mb-2">Email Address</label>
                            <input
                            type="email"
                            id="email"
                            className="w-full px-3 py-2 border rounded-lg"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} 
                            />
                        </div>
                        <div className="py-4">
                            <label 
                            htmlFor="password"
                            className="block text-sm font-medium mb-2">Password</label>
                            <input
                            type="password"
                            id="password"
                            className="w-full px-3 py-2 border rounded-lg"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} 
                            />
                        </div>
                        <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-pink-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem]">
                            {isLoading ? "Signing in.." : "Sign In"}
                        </button>

                        {isLoading && <Loader />}
                    </form>
                    <div className="mt-4">
                        <p className="text-white">
                            New Customer ? {" "} <Link to= {redirect ? `redirect?${redirect}` : '/register'}  className="text-pink-500 hover:underline">Register</Link>
                        </p>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Login;