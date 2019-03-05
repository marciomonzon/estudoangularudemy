import { Component, OnInit, TemplateRef } from '@angular/core';
import { DesenvolvedorService } from '../_services/desenvolvedor.service';
import { Desenvolvedor } from '../_models/desenvolvedor';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { defineLocale, BsLocaleService, ptBrLocale } from 'ngx-bootstrap';
defineLocale('pt-br', ptBrLocale);

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {

  eventosFiltrados: Desenvolvedor[];
  eventos: Desenvolvedor[];
  desenvolvedor: Desenvolvedor;
  registerForm: FormGroup;
  modoSalvar = 'post';
  bodyDeletarDesenvolvedor = '';

  _filtroLista: string;
  
  constructor(
    private desenvolvedorService: DesenvolvedorService
   , private modalService: BsModalService
   , private fb: FormBuilder
   , private localeService: BsLocaleService
    ) { 
      this.localeService.use('pt-br');
    }
  
    
  ngOnInit() {
    this.validation();
    this.getEventos();
  }

  get filtroLista(): string {
    return this._filtroLista;
  }

  set filtroLista(value: string) {
    this._filtroLista = value;
    this.eventosFiltrados = this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.eventos;
  }

  openModal(template: any) {
    this.registerForm.reset();
    template.show();
  }

  filtrarEventos(filtrarPor: string): Desenvolvedor[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.eventos.filter(
      evento => evento.nomeDesenvolvedor.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    )
  }

  editarDesenvolvedor(desenvolvedor: Desenvolvedor, template: any) {
    console.log(desenvolvedor);
    this.modoSalvar = 'put';
    this.openModal(template);
    this.desenvolvedor = desenvolvedor;
    this.registerForm.patchValue(desenvolvedor);
  }

  novoDesenvolvedor(template: any) {
    this.modoSalvar = 'post';
    this.openModal(template);
  }

  excluirEvento(desenvolvedor: Desenvolvedor, template: any) {
    this.openModal(template);
    this.desenvolvedor = desenvolvedor;
    this.bodyDeletarDesenvolvedor = `Tem certeza que deseja excluir o Desenvolvedor: ${desenvolvedor.nomeDesenvolvedor}`;
  }

  confirmeDelete(template: any) {
    this.desenvolvedorService.deleteDesenvolvedor(this.desenvolvedor.idDesenvolvedor).subscribe(
      () => {
        template.hide();
        this.getEventos();
      }, error => {
        console.log(error);
      }
    );
  }

  salvarAlteracao(template: any) {
    if(this.registerForm.valid) {

      if(this.modoSalvar === 'post') {
          this.desenvolvedor = Object.assign({}, this.registerForm.value); // pega todos os valores e atribui
          this.desenvolvedorService.postDesenvolvedor(this.desenvolvedor).subscribe(
              (teste: number) => {
                console.log(teste);
                template.hide();
                this.getEventos();
              }, error => {
                console.log(error);
              }
          );
        } else { // put
            // pega todos os valores do form
            this.desenvolvedor = Object.assign({idDesenvolvedor: this.desenvolvedor.idDesenvolvedor}, this.registerForm.value);
            this.desenvolvedorService.putDesenvolvedor(this.desenvolvedor).subscribe(
                (teste: number) => {
                  console.log(teste);
                  template.hide();
                  this.getEventos();
                }, error => {
                  console.log(error);
                }
            );
        }
      }
  }



  validation() {
    this.registerForm = this.fb.group({
      nomeDesenvolvedor: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(40)]]
    });
  }

  getEventos() {
    this.desenvolvedorService.getEvento().subscribe((_desenvolvedor: Desenvolvedor[]) => { 
      this.eventos = _desenvolvedor;
      console.log(_desenvolvedor);
    }, error =>  {
      console.log(error);
    });
  }


  
}