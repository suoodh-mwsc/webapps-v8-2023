import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
//import { AuthenticationService } from '@app/_services';

@Injectable()
export class BlobErrorInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {

            console.log('BlobErrorInterceptor.interceptor request', request);   

            if (err instanceof HttpErrorResponse && err.error instanceof Blob && err.error.type === "application/json") {
                // https://github.com/angular/angular/issues/19888
                // When request of type Blob, the error is also in Blob instead of object of the json data
                return new Promise<any>((resolve, reject) => {
                    let reader = new FileReader();
                    reader.onload = (e: Event) => {
                        try {
                            const errmsg = JSON.parse((<any>e.target).result);
                            reject(new HttpErrorResponse({
                                error: errmsg,
                                headers: err.headers,
                                status: err.status,
                                statusText: err.statusText,
                                url: err.url
                            }));
                        } catch (e) {
                            reject(err);
                        }
                    };
                    reader.onerror = (e) => {
                        reject(err);
                    };
                    reader.readAsText(err.error);
                });
            }
            return throwError(err);
        })
        );
    }
}