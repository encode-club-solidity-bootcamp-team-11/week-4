import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-nft-collection',
  templateUrl: './nft_collection.component.html',
  styleUrls: ['./nft_collection.component.scss']
})
export class NFTCollectionComponent implements OnInit {
  nftCollection: {name: string; image: string; description: string; external_url: string;}[] = [];

  constructor(
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.apiService.getNFTCollection().subscribe((res) => {
      this.nftCollection = res;
    });
  }
}
