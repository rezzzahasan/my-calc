import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonComponent } from './components/button/button.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ButtonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'kalkulator';

  input: string = '';
  result: string = '';

  pressNum(num: string) {
    this.input = this.input + num;
  }

  getLastOperand() {
    let pos: number;
    console.log(this.input);
    pos = this.input.toString().lastIndexOf('+');
    if (this.input.toString().lastIndexOf('-') > pos)
      pos = this.input.lastIndexOf('-');
    if (this.input.toString().lastIndexOf('*') > pos)
      pos = this.input.lastIndexOf('*');
    if (this.input.toString().lastIndexOf('/') > pos)
      pos = this.input.lastIndexOf('/');
    console.log('Last ' + this.input.substr(pos + 1));
    return this.input.substr(pos + 1);
  }
  allClear() {
    this.result = '';
    this.input = '';
  }

  pressOperator(op: string) {
    let lastKey = this.input[this.input.length - 1];
    if (
      lastKey === '/' ||
      lastKey === '*' ||
      lastKey === '-' ||
      lastKey === '+'
    ) {
      return;
    }

    this.input = this.input + op;
    this.calcAnswer();
  }

  calcAnswer() {
    let formula = this.input;

    let lastKey = formula[formula.length - 1];

    if (lastKey === '.') {
      formula = formula.substr(0, formula.length - 1);
    }

    lastKey = formula[formula.length - 1];

    if (
      lastKey === '/' ||
      lastKey === '*' ||
      lastKey === '-' ||
      lastKey === '+' ||
      lastKey === '.'
    ) {
      formula = formula.substr(0, formula.length - 1);
    }

    console.log('Formula ' + formula);
    this.result = eval(formula);
  }

  getAnswer() {
    this.calcAnswer();
    this.input = this.result;
    if (this.input == '0') this.input = '';
  }
}
