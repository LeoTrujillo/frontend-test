import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CatalogsService } from './services/catalog.service';

@Component({
  selector: 'app-catalogs',
  template: `
    <app-header></app-header>
    <div class="catalog">
      <img [src]="image?.url" alt="image?.title">
    </div>
  `,
  styleUrls: ['./catalogs.component.scss']
})

export class CatalogsComponent implements OnInit {
  image: any;

  constructor(private router: Router, private catalogsService: CatalogsService) { }

  ngOnInit() {
    if (!sessionStorage.getItem('user')) {
      this.router.navigate(['/auth'])
    } else {
      this.getImg();
    }
  }

  async getImg() {
    try {
      this.image = await this.catalogsService.getImage(Math.floor(Math.random() * 5000) + 1).toPromise();
    } catch (err) {
      console.error('ERR:', err)
    }
  }
}
