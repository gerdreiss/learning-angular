import { Component, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { type InvestmentInput } from '../investment.model';

@Component({
  selector: 'app-user-input',
  imports: [FormsModule],
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css',
})
export class UserInputComponent {
  calculate = output<InvestmentInput>();
  initialInvestment = signal('0');
  annualInvestment = signal('0');
  expectedReturn = signal('5');
  duration = signal('10');

  onSubmit() {
    this.calculate.emit({
      initialInvestment: +this.initialInvestment(),
      annualInvestment: +this.annualInvestment(),
      duration: +this.duration(),
      expectedReturn: +this.expectedReturn(),
    });
  }
}
