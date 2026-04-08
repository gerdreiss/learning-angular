import { Component, signal } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { InvestmentResult, type InvestmentInput } from './investment.model';
import { UserInputComponent } from './user-input/user-input.component';
import { InvestmentResultsComponent } from './investment-results/investment-results.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [HeaderComponent, UserInputComponent, InvestmentResultsComponent],
})
export class AppComponent {
  investmentResults = signal<InvestmentResult[]>([]);

  onCalculateInvestmentResults(data: InvestmentInput) {
    const annualData = [];
    let investmentValue = data.initialInvestment;

    for (let i = 0; i < data.duration; i++) {
      const year = i + 1;
      const interestEarnedInYear =
        investmentValue * (data.expectedReturn / 100);
      investmentValue += interestEarnedInYear + data.annualInvestment;
      const totalInterest =
        investmentValue - data.annualInvestment * year - data.initialInvestment;
      annualData.push({
        year: year,
        interest: interestEarnedInYear,
        valueEndOfYear: investmentValue,
        annualInvestment: data.annualInvestment,
        totalInterest: totalInterest,
        totalAmountInvested:
          data.initialInvestment + data.annualInvestment * year,
      });
    }

    this.investmentResults.set(annualData);
  }
}
