import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(
    private _cookieService: CookieService) { }
    

  public setLocalStorage(dataKey, localData) {
    try {
      localStorage.setItem(dataKey, localData);
    } catch (e) {
      const exception = e;
      console.log('Error LocalStorage', exception);
    }
  }

  public deleteLocalStorage(dataKey) {
    localStorage.removeItem(dataKey);
  }

  public getLocalStorage(dataKey) {
    return localStorage.getItem(dataKey);
  }

  public setLocalStorageBase64(dataKey, localData) {
    const Image64 = localStorage.getItem(dataKey);
    if (Image64 == null) {
      try {
        localStorage.setItem(dataKey, localData);
        console.log('Local Storage -> setLocalStorageBase64. File not Found', dataKey);
      } catch (e) {
        const exception = e;
        console.log('Error LocalStorage', exception);
      }
    } else {
      console.log('Local Storage -> setLocalStorageBase64. File Found', dataKey);
    }
  }


  public deleteLocalStorageBase64(dataKey) {
    localStorage.removeItem(dataKey);
  }


  public getLocalStorageBase64(dataKey) {
    const Image64 = localStorage.getItem(dataKey);
    if (Image64 == null) {
      console.log('Local Storage -> getLocalStorageBase64. File not Found', dataKey);
      return null;
    } else {
      console.log('Local Storage -> getLocalStorageBase64. File Found', dataKey);
      return localStorage.getItem(dataKey);
    }
  }


}
