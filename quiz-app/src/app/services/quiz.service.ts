import { Quiz } from "../models/quiz";

export class QuizService {
    quiz: Quiz[] = [];

    constructor() {
        fetch('https://opentdb.com/api.php?amount=10&type=boolean')
        .then(res => res.json())
        .then(res => this.quiz = res.results);
    }
}