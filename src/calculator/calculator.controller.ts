import { Body, Controller, Header, Put, Req, Patch } from '@nestjs/common';
import { Calculator, typeOperation } from './calculator.interface';
import { Request } from 'express';
import { CalculatorService } from './calculator.service';

@Controller('calculator')
export class CalculatorController {
  constructor(private readonly calculatorService: CalculatorService) {}

  @Put()
  calculate(@Body() param: Calculator, @Req() request: Request): number {
    return this.calculatorService.calculate(
      param.firstOperator,
      param.secondOperator,
      request.headers['type-operation'] as typeOperation,
    );
  }

  @Patch()
  calculatePatch(@Body() param: Calculator, @Req() request: Request): number {
    return this.calculatorService.calculate(
      param.firstOperator,
      param.secondOperator,
      request.headers['type-operation'] as typeOperation,
    );
  }
}
