export interface InvestmentInput {
  initialInvestment: number;
  annualInvestment: number;
  duration: number;
  expectedReturn: number;
}
export interface InvestmentResult {
  year: number;
  interest: number;
  valueEndOfYear: number;
  annualInvestment: number;
  totalInterest: number;
  totalAmountInvested: number;
}
