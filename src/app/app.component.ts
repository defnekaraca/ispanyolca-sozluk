import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith, debounceTime } from 'rxjs/operators';
import { es2tr, tr2es } from './sozluk-veri';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  myControl = new FormControl();
  filteredOptions: Observable<string[]>;
  suankiDil = 'Türkçe';
  ceviriYonu = 'Türkçe -> İspanyolca';
  ceviri = '';
  secilenKelime = '';

  constructor(private _http: HttpClient) { }

  ngOnInit() {
    this.myControl.valueChanges.pipe(startWith(''), debounceTime(500)).subscribe(x => {
      console.log('value changesd: ', x);
      if (x != this.secilenKelime) {
        this._filter(x);
      }
    });
  }

  private _filter(value: string) {
    let from = 'es';
    if (this.ceviriYonu.startsWith('Türkçe')) {
      from = 'tr'
    }
    this.filteredOptions = this._http.get('http://localhost:3000/oneriler?q=' + value + '&from=' + from) as Observable<string[]>;
  }

  dilDegistir() {
    if (this.suankiDil == 'Türkçe') {
      this.suankiDil = 'İspanyolca';
      this.ceviriYonu = 'İspanyolca -> Türkçe';
    } else {
      this.suankiDil = 'Türkçe';
      this.ceviriYonu = 'Türkçe -> İspanyolca';
    }
  }

  kelimeSecildi(e) {
    const v = e.option.value;
    let f = 'es'
    if (this.suankiDil == 'Türkçe') {
      f = 'tr'
    }
    this.secilenKelime = v;

    this._http.get('http://localhost:3000/ceviri?q=' + v + '&from=' + f).subscribe(x => {
      this.ceviri = (x as string[]).join(', ');
    });
  }
}
