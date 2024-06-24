import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useValidation from "../utlis/formValidation";
import { toast } from "react-toastify";

function Register() {
  const [user, setUser] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
    CPassword: "",
    role:""
  });

  const navigate = useNavigate();
  const { errors, validate } = useValidation();

  const readValue = (e) => {
    const { name, value } = e.target;
    validate(name, value);
    setUser({ ...user, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(`/v1/auth/register`, user)
        .then((res) => {
          toast.success("user registered successfully");
          navigate("/login");
        })
        .catch((err) => toast.error(err.response.data.msg));
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  return (
    <>
      <div className="row p-0 m-0">
        <div className="col-6 offset-3 border p-3 mt-1">
          <h5 className="text-center my-1">Register</h5>
          <form onSubmit={submitHandler}>
            <div>
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">
                  Name
                </label>
                <input
                  type="text"
                  class="form-control"
                  name="name"
                  value={user.name}
                  onChange={readValue}
                  placeholder="name"
                />
                {errors && errors.name ? (
                  <p className="text-danger">{errors.name}</p>
                ) : null}
              </div>
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
                {errors && errors.email ? (
                  <p className="text-danger">{errors.email}</p>
                ) : null}
              </div>
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">
                  Phone
                </label>
                <input
                  type="number"
                  class="form-control"
                  name="phone"
                  value={user.phone}
                  onChange={readValue}
                  placeholder="1234567890"
                />
                {errors && errors.phone ? (
                  <p className="text-danger">{errors.phone}</p>
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
                  placeholder="******"
                />
                {errors && errors.password ? (
                  <p className="text-danger">{errors.password}</p>
                ) : null}
              </div>
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">
                  Confirm Password
                </label>
                <input
                  type="password"
                  class="form-control"
                  name="CPassword"
                  value={user.CPassword}
                  onChange={readValue}
                  placeholder="******"
                />
                {errors && errors.CPassword ? (
                  <p className="text-danger">{errors.CPassword}</p>
                ) : null}
              </div>
              <div className="mb-3">
                <label htmlFor="role" className="form-label">
                  Role
                </label>
                <select
                  className="form-control"
                  name="role"
                  value={user.role}
                  onChange={readValue}
                >
                  <option value="" disabled>Select role</option>
                  <option value="admin">Admin</option>
                  <option value="user">Customer</option>
                </select>
                {errors && errors.role ? (
                  <p className="text-danger">{errors.role}</p>
                ) : null}
              </div>

            </div>
            <button className="btn btn-primary" type="submit">
              {" "}
              submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
