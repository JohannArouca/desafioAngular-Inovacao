import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../core/auth/auth.service';
import { TokenService } from '../core/token/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: any = FormGroup;
  visibility = 'hidden';
  fromUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(
      (params) => (this.fromUrl = params['fromUrl'])
    );

    this.loginForm = this.formBuilder.group({
      login: [''],
      password: [''],
    });
  }

  login() {
    event?.preventDefault();
    const login = this.loginForm.get('login').value;
    const password = this.loginForm.get('password').value;

    this.authService.authenticate(login, password).subscribe((res) => {
      const response: any = { ...res.body! };

      if (response.authenticated) {
        this.tokenService.setToken(response.accessToken);

        this.fromUrl
          ? this.router.navigateByUrl(this.fromUrl)
          : this.router.navigate(['products']);
      } else {
        this.visibility = 'visible';
      }
    });
  }
}
