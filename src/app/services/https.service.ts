import { Injectable, EventEmitter } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { retry, catchError } from "rxjs/operators";

import { Observable, throwError } from "rxjs";
import { environment } from "../../environments/environment";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  })
};

@Injectable({
  providedIn: "root"
})
export class HttpsService {
  url: string = environment.base_url + "/api";
  extractFolders(data: string): string[] {
    // synchronously deliver 1, 2, and 3, then complete
    const re1 = new RegExp(
      '^.\\s*<div class="dd magazine">(.|\n)*?</div>$',
      "gm"
    );
    const matches = data.match(re1);
    const recent_matches = matches.slice(0, 10);
    // unsubscribe function doesn't need to do anything in this
    // because values are delivered synchronously
    return recent_matches;
  }

  constructor(public http: HttpClient) {}

  postMail(body) {
    return this.http
      .post(this.url + "/mail", { ...body }, httpOptions)
      .subscribe(
        data => {
          console.log("POST Request is successful ", data);
        },
        error => {
          console.log("Error", error);
        }
      );
  }

  async getFolders(searchQuery: string) {
    const data = await this.http
      .get(`/search.php?search=${searchQuery}`, { responseType: "text" })
      .toPromise();
    const recent_folders = this.extractFolders(data);
    return recent_folders;
  }

  // Error handling
  errorHandler(error) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }
  private handleErrorObservable(error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
  }
  private handleErrorPromise(error: Response | any) {
    console.error(error.message || error);
    return Promise.reject(error.message || error);
  }
}
