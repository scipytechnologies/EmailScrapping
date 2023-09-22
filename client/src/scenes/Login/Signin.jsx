import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function UserSignin() {

    const [form, setForm] = useState({})
    const[id] = useState("")
    const onChangeHandler = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    const navigate = useNavigate();

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        await axios.post("http://localhost:8000/user/signin", form)
        .then((response)=>{
            console.log(response);
            toast.success("Login Successfully");
            const token = response.data.token
            localStorage.setItem('token',JSON.stringify(token))
            navigate("/Home")
        })
        .catch((err)=> console.log(err));
    };
    return (
        <>
            <div className="container mb-5">
                <div className="container-sm w-50 shadow p-3 mt-5 bg-body-tertiary rounded">
                    <h1 className="display-6 mb-4">Login</h1>
                    <form>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input className="form-control" type="text" aria-describedby="emailHelp" name="email" id="email" onChange={onChangeHandler}/>
                            <div  className="form-text" id="emailHelp">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input className="form-control" type="password" name="password" id="password" onChange={onChangeHandler}/>
                        </div>
                        <button className="btn btn-primary"onClick={onSubmitHandler}>Submit</button>
                        <br/>
                        <Link to="/Register">Dont have an account yet?</Link>
                    </form>
                </div>
            </div>
        </>
    );
}
export default UserSignin