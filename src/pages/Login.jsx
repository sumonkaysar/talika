import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaGithub, FaGoogle } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import { GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import authImage from "../assets/auth.png";
import logo from "../assets/logo/talika.svg";
import { Link, useNavigate } from "react-router-dom";
import { server } from "../../links";
import Cookies from "js-cookie";

const Login = () => {
    const { login, providerLogin } = useAuth();
    const [passwordShown, setPasswordShown] = useState(false);
    const [loginError, setLoginError] = useState("");
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();

    const handleProviderLogin = provider => {
        providerLogin(provider)
            .then(result => {
                const { uid, displayName, email, photoURL } = result.user
                const joinedTime = (new Date()).getTime();
                axios.post(`${server}/users/provider`, { uid, name: displayName, email, img: photoURL, joinedTime })
                    .then(({ data }) => {
                        Cookies.set('talikaToken', data.token, { expires: 7, path: '/' });
                    })
                    .catch(err => console.error(err));
                navigate('/');
            })
            .catch(err => console.error(err));
    }

    const handleLogin = data => {
        setLoginError("");
        login(data.email, data.password)
            .then(result => {
                axios.post(`${server}/users/provider`, { email: data.email })
                    .then(info => {
                        console.log(info);
                        Cookies.set('talikaToken', info.token, { expires: 7, path: '/' });
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => {
                console.error(err);
                switch (err.message.split("auth/")[1].split(")")[0]) {
                    case "invalid-credential":
                        setLoginError("Email or password is incorrect");
                        break;

                    case "too-many-requests":
                        setLoginError(err.message.split("(auth/")[0].split(": ")[1]);
                        break;

                    default:
                        setLoginError(err.message);
                        break;
                }
            });
    };

    return (
        <div className="flex h-screen">
            <div className="w-[550px] p-16 justify-center items-center text-white hidden lg:flex bg-blue-600">
                <div>
                    <h4 className="text-xl font-bold text-[23px]">Welcome back to Talika</h4>
                    <p className="pt-4 pb-8 font-light text-[18px]">Please enter your credentials to access your account.</p>
                    <div>
                        <img className="w-full max-w-96" src={authImage} alt="Auth Image" />
                    </div>
                </div>
            </div>
            <div className="flex-1 bg-slate-200 relative">
                <div className="flex justify-center items-center h-full w-full">
                    <div>
                        <form onSubmit={handleSubmit(handleLogin)} className="w-64 xl:w-80">
                            <Link to="/" className="flex max-w-[80px] mb-10 absolute top-4 left-4">
                                <img src={logo} alt="Talika" />
                            </Link>
                            <h2 className="text-lg lg:text-2xl font-semibold">Log In</h2>
                            <div className="form-control mt-2">
                                <label htmlFor="email" className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    {...register("email", { required: true })}
                                    type="email"
                                    id="email"
                                    placeholder="Enter your email"
                                    className="input input-sm rounded-sm text-[15px] placeholder:text-[15px]"
                                />
                                {errors.email && (
                                    <p className="text-[#ff2525] text-[14px] mt-1 font-semibold">
                                        Email is required
                                    </p>
                                )}
                            </div>
                            <div className="form-control relative mt-3">
                                <label htmlFor="email" className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    {...register("password", { required: true })}
                                    type={passwordShown ? "text" : "password"}
                                    placeholder="Enter your Password"
                                    className="input input-sm rounded-sm text-[15px] placeholder:text-[15px]"
                                />
                                <div className="absolute top-[55px] right-3 cursor-pointer">
                                    {
                                        passwordShown ?
                                            <FaEyeSlash onClick={() => setPasswordShown(false)} /> :
                                            <FaEye onClick={() => setPasswordShown(true)} />
                                    }
                                </div>
                                {errors.password && (
                                    <p className="text-[#ff2525] text-[14px] mt-1 font-semibold">
                                        Password is required
                                    </p>
                                )}
                            </div>
                            {loginError && (
                                <p className="text-[#ff2525] text-[14px] mt-2 font-semibold text-center">
                                    {loginError}
                                </p>
                            )}
                            <div className="mt-4">
                                <button className="btn px-8 py-2 h-fit min-h-fit text-[14px] rounded-sm bg-blue-600 text-white">Login</button>
                            </div>
                        </form>
                        <div className="mt-4 flex items-center gap-3">
                            <span className="text-[12px] font-light">Or login with</span>
                            <FaGoogle onClick={() => handleProviderLogin(googleProvider)} className="cursor-pointer" />
                            <FaGithub onClick={() => handleProviderLogin(githubProvider)} className="cursor-pointer" />
                        </div>
                        <div className="mt-4 text-[14px] font-light">
                            <p>Don't have an account? <Link className="font-medium text-blue-600 hover:underline" to="/signup">Signup Here</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Login