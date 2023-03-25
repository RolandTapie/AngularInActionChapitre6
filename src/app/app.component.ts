import {Component, OnInit} from '@angular/core';
import {AccountService} from './services/account.service';
import {StocksService} from "./services/stocks.service";
import {Stock} from "./services/stocks.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'AngularInActionChapitre6';
 stocks: Stock[] = [];
  private interval: any;
  public refresh: boolean =true;


  constructor(public accountService: AccountService, public stockservice: StocksService) {
  }

// skipping some content
  reset(): void {
    this.accountService.reset();
  }

  private load() {
    this.stockservice.getstocks()
      .subscribe(elements => {
          this.stocks = elements;
          console.log('Chargement des stocks effectué');
          console.log(this.stocks);
        },
        error => {
          console.error('Un problème dans le chargements des stocks: ${console.error()}');
        });
  }

  ngOnInit() {
    this.accountService.init();
    this.load();
    this.interval = setInterval(() => {
      if (this.refresh) {
        this.load();
      }
    }, 15000);
  }

  toggleRefresh(): void {
    this.refresh = !this.refresh;
  }
}
