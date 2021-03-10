import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AlbumService } from './services/apis/album.service';
import { Category } from './services/types';

@Component({
  selector: 'fm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  title = 'pzfm';
  currentCategory: Category;
  categories: Category[];
  subcategory: string[];
  constructor(private albumServer: AlbumService,private cdr: ChangeDetectorRef) {

  }

  ngOnInit(): void {
    this.init();
  }

  private init(): void {
    this.albumServer.categories().subscribe(categories => {
     this.categories = categories;
     this.currentCategory = this.categories[0];
     this.cdr.markForCheck();
    });
  }

  changeCategory(category: Category): void {
    if (this.currentCategory.id !== category.id) {
      this.currentCategory = category;
    }
  }
}
