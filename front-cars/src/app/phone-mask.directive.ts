import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appPhoneMask]'
})
export class PhoneMaskDirective {

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInput(event: any): void {
    let input = event.target.value.trim();
    input = input.replace(/\D/g, '');
    if (input.length <= 10) {
      input = input.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    } else {
      input = input.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    event.target.value = input;
  }
}
