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
                        className="bg-[#0F766E] text-white px-4 py-2 rounded cursor-pointer my-[1rem]">
                            {isLoading ? "Signing in.." : "Sign In"}
                        </button>

                        {isLoading && <Loader />}
                    </form>
                    <div className="mt-4">
                        <p className="text-[#1F2937]">
                            New Customer ? {" "} <Link to= {redirect ? `redirect?${redirect}` : '/register'}  className="text-[#0F766E] hover:underline">Register</Link>
                        </p>
                    </div>
                </div>
                <img src="https://images.unsplash.com/photo-1576502200916-3808e07386a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2065&q=80" alt="" className="h-[35rem] w-[40%] xl:block md:hidden sm:hidden rounded-lg mt-25"/>
            </section>
        </div>
    )
}

export default Login;