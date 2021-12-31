import React, { useState , useContext } from 'react'
import { useHistory } from 'react-router';
import contextValue from '../context/notes/noteContext'
import Alert from './Alert';
const Signup = () => {

    let history = useHistory();

    const context = useContext(contextValue);
    const {setAlertShow,alertShow , setAlert , setAlerttype , alerttype ,alert  } = context;

    const [credential, setCredential] = useState({name:"", email: "", password: "" })

    const onSubmitform = async (e) => {
        e.preventDefault();
        let {name , email, password} = credential;
        //api call
        const response = await fetch(`https://inotebook-b.herokuapp.com/api/auth/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name, email,password })
        });
        const auth = await response.json()
        console.log(auth)

        if(auth.success){
            setAlertShow(true);
            setAlert("You are Signed in...")
            localStorage.setItem("token",auth.authtoken)
            setAlerttype("success");
            //  Redirect to home page
            history.push("/");
        }
        else{
            setAlertShow(true);
            setAlert("Wrong Credential.. Please Enter a valid Credentials.....");
            setAlerttype("danger");
        }
    }

    let onchange = (e) => {
        console.log(e.target.name, e.target.value);
        setCredential({ ...credential, [e.target.name]: e.target.value });
    }




    return (
        <div>
            <div className="my-2">
           {alertShow && <Alert sms={alert} color={alerttype} /> }
           <h2 className="text-center my-3">Register to Use iNotebook...</h2>
            <form onSubmit={onSubmitform}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name :</label>
                    <input type="text" className="form-control" value={credential.name} onChange={onchange} autoComplete="true" id="name" name="name" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credential.email} onChange={onchange} id="email" name="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credential.password} onChange={onchange} name="password" id="password" />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
        </div>
    )
}

export default Signup
