import { CurrencyPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { InvestmentResult } from '../investment.model';

@Component({
  selector: 'app-investment-results',
  imports: [CurrencyPipe],
  templateUrl: './investment-results.component.html',
  styleUrl: './investment-results.component.css',
})
export class InvestmentResultsComponent {
  results = input.required<InvestmentResult[]>();

  isEmpty() {
    return this.results().length === 0;
  }
}
