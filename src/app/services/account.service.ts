import { Injectable } from '@angular/core';
import {Stock} from "./stocks.model";
import {LocalStorageService} from "./local-storage.service";


const defaultBalance: number = 10000;
@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private localStorage: LocalStorageService) { }

  private _balance: number = defaultBalance;
  private _cost: number = 0;
  private _value: number = 0;
  private _stocks: Stock[] = [];
  get balance(): number { return this._balance; }
  get cost(): number { return this._cost; }
  get value(): number { return this._value; }
  get stocks(): Stock[] { return this._stocks; }

  purchase(stock: Stock): void {
    stock = Object.assign({}, stock);
    if (stock.price < this.balance) {
      this._balance = this.debit(stock.price, this.balance);
      stock.cost = stock.price;
      this._cost = this.credit(stock.price, this.cost);
      stock.change = 0;
      this._stocks.push(stock);
      this.calculateValue();
      this.cacheValues();
    }
  }

  sell(index: number): void {
    let stock = this.stocks[index];
    if (stock) {
      this._balance = this.credit(stock.price, this.balance);
      this._stocks.splice(index, 1);
      this._cost = this.debit(stock.cost, this.cost);
      this.calculateValue();
      this.cacheValues();
    }
  }
  reset() {
    this._stocks = [];
    this._balance = defaultBalance;
    this._value = this._cost = 0;
    this.cacheValues();
  }
  calculateValue() {
    this._value = this._stocks
      .map(stock => stock.price)
      .reduce((a, b) => {return a + b}, 0);
  }

  private debit(amount: number, balance: number): number {
    return (balance * 100 - amount * 100) / 100;
  }
  private credit(amount: number, balance: number): number {
    return (balance * 100 + amount * 100) / 100;
  }

  private cacheValues() {
    this.localStorage.set('stocks', this.stocks);
    this.localStorage.set('balance', this.balance);
    this.localStorage.set('cost', this.cost);
  }

  init() {
    this._stocks = this.localStorage.get('stocks', []);
    this._balance = this.localStorage.get('balance', defaultBalance);
    this._cost = this.localStorage.get('cost', 0);
  }

}
