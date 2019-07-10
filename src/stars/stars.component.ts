import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { StarService } from './services/stars.service';



@Component({
  selector: 'app-users',
  template: `
    <app-header></app-header>
    <div class="container">
      <form #form="ngForm" (ngSubmit)="handleSubmit(form)">
        <input
          *ngIf="param !== 'resident'"
          type="text"
          name="name"
          [ngModel]="name"
          placeholder="Puedes buscar por personaje"
          required
        >
        <input type="submit" style="line-height: 2em; background:teal ; color: #fff" value="Buscar">
      </form>

      <div *ngIf="dataTable.length === 0 && person === null" class="loading">
        <i class="fa fa-spinner fa-spin" aria-hidden="true"></i>
      </div>

      <div class="person" *ngIf="person !== null">
        <Table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Planeta</th>
              <th>Peso</th>
              <th>Altura</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{person.name}}</td>
              <td>{{person.homeworld}}</td>
              <td>{{person.mass}}</td>
              <td>{{person.height}}</td>
            <tr>
          </tbody>
        </Table>
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
          <li *ngIf="prevPage !== '' && count > 1" class="waves-effect" (click)="handlePrev()"><i class="material-icons">chevron_left</i></li>
          <li>{{count}}</li>
          <li *ngIf="nextPage !== ''" class="waves-effect" (click)="handleNext()"><i class="material-icons">chevron_right</i></li>
        </ul>
      </div>
    </div>
  `,
  styleUrls: ['stars.component.scss']
})

export class StarsComponent implements OnInit {
  person: any = null
  name: string = ''
  param: string = 'people'
  dataTable: any = []
  count: number = 1;
  nextPage: string = ''
  prevPage: string = ''


  constructor(private route: ActivatedRoute, private starService: StarService) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params.ordenar) {
        this.getByParam(params.ordenar)
      } else {
        this.getPeople()
      }
    })
  }

  handleSubmit(form) {
    if (form.valid) {
      switch (this.param) {
        case 'people':
          this.getData(form.value.name);
          break;
      }
      form.reset();
      this.dataTable = []
    }
  }

  async handleNext() {
    let param = '';
    let firstPipe = [];
    this.dataTable = [];
    this.route.queryParams.subscribe(params => {
      param = params.ordenar;
    })
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

      switch(param) {
        case 'peso':
          this.dataTable = firstPipe.sort((a, b) => a.mass - b.mass)
          break;
        case 'altura':
          this.dataTable = firstPipe.sort((a, b) => a.height - b.height)
          break;
        case 'nombre':
          this.dataTable = firstPipe.sort((a, b) => {
            if (a.name < b.name ) { return -1 }
            if (a.name > b.name ) { return 1 }
            return 0
          })
          break;
        default:
          this.dataTable = firstPipe;
          break;
      }

      this.dataTable = firstPipe;
    } catch(err) {
      console.error(err)
    }
  }

  async handlePrev() {
    let param = '';
    let firstPipe = [];
    this.dataTable = [];
    this.route.queryParams.subscribe(params => {
      param = params.ordenar;
    })

    try {
      const data: any = await this.starService.next(this.prevPage).toPromise();
      this.prevPage = data.previous || '';
      this.nextPage = data.next || '';
      this.count = this.count > 1 ? this.count - 1 : this.count;

      for (let item of data.results) {
        const planet: any = await this.starService.getWorld(item.homeworld).toPromise()
        item.homeworld = planet.name;
        item.mass = item.mass === 'unknown' ? 0 : parseInt(item.mass)
        item.height = item.height === 'unknown' ? 0 : parseInt(item.height)

        firstPipe = [...firstPipe, item];
      }

      switch(param) {
        case 'peso':
          this.dataTable = firstPipe.sort((a, b) => a.mass - b.mass)
          break;
        case 'altura':
          this.dataTable = firstPipe.sort((a, b) => a.height - b.height)
          break;
        case 'nombre':
          this.dataTable = firstPipe.sort((a, b) => {
            if (a.name < b.name ) { return -1 }
            if (a.name > b.name ) { return 1 }
            return 0
          })
          break;
        default:
          this.dataTable = firstPipe;
          break;
      }

      this.dataTable = firstPipe;
    } catch(err) {
      console.error(err)
    }
  }

  async getPeople() {
    let firstPipe = []
    try {
      const data: any = await this.starService.getParam().toPromise();

      for (let item of data.results) {
        const planet: any = await this.starService.getWorld(item.homeworld).toPromise()
        item.homeworld = planet.name;
        item.mass = item.mass === 'unknown' ? 0 : parseInt(item.mass)
        item.height = item.height === 'unknown' ? 0 : parseInt(item.height)

        firstPipe = [...firstPipe, item];
      }

      this.dataTable = firstPipe;
      this.nextPage = data.next;

    } catch (err) {
      console.error(err)
    }
  }

  async getData(name) {
    let firstPipe = []
    try {
      const data: any = await this.starService.getPeople(name).toPromise();
      for (let item of data.results) {
        const planet: any = await this.starService.getWorld(item.homeworld).toPromise()
        item.homeworld = planet.name;
        item.mass = item.mass === 'unknown' ? 0 : parseInt(item.mass)
        item.height = item.height === 'unknown' ? 0 : parseInt(item.height)

        firstPipe = [...firstPipe, item];
      }

      this.person = firstPipe[0]

    } catch (err) {
      console.error('ERR', err);
    }
  }

  async getByParam(name) {
    let firstPipe = [];
    try {
      const data: any = await this.starService.getParam().toPromise();
      for (let item of data.results) {
        const planet: any = await this.starService.getWorld(item.homeworld).toPromise()
        item.homeworld = planet.name;
        item.mass = item.mass === 'unknown' ? 0 : parseInt(item.mass)
        item.height = item.height === 'unknown' ? 0 : parseInt(item.height)

        firstPipe = [...firstPipe, item];
      }

      this.nextPage = data.next || '',
      this.prevPage = data.previous || ''
      switch(name) {
        case 'peso':
          this.dataTable = firstPipe.sort((a, b) => a.mass - b.mass)
          break;
        case 'altura':
          this.dataTable = firstPipe.sort((a, b) => a.height - b.height)
          break;
        case 'nombre':
          this.dataTable = firstPipe.sort((a, b) => {
            if (a.name < b.name ) { return -1 }
            if (a.name > b.name ) { return 1 }
            return 0
          })
          break;
        default:
          this.dataTable = firstPipe;
          break;
      }
    } catch(err) {
      console.error(err)
    }
  }
}

