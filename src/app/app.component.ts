import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { es2tr, tr2es } from './sozluk-veri';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  myControl = new FormControl();
  options: string[] = [];
  filteredOptions: Observable<string[]>;
  suankiDil = 'Türkçe';
  ceviriYonu = 'Türkçe -> İspanyolca';
  ceviri = '';

  ngOnInit() {
    this.setOptions();
  }

  private setOptions() {
    if (this.ceviriYonu.startsWith('Türkçe')) {
      this.options = Object.keys(tr2es);
    } else {
      this.options = Object.keys(es2tr);
    }
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
      this.ceviriYonu = 'İspanyolca -> Türkçe';
    } else {
      this.suankiDil = 'Türkçe';
      this.ceviriYonu = 'Türkçe -> İspanyolca';
    }
    this.setOptions();
  }

  kelimeSecildi(e) {
    const v = e.option.value;
    if (this.suankiDil == 'Türkçe') {
      this.ceviri = tr2es[v].join(', ');  
    } else {
      this.ceviri = es2tr[v].join(', ');
    }
  }
}
