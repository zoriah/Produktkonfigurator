import { Component, OnInit } from '@angular/core';
import { Hero } from "../hero";
import { HeroService } from "../hero-service/hero.service";

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
  //encapsulation: ViewEncapsulation.None
})
export class HeroesComponent implements OnInit {
  //selectedHero: Hero;
  
  heroes:Hero[];

  constructor(
    private heroService: HeroService
  ) { }

  /**
   *  this method will be called after the constructor
   *  done his job.
   */
  ngOnInit() {
    this.getHeroes();
  }
  
  getHeroes():void{
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
    //this.heroes = this.heroService.getHeroes();
  }

  /**
   * 
   * When the given name is non-blank, the handler creates a Hero-like object 
   * from the name (it's only missing the id) and passes it to the services addHero() method.
   * When addHero saves successfully, the subscribe callback receives the new hero and 
   * pushes it into to the heroes list for display.
   */
  add(name:string):void{
    name=name.trim();
    if(!name){
      return;
    }
    this.heroService.addHero({name} as Hero)
      .subscribe(hero=>{
        this.heroes.push(hero);
      });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }
/*
  onSelect(hero:Hero):void{
    if(this.selectedHero === undefined){
      this.selectedHero=hero;
    }else if(this.selectedHero === hero){
      this.selectedHero = undefined;
    }else{
      this.selectedHero = hero;
    }
  }*/
}
