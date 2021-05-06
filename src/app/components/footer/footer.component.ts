import { Component, OnInit } from "@angular/core";
import { FooterService } from "../../services/footer.service";
import { CatNoFilter } from '../../interfaces';

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"],
})
export class FooterComponent implements OnInit {
  constructor(private footerSrv: FooterService) { }

  ngOnInit(): void {
    this.getAllCats();
  }

  allPrincipais: CatNoFilter[];
  allSubs: CatNoFilter[];

  getAllCats(): void {
    this.footerSrv.listarAll().subscribe((cats) => {
      this.allPrincipais = cats.filter((cat) => !cat.isSub);
      this.allSubs = cats.filter((cat) => cat.isSub);
    });
  }
}
