import { Injectable } from '@angular/core';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class InfoMessagesService {
  public message: string;
  public type: string;

  constructor() { }

  getInfoMessageError() {
    swal({
      title: 'Error en el servidor',
      text: 'Ocurrio un problema durante la operación',
      type: 'error',
      confirmButtonText: 'Cerrar'
    });
  }

  getInfoMessageCreate(): Promise<any> {
    return swal({
      title: 'Correcto',
      text: 'Registro correcto',
      type: 'success',
      confirmButtonText: 'Cerrar'
    })
  }

  getInfoMessageDelete(): Promise<any> {
    return swal({
      title: 'Correcto',
      text: 'Registro eliminado',
      type: 'success',
      confirmButtonText: 'Cerrar'
    });
  }

  getInfoMessageUpdate(): Promise<any> {
    return swal({
      title: 'Correcto',
      text: 'Registro actualizado',
      type: 'success',
      confirmButtonText: 'Cerrar'
    });
  }

  getInfoMessageBadInternet() {
    return swal({
      title: 'Problemas de conexion',
      text: 'Ha ocurrido un problema con su conexión, por favor revisa tu conexión a internet',
      type: 'warning',
      confirmButtonText: 'Cerrar'
    });
  }

  getInfoMessagePersonalized(typeMessage, message, titleMessage) {
    return swal({
      title: titleMessage,
      text: message,
      type: typeMessage,
      confirmButtonText: 'Cerrar'
    });
  }
}
