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
    return this.http.get<[]>("https://run.mocky.io/v3/4503bb66-3512-4690-928b-bd8efc6157be");
  }
}
