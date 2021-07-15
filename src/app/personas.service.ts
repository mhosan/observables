import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

/*
Observable: "un flujo de datos (stream) en el tiempo."

Un subject es un tipo especial de observable que permite realizar varias tareas
Es especial porque aparte de ser un observable puede ser un observador

El subject es el que genera el observable, es común que terminen en $
El subject emite con el metodo next()

Un BehaviorSubject extiende al subject y emite el último valor a las nuevas suscripciones
El BehaviorSubject requiere un valor por defecto (el subject no), devuelve el último valor cuando hay 
una nueva suscripcion (esto en el subject no ocurre) y permite recuperar el último valor con getValue() 

Para recibir lo que se emite con el metodo next() hay que estar suscripto y esta suscripción debe estar hecha antes
que el metodo next() emita. O sea, primero la suscrip y luego la emision. Por ej esto muestra el observable por consola

this.personas$.subscribe(respuesta => console.log(respuesta));

this.personas$.next('hola mundo');
pero esto no. Esto muestra a partir de la subscripcion
this.personas$.next('hola mundo');
this.personas$.subscribe(respuesta => console.log(respuesta));
El subject tambien permite subscribirse a si mismo.

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
  private personas$: Subject<Persona[]>  //declaración del subject que va a emitir un array de personas
  constructor() {
    this.personas = [];
    this.personas$ = new Subject();
  }

  addPersona(pPersona: Persona){
    this.personas.push(pPersona);   //ahora que se agregó una nueva persona y el array cambio, hay que enviarlo a quienes
                                    //estan escuchando o subscriptos con el metodo next. Luego falta crear un metodo para
                                    //que se puedan subscribir, ya que no es posible subscribirse al subject. El metodo
                                    //es getPersonas$
    this.personas$.next(this.personas);
  }

  getPersonas$(): Observable<Persona[]>{
    return this.personas$.asObservable(); //transformamos el subject personas$ en observable para que se puedan subscribir
  }
}
