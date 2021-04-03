import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { withLatestFrom } from 'rxjs/operators';
import { CategoryService } from 'src/app/service/business/category.service';
import { AlbumArgs, AlbumService, CategoryInfo } from 'src/app/services/apis/album.service';
import { MetaValue, SubCategory } from './../../services/types';

@Component({
  selector: 'fm-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlbumsComponent implements OnInit {
  searchParams: AlbumArgs = {
    category: '',
    subcategory: '',
    meta: '',
    sort: 0,
    page: 1,
    perPage: 30
  };
  categoryInfo: CategoryInfo;

  constructor(
    private albumServe: AlbumService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router,
    private categoryServe: CategoryService
  ) {

    this.route.paramMap.pipe(withLatestFrom(this.categoryServe.getCategory()))
    .subscribe(([paramMap, category]) => {
      const pinyin = paramMap.get('pinyin');
      if (pinyin !== category) {
        this.categoryServe.setCategory(pinyin);
      }
      this.searchParams.category = pinyin;
      this.searchParams.subcategory = '';
      this.categoryServe.setSubCategory([]);
      this.updatePageData();
    });
      // combineLatest合并多个流，取最新值
    /* combineLatest(
      this.categoryServe.getCategory(),
      this.route.paramMap
    ) */
   }

  ngOnInit(): void {
    this.updatePageData();
  }

  changeSubCategory(subCategory?: SubCategory): void {
    if (this.searchParams.subcategory !== subCategory?.code) {
      this.searchParams.subcategory = subCategory?.code || '';
      this.categoryServe.setSubCategory([subCategory.displayValue]);
      this.updatePageData();
    }
  }

  private updatePageData(): void {
    this.albumServe.detailCategoryPageInfo(this.searchParams).subscribe(categoryInfo => {
      this.categoryInfo = categoryInfo;
      this.cdr.markForCheck();
    });
  }

  trackByCategory(index: number, item: SubCategory): string { return item.code; }
  trackByMetas(index: number, item: MetaValue): number { return item.id; }
}
