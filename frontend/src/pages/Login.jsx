import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Mail, Lock, EyeOff, Eye } from "lucide-react";
import { NavLink, Navigate } from "react-router-dom";



function Login() {
  const [showpassword, setShowpassword ] = useState(false)
  const {login, isLoggingIn, authUser} = useAuthStore()
  const [formdata, setFormdata] = useState({
    identifier:"",
    password:""
  })  
  const handleSubmit=async(e)=>{
    e.preventDefault();
    login(formdata);
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-sm shadow-2xl bg-base-100">
        <form className="card-body" onSubmit={handleSubmit}>
          <h2 className="text-center text-brand text-2xl font-bold">
            Welcome Back
            <p className="text-sm font-normal text-black">
              Don't have an account?{" "}
              <NavLink to="/signup" className="text-[#0000FF] hover:text-blue-700 cursor-pointer">
                Create account
              </NavLink>
            </p>
          </h2>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Username or Email</span>
            </label>
            <div className="flex items-center gap-2 input input-bordered px-3">
              <Mail className="w-5 h-5 text-brand" />
              <input
                type="text"
                placeholder="johndoe or johndoe@gmail.com"
                value={formdata.identifier}
                onChange={(e)=>setFormdata({ ...formdata, identifier:e.target.value})}
                className="grow outline-none bg-transparent"
                autoComplete="email"
                required
              />
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <div className="flex items-center gap-2 input input-bordered px-3">
              <Lock className="w-5 h-5 text-brand" />
              <input
                type={showpassword?"text":"password"}
                placeholder="••••••••"
                value={formdata.password}
                onChange={(e)=>setFormdata({...formdata, password:e.target.value})}
                className="grow outline-none bg-transparent"
                required
                autoComplete="current-password"
              />
              <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowpassword(!showpassword)}
                >
                  {showpassword ? (
                    <EyeOff className="h-5 w-5 text-brand" />
                  ) : (
                    <Eye className="h-5 w-5 text-brand" />
                  )}
                </button>
            </div>
          </div>

          <div className="form-control mt-6">
            <button className="bg-brand btn text-white hover:bg-dark_brand">
              {isLoggingIn?"Logging in...":"Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
