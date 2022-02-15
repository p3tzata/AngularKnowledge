import {
  Directive,
  Input,
  ElementRef,
  HostListener,
  OnInit,
} from '@angular/core';
import { TabIndexMoveService } from '../core/shared/service/tab-index-move.service';
type IKNOWISNUMBER = any;
type IKNOWISSTRING = any;
@Directive({
  selector: '[appTabIndexMove]'
})
export class TabIndexMoveDirective {
  private offSet=100000;
  private _index!: number;
  private _maxTabIndexOffset!:number;
  get index(): IKNOWISNUMBER {
    return this._index;
  }
  @Input('appTabIndexMove')
  set index(i: IKNOWISSTRING) {
    this._index = parseInt(i);
  }

  @Input('appMaxTabIndexOffsetMove')
  set maxTabIndexOffset(i: IKNOWISSTRING) {
    this._maxTabIndexOffset = parseInt(i);
  }

  @HostListener('keydown', ['$event'])
  onInput(e: any) {
    let posOnEnd = -1;
    let posOnStart = -1;
    let pos = this.el.nativeElement.selectionStart;
    let valueLength = this.el.nativeElement.value.length;
    if (pos == 0) {
      posOnStart = 1;
    }
    if (pos == valueLength) {
      posOnEnd = 1;
    }

    //39 left
    //console.log(this.el.nativeElement.selectionStart);
    //console.log(pos, value);
    //console.log(e.which);
    if (e.which === 113 || e.which === 27) {
      let valueLength = this.el.nativeElement.value.length
      this.el.nativeElement.blur();
      this.el.nativeElement.focus();
      this.el.nativeElement.selectionStart=valueLength;
      
      return;
    }

    if (e.which === 40) {
      this.tabService.selectedInput.next(this.index + 1);
      e.preventDefault();
      return;
    }
    //Right
    if ((e.which === 39 || e.which === 13) && (posOnEnd == 1 || posOnStart==1 )) {
      if ((this.index/this._maxTabIndexOffset) > 1) {
        this.tabService.selectedInput.next((this.index%100000) + 1);
        
      } else { 
        this.tabService.selectedInput.next(this.index + this.offSet);
        
      }
      e.preventDefault();
      return;
    }
    //Left
    if (e.which === 37 && posOnStart == 1) {
      console.log(e.which);
      if(this.index<100000) {
        this.tabService.selectedInput.next(this._maxTabIndexOffset + (this.index -1))
      } else {
        this.tabService.selectedInput.next(this.index - this.offSet);
      }
      
      
      
      e.preventDefault();
      return;
    }

    if (e.which === 38) {
      this.tabService.selectedInput.next(this.index - 1);
      e.preventDefault();
      return;
    }
  }
  constructor(private el: ElementRef, private tabService: TabIndexMoveService) {
   
  }

  ngOnInit() {
    this.tabService.selectedInput.subscribe((i) => {
      //console.log(i, this.index);
      if (i === this.index) {
        this.el.nativeElement.focus();
        this.el.nativeElement.select()
      }
    });
  }

}
