import { Component, Input, OnInit } from '@angular/core';

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
export class PaginationComponent implements OnInit {

  // 总数
  @Input() total = 90;
  // 当前页
  @Input() pageNum = 1;
  // 总页数
  @Input() pageSize = 10;

  // 最后一页
  private lastNum = 0;

  listOfPageBtns: PageItem[] = []
  constructor() { }

  ngOnInit(): void {
    this.lastNum = Math.ceil(this.total / this.pageSize);
    this.listOfPageBtns = this.getListOfPageItems(this.pageNum, this.lastNum);
  }

  private getListOfPageItems(pageNum: number, lastNum: number): PageItem[] {
    return concatWithPrevNext(generatePage(1, this.lastNum), this.pageNum, this.lastNum);
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
