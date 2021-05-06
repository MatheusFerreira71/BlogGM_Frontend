import { Component, OnInit } from "@angular/core";
import { NavbarService } from "../../services/navbar.service";
import { Categoria } from "../../interfaces";

@Component({
  selector: "app-dropdown-categorias",
  templateUrl: "./dropdown-categorias.component.html",
  styleUrls: ["./dropdown-categorias.component.scss"],
})
export class DropdownCategoriasComponent implements OnInit {
  constructor(private navbarSrv: NavbarService) {}

  ngOnInit(): void {
    this.getCategorias();
  }

  allCategorias: Categoria[];

  getCategorias(): void {
    this.navbarSrv
      .listarAll()
      .subscribe((categoria) => (this.allCategorias = categoria));
  }
}
