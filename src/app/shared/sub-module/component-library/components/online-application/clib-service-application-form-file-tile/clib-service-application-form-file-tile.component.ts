import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-clib-service-application-form-file-tile',
  templateUrl: './clib-service-application-form-file-tile.component.html',
  styleUrls: ['./clib-service-application-form-file-tile.component.scss']
})
export class ClibServiceApplicationFormFileTileComponent implements OnInit {

  @Input() showLoader: boolean;
  @Input() document: any;
  constructor() { }

  ngOnInit() {
  }

}
