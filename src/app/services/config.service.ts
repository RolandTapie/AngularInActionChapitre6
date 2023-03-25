import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private static _api: string;
  static setApi(value: string) {
    this._api = value;
  }
  static getApi() {
    return this._api;
  }
}
