import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { storageKeys } from 'src/app/config';
import { WindowService } from '../tools/window.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  // subject需要next才能设置初始值，BehaviorSubject可以直接设置初始值
  // category 是一级分类 subCategory是二级分类
  private category$ = new BehaviorSubject<string>('youshengshu');
  private subCategory$ = new BehaviorSubject<string[]>([]);
  constructor(private winServe: WindowService) {
    const cacheCategory = this.winServe.getStorage(storageKeys.categoryPinyin);
    if (cacheCategory) {
      this.category$.next(cacheCategory);
    }
  }

  setCategory(category: string): void {
    this.winServe.setStorage(storageKeys.categoryPinyin, category);
    this.category$.next(category);
  }

  getCategory(): Observable<string> {
    return this.category$.asObservable();
  }

  setSubCategory(category: string[]): void {
    this.subCategory$.next(category);
  }

  getSubCategory(): Observable<string[]> {
    return this.subCategory$.asObservable();
  }
}
