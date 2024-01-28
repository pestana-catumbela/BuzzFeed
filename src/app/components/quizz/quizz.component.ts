import { Component, OnInit } from '@angular/core';
import Quizz from '../../../assets/data/quizz.json';

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrl: './quizz.component.css'
})

export class QuizzComponent {
  logo:string = '';
  title:string = '';

  questions: any;
  questionSelected: any;

  answers:string[] = [];
  answerSelected:string = '';

  questionIndex:number = 0;
  questionMaxIndex:number = 0;

  finished:boolean = false;

  constructor() {
    this.logo = '../../../assets/imgs/logo.png';
  }

  ngOnInit():void {
    if(Quizz) {
      this.finished = false;
      this.title = Quizz.title;

      this.questions = Quizz.questions;
      this.questionSelected = this.questions[this.questionIndex];

      this.questionIndex = 0;
      this.questionMaxIndex = this.questions.length;
    }
  }

  playerChoose(value:string) {
    this.answers.push(value);
    this.nextStep();
  }

  async nextStep() {
    this.questionIndex += 1;

    if(this.questionMaxIndex > this.questionIndex) {
      this.questionSelected = this.questions[this.questionIndex];
    } else {
      this.finished = true;

      const finalAnswer:string = await this.checkResult(this.answers);
      this.answerSelected = Quizz.results[finalAnswer as keyof typeof Quizz.results];
    }
  }

  async checkResult(answer:string[]) {
    const result = answer.reduce((previous, current, index, array) => {
      if(array.filter(item => item === previous).length > array.filter(item => item === current).length) {
        return previous;
      } else {
        return current;
      }
    })

    return result;
  }
}
