import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db, auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

const StoryLevel = () => {
  const { level } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [quizData, setQuizData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [error, setError] = useState("");
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if ([1, 4, 6].includes(currentStep)) {
      fetchQuizData();
    }
  }, [level, currentStep]);

  const fetchQuizData = async () => {
    try {
      const collectionMapping = {
        1: "quiz1",
        4: "storyQuestions",
        6: "quiz3",
      };

      const collectionName = collectionMapping[currentStep];
      if (!collectionName) return;

      const querySnapshot = await getDocs(collection(db, collectionName));
      const questions = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setQuizData(questions);
      setCurrentQuestionIndex(0);
      setSelectedOption(null);
      setQuizCompleted(false);
    } catch (error) {
      console.error("Error fetching quiz data:", error);
    }
  };

  const updateUserPoints = async (pointsToAdd) => {
      if (!user) return;
      const userRef = doc(db, "userPoints", user.email);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
          await updateDoc(userRef, { points: userSnap.data().points + pointsToAdd });
      } else {
          await setDoc(userRef, { email: user.email, points: pointsToAdd });
      }
  };

  const handleAnswerSubmit = () => {
    if (!selectedOption) {
      setError("Please select an answer.");
      return;
    }

    if (selectedOption === quizData[currentQuestionIndex].correctAnswer) {
      setScore(score + 10);
      updateUserPoints(10);
      setError("");
    } else {
      setScore(score - 5);
      updateUserPoints(-5);
      setError("Incorrect! Try the next one.");
    }

    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    } else {
      setQuizCompleted(true);
      setTimeout(() => setCurrentStep(currentStep + 1), 3000);
    }
  };

  // Reverted to use GIF files as requested.
  const storyElements = [
    { type: "gif", src: "/story1.gif" },
    { type: "quiz" },
    { type: "gif", src: "/story2.gif" },
    { type: "image", src: "/case-study.jpg" },
    { type: "quiz" },
    { type: "gif", src: "/story3.gif" },
    { type: "quiz" },
    { type: "image", src: "/case-study2.jpg" },
  ];
 
  if (currentStep >= storyElements.length) {
      return (
          <div className="story-container">
               <video autoPlay loop muted className="video-background">
                   <source src="/vdo.mp4" type="video/mp4" />
               </video>
              <div className="story-card">
                  <h2>Story Complete!</h2>
                  <p>Your final score from this story is: {score}</p>
                   <button className="next-btn" onClick={() => navigate('/dashboard')}>View Dashboard</button>
              </div>
          </div>
      )
  }

  return (
    <>
    <style>
        {`
        .story-container {
            position: relative;
            width: 100%;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            text-align: center;
            overflow: hidden;
            color: white;
            padding: 20px;
            box-sizing: border-box;
        }
        .story-container h2 {
            color: #ff9800;
            font-size: 2rem;
        }
        .story-container p {
            color: white;
        }
        .story-card {
            background: rgba(0, 0, 0, 0.75);
            padding: 2rem;
            border-radius: 15px;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1.5rem;
            width: 100%;
            max-width: 800px;
            border: 1px solid rgba(255, 255, 255, 0.18);
            backdrop-filter: blur(10px);
        }
        .story-gif, .story-image {
            width: 100%;
            max-height: 60vh;
            border-radius: 10px;
            margin-bottom:20px;
            object-fit: contain;
        }
        .img-container {
            width: 100%;
            max-height: 60vh;
            overflow: auto;
            border-radius: 10px;
        }
        .button-container {
            display: flex;
            gap: 1rem;
            align-items: center;
            justify-content: center;
        }
        .next-btn, .skip-btn {
            background-color: #ffcc00;
            color: black;
            font-size: 0.8rem;
            padding: 12px 30px;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-weight: bold;
        }
        .skip-btn {
            background-color: transparent;
            color: #ffcc00;
            border: 1px solid #ffcc00;
        }
        .next-btn:hover, .skip-btn:hover {
            background-color: #e6b800;
            color: black;
        }
        .quiz-card {
            background: rgba(0, 0, 0, 0.75);
            padding: 2rem;
            border-radius: 15px;
            width: 90%;
            border: 1px solid rgba(255, 255, 255, 0.18);
            backdrop-filter: blur(10px);
        }
        .ptag {
            color: white;
            font-size: 1.2rem;
        }
        .marks-info {
            font-size: 0.9rem;
            color: #ffc107;
            margin-bottom: 1rem;
        }
        .options {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
            width: 98%;
            margin: 1.5rem 0;
        }
        .option {
            display: flex;
            align-items: center;
            gap: 10px;
            cursor: pointer;
            width: 100%;
            padding: 10px;
            border-radius: 8px;
            background: rgba(255, 255, 255, 0.1);
            transition: background 0.3s;
        }
        .option:hover {
            background: rgba(255, 255, 255, 0.2);
        }
        .option input[type="radio"] {
           accent-color: #ff9800;
        }
        .submit-btn {
            background: #e74c3c;
            color: white;
            font-size: 1rem;
            padding: 12px 30px;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            transition: background 0.3s ease;
        }
        .submit-btn:hover {
            background: #c0392b;
        }
        .error-message {
            color: #ff4d4d;
            font-size: 0.9rem;
            margin-top: 1rem;
        }
        .scoredisplay {
            margin-top: 1rem;
            color: #ffeb3b;
            font-size: 1.2rem;
        }
        @media (max-width: 768px) {
            .story-card, .quiz-card {
              padding: 1.5rem;
              gap: 1rem;
              width: 90%;
            }
            .story-container h2 {
              font-size: 1rem;
            }
            .story-container {
              min-height:80vh;
            }
            .ptag {
              font-size: 0.8rem;
            }
            .options {
              display: flex;
              flex-direction: column;
              align-items: flex-start;
              gap: 1rem;
              width: 95%;
              margin: 1.5rem 0;
              font-size:12px;
            }
        }
        `}
    </style>
    <div className="story-container">
      <video autoPlay loop muted className="video-background">
        <source src="/vdo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {storyElements[currentStep]?.type === "gif" && (
        <div className="story-card">
          <h2>The Story Unfolds...</h2>
          <img
            src={storyElements[currentStep].src}
            alt="Story Animation"
            className="story-gif"
          />
          <div className="button-container">
             <button className="skip-btn" onClick={() => setCurrentStep(currentStep + 1)}>
               Skip Animation
             </button>
          </div>
        </div>
      )}

      {storyElements[currentStep]?.type === "image" && (
        <div className="story-card">
          <h2>Read the Following Case Study</h2>
          <div className="img-container"><img src={storyElements[currentStep].src} alt="Case Study" className="story-image" /></div>
          <button className="next-btn" onClick={() => setCurrentStep(currentStep + 1)}>
            Next
          </button>
        </div>
      )}

      {storyElements[currentStep]?.type === "quiz" && (
        <div className="quiz-card">
          <h2>Scam Awareness Quiz</h2>
          {quizData.length === 0 ? (
            <p>Loading quiz...</p>
          ) : quizCompleted ? (
            <h3 className="quiz-completed">Quiz Completed! Moving to next step...</h3>
          ) : (
            <>
              <p className="ptag">
                <strong>Question {currentQuestionIndex + 1}:</strong>{" "}
                {quizData[currentQuestionIndex]?.question}
              </p>
              <p className="marks-info">(+10 points for correct, -5 for wrong)</p>

              <div className="options">
                {quizData[currentQuestionIndex]?.options.map((opt) => (
                  <label key={opt} className="option">
                    <input
                      type="radio"
                      name="quiz-option"
                      value={opt}
                      checked={selectedOption === opt}
                      onChange={() => setSelectedOption(opt)}
                    />
                    {opt}
                  </label>
                ))}
              </div>

              {error && <p className="error-message">{error}</p>}

              <button onClick={handleAnswerSubmit} className="submit-btn">
                Submit
              </button>

              <h3 className="scoredisplay">
                Your Score: {score}
              </h3>
            </>
          )}
        </div>
      )}
    </div>
    </>
  );
};

export default StoryLevel;

