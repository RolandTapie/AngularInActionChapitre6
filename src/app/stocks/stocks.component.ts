import { Component, OnInit } from '@angular/core';
import {AccountService} from "../services/account.service";
import {Stock} from "../services/stocks.model";

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {

  constructor(private accountService: AccountService) { }

  buy(stock :Stock): void {
    this.accountService.purchase(stock);
  }
  ngOnInit(): void {
  }

}
