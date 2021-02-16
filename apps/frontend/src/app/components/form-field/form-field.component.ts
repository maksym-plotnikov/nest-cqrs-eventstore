import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ElementRef,
    forwardRef,
    Input,
    OnInit,
    ViewChild,
} from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IN_OUT_ANIMATION } from '@smplct-view/shared/constants';

/***
 * Usage example:
 * <smplct-view-form-field [formControl]="YourFormGroup.controls.NameOfControl" -> required
 * onsType="input | select | ..." -> required
 * ></app-autocomplete>
 ***/
@Component({
    selector: 'smplct-view-form-field',
    templateUrl: './form-field.component.html',
    styleUrls: ['./form-field.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => FormFieldComponent),
            multi: true,
        },
    ],
    animations: IN_OUT_ANIMATION,
})
export class FormFieldComponent implements ControlValueAccessor, OnInit, AfterViewInit {
    isLoading = true;
    value: any;
    onChange!: (event: any) => void;
    onTouched!: () => void;
    attributes!: Record<string, any>;

    @Input() formControl!: FormControl;
    @Input() required = false;
    @Input() inputId!: string;
    @Input() onsType = 'input';
    @Input() type = 'text';
    @Input() notFoundText = 'Item not found';
    @Input() placeholder = '';
    @Input() multiple!: boolean;
    @Input() modifier = 'underbar';
    @Input() clearable = false;
    @Input() disabled = false;
    @Input() float = true;
    @Input() selection!: any[];
    @Input() bindValue = 'value';
    @Input() bindLabel = 'label';
    // Form elements refs
    @ViewChild('inputContainer') inputContainer!: ElementRef;
    @ViewChild('selectContainer') selectContainer!: ElementRef;
    @ViewChild('switchContainer') switchContainer!: ElementRef;

    constructor(private cd: ChangeDetectorRef) {}

    ngOnInit(): void {
        this.clearable = this.clearable ?? this.multiple;
        this.isLoading = false;
    }

    ngAfterViewInit(): void {
        this.attributes = {
            modifier: this.modifier,
            placeholder: this.placeholder,
            float: this.float,
            type: this.type,
        };
        const isDisabled = this.formControl.disabled || this.disabled;
        const isChecked = this.onsType === 'switch' && this.formControl.value;
        if (isDisabled) {
            this.attributes.disabled = isDisabled;
        }
        if (isChecked) {
            this.attributes.checked = isChecked;
        }
        // Since Onsen-UI doesn't allow data binding
        // we need to add attributes to HTML elements
        this.addContainerAttributes();
    }

    writeValue(value: any): void {
        this.formControl.patchValue(value, { emitEvent: true });
        this.value = value;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    handleChange(event: any) {
        if (event?.target as HTMLInputElement) {
            this.value = event.target.checked;
            this.onChange(this.value);
        }
    }

    addContainerAttributes() {
        let element: ElementRef;
        switch (this.onsType) {
            case 'input':
                element = this.inputContainer;
                break;
            case 'select':
                element = this.selectContainer;
                break;
            default:
                element = this.switchContainer;
                break;
        }
        Object.entries(this.attributes).forEach(([key, value]) =>
            element.nativeElement.setAttribute(key, value),
        );
    }
}
