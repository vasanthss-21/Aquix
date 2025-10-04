import { useState, useEffect } from "react";
import { db, auth } from "../firebase"; // Firebase setup file
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, doc, updateDoc, setDoc, getDoc } from "firebase/firestore";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [user, setUser] = useState(null);
  const [totalPoints, setTotalPoints] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchQuestions = async () => {
      const querySnapshot = await getDocs(collection(db, "quizQuestions"));
      const quizData = querySnapshot.docs.map(doc => doc.data());
      setQuestions(quizData);
    };

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    });

    fetchQuestions();
    return () => unsubscribe();
  }, []);

  const handleAnswerSubmit = async () => {
    if (!user) {
        setError("Please log in to play the quiz!");
        return;
    }
    if (selectedOption === null) {
        setError("Please select an answer!");
        return;
    }

    const correctAnswer = questions[currentQuestionIndex]?.correctAnswer;

    if (selectedOption === correctAnswer) {
      setTotalPoints(prevPoints => prevPoints + 10);
      await updateUserPoints(10);
      setError(""); // Clear error
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption(null);
      } else {
        setQuizCompleted(true);
      }
    } else {
      setTotalPoints(prevPoints => prevPoints - 5);
      await updateUserPoints(-5);
      setError("Incorrect! Try again.");
    }
  };

  const updateUserPoints = async (points) => {
    if(!user) return;
    const userRef = doc(db, "userPoints", user.email);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      await updateDoc(userRef, { points: userSnap.data().points + points });
    } else {
      await setDoc(userRef, { email: user.email, points });
    }
  };

  if (questions.length === 0) {
      return (
        <div className="quiz-container">
             <video autoPlay loop muted className="video-background">
                <source src="vdo.mp4" type="video/mp4" />
            </video>
            <p style={{color: "white"}}>Loading questions...</p>
        </div>
      )
  }

  return (
    <>
    <style>
        {`
        .quiz-container {
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
        .quiz-container h2 {
            color: #ff9800;
            font-size: 2rem;
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
            width: 100%;
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
            text-align: left;
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
            font-size: 1.5rem;
        }
        @media (max-width: 768px) {
            .quiz-card {
                padding: 1.5rem;
                width: 90%;
            }
            .quiz-container h2 {
                font-size: 1rem;
            }
            .quiz-container{
                height:100%;
                min-height:80vh;
            }
            .ptag {
                font-size: 0.8rem;
                text-align:center;
            }
            .options {
              font-size:12px;
              width:95%;
            }
        }
        `}
    </style>
    <div className="quiz-container">
      <video autoPlay loop muted className="video-background">
        <source src="vdo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {quizCompleted ? (
        <div className="quiz-card">
          <h2>Quiz Completed!</h2>
          <p className="scoredisplay">Your Total Score: {totalPoints} points</p>
        </div>
      ) : (
        <div className="quiz-card">
          <h2>Scam Awareness Quiz</h2>
          <p className="ptag">
            <strong>Question {currentQuestionIndex + 1}:</strong> {questions[currentQuestionIndex]?.question}
          </p>
          <p className="marks-info">(+10 points for correct, -5 for wrong)</p>
          
          <div className="options">
            {questions[currentQuestionIndex]?.options.map(opt => (
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

          <button onClick={handleAnswerSubmit} className="submit-btn">Submit</button>
        </div>
      )}
    </div>
    </>
  );
};

export default Quiz;
