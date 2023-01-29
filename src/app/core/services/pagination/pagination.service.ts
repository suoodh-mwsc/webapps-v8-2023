import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  requestPagination: any = [];
  requestList: any = [];

  constructor() { }


  showFirstPage(paginationSize, data) {
    if (data.total_pages > 0) {
      this.generateAllPages(paginationSize, data);
    }
  }


  generateAllPages(paginationSize, requestList) {
    if (requestList.total_pages > 0) {
      return new Promise((resolve, reject) => {
        requestList['page_list'] = [];
        requestList['item_start'] = 0;
        requestList['item_end'] = 0;
        let item_end;
        let item_start;

        for (let i = 1; i <= requestList.total_pages; i++) {
          let showPageNo;
          if (i <= 5) {
            showPageNo = true;
          } else if (i > 5) {
            showPageNo = false;
          }

          if (i < requestList.total_pages) {
            item_end = i * paginationSize;
            item_start = item_end - paginationSize + 1;
          } else if (i <= requestList.total_pages) {
            item_end = requestList.total_count;
            const temp = i * paginationSize;
            item_start = temp - paginationSize + 1;
          }


          if (item_start && item_end && i === requestList.page_number) {
            requestList.item_start = item_start;
            requestList.item_end = item_end;
          }

          const pagination = {};
          pagination['page_number'] = i;
          pagination['item_start'] = item_start;
          pagination['item_end'] = item_end;
          pagination['show_page'] = showPageNo;
          requestList.page_list.push(pagination);
          this.requestPagination = requestList;
        }
        
        resolve(requestList);
      });
    }
  }





  getPageFromPaginationNo(pageNo, requestList) {
    let showPageMin = pageNo - 5;
    let showPageMax = pageNo + 5;

    this.requestPagination.items = requestList.items;
    this.requestPagination.page_number = pageNo; 
    this.requestPagination.has_next = requestList.has_next; 
    this.requestPagination.has_previous = requestList.has_previous;
    this.requestPagination.next = requestList.next;
    this.requestPagination.previous= requestList.previous;

    for (let i = 1; i <= requestList.total_pages; i++) {
      let item_end;
      let item_start;

      if (i < requestList.total_pages) {
        item_end = i * requestList.page_size;
        item_start = item_end - requestList.page_size + 1;
      } else if (i <= requestList.total_pages) {
        item_end = requestList.total_count;
        const temp = i * requestList.page_size;
        item_start = temp - requestList.page_size + 1;
      }

      if (item_start && item_end && i === requestList.page_number) {
        this.requestPagination.item_start = item_start;
        this.requestPagination.item_end = item_end;
      }
    }

    return new Promise((resolve, reject) => {
      this.requestPagination.page_list.forEach(ele => {
        if (ele.page_number === pageNo) {
          ele.show_page = true;
        } else {
          ele.show_page
          if (ele.page_number > showPageMin && ele.page_number < showPageMax) {
            ele.show_page = true;
          } else {
            ele.show_page = false;
          }
        }
      });

      console.log('requestList       -> this.requestList :: ', requestList);
      console.log('requestList       -> this.requestPagination :: ', this.requestPagination);
      resolve(this.requestPagination);
    });
  }

}
