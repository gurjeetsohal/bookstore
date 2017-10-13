import { Component, OnInit } from '@angular/core' ;
import { Ibook } from './BookInterface' ;
import { BookListService }from './bookList.service';

@Component({
    moduleId : module.id,
    templateUrl : 'bookList.component.html'
})

export class BookListComponent implements OnInit{
     
     EDIT = false;
     params : Ibook[] =[];
     selectedRow : number;
     books : Ibook[];
    //  books : Ibook[] =[
    //      { name : "xyz" ,
    //        author :" xyz",
    //        id : 1 ,
    //        price :100
    //     },
    //     { name : "xyz" ,
    //        author :" xyz",
    //        id : 1 ,
    //        price :100
    //     },
    //     { name : "xyz" ,
    //        author :" xyz",
    //        id : 1 ,
    //        price :100
    //     },
    //     { name : "xyz" ,
    //        author :" xyz",
    //        id : 1 ,
    //        price :100
    //     }
    //  ]

     setSelectedRow(index : number):void{
         this.selectedRow=index ;
     }

     constructor(private bookListService : BookListService){
                this.bookListService.getLists()
                .subscribe( data =>{
                    console.log(data);
                    this.books = data;
                })           
     }

     ngOnInit(){
        
     }

    onEdit(){
          this.EDIT = !this.EDIT;
    }

    getFormData(name,id,author,price){
        
        this.params.push(name,id,author,price);
        console.log(this.params);
        this.params.splice(0);
   }
   
   addBook(name,id,author,price){
      this.getFormData(name,id,author,price);
      this.bookListService.addBookService(this.params)
      .subscribe(result =>{
          console.log(result);
      });
   }

} 