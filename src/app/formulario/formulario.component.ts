import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PersonasService } from '../personas.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {
  formulario: FormGroup;

  constructor(private personasService: PersonasService) {
    this.formulario = new FormGroup({
      nombre: new FormControl(),
      apellidos: new FormControl(),
      empresa: new FormControl(),
      telefono: new FormControl(),
      email: new FormControl()
    });
   }

  ngOnInit(): void {
  }

  onSubmit() {
    this.personasService.addPersona(this.formulario.value);
  }

}
