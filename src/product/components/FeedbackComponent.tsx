import React, { useEffect, useState } from "react";
import { getAllFeedbackByProduct } from "../../api/FeedbackApi";
import Feedback from "../../models/Feedback";
import { Star, StarFill } from "react-bootstrap-icons";
import renderRating from "../../layout/utils/Stars";

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
            <div>
                <h4>ĐÁNH GIÁ SẢN PHẨM</h4>
            </div>
            {
                listFeedbacks.map((feedbackModel, index) => (
                    <div className="row" key={index}>
                        <div className="col-4 text-end">
                            <h3>{renderRating(feedbackModel.vote ? feedbackModel.vote : 0)}</h3>
                        </div>
                        <div className="col-8 text-start">
                            <p>{feedbackModel.textFeedback}</p>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}

export default FeedbackComponent;
