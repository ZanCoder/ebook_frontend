import React, { useEffect, useState } from "react";
import { getAllFeedbackByProduct } from "../../api/FeedbackApi";
import Feedback from "../../models/Feedback";

interface FeedbackInterface {
    id: number;
}

const FeedbackComponent: React.FC<FeedbackInterface> = (props) => {
    const productId: number = props.id;

    const [listFeedbacks, setListFeedbacks] = useState<Feedback[]>([]);
    const [loadingData, setLoadingData] = useState(true);
    const [errorData, setErrorData] = useState(null);

    useEffect(() => {
        getAllFeedbackByProduct(productId)
            .then(feedbackData => {
                setListFeedbacks(feedbackData);
                setLoadingData(false);
            })
            .catch(error => {
                setErrorData(error.message);
                setLoadingData(false);
            });
    })

    if (loadingData) {
        return (
            <div>
                <h1>Loading....!</h1>
            </div>
        );
    }

    if (errorData) {
        return (
            <div>
                <h1>Error: {errorData}</h1>
            </div>
        );
    }

    return (
        <div className="row">
            {
                listFeedbacks.map((feedbackModel, index) => (
                    <div key={index}>
                        <div>
                            <h3>{feedbackModel.vote}</h3>
                        </div>
                        <div>
                            <p>{feedbackModel.textFeedback}</p>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}

export default FeedbackComponent;
