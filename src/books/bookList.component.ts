import { Component, OnInit , ViewChild, ElementRef} from '@angular/core' ;
import { Ibook } from './BookInterface' ;
import { BookListService }from './bookList.service';
import {Observable} from 'rxjs/Observable' ; 
import "rxjs/rx";
import 'rxjs/add/operator/map' ;
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
declare var $ : any;

@Component({
    moduleId : module.id,
    templateUrl : 'bookList.component.html'
})

export class BookListComponent implements OnInit{
     
     EDIT = false;
     params_arr : Ibook[] =[];
     selectedRow : number;
     books : Ibook[];
     update_record_index = 0 ;
     IsDataLoaded = false;
     update_record_id = 0;
     record_deleted = true;
   
    

     setSelectedRow(index : number):void{
         this.selectedRow=index ;
     }

     constructor(private bookListService : BookListService){
        this.getBooks(); 
     }
      
     ngOnInit(){
       
     }

     getBooks(){
       let source = this.bookListService.getListService()
        .subscribe( data =>{
            console.log(data);
            this.books = data;
            this.IsDataLoaded = true;
            // this.subscribeToData();
        })   
     }
    
    //  private subscribeToData(){
    //     Observable.timer(1000).first().subscribe(() => this.getBooks());
    // }

    onEdit(){
          this.EDIT = !this.EDIT;
    }

    getFormData(name,id,author,price){
        
        this.params_arr.push(id,name,author,price);
        console.log(this.params_arr);
       
   }
   
   addBook(name,id,author,price){
      this.getFormData(name,id,author,price);
      this.bookListService.addBookService(this.params_arr)
      .subscribe(result =>{
          console.log("Booklist component"+result);
          this.params_arr.splice(0);
      });
   }
   
   deleteBook(bookId,i){
       console.log("deleteBook invoked")
       this.bookListService.deleteBookService(bookId)
       .subscribe( result => {
           console.log(result);
           this.books.splice(i,1);
           this.record_deleted = true;
           
       })
   }

   updateRecordId(index,id){
      this.update_record_index = index;
      this.update_record_id = id;
      console.log("update index : "+this.update_record_index+" , update id"+this.update_record_id);
    }
  
   updateBook(name,id,author,price,old_id){

       let params_arr : Ibook[] =[];
       this.params_arr.push(id,name,author,price,old_id);
       console.log("update book invoked");
       this.bookListService.updateBookService(this.params_arr)
       .subscribe(result=>{
        console.log(result);
        this.params_arr.splice(0);
       })
   }


} 