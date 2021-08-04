import { Directive, ElementRef, HostListener } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';

@Directive({
  selector: '[appShowIfTruncated]'
})
export class ShowIfTruncatedDirective {

  constructor(    private matTooltip: MatTooltip,
    private elementRef: ElementRef<HTMLElement>
    ) { }

    @HostListener('mouseenter', ['$event'])
    setTooltipState() {
        const element = this.elementRef.nativeElement;
        this.matTooltip.disabled = element.scrollWidth <= element.clientWidth;
    }
}
