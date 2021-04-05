import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from './services/business/category.service';
import { AlbumService } from './services/apis/album.service';
import { Category } from './services/types';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'fm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  title = 'pzfm';
  currentCategory: Category;
  categories: Category[] = [];
  subcategory: string[] = [];
  categoryPinyin = '';
  constructor(private albumServer: AlbumService,
              private categoryServe: CategoryService,
              private cdr: ChangeDetectorRef,
              private router: Router
    ) {

  }

  ngOnInit(): void {
    this.init();
  }

  private init(): void {
    // combineLatest合并多个流，取最新值
    combineLatest(
      this.categoryServe.getCategory(),
      this.categoryServe.getSubCategory()
    ).subscribe(([category, subcategory]) => {
      if (category !== this.categoryPinyin) {
        this.categoryPinyin = category;
        if (this.categories.length) {
          this.setCurrentCategory();
        }
      }
      this.subcategory = subcategory;
    });

    this.getCategories();
  }

  private getCategories(): void {
    this.albumServer.categories().subscribe(categories => {
      this.categories = categories;
      this.setCurrentCategory();
      this.cdr.markForCheck();
     });
  }

  changeCategory(category: Category): void {
    if (this.currentCategory.id !== category.id) {
      this.router.navigateByUrl('/albums/' + category.pinyin);
    }
  }

  setCurrentCategory(): void {
    this.currentCategory = this.categories.find(item => item.pinyin === this.categoryPinyin);
  }
}
