import React from "react";
import { Star, StarFill } from "react-bootstrap-icons";

const renderRating = (pointFeedback: number) => {
    const starts = [];

    for (let i = 1; i <= 5; i++) {
        if (i <= pointFeedback) {
            starts.push(
                <StarFill className="text-warning" />
            );
        } else {
            starts.push(
                <Star className="text-secondary" />
            );
        }
    }
    
    return starts;
}

export default renderRating;