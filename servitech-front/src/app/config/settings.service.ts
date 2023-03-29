import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../pages';
@Injectable({
  providedIn: 'root'
})
export class SettingsService {

constructor(
  public snack: MatSnackBar
) { }

public viewsnack(message, action, duration?) {
  this.snack.openFromComponent(SnackbarComponent, {
    duration: duration || 3000,
    horizontalPosition: 'right',
    panelClass: ['snackbar'],
    //verticalPosition: 'top',
    data: { message: message, snackType: action}
  });
}

public async onSetTheme(){
    if(!localStorage.getItem('theme')){
      localStorage.setItem('theme', 'false');
    }

    let body = await document.getElementsByTagName("body")[0]
    let navbar = await document.getElementsByClassName('navbar')[0];
    let background_Navbar = await document.createAttribute("style");

    if(!JSON.parse(localStorage.getItem('theme'))){
      await body.classList.remove("dark-theme");
      await body.classList.add("light-theme");
      background_Navbar.value = "background-color:#3f51b5";
    }else{
      await body.classList.remove("light-theme");
      await body.classList.add("dark-theme");
      background_Navbar.value = "background-color:#1c1d26";
    }

    await navbar.setAttributeNode(background_Navbar);
}

}
