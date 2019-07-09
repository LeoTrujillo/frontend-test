import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { StarService } from './services/stars.service';



@Component({
  selector: 'app-users',
  template: `
    <app-header></app-header>
    <div class="container">
        <p>
        <label>
          <input name="sorter" type="radio" (click)="handleRadio('people')" checked />
          <span>Personaje</span>
        </label>
      </p>
      <p>
        <label>
          <input name="sorter" type="radio" (click)="handleRadio('param')" />
          <span>Por parametro</span>
        </label>
      </p>
      <p>
        <label>
          <input name="sorter" type="radio" (click)="handleRadio('resident')" />
          <span>Residentes</span>
        </label>
      </p>
      <form #form="ngForm" (ngSubmit)="handleSubmit(form)">
        <input
          *ngIf="param !== 'resident'"
          type="text"
          name="name"
          [ngModel]="name"
          placeholder="Puedes buscar por personaje o escribir 'peso', 'altura' o 'nombre' si seleccionas parametro"
        >
        <input type="submit" style="line-height: 2em; background:teal ; color: #fff" value="Buscar">
      </form>

      <div class="person" *ngIf="person !== null">
        <pre>
          {{person | json}}
        </pre>
      </div>


      <table *ngIf="dataTable.length !== 0">
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
    </div>


  `,
})

export class StarsComponent implements OnInit {
  person: any = null
  name: string = ''
  param: string = 'people'
  dataTable: any = []


  constructor(private router: Router, private starService: StarService) {
  }

  ngOnInit() {
  }

  handleRadio(value) {
    this.param = value;
    this.person = null;
    this.dataTable = []
  }

  handleSubmit(form) {
    if (form.valid) {
      switch (this.param) {
        case 'people':
          this.getData(form.value.name);
          break;
        case 'param' :
          this.getByParam(form.value.name)
          break;
        case 'resident' :
          this.getByResident()
          break;
      }
      form.reset();
      this.dataTable = []
    }
  }

  async getData(name) {
    try {
      const data: any = await this.starService.getPeople(name).toPromise();
      this.person = data.results[0]
    } catch (err) {
      console.error('ERR', err);
    }
  }

  async getByParam(name) {
    try {
      const data: any = await this.starService.getParam(name).toPromise();
      const arr = data.results;
      switch(name) {
        case 'peso':
          this.dataTable = arr.sort((a, b) => a.mass - b.mass)
          break;
        case 'altura':
          this.dataTable = arr.sort((a, b) => a.height - b.height)
          break;
        case 'nombre':
          this.dataTable = arr.sort((a, b) => {
            if (a.name < b.name ) { return -1 }
            if (a.name > b.name ) { return 1 }
            return 0
          })
          break;
        default:
          this.dataTable = arr;
          break;
      }
    } catch(err) {
      console.error(err)
    }
  }

  async getByResident() {
    try {
      const data: any = await this.starService.getResident().toPromise();
      this.dataTable = data.results.sort((a, b) => {
        if (a.homeworld < b.homeworld ) { return -1 }
        if (a.homeworld > b.homeworld ) { return 1 }
        return 0
      });
    } catch(err) {
      console.error(err)
    }
  }
}

