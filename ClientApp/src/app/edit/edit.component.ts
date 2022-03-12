import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {  Client } from '../home/home.component';

@Component({
  selector: 'app-edit-component',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  randomString = (length: number) =>
  [ ...Array(length) ].map(() => (~~(Math.random() * 36)).toString(36)).join('');

  public model: Client = { id: this.randomString(24), nome: "", cpf: "", sexo: '', endereco: "", status: true };
  public data: Client[] = [];
  public isEdit: boolean = false;

  constructor(
    private router: Router
    ) {}

  async ngOnInit() {
    this.data = this.getLocalStorage();

    const urlParams = new URLSearchParams(window.location.search);
    let id = urlParams.get('id');
    if (this.data.filter(q => q.id == id).length > 0) {
      this.model = this.data.filter(q => q.id == id)[0];
      this.isEdit = true;
    }
  }

  save(){
    if(this.model == null){
      alert("Ocorreu um erro! Por favor, tente novamente.")
      return;
    }
    if (this.data.filter(q => q.cpf === this.model.cpf).length > 0 && !this.isEdit) {
      alert("Já existe um cliente cadastrado com este CPF.")
      return;
    }
    if(this.model.nome == ""){
      alert("Por favor, informe um nome válido.")
      return;
    }
    if(this.model.cpf == ""){
      alert("Por favor, informe um cpf válido.")
      return;
    }
    if(this.model.dNasc == null){
      alert("Por favor, informe uma data de nascimento válido.")
      return;
    }
    if(this.model.sexo == ""){
      alert("Por favor, informe um sexo válido.")
      return;
    }

    if(!this.isEdit){
      //Add cliente novo
      this.data.push(this.model);
    } else{
      //Atualizar cliente da lista
      var index = this.data.findIndex((q => q.id == this.model.id));
      this.data[index] = this.model;

    }

    //Atualizar localStorage
    this.setLocalStorage();

    //Voltar
    this.router.navigate(['/']);
  }

  setLocalStorage(){
    localStorage.setItem('dataClients', JSON.stringify(this.data));
  }

  getLocalStorage(){
    let data = JSON.parse(localStorage.getItem("dataClients")!)
    if(data == undefined){
      data = new Array<Client>();
    }
    return data;
  }
}
