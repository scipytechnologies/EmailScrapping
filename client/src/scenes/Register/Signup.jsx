import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UserSignup() {
  const [form, setForm] = useState({});
  const onChangeHandler = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const navigate = useNavigate();

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    await axios
      .post("https://email-scraping.onrender.com/user/signup", form)
      .then((response) => {
        toast.success("Account Created");
        console.log(response);
        navigate("/Login");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="container mb-5">
        <div className="shadow p-4 mt-5 bg-body-tertiary rounded">
          <form>
            <h1 className="display-5 mb-4">Register</h1>
            <div className="row">
              <div className="col">
                <div className="mb-3">
                  <label className="form-label">First Name</label>
                  <input
                    className="form-control"
                    type="text"
                    name="firstName"
                    onChange={onChangeHandler}
                  />
                </div>
              </div>

              <div className="col">
                <div className="mb-3">
                  <label className="form-label">Last Name</label>
                  <input
                    className="form-control"
                    type="text"
                    name="lastName"
                    onChange={onChangeHandler}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col">
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    className="form-control"
                    type="text"
                    name="email"
                    onChange={onChangeHandler}
                  />
                </div>
              </div>

              <div className="col">
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    className="form-control"
                    type="password"
                    name="password"
                    onChange={onChangeHandler}
                  />
                </div>
              </div>
            </div>

            <button className="btn btn-primary" onClick={onSubmitHandler}>
              Submit
            </button>
            <br />
            <Link to="/Login">Already have an account?</Link>
          </form>
        </div>
      </div>
    </>
  );
}
export default UserSignup;
