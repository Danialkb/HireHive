import { Component } from '@angular/core';
import {Company} from "../models";
import {CompanyService} from "../company.service";

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent {
  companies: any[];

  constructor(private companyService: CompanyService) {
    this.companies = [];
  }

  ngOnInit(): void {
    this.getCompanies();
  }

  getCompanies() {
    // @ts-ignore
    this.companyService.getCompanies().subscribe((companies: any[]) => {this.companies = companies});
    console.log(this.companies)
  }


}
