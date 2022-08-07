import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ethers } from 'ethers';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiUrl = environment.apiAddress;

  constructor(private http: HttpClient) {}

  getNFTCollection() {
    return this.http.get<[]>(this.apiUrl);
  }
}
