import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { es2tr, tr2es } from './sozluk-veri';
import { HttpClient } from '@angular/common/http';

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

  constructor(private _http: HttpClient) { }

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
    this._http.get('http://localhost:3000/oneriler?q=Ho&from=es').subscribe(x => {
      console.log('oneriler sonucu: ', x);
    })
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
