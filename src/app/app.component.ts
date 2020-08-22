import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;
  suankiDil = 'Türkçe';
  ceviriYonu = 'Türkçe -> İspanyolca';

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().startsWith(filterValue));
  }

  dilDegistir() {
    if (this.suankiDil == 'Türkçe') {
      this.suankiDil = 'İspanyolca';
      this.ceviriYonu = ' İspanyolca -> Türkçe ';
    } else {
      this.suankiDil = 'Türkçe';
      this.ceviriYonu = ' Türkçe -> İspanyolca ';
    }
  }
}
