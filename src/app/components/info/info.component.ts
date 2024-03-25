import {Component, OnInit} from '@angular/core';
import {TokenModel} from "../../models/tokenModel";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable
} from "@angular/material/table";
import {TokenService} from "../../services/token.service";
import {MatButton} from "@angular/material/button";
import {formatUnits} from "ethers";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatCellDef,
    MatHeaderCellDef,
    MatHeaderRow,
    MatRow,
    MatRowDef,
    MatHeaderRowDef,
    MatButton,
    RouterLink
  ],
  templateUrl: './info.component.html',
  styleUrl: './info.component.scss'
})
export class InfoComponent implements OnInit {
  protected readonly displayedColumns: string[] = ['tokenId', 'name', 'totalSupply', 'circulatingSupply'];
  protected tableData: TokenModel[] = [];
  protected readonly convertOptions = [
    "wei",
    "kwei",
    "mwei",
    "gwei",
    "szabo",
    "finney",
    "ether"
  ];

  protected activeConvertOption = {
    totalSupply: {
      activeIndex: 0,
      originalWeiValue: ''
    },
    circulatingSupply: {
      activeIndex: 0,
      originalWeiValue: ''
    }
  };

  constructor(private tokenService: TokenService) {
  }
  ngOnInit() {
  }

  /**
   *
   */
  getTokenInfo() {
    this.tokenService.getTokenInfo()
      .subscribe((data: TokenModel) => {
        this.tableData = [{...data}];
        this.activeConvertOption['totalSupply']['originalWeiValue'] = this.tableData[0]['totalSupply'];
        this.activeConvertOption['circulatingSupply']['originalWeiValue'] = this.tableData[0]['circulatingSupply'];
      });
  }

  convertValue(column: 'totalSupply' | 'circulatingSupply') {
    const value = this.activeConvertOption[column]['originalWeiValue'];
    let index = this.activeConvertOption[column]['activeIndex'];
    index = (index + 1) % this.convertOptions.length;
    this.activeConvertOption[column]['activeIndex'] = index;
    this.tableData[0][column] = formatUnits(value, this.convertOptions[index]);
  }
}
