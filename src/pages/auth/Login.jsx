import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { addToken } from "../../utils/db"

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const url = "http://localhost:8080/api/auth/login";

    const sendData = async (dataToken) => {
        await addToken(dataToken);
      };
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post(url, {email, password});
            console.log(data);
            console.log(data.email);
            const dataToken = {
                id: 1,
                mainId: data.id,
                token: data.token
            };
            sendData(dataToken);
            if (data.profile == null) {
                navigate("/profile/setup");
                return;
            };
            alert("login successfully");
            if (data.profile.role === "TEACHER") {
                navigate("/teacher/dashboard");
            } else if (data.profile.role === "STUDENT") {
                navigate("/student/dashboard");
            } else {
                alert("role not set");
            }
        } catch (error) {
           console.error("Error logging in:", error);
           const errorMessage = error.response?.data?.message || "invalid email or password";
           alert(errorMessage);
        }
    }


    return (
        <>
                <div class="auth-container">
        <div class="auth-card">
            <div class="auth-header">
                <a href="index.html" class="back-link"><i class="fas fa-arrow-left"></i></a>
                <h1>Welcome Back</h1>
                <p>Log in to continue your learning journey</p>
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
                    <div class="remember-me">
                        <input type="checkbox" id="remember" name="remember" />
                        <label for="remember">Remember me</label>
                    </div>
                    <a href="#" class="forgot-password">Forgot password?</a>
                </div>
                <button type="submit" class="btn btn-primary btn-block">Log In</button>
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
                <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
            </div>
        </div>
    </div>
        </>
    )
}

export default Login