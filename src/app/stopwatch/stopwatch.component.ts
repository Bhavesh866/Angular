import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-stopwatch',
  templateUrl: './stopwatch.component.html',
  styleUrls: ['./stopwatch.component.css']
})
export class StopwatchComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  public time = 0;
  public isRunning = false;
  public laps: number[] = [];

  ngOnInit(): void {
    interval(10)    //interval emits squece in every 10 milisec
      .pipe(takeUntil(this.destroy$)) //.pipe allows to chain multiple operators
      .subscribe(() => {
        if (this.isRunning) {
          this.time += 10;
        }
      }
      // {
      //   if (this.isRunning) {
      //     this.time += 100;
      //     if (this.time % 60000 === 0) {
      //       this.time = this.time / 1000; // Convert milliseconds to seconds
      //     }
      //     if (this.time % 3600000 === 0) {
      //       this.time = this.time / 60; // Convert seconds to minutes
      //     }
      //   }
      // }
      );
  }

  formatTime(milliseconds: number): string {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    const centiseconds = Math.floor((milliseconds % 1000) / 10);

    return `${this.padNumber(minutes)}:
    ${this.padNumber(seconds)}:
    ${this.padNumber(centiseconds)}`;
  }

  private padNumber(number: number): string {
    return number.toString().padStart(2, '0');
  }

  public startStopwatch(): void {
    this.isRunning = true;
  }

  public stopStopwatch(): void {
    this.isRunning = false;
  }

  public resetStopwatch(): void {
    this.isRunning = false;
    this.time = 0;
    this.laps = [];
  }

  public recordLap(): void {
    if (this.isRunning) {
      this.laps.push(this.time);
    }
  }

  ngOnDestroy(): void {
    // this.destroy$.next();
    // this.destroy$.complete();
  }
}
