import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class DatesValidator {
  startDateAfterEndDateValidator(end: FormControl): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | undefined =>
      moment(control.value).isAfter(end.value)
        ? { startAfterEnd: { valid: false } }
        : undefined;
  }

  endDateBeforeStartDateValidator(start: FormControl): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | undefined =>
      moment(control.value).isBefore(start.value)
        ? { endBeforeStart: { valid: false } }
        : undefined;
  }
}