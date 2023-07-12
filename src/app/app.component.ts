import { KeyValuePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ComponentFactory, ComponentFactoryResolver, OnInit, OnDestroy, ViewChild, ViewContainerRef } from '@angular/core';
import { map, filter, tap, delay } from 'rxjs/operators'
import { BehaviorSubject, from, Observable, of, Subject } from 'rxjs';
import {  mergeMap, flatMap, concatMap, switchMap, exhaustMap } from 'rxjs/operators';
import { HttpSrvService } from './http-srv.service';
import { AlertComponent } from './alert/alert.component';
import { Productstore } from './model/productstore.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [KeyValuePipe]
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'cssPre';

   subjectTest = new Subject();
   behaviorSubjectTest = new BehaviorSubject(null);
   productStor = [];
   company:Productstore[] = [];
  // for dynamic component starts here 

   @ViewChild('alertContainer',{read: ViewContainerRef}) container; 

  // for dynamic component ends here
   employees = [  
    { id: 11, name: 'Ravishankar' },  
    { id: 12, name: 'Muthu' },  
    { id: 13, name: 'Mani' },  
    { id: 14, name: 'Ajith' }  
   ];  

   products = [
    {
        "productImage": "carousel2.jpg",
        "imageIndex": 1,
        "imageType": "carousel",
        "imageTitle": "Swipe. select. enjoy.",
    },
    {
        "productImage": "dna1_en_US.jpg",
        "imageIndex": 1,
        "imageType": "dna",
        "imageTitle": "Swipe. select. enjoy.",
    },
    {
        "productImage": "carousel3.jpg",
        "imageIndex": 2,
        "imageType": "carousel",
         "imageTitle": "Swipe. select. enjoy.",
    },
    {
        "productImage": "dna2_en_US.jpg",
        "imageIndex": 2,
        "imageType": "dna",
         "imageTitle": "Swipe. select. enjoy.",
    },
    {
        "productImage": "carousel5.jpg",
        "imageIndex": 3,
        "imageType": "carousel",
        "imageTitle": "Swipe. select. enjoy.",
    }  
 ]

  constructor(private http: HttpClient,private httpService:HttpSrvService,
    private keyValue: KeyValuePipe, private componentResolver:ComponentFactoryResolver,
    ) {
      let nEm = JSON.stringify(this.employees);
      console.log(nEm);
      let nEm1 = JSON.parse(nEm);
      console.log(nEm1);
    }

    $dogsBreed(): Observable<any> {
      return this.http.get<any>("https://dog.ceo/api/breeds/list/all")
    }

    getDogsBreed() {
      this.$dogsBreed().pipe(map(data =>{
        var dogs = this.keyValue.transform(data.message)
        console.log(dogs)
      })).subscribe();
    }

    getDogsBreeterrier(){
      this.$dogsBreed().pipe(map(dat =>{
        console.log("terrier::--",dat.message.terrier);
      })).subscribe();
    }

    getDogsBreeterrierWithsubscribe(){
      this.$dogsBreed().subscribe((res)=>{
        console.log("RESULT::--",res.message.hound);
      });
    }

    getDogsBreedWithfilter(){
      let resWithfilter = this.$dogsBreed().pipe(filter(res => res));
      resWithfilter.subscribe((data)=>{
        console.log("resWithfilter::",data.message.pointer);
      })
    }
    ngOnInit(): void {
      this.getProducts();
      this.getDogsBreed();
      this.getDogsBreeterrier();
      this.getDogsBreeterrierWithsubscribe();
      this.getDogsBreedWithfilter();
      //getDogsBreeterrier();
      // pipe example
      const ob$: Observable<number> = of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10).pipe(map( v => v * 10));

      ob$.subscribe((next)=>{
        console.log("Next::",next);
      })

      const obs:Observable<number> = of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10).pipe(filter(v => v % 2 === 0), map(v => v * 10));

      obs.subscribe((nextFilMap)=>{
        console.log("nextFilMap::",nextFilMap);
      });
      let employeeId = this.employees.map(item => item.id);
      console.log("employeeId::--",employeeId);
      // WITH FILTER
      let prdt1 = this.products.filter((item)=>{
        return item.imageType === "carousel"
      });
      
      console.log(prdt1);
      
      //WITH FIND

      let findElement = this.products.find((v) => v.imageIndex === 2);
      console.log("findElement::-",findElement);

      // with map 
      let newProduct = this.products.map((item)=>{
        return {
          productImage: item.productImage,
          imageType: item.imageType,
          imageTitle: item.imageTitle
        }
      });
      console.log("newProduct$::--",newProduct);

      this.httpService.getTodos().pipe(
        map((res:any)=>
          res.map((data)=>{
            return {
              UNIKID: data.id,
              COMPLETEDSTATUS: data.completed,
              SUBTITLE: data.title,
            };
            //return data.id === 60
          })
          //console.log(res);
        )
      ).subscribe((data1)=>{
        console.log(data1);
      });
    }

    getProducts(){
      this.httpService.getStoreProducts().subscribe((result)=>{
        this.productStor = result;
        this.company = result.filter((resItem)=>{
          return resItem.company === "ikea";
        });
        console.log("GET FILTERED COMPANY FROM API:::===",this.company);
      })
    }
    prepairOrder(order){
      const delayTime = Math.floor(Math.random() * 1000) + 1;
      return of(`I'm ${order} I'M ready after ${delayTime} ms`).pipe(
        delay(delayTime)
      )
    }
    MergeMap(){
      const orders = from(['order 1','order 2','order 3','order 4']);
      orders.pipe(mergeMap((order) => this.prepairOrder(order))).subscribe((v)=> console.log(v));
    }

    SwitchMap(){
      const orders = from(['order 1','order 2','order 3','order 4','order 7']);
      orders.pipe(switchMap((order) => this.prepairOrder(order))).subscribe((v)=> console.log(v));
    }

    ConcathMap(){
      const orders = from(['order 1','order 2','order 3','order 4','order 6']);
      orders.pipe(concatMap((order) => this.prepairOrder(order))).subscribe((v)=> console.log(v));
    }

    exhaustMap(){
      const orders = from(['order 1','order 2','order 3','order 4','order 7']);
      orders.pipe(exhaustMap((order) => this.prepairOrder(order))).subscribe((v)=> console.log(v));
    }

    // code for subject
    subjectcall(){
      this.subjectTest.next(1); //Subjects will not output this value

      this.subjectTest.subscribe({
        next: (sub) => console.log('observerASub: ' + sub)
      });
      this.subjectTest.subscribe({
        next: (sub) => console.log('observerBsub: ' + sub)
      });

      this.subjectTest.next(2);
      this.subjectTest.next(3);
      // const subject = new Subject();
      // subject.next(1);
      // subject.subscribe(x => console.log(x));
    } 
    // code for subject ends

    // code for behavioursub
    behavioursubjectcall(){
      this.behaviorSubjectTest.subscribe(
        (v) => console.log('observerA: ' + v)  // output initial value, then new values on `next` triggers
    );
    
    this.behaviorSubjectTest.next(1);  // output new value 1 for 'observer A'
    this.behaviorSubjectTest.next(2);  // output new value 2 for 'observer A', current value 2 for 'Observer B' on subscription
    
    this.behaviorSubjectTest.subscribe(
      (v) => console.log('observerB: ' + v)  // output current value 2, then new values on `next` triggers
    );
    
     this.behaviorSubjectTest.next(3);
    }

    // code for behavioursub ends
    // code for multicasting code starts

    // multicasted(){
    //   var source = from([1, 2, 3]);
    //   var sub1 = new Subject();
    //   var multicasted = source.
    // }
    // code for multicasting code ends
    // code for dynamic component starts here 

    createComponent(type){
      console.log(type);
      this.container.clear();
      const factory: ComponentFactory<any> = this.componentResolver.resolveComponentFactory(AlertComponent);
      this.container.createComponent(factory);
    }

    // code for dynamic component ends here

    ngOnDestroy(): void {
      //this.componentRef.destroy();
    }
}
