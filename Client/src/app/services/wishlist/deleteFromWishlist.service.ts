import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { apiUrl } from '../../util/apiUrl';

@Injectable({
  providedIn: 'root'
})
export class DeleteBookFromWishlistServiece {
  private myApi = `${apiUrl}/wishlist`;
  private isBrowser: boolean = false;
  private userToken = '';

  constructor(private _httpClient: HttpClient, @Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  deleteFromWihslist(prodId: string): Observable<any> {
    let headers = new HttpHeaders();

    if (this.isBrowser) {
       
      const token = localStorage.getItem('token');
      
      
      this.userToken = token ? JSON.parse(token) : null;

      if (this.userToken) {
        headers = headers.set('token', this.userToken);
      }
    }

    const body = { bookId: prodId };


    return this._httpClient.request<any>('delete', this.myApi, {
      body: body,
      headers: headers
    });
  }

}





