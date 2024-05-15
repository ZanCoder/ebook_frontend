class Feedback {
    id: number;
    vote: number;
    textFeedback: string;

    constructor(id: number,
                vote: number,
                textFeedback: string) {
        this.id = id;
        this.vote = vote;
        this.textFeedback = textFeedback;
    }
}

export default Feedback;