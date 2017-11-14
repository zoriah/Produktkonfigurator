import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';

import {
  debounceTime, 
  distinctUntilChanged, 
  switchMap} from 'rxjs/operators';

  import { Hero } from '../hero';
  import { HeroService } from '../hero-service/hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css'],
  //encapsulation: ViewEncapsulation.None
})
export class HeroSearchComponent implements OnInit {

  heroes$:Observable<Hero[]>;
  private searchTerms=new Subject<string>();

  constructor(
    private heroService:HeroService
  ) { }

  // Pushing a search term into the observable stream
  search(term:string):void{
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    // Remember that the component class does not subscribe to the heroes$ observable. 
    // That's the job of the AsyncPipe in the template.
    this.heroes$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),
 
      // ignore new term if same as previous term
      distinctUntilChanged(),
 
      // switch to new search observable each time the term changes
      switchMap((term: string) => this.heroService.searchHeroes(term)),
    );
  }

}
