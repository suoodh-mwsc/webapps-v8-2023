import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import * as moment from 'moment';
// import appUpdates from './../../../../../assets/custom-theme/json/appUpdates';

@Component({
  selector: 'app-mwsc-common-about',
  templateUrl: './mwsc-common-about.component.html',
  styleUrls: ['./mwsc-common-about.component.scss']
})
export class MwscCommonAboutComponent implements OnInit {

  private _jsonURL = 'assets/custom-theme/json/appUpdates.json';
  updateList: any;
  updateFilter:any;
  formatDate:any;

  constructor(private http: HttpClient) {
    this.getAppUpdateList();
  }

  ngOnInit() {
  }


  getAppUpdateList() {
    this.updateList = [];
    this.getJSON().subscribe(data => {
      console.log('getAppUpdateList -> data', data);
      data.forEach(ele => {
        this.updateFilter = [];
        this.formatDate =  moment(ele.release_created_on,).fromNow();
        this.updateFilter = {
          release_build_target: ele.release_build_target,
          release_category: ele.release_build_target,
          release_created_by:  ele.release_build_target,
          release_created_on: this.formatDate,
          release_id: ele.release_id,
          release_reference: ele.release_reference,
          release_enviroment: ele.release_enviroment,
          release_description: ele.release_description,
          release_updates_list: ele.release_updates_list,
        }
        this.updateList.push(this.updateFilter);
      });
      console.log('getAppUpdateList -> updateList', this.updateList);
    });
  }

  public getJSON(): Observable<any> {
    return this.http.get(this._jsonURL);
  }

}
