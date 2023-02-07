import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';

const VALIDATORS_MESSAGE: any = {
  required: 'Should not be empty',
  email: 'Email is not valid',
};

@Component({
  selector: 'input-validation',
  templateUrl: './input-validation.component.html',
  styleUrls: ['./input-validation.component.css'],
})
// onChanges executes the ngOnChanges method whenever a part of this class changes.
export class InputValidationComponent implements OnChanges {
  @Input() control!: AbstractControl;
  @Input() showErrorsWhen: boolean = true;
  errorMessages: string[] = [];

  // Calls below checkValidation method.
  ngOnChanges(changes: SimpleChanges): void {
    this.checkValidation();
  }

  // Checks the validation of the control input whenever its validation status (i.e. statusChanges) or its value changes.
  ngOnInit(): void {
    this.control.statusChanges.subscribe(() => {
      this.checkValidation();
    });

    this.control.valueChanges.subscribe(() => {
      this.checkValidation();
    });
  }

  // Sets errorMessages if there is an error.
  checkValidation(): void {
    const errors = this.control.errors;
    if (!errors) {
      this.errorMessages = [];
      return;
    }

    const errorKeys = Object.keys(errors);
    this.errorMessages = errorKeys.map((key) => VALIDATORS_MESSAGE[key]);
  }
}
