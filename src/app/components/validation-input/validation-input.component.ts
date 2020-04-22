import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {
  checkPasswordMatches,
  patternValidator,
} from '../../util/password-validation';
import { Subject } from 'rxjs';
import { ComponentWithSubscription } from '../../abstract-components/component-with-subscription';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import {
  lowerCaseRegex,
  upperCaseRegex,
  digitRegex,
  specialCharRegex,
} from '../../util/regex';

export type InputType =
  | 'text'
  | 'text-required'
  | 'password'
  | 'password-validation'
  | 'password-confirm'
  | 'email';

@Component({
  selector: 'app-validation-input',
  templateUrl: './validation-input.component.html',
  styleUrls: ['./validation-input.component.scss'],
})
export class ValidationInputComponent extends ComponentWithSubscription
  implements OnInit, OnChanges {
  @Input() label: string;
  @Input() placeholder: string;
  @Input() type: InputType;
  @Input() appearance: string;
  @Input() password: string;
  @Input() errorMessage: string;
  @Input() required: boolean = true;
  @Input() hide: boolean = false;
  @Input() initialValue: string;
  @Input() disabled: boolean = false;
  @Input() tooltipMessage: string;
  @Input() tooltipPosition: string;
  @Input() displayTooltip: boolean = false;

  @Output() value = new EventEmitter();
  @Output() valid = new EventEmitter();

  control: FormControl;
  private debouncer: Subject<string> = new Subject<string>();

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.createFormControl();
    this.subscribeAndEmitInputValue();
    this.subscribeAndEmitValidStatus();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.password && this.type === 'password-confirm') {
      this.createFormControl();
    }
  }

  subscribeAndEmitValidStatus(): void {
    this.autoUnsubscribe(this.control.statusChanges).subscribe((status) => {
      const valid: boolean = status === 'VALID' ? true : false;
      this.valid.emit(valid);
    });
  }

  subscribeAndEmitInputValue(): void {
    this.autoUnsubscribe(this.debouncer)
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((value) => this.value.emit(value));
  }

  createFormControl() {
    if (this.type === 'email') {
      this.control = new FormControl(
        { value: this.initialValue, disabled: this.disabled },
        [Validators.required, Validators.email]
      );
    } else if (this.type === 'text-required') {
      this.control = new FormControl(
        { value: this.initialValue, disabled: this.disabled },
        [Validators.required]
      );
    } else if (this.type === 'password') {
      this.control = new FormControl(
        { value: this.initialValue, disabled: this.disabled },
        [Validators.required]
      );
    } else if (this.type === 'password-validation') {
      this.control = new FormControl(
        { value: this.initialValue, disabled: this.disabled },
        [
          Validators.required,
          Validators.minLength(8),
          patternValidator(lowerCaseRegex, { notContainLowerCase: true }),
          patternValidator(upperCaseRegex, { notContainUpperCase: true }),
          patternValidator(digitRegex, { notContainDigit: true }),
          patternValidator(specialCharRegex, { notContainSpecChar: true }),
        ]
      );
    } else if (this.type === 'password-confirm') {
      if (this.control) {
        this.control.setValidators([
          Validators.required,
          checkPasswordMatches(this.password),
        ]);
        this.control.updateValueAndValidity();
      } else {
        this.control = new FormControl(
          { value: this.initialValue, disabled: this.disabled },
          [Validators.required, checkPasswordMatches(this.password)]
        );
      }
    } else if (this.type === 'text') {
      this.control = new FormControl({
        value: this.initialValue,
        disabled: this.disabled,
      });
    }
  }

  handleInput(event: any) {
    this.debouncer.next(event.target.value);
  }

  getErrorMessage() {
    if (this.errorMessage) {
      return this.errorMessage;
    }

    if (this.type === 'email') {
      return this.control.hasError('required')
        ? 'You must enter an email'
        : this.control.hasError('email')
        ? 'Not a valid email'
        : '';
    }
  }
}
