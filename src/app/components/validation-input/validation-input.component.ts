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
import { checkPassword } from '../../util/password-validation';
import { Subject } from 'rxjs';
import { ComponentWithSubscription } from '../../helper-components/component-with-subscription/component-with-subscription';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

export type InputType = 'text' | 'password' | 'password-confirm' | 'email';

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
  @Input() required = true;
  @Input() hide = false;
  @Input() initialValue: string;
  @Input() disabled = false;
  @Input() tooltipMessage: string;
  @Input() tooltipPosition: string;
  @Input() displayTooltip = false;

  @Output() value = new EventEmitter();
  @Output() valid = new EventEmitter();

  control: FormControl;
  private debouncer = new Subject<string>();

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.createFormControl();
    this.autoUnsubscribe(this.debouncer)
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((value) => this.value.emit(value));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.password && this.type === 'password-confirm') {
      this.createFormControl();
    }
  }

  createFormControl() {
    if (this.type === 'email') {
      this.control = new FormControl(
        { value: this.initialValue, disabled: this.disabled },
        [Validators.required, Validators.email]
      );
    } else if (this.type === 'text') {
      this.control = new FormControl(
        { value: this.initialValue, disabled: this.disabled },
        [Validators.required]
      );
    } else if (this.type === 'password') {
      this.control = new FormControl(
        { value: this.initialValue, disabled: this.disabled },
        [Validators.required]
      );
    } else if (this.type === 'password-confirm') {
      if (this.control) {
        this.control.setValidators([
          Validators.required,
          checkPassword(this.password),
        ]);
        this.control.updateValueAndValidity();
      } else {
        this.control = new FormControl(
          { value: this.initialValue, disabled: this.disabled },
          [Validators.required, checkPassword(this.password)]
        );
      }
    }
  }

  handleInput(event: any) {
    this.debouncer.next(event.target.value);
    this.valid.emit(this.control.valid);
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
    } else if (this.type === 'password') {
      return this.control.hasError('required')
        ? 'You must enter a password'
        : this.control.hasError('minlength')
        ? 'Not a valid password'
        : '';
    }
  }
}
