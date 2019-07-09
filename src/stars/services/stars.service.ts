import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const URL = 'https://swapi.co/api/';

@Injectable()
export class StarService {

  constructor(private http: HttpClient) { }

  getPeople(person) {
    return this.http.get(`${URL}people/?search=${person}`)
  }

  getParam(param) {
    return this.http.get(`${URL}people/`)
  }

  getResident() {
    return this.http.get(`${URL}people/`)
  }

  async getWorld(url) {
    try {
      const response: any = this.http.get(url)
      console.log('response', response.name)
      return response.name;
    } catch(err) {
      console.error(err)
    }
  }

}
