import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent {
  isShowed: boolean = false;

  constructor(private router: Router) { }

  handleFlyers() {
    console.log('handle flyers');
    this.isShowed = true;
    setTimeout(() => {
      sessionStorage.clear();
      this.router.navigate(['/auth']);
    }, 2000);
  }
}
