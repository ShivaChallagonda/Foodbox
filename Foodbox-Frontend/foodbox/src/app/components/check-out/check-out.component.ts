import { Component, OnInit } from "@angular/core";
import { CartService } from "src/app/services/cart.service";
import { User } from "src/app/common/user";
import { LoginService } from "src/app/services/login.service";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: "app-check-out",
  templateUrl: "./check-out.component.html",
  styleUrls: ["./check-out.component.css"],
})
export class CheckOutComponent implements OnInit {
  checkoutFormGroup: FormGroup;

  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.reviewCartDetails();

    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [""],
        lastName: [""],
        email: [""],
      }),

      shippingAddress: this.formBuilder.group({
        street: [""],
        city: [""],
        state: [""],
        country: [""],
        zipCode: [""],
      }),

      billingAddress: this.formBuilder.group({
        street: [""],
        city: [""],
        state: [""],
        country: [""],
        zipCode: [""],
      }),

      creditCard: this.formBuilder.group({
        cardType: [""],
        nameonCard: [""],
        cardNumber: [""],
        securityCode: [""],
        expirationMonth: [""],
        expirationYear: [""],
      }),
    });
  }
  reviewCartDetails() {
    this.cartService.totalQuantity.subscribe(
      (totalQuantity) => (this.totalQuantity = totalQuantity)
    );

    this.cartService.totalPrice.subscribe(
      (totalPrice) => (this.totalPrice = totalPrice)
    );
  }

  copyShippingAddressToBillingAddress(event) {
    if (event.target.checked) {
      this.checkoutFormGroup.controls.billingAddress.setValue(
        this.checkoutFormGroup.controls.shippingAddress.value
      );
    } else {
      this.checkoutFormGroup.controls.billingAddress.reset();
    }
  }

  onSubmit() {
    console.log(this.checkoutFormGroup.get("customer").value);
    console.log(this.checkoutFormGroup.get("shippingAddress").value);
    console.log(this.checkoutFormGroup.get("billingAddress").value);
  }
}
