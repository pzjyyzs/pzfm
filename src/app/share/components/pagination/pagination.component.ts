import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { clamp } from 'lodash';

type PageItemType = 'page' | 'prev' | 'next' | 'prev5' | 'next5';
interface PageItem {
  type: PageItemType;
  num?: number;
  disabled?: boolean;
}
@Component({
  selector: 'fm-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges {

  // 总数
  @Input() total = 0;
  // 当前页
  @Input() pageNum = 1;
  // 总页数
  @Input() pageSize = 10;

  @Output() changed = new EventEmitter<number>();
  // 最后一页
  lastNum = 0;

  listOfPageBtns: PageItem[] = []
  constructor() { }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.lastNum = Math.ceil(this.total / this.pageSize);
    this.listOfPageBtns = this.getListOfPageItems(this.pageNum, this.lastNum);
  }

  pageClick({type, num, disabled}: PageItem): void {
    if (!disabled) {
      let newPageNum = this.pageNum;
      if (type === 'page') {
        newPageNum = num;
      } else {
        const diff: any = {
          next: 1,
          prev: -1,
          prev5: -5,
          next5: 5,
        };
        newPageNum += diff[type];
      }
      this.changed.emit(clamp(newPageNum, 1, this.lastNum));
    }
  }

  inputVal(num: number): void {
    if (num > 0) {
      this.pageClick({
        type: 'page',
        num
      });
    }
  }

  private getListOfPageItems(pageNum: number, lastNum: number): PageItem[] {
    if (this.lastNum <= 9) {
      return concatWithPrevNext(generatePage(1, this.lastNum), this.pageNum, this.lastNum);
    } else {
      const firstPageItem = generatePage(1, 1);
      const lastPageItem = generatePage(lastNum, lastNum);
      const prevFiveItem = { type: 'prev5' };
      const nextFiveItem = { type: 'next5' };
      let listOfMidPages = [];
      if (pageNum < 4) {
        listOfMidPages = [ ...generatePage(2, 5), nextFiveItem];
      } else if (pageNum > lastNum - 4) {
        listOfMidPages = [prevFiveItem, ...generatePage(lastNum - 4, lastNum - 1)];
      } else {
        listOfMidPages = [prevFiveItem, ...generatePage(pageNum - 2, pageNum + 2), nextFiveItem];
      }
      return concatWithPrevNext([ ... firstPageItem, ...listOfMidPages, ...lastPageItem], this.pageSize, this.lastNum);
    }
  }


}

function generatePage(start: number, end: number): PageItem[] {
  const list = [];
  for (let i = start; i <= end; i++) {
    list.push({
      num: i,
      type: 'page'
    });
  }
  return list;
}

function concatWithPrevNext(listOfPage: PageItem[], pageNum: number, lastNum: number): PageItem[] {
  return [
    {
      type: 'prev',
      disabled: pageNum === 1
    },
    ...listOfPage,
    {
      type: 'next',
      disabled: pageNum === lastNum
    }
  ]
}
