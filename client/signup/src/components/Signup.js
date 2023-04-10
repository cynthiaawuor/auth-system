import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp(){
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [tel, setTel] = useState("");
    const navigate = useNavigate();

const gotoLoginPage = () => navigate("/");

const postSignUpDetails = () => {
   fetch("http://localhost:4000/api/register", {
        method: "POST",
        body: JSON.stringify({
            email,
            password,
            tel,
            username,
        }),
        headers: {'Content-Type': 'application/json',
    },
   }) 
   .then((res) => res.json())
   .then((data) => {
    if(data.error_message) {
        alert(data.error_message)
    } else {
        alert(data.message);
        navigate("/");
    }
   })
   .catch((err) => console.log(err));
}

const handleSubmit = (e) => {
    e.preventDefault();
    postSignUpDetails()
    setEmail("")
    setPassword("")
    setTel("")
    setUsername("")
};
    return (
        <div className="signup__container">
            <h2>Sign Up</h2>
            <form className="signup__form" onSubmit={handleSubmit}>
                <label htmlFor="email">Email Address</label>
                <input 
                    type="text"
                    name="email"
                    id="email" 
                    value={email} 
                    required 
                    onChange={(e) => setEmail(e.target.value)}>

                    </input>

                <label htmlFor="username">Username</label>
                <input 
                    type="text" 
                    name="username" 
                    id="username"
                    value={username}
                    required
                    onChange={(e) => setUsername(e.target.value)} >

                </input>

                <label htmlFor="tel">Phone Number</label>
                <input 
                    type="tel"
                    name="tel"
                    id="tel"
                    value={tel}
                    required
                    onChange={(e) => setTel(e.target.value)} >

                    </input>

                    <label htmlFor="password">Password</label>
                    <input 
                        type="password"
                        name="password"
                        id="password"
                        minLength={8}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} >


                        </input>

                        <button className="signupBtn">SIGN UP</button>
                        <p>
                            Already have an account?{" "}
                            <span className="link" onClick={gotoLoginPage}>Login</span>
                        </p>

            </form>

        </div>
    )
}
export default SignUp;