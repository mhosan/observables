import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

/* 
el subject es el que genera el observable, es común que terminen en $
 */
export interface Persona {
  nombre: string,
  apellidos: string,
  empresa: string,
  email: string,
  telefono: string
}
@Injectable({
  providedIn: 'root'
})
export class PersonasService {
  private personas: Persona[];
  private personas$: Subject<Persona[]>  //el subject que va a emitir un array de personas
  constructor() {
    this.personas = [];
    this.personas$ = new Subject();
  }

  addPersona(pPersona: Persona){
    this.personas.push(pPersona);  //ahora que se agregó una nueva persona y el array cambio, hay que enviarlo a quienes
                                    //estan escuchando o subscriptos con el metodo next. Luego falta crear un metodo para
                                    //que se puedan subscribir, ya que no es posible subscribirse al subject. El metodo
                                    //es getPersonas$
    this.personas$.next(this.personas);
  }
  getPersonas$(): Observable<Persona[]>{
    return this.personas$.asObservable(); //transformamos el subject personas$ en observable para que se puedan subscribir
  }
}
