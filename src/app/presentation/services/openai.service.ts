import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { orthographyUseCase } from '../../core/use-cases/orthography/orthography.use-case';
import { prosConsUseCase } from '../../core/use-cases/pros-cons/pros-cons-use-case';
import { prosConsStreamUseCase } from '../../core/use-cases/pros-cons/pros-cons-stream-use-case';

@Injectable({providedIn: 'root'})
export class OpenAiServie {
  constructor() { }


  checkOrthography(prompt:string) {

      return from( orthographyUseCase(prompt)); // Usamos el from para trnasformar la Promise que tenemos en la funcion orthographyUseCase() a Observable

  }


  prosConsDiscusser(prompt:string) {

    return from( prosConsUseCase(prompt))
  }


  prosConsStreamDiscusser( prompt: string, abortSignal: AbortSignal ) {
    return prosConsStreamUseCase(prompt, abortSignal );
  }

}
