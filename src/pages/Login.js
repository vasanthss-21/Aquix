import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const Login = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isRegister, setIsRegister] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (isRegister) {
            if (password !== confirmPassword) {
                setError("Passwords do not match!");
                return;
            }
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                await updateProfile(userCredential.user, { displayName: name });
                await setDoc(doc(db, "users", userCredential.user.uid), { name: name, email: email });
                await setDoc(doc(db, "userPoints", email), { email: email, points: 0 });
                navigate("/");
            } catch (err) {
                setError(err.message);
            }
        } else {
            try {
                await signInWithEmailAndPassword(auth, email, password);
                navigate("/");
            } catch (err) {
                setError(err.message);
            }
        }
    };

    return (
        <>
            <style>
                {`
                .auth-wrapper {
                    position: relative;
                    width: 100%;
                    height: 88.7vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;
                }
                .video-background {
                  position: fixed;
                  top: 0;
                  left: 0;
                  width: 100vw;
                  height: 100vh;
                  object-fit: cover;
                  z-index: -1; /* Placed behind the content */
                }
                .auth-flipper {
                    position: relative;
                    width: 90%;
                    max-width: 420px;
                    /* Height is now controlled by specific classes */
                    transition: transform 0.8s, height 0.6s ease-in-out;
                    transform-style: preserve-3d;
                }
                .auth-flipper-login {
                    height: 450px;
                }
                .auth-flipper-register {
                    height: 550px;
                }
                .auth-flipper.is-flipped {
                    transform: rotateY(180deg);
                }
                .auth-container {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    -webkit-backface-visibility: hidden; /* Safari */
                    backface-visibility: hidden;
                    background: rgba(10, 10, 20, 0.75);
                    padding: 2.5rem;
                    border-radius: 15px;
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.37);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.18);
                    color: white;
                    text-align: center;
                    box-sizing: border-box;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                }
                .auth-container.back {
                    transform: rotateY(180deg);
                }
                .auth-container h2 {
                    color: #ffd700;
                    font-size: 2.5rem;
                    margin-bottom: 1.5rem;
                    font-weight: 600;
                }
                .auth-container form {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }
                .auth-container input {
                    width: 100%;
                    padding: 14px 20px;
                    background: rgba(255, 255, 255, 0.1);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    border-radius: 8px;
                    color: white;
                    font-size: 1rem;
                    transition: border-color 0.3s, box-shadow 0.3s;
                    box-sizing: border-box;
                }
                .auth-container input::placeholder {
                    color: rgba(255, 255, 255, 0.6);
                }
                .auth-container input:focus {
                    outline: none;
                    border-color: #ff9800;
                    box-shadow: 0 0 10px rgba(255, 152, 0, 0.5);
                }
                .auth-container button[type="submit"] {
                    width: 100%;
                    padding: 14px;
                    background: linear-gradient(90deg, #ff5722, #ff9800);
                    color: white;
                    margin-top: 1rem;
                    font-size: 1.1rem;
                    font-weight: bold;
                    border: none;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: transform 0.2s, box-shadow 0.3s;
                }
                .auth-container button[type="submit"]:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 20px rgba(255, 87, 34, 0.4);
                }
                .toggle-link {
                    margin-top: 1.5rem;
                    cursor: pointer;
                    color: #ffd700;
                    display: block;
                    font-size: 0.95rem;
                    transition: color 0.3s;
                }
                .toggle-link:hover {
                    color: #ffeb3b;
                    text-decoration: underline;
                }
                .error-message {
                    color: #ff4d4d;
                    background-color: rgba(255, 77, 77, 0.1);
                    border: 1px solid rgba(255, 77, 77, 0.3);
                    padding: 10px;
                    border-radius: 8px;
                    margin-top: 1rem;
                    font-size: 0.9rem;
                }
                @media (max-width: 768px) {
                    .auth-flipper-login {
                        height: auto;
                        min-height: 480px;
                    }
                    .auth-flipper-register {
                        height: auto;
                        min-height: 550px;
                    }
                     .auth-container h2 {
                        font-size: 2rem;
                    }
                }
                `}
            </style>
            <div className="auth-wrapper">
                <video autoPlay loop muted className="video-background">
                    <source src="vdo.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div className={`auth-flipper ${isRegister ? 'is-flipped auth-flipper-register' : 'auth-flipper-login'}`}>
                    {/* Login Form (Front) */}
                    <div className="auth-container front">
                        <h2>Login</h2>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                autoComplete="email"
                            />
                            <input
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                autoComplete="current-password"
                            />
                            <button type="submit">Login</button>
                        </form>
                        {error && !isRegister && <p className="error-message">{error}</p>}
                        <p onClick={() => setIsRegister(true)} className="toggle-link">
                            New here? Sign up
                        </p>
                    </div>

                    {/* Sign Up Form (Back) */}
                    <div className="auth-container back">
                        <h2>Sign Up</h2>
                        <form onSubmit={handleSubmit}>
                             <input
                                type="text"
                                placeholder="Enter your full name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                autoComplete="name"
                            />
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                autoComplete="email"
                            />
                            <input
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                autoComplete="new-password"
                            />
                            <input
                                type="password"
                                placeholder="Confirm your password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                autoComplete="new-password"
                            />
                            <button type="submit">Register</button>
                        </form>
                        {error && isRegister && <p className="error-message">{error}</p>}
                        <p onClick={() => setIsRegister(false)} className="toggle-link">
                            Already have an account? Login
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;

