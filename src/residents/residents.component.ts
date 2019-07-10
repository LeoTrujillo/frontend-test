import { Component, OnInit } from '@angular/core';

import { StarService } from '../stars/services/stars.service';

@Component({
  selector: 'app-residents',
  template: `
    <app-header></app-header>
    <div class="container">
      <div *ngIf="dataTable.length === 0" class="loading">
        <i class="fa fa-spinner fa-spin" aria-hidden="true"></i>
      </div>
      <div *ngIf="dataTable.length !== 0">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Planeta</th>
              <th>Peso</th>
              <th>Altura</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let item of dataTable">
              <td>{{item.name}}</td>
              <td>{{item.homeworld}}</td>
              <td>{{item.mass}}</td>
              <td>{{item.height}}</td>
            <tr>
          </tbody>
        </table>
        <ul class="pagination" style="text-align: center;">
          <li *ngIf="prevPage !== ''" class="waves-effect" (click)="handlePrev()"><i class="material-icons">chevron_left</i></li>
          <li>{{count}}</li>
          <li *ngIf="nextPage !== ''" class="waves-effect" (click)="handleNext()"><i class="material-icons">chevron_right</i></li>
        </ul>
      </div>
    </div>
  `,
  styleUrls: ['resident.component.scss']
})

export class ResidentsComponent implements OnInit {
  dataTable: any = []
  count: number = 1;
  nextPage: string = ''
  prevPage: string = ''

  constructor(private starService: StarService) {
  }

  ngOnInit() {
    this.getByResident();
  }

  async handleNext() {
    let firstPipe = [];
    this.dataTable = [];
    try {
      const data: any = await this.starService.next(this.nextPage).toPromise();
      this.prevPage = data.previous || '';
      this.nextPage = data.next || '';
      this.count = this.count + 1

      for (let item of data.results) {
        const planet: any = await this.starService.getWorld(item.homeworld).toPromise()
        item.homeworld = planet.name;
        item.mass = item.mass === 'unknown' ? 0 : parseInt(item.mass)
        item.height = item.height === 'unknown' ? 0 : parseInt(item.height)

        firstPipe = [...firstPipe, item];
      }

      const pipe2 = firstPipe.sort((a, b) => {
        if (a.homeworld < b.homeworld ) { return -1 }
        if (a.homeworld > b.homeworld ) { return 1 }
        return 0
      });

      this.dataTable = pipe2;
    } catch(err) {
      console.error(err)
    }
  }

  async handlePrev() {
    let firstPipe = [];
    this.dataTable = [];
    try {
      const data: any = await this.starService.next(this.prevPage).toPromise();
      this.prevPage = data.previous || '';
      this.nextPage = data.next || '';
      this.count = this.count - 1;

      for (let item of data.results) {
        const planet: any = await this.starService.getWorld(item.homeworld).toPromise()
        item.homeworld = planet.name;
        item.mass = item.mass === 'unknown' ? 0 : parseInt(item.mass)
        item.height = item.height === 'unknown' ? 0 : parseInt(item.height)

        firstPipe = [...firstPipe, item];
      }

      const pipe2 = firstPipe.sort((a, b) => {
        if (a.homeworld < b.homeworld ) { return -1 }
        if (a.homeworld > b.homeworld ) { return 1 }
        return 0
      });

      this.dataTable = pipe2;
    } catch(err) {
      console.error(err)
    }
  }

  async getByResident() {
    let firstPipe = [];
    try {
      const data: any = await this.starService.getResident().toPromise();
      this.nextPage = data.next || '';

      for (let item of data.results) {
        const planet: any = await this.starService.getWorld(item.homeworld).toPromise()
        item.homeworld = planet.name;
        item.mass = item.mass === 'unknown' ? 0 : parseInt(item.mass)
        item.height = item.height === 'unknown' ? 0 : parseInt(item.height)

        firstPipe = [...firstPipe, item];
      }

      const pipe2 = firstPipe.sort((a, b) => {
        if (a.homeworld < b.homeworld ) { return -1 }
        if (a.homeworld > b.homeworld ) { return 1 }
        return 0
      });

      this.dataTable = pipe2;

    } catch(err) {
      console.error(err)
    }
  }
}

