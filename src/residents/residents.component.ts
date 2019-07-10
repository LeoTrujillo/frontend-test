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
    try {
      const data: any = await this.starService.next(this.nextPage).toPromise();
      this.prevPage = data.previous || '';
      this.nextPage = data.next || '';
      this.count = this.count + 1

      const pipe1 = data.results.map(item => {
        new Promise (done => {
          done(this.getWorld(item.homeworld))
        }).then(p => {
          item.homeworld = p
        })
        return item
      })

      const pipe2 = pipe1.sort((a, b) => {
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
    try {
      const data: any = await this.starService.next(this.prevPage).toPromise();
      this.prevPage = data.previous || '';
      this.nextPage = data.next || '';
      this.count = this.count - 1;

      const pipe1 = data.results.map(item => {
        new Promise (done => {
          done(this.getWorld(item.homeworld))
        }).then(p => {
          item.homeworld = p
        })
        return item
      })

      const pipe2 = pipe1.sort((a, b) => {
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
    try {
      const data: any = await this.starService.getResident().toPromise();
      this.nextPage = data.next || '';

      const pipe1 = data.results.map(item => {
        new Promise (done => {
          done(this.getWorld(item.homeworld))
        }).then(p => {
          item.homeworld = p
        })
        return item
      })

      const pipe2 = pipe1.sort((a, b) => {
        if (a.homeworld < b.homeworld ) { return -1 }
        if (a.homeworld > b.homeworld ) { return 1 }
        return 0
      });

      this.dataTable = pipe2;

    } catch(err) {
      console.error(err)
    }
  }

  async getWorld(uri) {
    const res: any = await this.starService.getWorld(uri).toPromise();
    return res.name || 'No planet';
  }
}

