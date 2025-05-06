import { useState } from "react";
import { addUser, getToken } from "../../utils/db";
import axios from "axios";

const Profile = () => {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [role, setRole] = useState("");
    const [age, setAge] = useState("");
    const url = "http://localhost:8080/api/authenticated/update";

    const fetchData = async () => {
        const getDataToken = await getToken(1);
        return getDataToken
      };

    const sendData = async (user) => {
        await addUser(user);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const dataToken = await fetchData();
        const data1 = {
            token: dataToken.token,
            id: dataToken.mainId,
            profile: {
                firstName: firstname,
                lastName: lastname,
                role: role,
                age: age
            }
        }
        try {
            const { data } = await axios.post(url, data1);
            console.log(data);
            sendData(data);
            alert("profile update successful")
        } catch(error) {
            console.log(error)
            alert(error)
        }
    }

    return (
        <>
                <div className="auth-container">
        <div className="auth-card">
            <div className="auth-header">
                <a href="index.html" className="back-link"><i class="fas fa-arrow-left"></i></a>
                <h1>Profile setup</h1>
                <p>Set your profile to start your journey</p>
            </div>
            <form className="auth-form" onSubmit={handleSubmit} action="dashboard.html" method="GET">

                <div className="form-group">
                    <label for="fullname">Firstname</label>
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
                    <label for="fullname">Lastname</label>
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
                <div class="form-group">
                    <label>I am a:</label>
                    <div class="role-selector">
                        <div class="role-option">
                            <input 
                                    type="radio" 
                                    id="student" 
                                    name="role" 
                                    value="student"
                                    onChange={(e) => setRole("STUDENT")} 
                                    />
                            <label for="student">
                                <i class="fas fa-user-graduate"></i>
                                <span>Student</span>
                                <p>I want to learn from teachers</p>
                            </label>
                        </div>
                        <div class="role-option">
                            <input 
                                    type="radio" 
                                    id="teacher" 
                                    name="role" 
                                    value="teacher"
                                    onChange={(e) => setRole("TEACHER")}
                                    />
                            <label for="teacher">
                                <i class="fas fa-chalkboard-teacher"></i>
                                <span>Teacher</span>
                                <p>I want to share my knowledge</p>
                            </label>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label for="fullname">Age</label>
                    <div class="input-with-icon">
                        <i class="fas fa-user"></i>
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
                <button type="submit" class="btn btn-primary btn-block">Set profile</button>
            </form>
        </div>
    </div>

        </>
    );
}

export default Profile;