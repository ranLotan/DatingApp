import { Component, NgModule } from '@angular/core';
import { FormBuilder, FormGroup, Validators ,ReactiveFormsModule  } from '@angular/forms';
import { AppModule } from '../../app.module';

// import { CartService } from '../cart.service';

@Component({
  // standalone: true,
  selector: 'add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
  // imports: [AppModule]
})

export class AddUserComponent {
  // userForm!: FormGroup;
  constructor(
    private formBuilder :FormBuilder,
  ){}

  ngOnInit(): void {
  //   this.userForm = this.formBuilder.group({
  //     username: ['', Validators.required, Validators.minLength(3)]
  //   });
  }

  public onSubmit(): void {
    console.log("new user Name submitted");
  }
}
