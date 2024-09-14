import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { loadStripe } from '@stripe/stripe-js';

@Component({
  selector: 'app-check-out',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf],
  templateUrl: './check-out.component.html',
  styleUrl: './check-out.component.scss'
})
export class CheckOutComponent {
isLoading:boolean=false;
  shippingAddress:FormGroup=new FormGroup({
    details: new FormControl(null,[Validators.required]),
  phone: new FormControl(null,[Validators.required]),
  city: new FormControl(null,[Validators.required]),

  })

  // paymentInputs:FormGroup=new FormGroup({
  //   nameOfCard: new FormControl(null,[Validators.required]),
  // cridetNumber: new FormControl(null,[Validators.required]),
  // erxpiration: new FormControl(null,[Validators.required]),
  // cvv: new FormControl(null,[Validators.required]),


  // })


handleSubmit(shippingAddress:FormGroup){
console.log(shippingAddress.value);

}

// handlePayment(paymentInputs:FormGroup){

//   console.log(paymentInputs.value);
  
// }

showInputs = false;

toggleInputs() {
  this.showInputs = !this.showInputs;
}

showPayment = false;

// togglePayment() {
//   this.showPayment = !this.showPayment;
// }
}

