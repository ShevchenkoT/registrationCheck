import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiRequestService } from './api-request.service';
export interface Car {
  body: string,
  capacity: number,
  color: string,
  date: string,
  dep: string,
  depСode: number,
  id: number,
  kind: string,
  model: string,
  number: string,
  ownWeight: number,
  ownerHash: string,
  regAddrKoatuu: number,
  registration: string,
  year: number,
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ApiRequestService]
})
export class AppComponent implements OnInit {
  form!: FormGroup

  carData!: Car | null;
  isBlocked = false;
  errorMessage = '';
  constructor(private apiRequest: ApiRequestService) {
    this.form = new FormGroup({
      num: new FormControl(null, [Validators.required, Validators.maxLength(8), Validators.minLength(8)])
    })
  }


  ngOnInit(): void {

  }

  check() {
    if (this.form.invalid) return;
    this.errorMessage = ''
    this.isBlocked = true;
    this.carData = null;

    const num = this.form.value.num;

    this.apiRequest.getData(num).subscribe((carData) => {
      this.carData = carData;
    },
      e => {
        this.errorMessage = 'Авто з таким номером не знайдено'
        this.isBlocked = false;
      },
      () => this.isBlocked = false)
  }

  filter({ target: { value } }: any) {
    let val = value.toUpperCase().split('').filter((l: string) => l !== ' ');
    if (val.length > 8) val.length = 8;
    this.form.get('num')?.setValue(val.join(''));
  }
}
