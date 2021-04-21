import { Component, OnInit } from '@angular/core';
import { Persona, PersonasService } from '../personas.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {
  arrPersonas: Persona[];
  constructor(private personasService: PersonasService) { }

  ngOnInit(): void {
    this.personasService.getPersonas$()
      .subscribe(personas => {
        this.arrPersonas = personas;
      });
  }

}
