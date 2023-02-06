import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  searchTerm = '';

  // Sets the search term.
  // private signifies that router is available throughout the entire SearchComponent class rather than in only this constructor.
  constructor(activatedRoute: ActivatedRoute, private router: Router) {
    activatedRoute.params.subscribe((params) => {
      if (params.searchTerm) this.searchTerm = params.searchTerm;
    });
  }

  // Navigates to the url route using the given term.
  // void means this method does not return anything.
  search(term: string): void {
    if (term) this.router.navigateByUrl('/search/' + term);
  }
}
