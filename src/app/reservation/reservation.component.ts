import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Constants } from '../shared/constants.ts/globalConstants';
import { CustomerContactData } from 'src/app/shared/interfaces/customer-contact-details.interface';


@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css'],
})
export class ReservationComponent implements OnInit {
  public reservationForm: FormGroup;
  public suitOptions: string[] = Constants.roomSuits;
  public extraFacilities: string[];
  public paymentOptions: string[] = Constants.paymentOptions;
  public tagNames: string[];
  public addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  constructor(@Inject(MAT_DIALOG_DATA) private data: CustomerContactData) { }

  ngOnInit() {
    this.formIntialize();
    this.extraFacilities = this.data.extras;
    const paymentMethod = this.data.payment;
    if (paymentMethod === 'cc' || paymentMethod === 'credit card') {
      this.data.payment = 'Credit Card';
    } else if (paymentMethod === 'cash') {
      this.data.payment = 'Cash';
    }
    this.tagNames = this.data.tags;
    this.reservationForm.patchValue(this.data);
  }

  public formIntialize() {
    this.reservationForm = new FormGroup({
      stay: new FormGroup({
        arrivalDate: new FormControl(''),
        departureDate: new FormControl(''),
      }),
      room: new FormGroup({
        roomSize: new FormControl(''),
        roomQuantity: new FormControl(''),
      }),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl(''),
      addressStreet: new FormGroup({
        streetName: new FormControl(''),
        streetNumber: new FormControl(''),
      }),
      addressLocation: new FormGroup({
        zipCode: new FormControl(''),
        state: new FormControl(''),
        city: new FormControl(''),
      }),
      extras: new FormControl(''),
      payment: new FormControl(''),
      note: new FormControl(''),
      tags: new FormControl(''),
      reminder: new FormControl(''),
      newsletter: new FormControl(''),
      confirm: new FormControl(''),
    });
  }

  public add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.tagNames.push(value);
    }
    event.chipInput!.clear();
  }

  public remove(tag: string): void {
    const index = this.tagNames.indexOf(tag);

    if (index >= 0) {
      this.tagNames.splice(index, 1);
    }
  }

  public edit(tag: string, event: MatChipEditedEvent) {
    const value = event.value.trim();
    if (!value) {
      this.remove(tag);
      return;
    }
    const index = this.tagNames.indexOf(tag);
    if (index > 0) {
      this.tagNames[index] = value;
    }
  }

}
