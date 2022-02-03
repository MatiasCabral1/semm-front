import { Component, OnInit } from '@angular/core';
import { CurrentAccount } from 'src/app/models/CurrentAccount';
import { History } from 'src/app/models/History';
import { HistoryService } from 'src/app/service/History.service';
import { TokenService } from 'src/app/service/token.service';
import { UserService } from 'src/app/service/User.Service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
  history: History[] = [];
  page = 1;
  pageSize = 5;

  constructor(
    private historyService: HistoryService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getHistory();
  }

  public getHistory() {
    this.userService.getCurrentAccount().subscribe((data: CurrentAccount) => {
      this.historyService.getByCc(data.id).subscribe((data) => {
        console.log(data);
        this.history = data;
      });
    });
  }
}
