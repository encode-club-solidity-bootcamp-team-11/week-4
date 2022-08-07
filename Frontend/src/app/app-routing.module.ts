import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NFTCollectionComponent } from './pages/nft_collection/nft_collection.component';

const routes: Routes = [
  {
    path: '',
    component: NFTCollectionComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
