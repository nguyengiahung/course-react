import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getQuizById } from "../../services/apiService";

const DetailQuiz = (props) => {
    const params = useParams();
    const quizId = params.id;

    useEffect(() => {
        fetchQuestions();
    }, [quizId])

    const fetchQuestions = async() => {
        let res = await getQuizById(quizId);
        console.log(res);
    }

    return (
        <div className="detail-quiz-container">
            Detail Quiz
        </div>
    )
}

export default DetailQuiz;