import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
export class ErrorInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    
    return next.handle(req)
    .pipe(

      catchError( (error: HttpErrorResponse) => {
        let err: string;
          
        err = `err code: ${error.status},  err message: ${error.error.message}`;
          
        console.log(err);
        
        return throwError(err);

      })
    );
  }

}
