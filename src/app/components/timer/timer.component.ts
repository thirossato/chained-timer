import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faLink, faUnlink, faPlayCircle, faStopCircle, faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import { interval } from 'rxjs';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.sass']
})
export class TimerComponent implements OnInit {
  @Input() linked: boolean = false;
  @Input() ticking: boolean = false;
  @Input() canAdd: boolean = false;
  @Input() canRemove: boolean = false;
  @Input() id: string = '';

  @Output() addTimerEmitter: EventEmitter<any> = new EventEmitter();
  @Output() removeTimerEmitter: EventEmitter<any> = new EventEmitter();
  @Output() timerStopEmitter: EventEmitter<any> = new EventEmitter();

  faLink = faLink;
  faUnlink = faUnlink;
  faPlayCircle = faPlayCircle;
  faStopCircle = faStopCircle;
  faPlusCircle = faPlusCircle;
  faMinusCircle = faMinusCircle;

  currentTick: number = 0;
  intervals: any;

  constructor() { }

  ngOnInit(): void {
    console.log(this.canAdd)
  }

  startTimer() {
    this.ticking = true;
    this.playAudio("../../../assets/420518__jfrecords__vmax-box.wav");
    this.doTicks();

  }

  doTicks() {
    let intervals = interval(1000);
    this.intervals = intervals.subscribe(() => {
      if (this.currentTick < 1) {
        this.stopTimer();
      } else {
        this.currentTick--;
      }
    })

  }

  stopTimer() {
    this.ticking = false;
    this.currentTick = 0;
    this.intervals.unsubscribe();
    this.playAudio("../../../assets/420514__jfrecords__end-box.wav");
    this.timerStopEmitter.emit(this.id);
  }

  addTimer() {
    this.addTimerEmitter.emit()
  }

  removeTimer() {
    this.removeTimerEmitter.emit()
  }

  changeTimer(event: any) {
    this.currentTick = event.target.value
  }

  playAudio(path: string) {
    let audio = new Audio();
    audio.src = path;
    audio.load();
    audio.play();
  }

}
