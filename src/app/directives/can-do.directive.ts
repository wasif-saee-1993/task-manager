import {Directive, Input, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appCanDo]'
})
export class CanDoDirective implements OnInit {
  @Input() set appCanDo(value) {
    if (value && value.type_id === 1) {
      this.vcRef.createEmbeddedView(this.templateRef);
    } else {
      this.vcRef.clear();
    }
  }

  constructor(private templateRef: TemplateRef<any>,
              private vcRef: ViewContainerRef) { }

  ngOnInit() { }

}
