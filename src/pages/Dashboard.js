import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

const Dashboard = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                // Fetch both user points and user details
                const pointsRef = doc(db, "userPoints", user.email);
                const userRef = doc(db, "users", user.uid); // Fetch by UID for name

                const pointsSnap = await getDoc(pointsRef);
                const userSnap = await getDoc(userRef);

                let combinedData = {};

                if (pointsSnap.exists()) {
                    combinedData = { ...pointsSnap.data() };
                }
                if (userSnap.exists()) {
                    combinedData = { ...combinedData, ...userSnap.data() };
                }

                if (Object.keys(combinedData).length > 0) {
                    setUserData(combinedData);
                } else {
                    console.log("No user data found for email or UID.");
                }

            } else {
                // Handle case where there is no user
                console.log("User is not logged in.");
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <>
            <style>
                {`
                .dashboard-container {
                    position: relative;
                    width: 100%;
                    min-height: 100vh; /* Changed from height to min-height */
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;
                    padding: 2rem;
                    box-sizing: border-box;
                    background:none;
                }
                p {
                    font-size: 15px;
                    color: #ffffffff;
                }
                .background-video {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    z-index: -2;
                }
                .dashboard-content {
                    width: 100%;
                    max-width: 600px;
                    text-align: center;
                }
                .dashboard-heading {
                    font-size: 2.5rem; /* Adjusted for better mobile view */
                    color: #ffcc00;
                    margin-bottom: 2rem;
                    font-weight: 700;
                    text-shadow: 0 0 10px rgba(255, 204, 0, 0.5);
                }
                .dashboard-card {
                    background: rgba(10, 10, 20, 0.75);
                    padding: 2.5rem;
                    border-radius: 15px;
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.37);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.18);
                    color: #ffffff;
                    text-align: left;
                }
                .user-info {
                    font-size: 1.1rem;
                    margin-bottom: 1.5rem;
                    padding-bottom: 1.5rem;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
                }
                .user-info strong {
                    color: #ff9800;
                    margin-right: 10px;
                }
                .points-display {
                    text-align: center;
                }
                .points-display p {
                    font-size: 1.2rem;
                    color: #ff9800;
                    margin-bottom: 0.5rem;
                }
                .points-value {
                    font-size: 3.5rem; /* Adjusted for better mobile view */
                    font-weight: 700;
                    color: #ffeb3b;
                    text-shadow: 0 0 15px rgba(255, 235, 59, 0.6);
                }
                .loading-text, .no-data-text {
                    color: white;
                    font-size: 1.2rem;
                }
                
                @media (max-width: 768px) {
                    .dashboard-container {
                        padding: 1rem;
                        height:100%;
                        min-height:85vh;
                    }
                    .dashboard-heading {
                        font-size: 1.5rem;
                        margin-bottom: 1.5rem;
                    }
                    .points-value {
                        font-size: 3rem;
                    }
                    .dashboard-card {
                        padding: 1.5rem;
                    }
                    .user-info {
                        font-size: 1rem;
                        padding-bottom: 1rem;
                        margin-bottom: 1rem;
                    }
                     .points-display p {
                        font-size: 1rem;
                    }
                }
                `}
            </style>
            <div className="dashboard-container">
                <video autoPlay loop muted className="background-video">
                    <source src="/vdo.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div className="overlay" />
                <div className="dashboard-content">
                    <h1 className="dashboard-heading">User Dashboard</h1>
                    {loading ? (
                        <p className="loading-text">Loading your stats...</p>
                    ) : userData ? (
                        <div className="dashboard-card">
                            <div className="user-info">
                                <p><strong>Welcome,</strong> {userData.name || 'User'}</p>
                                <p><strong>Email:</strong> {userData.email}</p>
                            </div>
                            <div className="points-display">
                                <p>Your Total Points</p>
                                <span className="points-value">{userData.points ?? 0}</span>
                            </div>
                        </div>
                    ) : (
                        <p className="no-data-text">No user data found. Complete a quiz to see your points!</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default Dashboard;

