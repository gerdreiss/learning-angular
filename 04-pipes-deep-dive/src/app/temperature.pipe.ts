import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'temperature',
})
export class TemperaturePipe implements PipeTransform {
  transform(
    value: string | number | null,
    inputType: 'C' | 'F',
    outputType?: 'C' | 'F',
  ) {
    if (!value) {
      return value;
    }

    let input = this.parseInput(value);
    let output = this.calculateResult(input, inputType, outputType);
    let symbol = this.determineSymbol(inputType, outputType);

    return `${output} ${symbol}`;
  }

  private parseInput(value: string | number) {
    let input: number;
    if (typeof value === 'string') {
      input = parseFloat(value);
    } else {
      input = value;
    }
    return input;
  }

  private calculateResult(
    input: number,
    inputType: string,
    outputType?: string,
  ) {
    let output: number;
    if (inputType === 'C' && outputType === 'F') {
      output = input * (9 / 5) + 32;
    } else if (inputType === 'F' && outputType === 'C') {
      output = (input - 32) * (5 / 9);
    } else {
      output = input;
    }
    return output.toFixed(2);
  }

  private determineSymbol(inputType: string, outputType?: string) {
    let symbol: '˚C' | '˚F';
    if (outputType) {
      symbol = outputType === 'C' ? '˚C' : '˚F';
    } else {
      symbol = inputType === 'C' ? '˚C' : '˚F';
    }
    return symbol;
  }
}
