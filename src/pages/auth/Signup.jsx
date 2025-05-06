import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const url = "http://localhost:8080/api/auth/register";

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post(url, {email, password});
            console.log(data);
            alert("Account created successfully");
            navigate("/login");
        } catch (error) {
            console.error("Error creating account", error);
            const errorMessage = error.response?.data?.message || "error creating account";
            alert(errorMessage);
            // if (error.response.status === 400) {
            //     alert("Bad Request: Please check your input");
            // } else if (error.response.status === 500) {
            //     alert("Server Error: Please try again later");
            // }
        }
    }



    return (
        <>
                <div class="auth-container">
        <div class="auth-card">
            <div class="auth-header">
                <a href="index.html" class="back-link"><i class="fas fa-arrow-left"></i></a>
                <h1>Create Account</h1>
                <p>Join Teacherly to start your journey</p>
            </div>
            <form class="auth-form" onSubmit={handleSubmit} action="dashboard.html" method="GET">
                <div class="form-group">
                    <label for="email">Email</label>
                    <div class="input-with-icon">
                        <i class="fas fa-envelope"></i>
                        <input 
                                type="email" 
                                id="email" 
                                name="email" 
                                placeholder="Enter your email" 
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                />
                    </div>
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <div class="input-with-icon">
                        <i class="fas fa-lock"></i>
                        <input 
                                type="password" 
                                id="password" 
                                name="password" 
                                placeholder="Create a password" 
                                required 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                />
                    </div>
                </div>
                <div class="form-options">
                    <div class="terms-agreement">
                        <input type="checkbox" id="terms" name="terms" required />
                        <label for="terms">I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a></label>
                    </div>
                </div>
                <button type="submit" class="btn btn-primary btn-block">Create Account</button>
            </form>
            <div class="auth-divider">
                <span>OR</span>
            </div>
            <div class="social-login">
                <button class="btn btn-social btn-google">
                    <i class="fab fa-google"></i> Continue with Google
                </button>
                <button class="btn btn-social btn-facebook">
                    <i class="fab fa-facebook-f"></i> Continue with Facebook
                </button>
            </div>
            <div class="auth-footer">
                <p>Already have an account? <Link to="/login">Log in</Link></p>
            </div>
        </div>
    </div>
        </>
    );
}
export default Signup;