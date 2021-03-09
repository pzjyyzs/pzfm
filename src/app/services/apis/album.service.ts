import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Base, Category } from '../types';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  readonly prefix = '/xmly/';
  constructor(private http: HttpClient) { }

  // 一级分类列表

  categories(categoryId = 3): Observable<Category[]> {
    const params = new HttpParams().set('categoryId', categoryId.toString());
    return this.http
    .get(`${environment.baseUrl}${this.prefix}breadcrumb`, { params })
    .pipe(map((res: Base<{categories: Category[] }>) => res.data.categories));
  }
}
