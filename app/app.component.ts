import {Component} from '@angular/core';
import {VERSION} from '@angular/material';
import {FormBuilder, FormGroup, FormControl, Validators, AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import * as moment from 'moment';
@Component({
  selector: 'material-app',
  templateUrl: 'app.component.html',
})
export class AppComponent { 
  version = VERSION;

  areControlsEnabled: boolean;
  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.reloadForm();
  }

  reloadForm() {
    this.areControlsEnabled = !this.areControlsEnabled;
    this.formGroup = this.formBuilder.group({
      startDate: new FormControl(undefined, Validators.required),
      endDate: new FormControl(undefined, Validators.required)
    });

    this.formGroup.controls.startDate.setValidators([Validators.required, 
    this.startDateAfterEndDateValidator(this.formGroup.controls.endDate.value)])
  }

   private startDateAfterEndDateValidator(end: FormControl): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | undefined =>
      moment(control.value).isAfter(end.value)
        ? { startAfterEnd: { valid: false } }
        : undefined;
  }

  private endDateBeforeStartDateValidator(start: FormControl): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | undefined =>
      moment(control.value).isBefore(start.value)
        ? { endBeforeStart: { valid: false } }
        : undefined;
  }
}

/**
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */