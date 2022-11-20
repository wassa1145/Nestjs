import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { typeOperation } from './calculator.interface';

@Injectable()
export class CalculatorService {
  calculate(
    firstOperator: number,
    secondOperator: number,
    type: typeOperation,
  ): number {
    switch (type) {
      case 'plus':
        return firstOperator + secondOperator;
      case 'minus':
        return firstOperator - secondOperator;
      case 'multiply':
        return firstOperator * secondOperator;
      case 'divide':
        return firstOperator / secondOperator;
      default:
        throw new HttpException(
          'Неверно указан тип операции',
          HttpStatus.BAD_REQUEST,
        );
    }
  }
}
