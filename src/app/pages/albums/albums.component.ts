import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { withLatestFrom } from 'rxjs/operators';
import { CategoryService } from 'src/app/services/business/category.service';
import { AlbumArgs, AlbumService, AlbumsInfo, CategoryInfo } from 'src/app/services/apis/album.service';
import { Album, MetaData, MetaValue, SubCategory } from './../../services/types';
import { WindowService } from 'src/app/services/tools/window.service';
import { storageKeys } from 'src/app/config';
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
  albumsInfo: AlbumsInfo;
  sorts = ['综合排序', '最近更新', '播放最多'];
  constructor(
    private albumServe: AlbumService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router,
    private categoryServe: CategoryService,
    private winServe: WindowService
  ) {

   }

   ngOnInit(): void {
     this.route.paramMap.pipe(withLatestFrom(this.categoryServe.getCategory()))
     .subscribe(([paramMap, category]) => {
      const pinyin = paramMap.get('pinyin');
      this.searchParams.category = pinyin;
      let needSetState = false;
      if (pinyin !== category) {
        this.categoryServe.setCategory(pinyin);
        this.clearSubCategory();
        this.unCheckMeta('clear');
      } else {
        const cacheSubCategory = this.winServe.getStorage(storageKeys.subCategoryCode);
        const cacheMetas = this.winServe.getStorage(storageKeys.metas);
        if (cacheSubCategory) {
          needSetState = true;
          this.searchParams.subcategory = cacheSubCategory;
        }
        if (cacheMetas) {
          needSetState = true;
          this.searchParams.meta = cacheMetas;
        }
      }

      this.updatePageData(needSetState);
    });
  }

  changeSubCategory(subCategory?: SubCategory): void {
    if (subCategory) {
      if (this.searchParams.subcategory !== subCategory.code) {
        this.searchParams.subcategory = subCategory.code;
        this.categoryServe.setSubCategory([subCategory.displayValue]);
        this.winServe.setStorage(storageKeys.subCategoryCode, this.searchParams.subcategory);
      }
    } else {
      this.clearSubCategory();
    }
    this.unCheckMeta('clear');
    this.updatePageData();
  }

  private updatePageData(needSetState = false): void {
    forkJoin([
      this.albumServe.albums(this.searchParams),
      this.albumServe.detailCategoryPageInfo(this.searchParams)
    ]).subscribe(([albumsInfo, categoryInfo]) => {
      this.albumsInfo = albumsInfo;
      this.categoryInfo = categoryInfo;
      if (needSetState) {
        this.setStatus(categoryInfo);
      }
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
    this.searchParams.meta = this.getMetaParams();
    this.winServe.setStorage(storageKeys.metas, this.searchParams.meta);
    this.updateAlbums();
  }

  unCheckMeta(meta: CheckedMeta | 'clear'): void {
    if (meta === 'clear') {
      this.checkedMetas = [];
      this.searchParams.meta = '';
      this.winServe.removeStorage(storageKeys.metas);
    } else {
      this.checkedMetas = this.checkedMetas.filter(item =>  item.metaRowId !== meta.metaRowId && item.metaId !== meta.metaId);
      this.searchParams.meta = this.getMetaParams();
      this.winServe.setStorage(storageKeys.metas, this.searchParams.meta);
    }
    // this.updateAlbums();
  }

  showMetaRow(name: string): boolean {
    if (this.checkedMetas.length) {
      return this.checkedMetas.findIndex(item => item.metaRowName === name) === -1;
    }
    return true;
  }

  getMetaParams(): string {
    let result = '';
    if (this.checkedMetas.length) {
      result = this.checkedMetas.reduce((str, item) => str + item.metaRowId + '_' + item.metaId + '-', '');
    }
    return result.slice(0, -1);
  }

  changeSort(index: number): void {
    if (this.searchParams.sort !== index) {
      this.searchParams.sort = index;
      this.updatePageData();
    }
  }

  trackByCategory(index: number, item: SubCategory): string { return item.code; }

  trackByMetas(index: number, item: MetaValue): number { return item.id; }

  trackByAlbums(index: number, item: Album): number { return  item.albumId; }

  updateAlbums(): void {
    this.albumServe.albums(this.searchParams)
    .subscribe(albumsInfo => {
      this.albumsInfo = albumsInfo;
      this.cdr.markForCheck();
    });
  }

  private clearSubCategory(): void {
    this.searchParams.subcategory = '';
    this.categoryServe.setSubCategory([]);
    this.winServe.removeStorage(storageKeys.subCategoryCode);
  }

  private setStatus({metadata, subcategories}: CategoryInfo): void {
    const subCategory = subcategories.find(item => item.code === this.searchParams.subcategory);
    if (subCategory) {
      this.categoryServe.setSubCategory([subCategory.displayValue]);
    }
    if (this.searchParams.meta) {
      const metasMap = this.searchParams.meta
      .split('-')
      .map(item => item.split('_'));
      metasMap.forEach(meta => {
        const targetRow = metadata.find(row => row.id === Number(meta[0]));
        const { id: metaRowId, name, metaValues } = targetRow || metadata[0];
        const targetMeta = metaValues.find(item => item.id === Number(meta[1]));
        const { id, displayName } = targetMeta || metaValues[0];
        this.checkedMetas.push({
          metaRowId,
          metaRowName: name,
          metaId: id,
          metaName: displayName
        });
      });
    }
  }
}
