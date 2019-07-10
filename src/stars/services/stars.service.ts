import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const URL = 'https://swapi.co/api/';

@Injectable()
export class StarService {

  constructor(private http: HttpClient) { }

  getPeople(person) {
    return this.http.get(`${URL}people/?search=${person}`)
  }

  getParam() {
    return this.http.get(`${URL}people/`)
  }

  getResident() {
    return this.http.get(`${URL}people/`)
  }

  next(uri) {
    return this.http.get(uri)
  }

  prev(uri) {
    return this.http.get(uri)
  }

  getWorld(url) {
    return this.http.get(url)
  }

}
