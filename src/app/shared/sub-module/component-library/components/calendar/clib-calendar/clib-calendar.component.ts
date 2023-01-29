import { Component, OnInit, Input, ViewChild, forwardRef, AfterViewInit, AfterContentInit, OnChanges } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
declare var $: any;
import { CookieService } from 'ngx-cookie-service';
// API Data Services
import { LeaveDashboardService } from './../../../../../services/dashboard/leave-dashboard.service';
// Env
import { environment } from './../../../../../../../environments/environment';
// API Data Services
// import { HrMangeEmployeeBaseService } from './../../../../../../orchestra/employee/services/hr-mange-employee-base.service';
// Core Services
import { PaginationService } from './../../../../../../core/services/pagination/pagination.service';
import { YodaCoreErrorHandlerService } from './../../../../../../core/services/error-handler/yoda-core-error-handler.service';
// import { FullCalendarComponent, CalendarOptions } from '@fullcalendar/angular';
// import { DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/angular';
// import { INITIAL_EVENTS, createEventId } from './event-utils';
// Plugins
import { OptionsInput, Calendar } from '@fullcalendar/core';
import dayGridPlugin, { DayGrid } from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import { FullCalendarComponent } from '@fullcalendar/angular';
import bootstrapPlugin from '@fullcalendar/bootstrap';


@Component({
  selector: 'app-clib-calendar',
  templateUrl: './clib-calendar.component.html',
  styleUrls: ['./clib-calendar.component.scss']
})
export class ClibCalendarComponent implements OnInit, AfterViewInit, AfterContentInit, OnChanges {

  toastrTimeOut: any = environment.appConfig.staffPortal.common.toastrTimeOut;
  modelCloseTimeOut: any = environment.appConfig.staffPortal.common.modelCloseTimeOut;
  // API Data - UI Realted
  requestUi: any = { viewType: 'leave-requets', show_loader: true, loader_size: 'xl', disable_button: false };
  // 
  fullcalendarApi: Calendar;
  fullcalendarOptions: OptionsInput;
  // Parent Component Data
  @Input() request_data: any;
  @Input() tabUi: any;
  @Input() request_item: any;
  //
  @Input() fullcalendarData: any;
  @Input() fullcalendarEvents: any;

  // @Output() crendered = new EventEmitter();
  @ViewChild('fullcalendar', { static: false }) fullcalendar: FullCalendarComponent;

  constructor(private _leaveDashboardService: LeaveDashboardService) {
    console.log('constructor -> Start');
    // this.fullcalendarOptions.defaultView = 'dayGridMonth';

    this.fullcalendarOptions = {
      header: {
        left: 'dayGridMonth',
        center: 'title',
        right: 'prev,next'
      },
      customButtons: {
        prev: {
          text: '<',
          click: this.getEventsByMonthBefore.bind(this)
        },
        next: {
          text: '>',
          click: this.getEventsByMonthAfter.bind(this)
        }
      },
      eventSources: this.fullcalendarEvents,
      events: this.handleEvents.bind(this),
      navLinks: true, // can click day/week names to navigate views
      buttonIcons: true, // show the prev/next text
      plugins: [dayGridPlugin, timeGrigPlugin, interactionPlugin, bootstrapPlugin],
      displayEventTime: false,
      themeSystem: 'bootstrap',
      bootstrapFontAwesome: {
        prev: 'fa-chevron-left',
        next: 'fa-chevron-right',
        prevYear: 'fa-angle-double-left',
        nextYear: 'fa-angle-double-right'
      },
      defaultView: 'dayGridMonth',
      weekends: true,
      editable: false,
      selectable: true,
      selectMirror: true,
    };

    console.log('constructor -> setTimeout start');
    setTimeout(() => {
      // this.request_item.show_model_loader = true;
      // this.setFullCalendar(this.fullcalendarData.selectedDate);

      this.fullcalendarApi = this.fullcalendar.getApi();
      this.fullcalendarApi.changeView('dayGridMonth');

      this.getCalendarDataForRequest();
      console.log('constructor -> testing');
    }, 100);
    console.log('constructor -> setTimeout end');
  }

  ngOnInit() {
    console.log('constructor -> setTimeout start');
    setTimeout(() => {
      // this.request_item.show_model_loader = true;
      // this.setFullCalendar(this.fullcalendarData.selectedDate);

      this.fullcalendarApi = this.fullcalendar.getApi();
      this.fullcalendarApi.changeView('dayGridMonth');

      this.getCalendarDataForRequest();
      console.log('constructor -> testing');
    }, 100);
    console.log('constructor -> setTimeout end');
  }


  ngAfterContentInit() {
    // this.myComponent now gets projected in and can be accessed
    // this.myTemplate is still undefined
  }


  ngAfterViewInit() {
    // this.myTemplate can be used now as well
    // this.getCalendarDataForRequest();
    console.log('ngOnInit -> testing');
  }


  ngOnChanges() {
    this.fullcalendarApi = this.fullcalendar.getApi();
  }

  ngAfterViewChecked() {
    // if (this.fullcalendarData.title) {
    //   this.fullcalendarApi = this.fullcalendar.getApi();
    //   this.fullcalendarApi.changeView('dayGridMonth');
    // }
  }


  getEventsByMonthBefore(events) {
    console.log('getEventsByMonthBefore -> this.request_data.selected_dashboard :: ', this.request_data.selected_dashboard);
    if (this.fullcalendarEvents.length && this.fullcalendarEvents.length > 0) {
      this.fullcalendarApi.removeAllEvents();
      this.fullcalendarEvents = [];
    } else {
      this.fullcalendarEvents = [];
    }

    console.log('getEventsByMonthBefore', events);
    this.fullcalendarApi.prev();
    this.fullcalendarApi.render();
    const currentDate = this.fullcalendarApi.getDate();
    console.log('getEventsByMonthBefore ' + currentDate);
    this.setFullCalendar(currentDate);
  }


  getEventsByMonthAfter(events) {
    console.log('getEventsByMonthAfter -> this.request_data.selected_dashboard :: ', this.request_data.selected_dashboard);
    if (this.fullcalendarEvents.length && this.fullcalendarEvents.length > 0) {
      this.fullcalendarApi.removeAllEvents();
      this.fullcalendarEvents = [];
    } else {
      this.fullcalendarEvents = [];
    }

    console.log('getEventsByMonthAfter', events);
    this.fullcalendarApi.next();
    this.fullcalendarApi.render();
    const currentDate = this.fullcalendarApi.getDate();
    console.log('getEventsByMonthAfter ' + currentDate);
    this.setFullCalendar(currentDate);
  }


  handleEvents(events) {
    console.log('handleEvents', events);
    this.fullcalendarEvents = events;
  }


  getCalendarDataForRequest() {
    setTimeout(() => {
      this.request_item.show_model_loader = true;
      console.log('getCalendarDataForRequest -> getApi');
      this.fullcalendarApi = this.fullcalendar.getApi();
      this.fullcalendarApi.changeView('dayGridMonth');

      console.log('getCalendarDataForRequest -> selectedDate', this.fullcalendarData.selectedDate);
      this.fullcalendarApi.removeAllEvents();

      this.fullcalendarEvents.forEach(ele => {
        this.fullcalendarApi.addEvent(ele);
      });
      this.request_item.show_model_loader = false;
    }, 500);
  }



  setFullCalendar(selectedDate) {
    console.log('setFullCalendar -> this.request_data.selected_dashboard :: ', this.request_data.selected_dashboard);
    console.log('setFullCalendar -> selectedDate', selectedDate);
    this.request_item.show_model_loader = true;
    this.fullcalendarData.title = moment(selectedDate).startOf('month').format('YYYY-MM-DD');
    this.fullcalendarData.startOfMonth = moment(selectedDate).startOf('month').subtract(15, 'days').format('YYYY-MM-DD');
    this.fullcalendarData.endOfMonth = moment(selectedDate).endOf('month').add(15, 'days').format('YYYY-MM-DD');

    // this.fullcalendarData.endOfMonth = moment(selectedDate, "DD-MM-YYYY").add(5, 'days');

    if (this.fullcalendarEvents.length && this.fullcalendarEvents.length > 0) {
      this.fullcalendarApi.removeAllEvents();
      this.fullcalendarEvents = [];
    } else {
      this.fullcalendarEvents = [];
    }
    // this.postAttendanceCalendarByPeriod(this.request_item.fullcalendarData.startOfMonth, this.fullcalendarData.endOfMonth, this.employeeId);
    this.postAttendanceCalendarByPeriod(this.fullcalendarData.startOfMonth, this.fullcalendarData.endOfMonth, this.request_item.employee_details.employee_id);
  }


  postAttendanceCalendarByPeriod(from, to, employeeId) {
    console.log('postAttendanceCalendarByPeriod -> this.request_data.selected_dashboard :: ', this.request_data.selected_dashboard);
    console.log('postAttendanceCalendarByPeriod -> employeeId', employeeId);
    this.request_item.show_model_loader = true;
    localStorage.removeItem('AttendanceCalendar');
    this._leaveDashboardService.getStaffPortalCalendarEvents(from, to, employeeId, this.request_data.selected_dashboard).subscribe((calendar_events: any) => {
      console.log('calendar_events', calendar_events);
      calendar_events.forEach(calendar_event => {
        const calendarEventObj = {
          title: calendar_event.event_name,
          start: calendar_event.event_start,
          end: calendar_event.event_end,
          color: calendar_event.event_color,
          backgroundColor: calendar_event.event_color,
          display: "auto",
          allDay: calendar_event.is_full_day
        };
        this.fullcalendarEvents.push(calendarEventObj);
      });

      // console.log('calendarEvents', this.request_item.fullcalendarEvents);
      this.fullcalendarEvents.forEach(ele => {
        this.fullcalendarApi.addEvent(ele);
      });
      // this.fullcalendarApi.render();
      this.fullcalendarApi.refetchEvents();
      console.log('postAttendanceCalendarByPeriod -> ', this.fullcalendarEvents);
      this.request_item.show_model_loader = false;
      // localStorage.setItem('AttendanceCalendar', JSON.stringify(this.fullcalendarEvents));
    });
  }
}
