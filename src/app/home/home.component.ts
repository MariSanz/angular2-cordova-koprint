import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private router:Router
  ) {
    //var sdCard: DirectoryEntry = cordova.file.externalRootDirectory;
    //sdCard.  

    

    
  }

  ngOnInit() {
  }


  public createOrder(): void{
    this.router.navigateByUrl('gallery');
  }

}
