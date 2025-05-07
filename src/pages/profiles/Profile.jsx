import {useContext, useState} from "react";
import {getToken, deleteToken} from "../../utils/db";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {UserContext} from "../../contexts/UserContext.jsx";

const Profile = () => {
    const [user, setUser] = useContext(UserContext);
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [role, setRole] = useState("");
    const [age, setAge] = useState("");
    const navigate = useNavigate();
    const url = "http://localhost:8080/api/authenticated/update";

    const fetchData = async () => {
        return await getToken(1)
    };

    const deleteAllToken = async (id) => {
        await deleteToken(id);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const dataToken = await fetchData();
            if (dataToken === undefined) {
                alert("profile already setup by you!.");
                return;
            }

            const payload = {
                token: dataToken.token,
                id: dataToken.mainId,
                profile: {
                    firstName: firstname,
                    lastName: lastname,
                    role: role,
                    age: age
                }
            };

            const { data } = await axios.post(url, payload);
            setUser(data);
            await deleteAllToken(1);

            alert("profile update successful")
            const roles = data?.profile?.role;
            localStorage.setItem("status", JSON.stringify("login"));
            switch (roles) {
                case "TEACHER":
                    navigate("/teacher/dashboard");
                    break;
                case "STUDENT":
                    navigate("/student/dashboard");
                    break;
                default:
                    alert("Role not set.");
            }
        } catch(error) {
            console.error("Profile submission error:", error);
            alert("An error occurred while updating the profile.");
        }
    }

    return (
        <>
                <div className="auth-container">
        <div className="auth-card">
            <div className="auth-header">
                <a href="index.html" className="back-link"><i className="fas fa-arrow-left"></i></a>
                <h1>Profile setup</h1>
                <p>Set your profile to start your journey</p>
            </div>
            <form className="auth-form" onSubmit={handleSubmit} method="POST">

                <div className="form-group">
                    <label htmlFor="fullname">Firstname</label>
                    <div className="input-with-icon">
                        <i className="fas fa-user"></i>
                        <input 
                                type="text" 
                                id="fullname" 
                                name="fullname" 
                                placeholder="Enter your firstname" 
                                required 
                                value={firstname}
                                onChange={(e) => setFirstname(e.target.value)}
                                />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="fullname">Lastname</label>
                    <div className="input-with-icon">
                        <i className="fas fa-user"></i>
                        <input 
                                type="text" 
                                id="lastname" 
                                name="lastname" 
                                placeholder="Enter your lastname" 
                                required 
                                value={lastname}
                                onChange={(e) => setLastname(e.target.value)}
                                />
                    </div>
                </div>
                <div className="form-group">
                    <label>I am a:</label>
                    <div className="role-selector">
                        <div className="role-option">
                            <input 
                                    type="radio" 
                                    id="student" 
                                    name="role" 
                                    value="student"
                                    onChange={() => setRole("STUDENT")}
                                    />
                            <label htmlFor="student">
                                <i className="fas fa-user-graduate"></i>
                                <span>Student</span>
                                <p>I want to learn from teachers</p>
                            </label>
                        </div>
                        <div className="role-option">
                            <input 
                                    type="radio" 
                                    id="teacher" 
                                    name="role" 
                                    value="teacher"
                                    onChange={() => setRole("TEACHER")}
                                    />
                            <label htmlFor="teacher">
                                <i className="fas fa-chalkboard-teacher"></i>
                                <span>Teacher</span>
                                <p>I want to share my knowledge</p>
                            </label>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="fullname">Age</label>
                    <div className="input-with-icon">
                        <i className="fas fa-user"></i>
                        <input 
                                type="number" 
                                id="age" 
                                name="age" 
                                placeholder="Enter your age" 
                                required 
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                                />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary btn-block">Set profile</button>
            </form>
        </div>
    </div>

        </>
    );
}

export default Profile;