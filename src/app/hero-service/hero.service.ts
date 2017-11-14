import { Injectable } from '@angular/core';
import { Hero } from "../hero";
import { HEROES } from "../heroes/mock-heroes";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable } from "rxjs/Rx";
import { of } from "rxjs/observable/of";  // Achtung observable nicht Observable!!!
import { catchError, map, tap } from "rxjs/operators";

import { MessageService } from "../message-service/message.service";

/**
 * By defining constants outside the class scope, this variable
 * will be avalible without this operator.
 * 
 * The heroes web API expects a special header in HTTP save requests. 
 */
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class HeroService {  

  private heroesUrl='api/heroes';  

  constructor(
    private messageService:MessageService,
    private http:HttpClient
  ) { }

  private log(message:string){
    this.messageService.add('HeroService: '+message);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
  */
  private handleError<T> (operation = 'operation', result?: T) {


    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /**
   * All HttpClient methods return an RxJS Observable of something.
   * 
   * Section where all CRUD Operation are listed.
   */
  getHeroes (): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(heroes=>this.log(`fetched heroes`)),
        catchError(this.handleError('getHeroes', []))
      );
    }
  
  getHero(id:number):Observable<Hero> {
    const url=`${this.heroesUrl}/${id}`;

    // Todo: send the message _after_ fetching the hero
    return this.http.get<Hero>(url).pipe(
      tap(_=>this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  addHero(hero:Hero):Observable<Hero>{
    return this.http.post<Hero>(this.heroesUrl, hero, httpOptions)
      .pipe(
        tap((hero:Hero)=>this.log(`added hero w/ id=${hero.id}`)),
        catchError(this.handleError<Hero>('addHero'))
      );
  }

  updateHero(hero:Hero):Observable<any>{
    return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
      tap(_=>this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  deleteHero(hero:Hero|number):Observable<Hero>{
    const id=typeof hero==='number'?hero:hero.id;
    const url=`${this.heroesUrl}/${id}`;
    
    return this.http.delete<Hero>(url, httpOptions).pipe(
      tap(_=>this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  searchHeroes(term:string):Observable<Hero[]>{
    if(!term.trim()){
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`)
      .pipe(
        tap(_=>this.log(`found heroes matching "${term}"`)),
        catchError(this.handleError<Hero[]>('searchHeroes', []))
      );
  }
}
