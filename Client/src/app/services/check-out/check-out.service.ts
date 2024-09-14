import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckOutService {

  constructor(private _httpClient:HttpClient) { }
}
