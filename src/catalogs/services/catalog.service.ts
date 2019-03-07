import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class CatalogsService {

  constructor(private http: HttpClient) { }

  getImage(id: number) {
    return this.http.get(`https://jsonplaceholder.typicode.com/photos/${id}`);
  }
}
