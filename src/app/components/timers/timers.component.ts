import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { TimerComponent } from '../timer/timer.component';

export interface timerInterface {
  id: string,
  parent: string
}

@Component({
  selector: 'app-timers',
  templateUrl: './timers.component.html',
  styleUrls: ['./timers.component.sass']
})
export class TimersComponent implements OnInit {
  @ViewChild(TimerComponent, {static: false}) parentTimer!: TimerComponent;
  @ViewChildren('childTimer')childrenTimers!: QueryList<TimerComponent>;
  timers: Array<timerInterface> = [];
  loopTicks: boolean = true;


  constructor() { }

  ngOnInit(): void {
  }

  addTimer() {
    this.timers.push({
      id: 'childTimer' + this.timers.length,
      parent: 'parentTimer'
    })
  }

  removeTimer(id: any) {
    const timerIndex = this.timers.findIndex(f => f.id === id);

    if (timerIndex || timerIndex === 0) {
      this.timers.splice(timerIndex, 1);
    }
  }

  timerStoped(id: any) {
    setTimeout(() => {
      if (id === 'parentTimer') {
        this.childrenTimers.first?.startTimer();
      } else {
        const childrenTimersArr = this.childrenTimers.toArray();
        const timerIdx = childrenTimersArr.findIndex(f => f.id === id);
        if ((timerIdx || timerIdx === 0) && childrenTimersArr[timerIdx + 1]) {
          const nexTimerId = childrenTimersArr[timerIdx + 1].id;
          this.childrenTimers.find(f => f.id === nexTimerId)?.startTimer();
        }
        if (!childrenTimersArr[timerIdx + 1]) {
          this.startOver();
        }
      }
    }, 1000);

  }

  parentTimerStarted(){
    this.loopTicks = true;
  }

  startOver() {
    if (this.loopTicks) {
      this.parentTimer.startTimer();
    }
  }

  stopAllTicks() {
    this.loopTicks = false;
  }

}
