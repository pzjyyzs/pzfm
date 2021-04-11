import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Album, AlbumInfo, Anchor, Base, Category, MetaData, RelateAlbum, SubCategory, TracksInfo } from '../types';
import { ParsedUrlQueryInput, stringify } from 'querystring';


export interface CategoryInfo {
  category: Category;
  currentSubcategory: SubCategory;
  subcategories: SubCategory[];
  metadata: MetaData[];
}

export interface AlbumsInfo {
  albums: Album[];
  page: number;
  pageSize: number;
  total: number;
  pageConfig: { h1title: string };
}

export interface AlbumArgs {
  category: string;
  subcategory: string;
  meta: string;
  sort: number;
  page: number;
  perPage: number;
}

export interface AlbumRes {
  albumId: number;
  mainInfo: AlbumInfo;
  anchorInfo: Anchor;
  tracksInfo: TracksInfo;
}

export interface AlbumTrackArgs {
  albumId: string;
  sort: number;
  pageNum: number;
  pageSize: number;
}

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

  // 二级分类
  detailCategoryPageInfo(args: Pick<AlbumArgs, 'category' | 'subcategory'>): Observable<CategoryInfo> {
  /*   const params = new HttpParams({ fromString: stringify(args)}); */
    return this.http
    .get(`${environment.baseUrl}${this.prefix}categories`, { params: args })
    .pipe(map((res: Base<CategoryInfo>) => res.data));
  }

  // 专辑列表
  albums(args: AlbumArgs): Observable<AlbumsInfo> {
    const params = new HttpParams({ fromString: stringify(args as unknown as ParsedUrlQueryInput)});
    return this.http.get(`${environment.baseUrl}${this.prefix}albums`, { params })
    .pipe(map((res: Base<AlbumsInfo>) => res.data));
  }

  // 专辑详情
  album(albumId: string): Observable<AlbumRes> {
    const params = new HttpParams().set('albumId', albumId);
    return this.http.get(`${environment.baseUrl}${this.prefix}album`, { params })
    .pipe(map((res: Base<AlbumRes>) => res.data));
  }

  // 评分
  albumScore(albumId: string): Observable<number> {
    return this.http.get(`${environment.baseUrl}${this.prefix}album-score/${albumId}`)
    .pipe(map((res: Base<{ albumScore: number }>) => res.data.albumScore || 0));
  }

  // 相关专辑
  relateAlbums(id: string): Observable<RelateAlbum[]> {
    const params = new HttpParams().set('id', id);
    return this.http.get(`${environment.baseUrl}${this.prefix}album-relate`, { params })
    .pipe(map((res: Base<{ hotWordAlbums: RelateAlbum[]}>) => res.data.hotWordAlbums));
  }
}
