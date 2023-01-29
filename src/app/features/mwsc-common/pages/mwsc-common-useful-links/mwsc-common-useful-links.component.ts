import { Component, OnInit } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';       // CLI imports router

@Component({
  selector: 'app-mwsc-common-useful-links',
  templateUrl: './mwsc-common-useful-links.component.html',
  styleUrls: ['./mwsc-common-useful-links.component.scss']
})
export class MwscCommonUsefulLinksComponent implements OnInit {

  requestList: any;

  constructor(private router: Router) {

    this.requestList = [
      {
        id: 1, title: "Downloads", link: "http://mynet.mwsc.net/Downloads/Forms/AllItems.aspx", icon: "fa-globe-americas",
      },
      {
        id: 2, title: "HR Related Forms", link: "https://www.jotform.com/app/220375265666461?appEmbedded=1%22%20style=%22height:600px;%20width:375px;%20border:%200", icon: "fa-globe-americas",
      },
      {
        id: 3, title: "Helpdesk", link: "https://helpdesk.mwsc.com.mv/", icon: "fa-globe-americas",
      },
      {
        id: 4, title: "Staff Handbook", link: "http://mynet.mwsc.net/sites/HR/Staff%20Handbook/Home.aspx", icon: "fa-globe-americas",
      },
      {
        id: 5, title: "Staff Appraisal", link: "http://appraisal.mwsc.com.mv/#/home", icon: "fa-globe-americas",
      },
      {
        id: 6, title: "Duty Roster", link: "https://webapps.mwsc.com.mv/dutyroster", icon: "fa-globe-americas",
      },
    ];
  }



  ngOnInit() {
  }

  openUsefulLink(usefulLink) {
    // Converts the route into a string that can be used 
    // with the window.open() function

    // const url = this.router.serializeUrl(
    //   this.router.createUrlTree([`{usefulLink.link}`])
    // );

    // this.router.navigateByUrl(usefulLink.link);

    const url = usefulLink.link;
    window.open(url, '_blank');
  }

}
