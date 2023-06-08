import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {
  public time = 0;
  public inputTime = 0;
  public isRunning = false;
  public maxTime = 1000;
  public interval: number = 120  ; // Default interval in seconds

  ngOnInit(): void {
    this.time = this.interval;
  }

  public setTimer(): void {
    if (this.inputTime > 0) {
      this.interval = this.inputTime;
      this.time = this.interval;
    }
  }

  public startTimer(): void {
    if (!this.isRunning && this.time > 0) {
      this.isRunning = true;
      const timerId = setInterval(() => {
        if (this.isRunning && this.time > 0) {
          this.time -= 1;
        } else {
          clearInterval(timerId);
          this.isRunning = false;
        }
      }, 1000);
    }
  }

  public stopTimer(): void {
    this.isRunning = false;
  }

  public resetTimer(): void {
    this.isRunning = false;
    this.time = this.interval;
  }

  public formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${this.padNumber(minutes)}:${this.padNumber(remainingSeconds)}`;
  }

  private padNumber(number: number): string {
    return number.toString().padStart(2, '0');
  }
}
