import { GenericResponseModel } from 'models/response/generic.response.model';
import { CrudServiceService } from './../backend/cruds/crud-service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, AfterViewChecked, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TokenStorageService } from '../storage-services/token-storage.service';
import { Router } from '@angular/router';
import { ChangePasswordComponent } from 'app/usercomponents/change-password/change-password.component';
import { NotificationModel } from 'models/entities/notification-model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements AfterViewChecked, OnInit {
  currentLang = 'en';
  toggleClass = 'ft-maximize';
  placement = 'bottom-right'
  public isCollapsed = true;
  public activo = false;
  public correoUsuario: String;
  public typeSuscription;
  public notifications: Array<NotificationModel> = new Array();


  constructor(public translate: TranslateService,
    private crudServicesCtrl: CrudServiceService,
    private router: Router,
    public token: TokenStorageService,
    private modalService: NgbModal
  ) 
  {
    const browserLang: string = translate.getBrowserLang();
    translate.use(browserLang.match(/en|es|pt|de/) ? browserLang : 'en');
  }

  ngOnInit() {
    this.islogin();
    this.correoUsuario = this.token.getUsername();
  }

  readAll() {
    this.crudServicesCtrl.putModelParams('notificacion/notificar-apertura-todos', {}, {}).subscribe(
      (genericResponse: GenericResponseModel) => {
        if (genericResponse.code === 200) {
          this.notifications = new Array();
        }
      }, (error) => {
        console.error(error);
      }
    )
  }

  async readNotification(notification: NotificationModel) {
    this.crudServicesCtrl.putModelParams('notificacion/notificar-apertura', {}, {
      notificationId: notification.id
    }).subscribe(
      (genericResponse: GenericResponseModel) => {
        if (genericResponse.code === 200) {
          const index = this.notifications.indexOf(notification, 0);
          if (index > -1) {
            this.notifications.splice(index, 1);
          }
          this.goTo(notification.path);
        }
      }, (error) => {
        console.error(error);
      }
    )
  }

  goTo(path) {
    this.router.navigateByUrl(path);
  }

  ngAfterViewChecked() {

  }

  // Método para desloguear al usuario.
  logOut() {
    this.token.signOut();
    this.router.navigate(['pages/auth']);
  }

  changePassword() {
    const modalRef = this.modalService.open(ChangePasswordComponent, {
      windowClass: 'modal', size: 'lg', backdrop: 'static'
    });
  }

  redirectToLogin() {
    this.router.navigate(['pages/auth']);
  }


  ChangeLanguage(language: string) {
    this.translate.use(language);
  }

  ToggleClass() {
    if (this.toggleClass === 'ft-maximize') {
      this.toggleClass = 'ft-minimize';
    } else {
      this.toggleClass = 'ft-maximize'
    }
  }

  islogin() {
    if (this.token.getToken()) {
      this.activo = false;
      if (this.token.getAuthorities() === 'ROL_SUPER') {
       // this.consultNotifications();
      }
    } else {
      this.activo = true;
    }
  }

  closeWindow() {
    this.modalService.dismissAll();
  }
}
