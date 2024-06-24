import axios from 'axios';
import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useValidation from '../utlis/formValidation';

function Login(props) {
  const [user,setUser] = useState({
    email:"",
    password:"",
  }) 

  const navigate = useNavigate();
  const {errors, validate} = useValidation()

  const readValue = (e) =>{
    const { name, value } = e.target;
    validate(name, value)
    setUser({...user, [name]:value})
  }

  const submitHandler = async(e)=>{
    e.preventDefault();
    try{
      await axios.post(`/v1/auth/login`,user).then(res =>{
        toast.success("login successful")
        localStorage.setItem('loginToken', true)
        navigate('/')
        window.location.reload();
      }).catch(err => toast.error(err.response.data.msg));
    }catch(error){
      toast.error(error.response.data.msg)
    }
  }
  return (
    <>
    <>
      <div className="row">
        <div className="col-6 offset-3 border p-3 mt-3">
          <form action="">
          <div>
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">
                Email address
              </label>
              <input
                type="email"
                class="form-control"
                name="email"
                value={user.email}
                placeholder="name@example.com"
                onChange={readValue}
              />
              {errors && errors.name ? (
                <p className="text-danger">{errors.email}</p>
              ) : null}
            </div>
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">
                Password
              </label>
              <input
                type="password"
                class="form-control"
                name="password"
                value={user.password}
                onChange={readValue}
                placeholder='******'
              />
              {errors && errors.name ? (
                <p className="text-danger">{errors.password}</p>
              ) : null}
            </div>
            
          </div>
          <button className="btn btn-primary" onClick={submitHandler}>
            {" "}
            Login
          </button>
          </form>
        </div>
      </div>
    </>
    </>
  )
}

export default Login