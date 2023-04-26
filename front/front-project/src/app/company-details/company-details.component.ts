import {Component, OnInit} from '@angular/core';
import {Company} from "../models";
import {ActivatedRoute} from "@angular/router";
import {CompanyService} from "../company.service";

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.css']
})
export class CompanyDetailsComponent implements OnInit{
  company!: Company;
  constructor(private route: ActivatedRoute, private compService: CompanyService) {
  }

  ngOnInit(): void {
    this.compService.getCompany(this.getCompanyId()).subscribe((c: Company) => {
      this.company = c;
    });
  }

  getCompanyId() {
    return String(this.route.snapshot.paramMap.get('companyId'))
  }

}
