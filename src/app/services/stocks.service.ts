import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Stock} from "./stocks.model";
import {ConfigService} from "./config.service";

@Injectable({
  providedIn: 'root'
})
export class StocksService {
  constructor(private http:HttpClient) { }
  getstocks(){
    return this.http.get<Stock[]>(ConfigService.getApi());
  }
}
