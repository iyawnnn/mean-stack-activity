import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent implements OnInit {
  title = 'booksapp';
  readonly APIUrl="http://localhost:5038/api/books/";

  constructor(private http:HttpClient){}

  books:any=[];
  editingBookId: string | null = null;

  ngOnInit(){
    this.refreshBooks();
  }

  refreshBooks(){
    this.http.get(this.APIUrl+'GetBooks').subscribe(data=>{
      this.books=data;
    })
  }

  addBook(){
    var newBook=(<HTMLInputElement>document.getElementById("newBook")).value;
    var newDesc=(<HTMLInputElement>document.getElementById("newDesc")).value;
    var newPrice=(<HTMLInputElement>document.getElementById("newPrice")).value;
    var newAuthor=(<HTMLInputElement>document.getElementById("newAuthor")).value;
    var newYear=(<HTMLInputElement>document.getElementById("newYear")).value;

    var formData=new FormData();
    formData.append("title", newBook);
    formData.append("description", newDesc);
    formData.append("price", newPrice.toString());
    formData.append("author", newAuthor);
    formData.append("year", newYear.toString());

    this.http.post(this.APIUrl+'AddBook', formData).subscribe(data=>{
      alert(data);
      this.refreshBooks();
    })
  }

  editBook(book: any) {
    this.editingBookId = book.id;
  }

  updateBook(id: string, title: string, desc: string, price: string, author: string, year: string) {
    var formData = new FormData();
    formData.append("id", id);
    formData.append("title", title);
    formData.append("description", desc);
    formData.append("price", price);
    formData.append("author", author);
    formData.append("year", year);

    this.http.put(this.APIUrl + 'UpdateBook', formData).subscribe(data => {
      alert(data);
      this.editingBookId = null;
      this.refreshBooks();
    });
  }

  deleteBook(id:any){
      this.http.delete(this.APIUrl+'DeleteBook?id='+id).subscribe(data=>{
      alert(data);
      this.refreshBooks();
    })
  }
}
