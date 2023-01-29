import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-comp-lib-pagination',
  templateUrl: './comp-lib-pagination.component.html',
  styleUrls: ['./comp-lib-pagination.component.scss']
})
export class CompLibPaginationComponent implements OnInit {

  @Input() localStorePagination: any;
  @Input() requestListWithPagination: any;


  // @Output() childEvent = new EventEmitter();
  @Output() paginationCommonRequestFromPaginationPrv: EventEmitter<any> = new EventEmitter();
  @Output() paginationCommonRequestFromPagination: EventEmitter<any> = new EventEmitter();
  @Output() paginationCommonRequestFromPaginationNext: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }


  getRequestFromPaginationPrv(pageNo) {
    console.log('requestFromPaginationPrv', pageNo);
    // this.paginationCommonRequestFromPaginationPrv.emit(pageNo);
    this.paginationCommonRequestFromPaginationPrv.emit();
  }

  getRequestFromPagination(pageNo) {
    // console.log('requestFromPagination', pageNo);
    this.paginationCommonRequestFromPagination.emit();
  }

  getRequestFromPaginationNext(pageNo) {
    console.log('requestFromPaginationNext', pageNo);
    this.paginationCommonRequestFromPaginationNext.emit();
  }

}
