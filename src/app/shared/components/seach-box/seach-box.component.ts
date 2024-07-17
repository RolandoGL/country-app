import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-seach-box',
  templateUrl: './seach-box.component.html',
  styles: ``
})
export class SeachBoxComponent implements OnInit, OnDestroy{


  @Input()  public label:string = ''
  @Input() public initialValue: string = ''
  @Output() public onValue = new EventEmitter<string>()
  @Output() public onDebounce = new EventEmitter<string>()
  private debouncer: Subject<string> = new Subject<string>()
  private debouncerSubscription?: Subscription

// @ViewChild('textInput') textInput!: ElementRef

  ngOnInit(): void {
    this.debouncerSubscription = this.debouncer
    .pipe(
      debounceTime(500)
    )
    .subscribe( value => this.onDebounce.emit( value ))
  }

  ngOnDestroy(): void {
    this.debouncerSubscription?.unsubscribe()
  }
  searchTerm( term:string ){
    // const term: string = this.textInput.nativeElement.value
    this.onValue.emit( term )
  }
  onKeyPress( term:string ){
    this.debouncer.next( term )
  }
}
