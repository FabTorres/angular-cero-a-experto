import { ChangeDetectionStrategy, Component, signal } from "@angular/core";
import { Router } from "@angular/router";


@Component({
  selector: 'app-counter',
  standalone: true,
  templateUrl: './counter-page.component.html',
  styles: `
    button {
      padding: 5px;
      margin: 5px 10px;
      width: 75px;
    }`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterPageComponent {

  counter = 15;
  counterSignal = signal(15);

  constructor(private router: Router) { }

  increaseBy(value: number) {
    this.counter += value;
    this.counterSignal.update((current) => current + value);
  }

  resetCounter() {
    this.counter = 0;
    this.counterSignal.set(0);
  }

  goToHeroPage() {
    this.router.navigate(['/hero']);
  }

}
