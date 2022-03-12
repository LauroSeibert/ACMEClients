import { Component, Injectable, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  public displayedColumns: string[] = ["nome", "dNasc", "cpf", "sexo", "endereco", "status"];
  public data: Client[] = [];
  public searchInput: string;

  async ngOnInit() {
    if(localStorage.getItem('dataClients') == null || localStorage.getItem('dataClients') == "undefined"){
      localStorage.setItem('dataClients', JSON.stringify(this.data));
    } else{
      this.data = JSON.parse(localStorage.getItem("dataClients")!);
    }

    console.log(this.randomString(14));
  }

  searchFilter(){
    this.data = this.getLocalStorage();

    if(this.searchInput != ""){
      this.data = this.data.filter(q => q.nome.includes(this.searchInput));
    }
  }

  deleteItem(item: Client){
    this.data = this.data.filter(q => q != item);
    this.setLocalStorage();
  }

  setLocalStorage(){
    localStorage.setItem('dataClients', JSON.stringify(this.data));
  }

  getLocalStorage(){
    return JSON.parse(localStorage.getItem("dataClients")!);
  }

  randomString = (length: number) => [ ...Array(length) ].map(() => (~~(Math.random() * 36)).toString(36)).join('');

}

export interface Client {
  id: string;
  nome: string;
  dNasc?: Date;
  cpf: string;
  sexo: string;
  endereco: string;
  status: boolean;
}
