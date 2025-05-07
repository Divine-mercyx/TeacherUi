import React, {useState, useContext, useEffect} from 'react';
import {UserContext} from "../../contexts/UserContext.jsx";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";

const StudentDashboard = () => {
    const [user, setUser] = useContext(UserContext);
    const [sidebarActive, setSidebarActive] = useState(false);
    const [videoModalActive, setVideoModalActive] = useState(false);
    const [subscribed, setSubscribed] = useState({});
    const [teachers, setTeachers] = useState([]);
    const navigate = useNavigate();
    const url = "http://localhost:8081/api/authenticated/popular/teacher";


    const toggleSidebar = () => {
        setSidebarActive(!sidebarActive);
    };

    const toggleVideoModal = () => {
        setVideoModalActive(!videoModalActive);
    };

    const handleSubscribe = (teacher) => {
        setSubscribed((prev) => ({
            ...prev,
            [teacher]: !prev[teacher],
        }));
    };


    useEffect(() => {
        const fetchData = async () => {
            if (user && user.id && user.token) {
                const payload = {
                    id: user.id,
                    token: user.token
                };
                try {
                    const { data } = await axios.post(url, payload);
                    setTeachers(data);
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            } else {
                console.warn("User is not available, cannot fetch data.");
            }
        };

        fetchData();
    }, [user]);


    const videoData = [
        {
            title: "Introduction to Calculus",
            teacher: "Sarah Johnson",
            views: "1.2K views",
            date: "2 days ago",
            duration: "12:45",
            imgSrc: "https://images.unsplash.com/photo-1593642532744-d377ab507dc8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        },
    ];

    const teacherData = [
        {
            name: "Sarah Johnson",
            subject: "Mathematics",
            videos: 24,
            subscribers: "1.2K",
            avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        },
    ];

    const status = JSON.parse(localStorage.getItem("status")) || "login";

    useEffect(() => {
        if (status === "logout") {
            navigate("/login");
        }
    })


    const logout = () => {
        localStorage.setItem("status", JSON.stringify("logout"));
        navigate("/login");
    }



    return (
        <div className="dashboard-container">
            <aside className={`sidebar ${sidebarActive ? 'active' : ''}`}>
                <div className="sidebar-header">
                    <h2 className="logo">Teacherly</h2>
                    <button className="sidebar-close" onClick={toggleSidebar}>
                        <i className="fas fa-times"></i>
                    </button>
                </div>
                <div className="user-profile">
                    <div className="user-avatar">
                        <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User Avatar" />
                    </div>
                    <div className="user-info">
                        <h3>{user.profile.firstName} {user.profile.lastName}</h3>
                        <span className="user-role">{user.profile.role}</span>
                    </div>
                </div>
                <nav className="sidebar-nav">
                    <ul>
                        <li className="active"><a href="#"><i className="fas fa-home"></i> Dashboard</a></li>
                        <li><a href="#"><i className="fas fa-play-circle"></i> Explore</a></li>
                        <li><a href="#"><i className="fas fa-bookmark"></i> Saved</a></li>
                        <li><a href="#"><i className="fas fa-history"></i> History</a></li>
                        <li><a href="#"><i className="fas fa-user-friends"></i> Subscriptions</a></li>
                        <li><a href="#"><i className="fas fa-cog"></i> Settings</a></li>
                    </ul>
                </nav>
                <div className="sidebar-footer">
                    <a className="logout-btn" onClick={() => logout()}><i className="fas fa-sign-out-alt"></i> Logout</a>
                    <button className="delete-account-btn"><i className="fas fa-trash-alt"></i> Delete Account</button>
                </div>
            </aside>

            <main className="main-content">
                <header className="dashboard-header">
                    <button className="sidebar-toggle" onClick={toggleSidebar}>
                        <i className="fas fa-bars"></i>
                    </button>
                    <div className="search-bar">
                        <i className="fas fa-search"></i>
                        <input type="text" placeholder="Search videos, teachers..." />
                    </div>
                    <div className="header-actions">
                        <div className="notification-bell">
                            <i className="fas fa-bell"></i>
                            <span className="notification-badge">2</span>
                        </div>
                        <div className="user-dropdown">
                            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User Avatar" />
                            <span>{user.profile.firstName} {user.profile.lastName}</span>
                            <i className="fas fa-chevron-down"></i>
                        </div>
                    </div>
                </header>

                <div className="dashboard-content">
                    <div className="dashboard-welcome">
                        <h1>Welcome back, {user.profile.firstName}!</h1>
                        <p>Continue your learning journey today.</p>
                    </div>

                    {videoData.map((video, index) => (
                        <div className="video-card" key={index} onClick={toggleVideoModal}>
                            <div className="video-thumbnail">
                                <img src={video.imgSrc} alt="Video Thumbnail" />
                                <span className="video-duration">{video.duration}</span>
                            </div>
                            <div className="video-info">
                                <h3>{video.title}</h3>
                                <p className="video-teacher">{video.teacher}</p>
                                <p className="video-stats">
                                    <span><i className="fas fa-eye"></i> {video.views}</span>
                                    <span><i className="fas fa-calendar"></i> {video.date}</span>
                                </p>
                            </div>
                        </div>
                    ))}

                    <div className="content-section">
                        <div className="section-header">
                            { teachers.length > 0 && (
                                <h2>Popular Teachers</h2>
                            )}
                        </div>
                        <div className="teachers-grid">
                            { teachers.length > 0 ? (
                                teachers.map((teacher, index) => (
                                <div className="teacher-card" key={index}>
                                    <div className="teacher-avatar">
                                        <img src={teacher.avatar} alt="Teacher Avatar" />
                                    </div>
                                    <div className="teacher-info">
                                        <h3>{teacher.name}</h3>
                                        <p className="teacher-subject">{teacher.subject}</p>
                                        <p className="teacher-stats">
                                            <span><i className="fas fa-video"></i> {teacher.videos} videos</span>
                                            <span><i className="fas fa-users"></i> {teacher.subscribers} subscribers</span>
                                        </p>
                                        <div className="teacher-actions">
                                            <button
                                                className={`btn btn-sm ${subscribed[teacher.name] ? 'btn-secondary' : 'btn-primary'}`}
                                                onClick={() => handleSubscribe(teacher.name)}
                                            >
                                                <i className="fas fa-user-plus"></i> {subscribed[teacher.name] ? 'Subscribed' : 'Subscribe'}
                                            </button>
                                            <a href="#" className="btn btn-outline btn-sm">View Profile</a>
                                        </div>
                                    </div>
                                </div>
                            ))
                            ): (
                                <p>No teachers found</p>
                            )
                            }
                        </div>
                    </div>
                </div>
            </main>

            {videoModalActive && (
                <div className="modal" id="video-player-modal">
                    <div className="modal-content video-modal">
                        <div className="modal-header">
                            <h2>{videoData[0].title}</h2>
                            <button className="modal-close" onClick={toggleVideoModal}>
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="video-player">
                                <video controls>
                                    <source src="#" type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                            <div className="video-details">
                                <div className="video-info-header">
                                    <div className="video-meta">
                                        <p className="video-views"><i className="fas fa-eye"></i> {videoData[0].views}</p>
                                        <p className="video-date"><i className="fas fa-calendar"></i> Published on May 15, 2023</p>
                                    </div>
                                    <div className="video-actions-row">
                                        <button className="btn btn-icon" title="Like">
                                            <i className="fas fa-thumbs-up"></i> 245
                                        </button>
                                        <button className="btn btn-icon" title="Save">
                                            <i className="fas fa-bookmark"></i> Save
                                        </button>
                                        <button className="btn btn-icon" title="Download">
                                            <i className="fas fa-download"></i> Download
                                        </button>
                                        <button className="btn btn-icon" title="Share">
                                            <i className="fas fa-share"></i> Share
                                        </button>
                                    </div>
                                </div>
                                <div className="teacher-info-row">
                                    <div className="teacher-info-compact">
                                        <img src={videoData[0].imgSrc} alt="Teacher Avatar" />
                                        <div>
                                            <h3>{videoData[0].teacher}</h3>
                                            <p>{teacherData[0].subscribers} subscribers</p>
                                        </div>
                                    </div>
                                    <button className="btn btn-primary subscribe-btn">
                                        <i className="fas fa-user-plus"></i> Subscribe
                                    </button>
                                </div>
                                <div className="video-description">
                                    <h3>Description</h3>
                                    <p>This video provides an introduction to calculus, covering the fundamental concepts of limits, derivatives, and integrals. Perfect for beginners and those looking to refresh their knowledge.</p>
                                    <p>Topics covered:</p>
                                    <ul>
                                        <li>Introduction to Limits</li>
                                        <li>Basic Differentiation</li>
                                        <li>Applications of Derivatives</li>
                                        <li>Introduction to Integration</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudentDashboard;
