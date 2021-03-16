import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AlbumArgs, AlbumService, CategoryInfo } from 'src/app/services/apis/album.service';

@Component({
  selector: 'fm-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlbumsComponent implements OnInit {
  searchParams: AlbumArgs = {
    category: 'youshengshu',
    subcategory: '',
    meta: '',
    sort: 0,
    page: 1,
    perPage: 30
  };
  categoryInfo: CategoryInfo;

  constructor(
    private albumServe: AlbumService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.updatePageData();
  }

  private updatePageData(): void {
    this.albumServe.detailCategoryPageInfo(this.searchParams).subscribe(categoryInfo => {
      this.categoryInfo = categoryInfo;
      this.cdr.markForCheck();
    });
  }
}
