import { Component, inject, signal } from '@angular/core';
import { GifsListComponent } from "../../components/gifs-list/gifs-list.component";
import { GifsService } from '../../services/gifs/gifs.service';
import { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  imports: [GifsListComponent],
})
export default class SearchPageComponent {

  gifsService = inject(GifsService);
  gifs = signal<Gif[]>([]);
  onSearch(query: string){
    this.gifsService.searchGifs(query).subscribe((resp) => {
      this.gifs.set(resp);
    });
  }

}
