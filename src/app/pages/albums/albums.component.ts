import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { withLatestFrom } from 'rxjs/operators';
import { CategoryService } from 'src/app/service/business/category.service';
import { AlbumArgs, AlbumService, CategoryInfo } from 'src/app/services/apis/album.service';
import { MetaData, MetaValue, SubCategory } from './../../services/types';
interface CheckedMeta {
  metaRowId: number;
  metaRowName: string;
  metaId: number;
  metaName: string;
}
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
  checkedMetas: CheckedMeta[] = [];
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
   }

  ngOnInit(): void {
    this.updatePageData();
  }

  changeSubCategory(subCategory?: SubCategory): void {
    if (this.searchParams.subcategory !== subCategory?.code) {
      this.searchParams.subcategory = subCategory?.code || '';
      this.categoryServe.setSubCategory([subCategory?.displayValue]);
      this.updatePageData();
    }
  }

  private updatePageData(): void {
    this.albumServe.detailCategoryPageInfo(this.searchParams)
    .subscribe(categoryInfo => {
      console.log('category', categoryInfo);
      this.categoryInfo = categoryInfo;
      this.cdr.markForCheck();
    });
  }

  changeMeta(row: MetaData, meta: MetaValue): void {
    this.checkedMetas.push({
      metaRowId: row.id,
      metaRowName: row.name,
      metaId: meta.id,
      metaName: meta.displayName
    });
  }

  unCheckMeta(meta: CheckedMeta | 'clear'): void {
    if (meta === 'clear') {
      this.checkedMetas = [];
    } else {
      this.checkedMetas = this.checkedMetas.filter(item =>  item.metaRowId !== meta.metaRowId && item.metaId !== meta.metaId);
    }
  }

  showMetaRow(name: string): boolean {
    if (this.checkedMetas.length) {
      return this.checkedMetas.findIndex(item => item.metaRowName === name) === -1;
    }
    return true;
  }

  trackByCategory(index: number, item: SubCategory): string { return item.code; }
  trackByMetas(index: number, item: MetaValue): number { return item.id; }
}
