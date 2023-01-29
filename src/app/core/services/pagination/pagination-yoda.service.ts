import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaginationYodaService {
  requestPagination: any = [];
  requestList: any = [];

  constructor() { }

  showFirstPage(paginationSize, data, pagination_type) {
    if (data.PaginationInfo.TotalPages > 0) {
      this.generateAllPages(paginationSize, data, pagination_type);
    }
  }


  generateAllPages(paginationSize, data, pagination_type) {
    if (data.PaginationInfo.TotalPages > 0) {
      return new Promise((resolve, reject) => {
        if(pagination_type === 'pagination_items'){
          data['items'] = data.items;
        }
        if(pagination_type === 'pagination_result'){
          data['items'] = data.Result;
        }
        if(pagination_type === 'pagination_tender'){
          data['items'] = data.Tenders;
        }

        data['page_list'] = [];
        data['item_start'] = 0;
        data['item_end'] = 0;
        let item_end;
        let item_start;

        for (let i = 1; i <= data.PaginationInfo.TotalPages; i++) {
          let showPageNo;
          if (i <= 5) {
            showPageNo = true;
          } else if (i > 5) {
            showPageNo = false;
          }

          if (i < data.PaginationInfo.TotalPages) {
            item_end = i * paginationSize;
            item_start = item_end - paginationSize + 1;
          } else if (i <= data.PaginationInfo.TotalPages) {
            item_end = data.PaginationInfo.TotalPages;
            const temp = i * paginationSize;
            item_start = temp - paginationSize + 1;
          }


          if (item_start && item_end && i === data.PaginationInfo.PageNumber) {
            data.item_start = item_start;
            data.item_end = item_end;
          }

          const pagination = {};
          pagination['page_number'] = i;
          pagination['item_start'] = item_start;
          pagination['item_end'] = item_end;
          pagination['show_page'] = showPageNo;
          data.page_list.push(pagination);
          this.requestPagination = data;
        }
        
        resolve(data);
      });
    }
  }





  getPageFromPaginationNo(pageNo, data, pagination_type) {
    let showPageMin = pageNo - 5;
    let showPageMax = pageNo + 5;
    if(pagination_type === 'pagination_items'){
      this.requestPagination.items = data.items;
    }
    if(pagination_type === 'pagination_result'){
      this.requestPagination.items = data.Result;
    }

    this.requestPagination.page_number = pageNo; 
    // this.requestPagination.has_next = data.has_next; 
    // this.requestPagination.has_previous = data.has_previous;
    // this.requestPagination.next = data.next;
    // this.requestPagination.previous= data.previous;

    for (let i = 1; i <= data.PaginationInfo.TotalPages; i++) {
      let item_end;
      let item_start;
      if (i < data.PaginationInfo.TotalPages) {
        item_end = i * data.PaginationInfo.PageSize;
        item_start = item_end - data.PaginationInfo.PageSize + 1;
      } else if (i <= data.PaginationInfo.TotalPages) {
        item_end = data.PaginationInfo.TotalPages;
        const temp = i * data.PaginationInfo.PageSize;
        item_start = temp - data.PaginationInfo.PageSize + 1;
      }
      if (item_start && item_end && i === data.page_number) {
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
      console.log('data               -> this.data :: ', data);
      console.log('data  -> this.requestPagination :: ', this.requestPagination);
      resolve(this.requestPagination);
    });
  }

}
