import { Eye, EyeOff, Mail, Pen, Lock } from 'lucide-react';
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

const ClientForm = () => {
  const {signup} = useAuthStore();
  const [showpassword, setShowpassword ] = useState(false)
  const [formdata, setFormdata] = useState({
      username:"",
      email:"",
      password:""
    })
  const handleSubmit=async(e)=>{
    e.preventDefault();
    signup(formdata);
  }
  return (
    <>
      <div className="w-full max-w-sm  ">
        <form className="card-body" onSubmit={handleSubmit}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">username</span>
            </label>
            <div className="flex items-center gap-2 input input-bordered px-3">
              <Pen className="w-5 h-5 text-brand" />
              <input
                type="text"
                placeholder="John Doe"
                value={formdata.username}
                onChange={(e) =>
                  setFormdata({ ...formdata, username: e.target.value })
                }
                className="grow outline-none bg-transparent"
                required
                autoComplete="username" 
              />
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <div className="flex items-center gap-2 input input-bordered px-3">
              <Mail className="w-5 h-5 text-brand" />
              <input
                type="email"
                placeholder="email"
                value={formdata.email}
                onChange={(e) =>
                  setFormdata({ ...formdata, email: e.target.value })
                }
                className="grow outline-none bg-transparent"
                required
                autoComplete='email'
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
                type={showpassword ? "text" : "password"}
                placeholder="••••••••"
                value={formdata.password}
                onChange={(e) =>
                  setFormdata({ ...formdata, password: e.target.value })
                }
                className="grow outline-none bg-transparent"
                required
                autoComplete="new-password" 
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
              Create Account
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default ClientForm
