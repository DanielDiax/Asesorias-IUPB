import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
const encryptionKey = 'SystemMic';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  setLocalStorage(
    idRows?: number,
    nombre?: string,
    segNombre?: string,
    apellido?: string,
    segApellido?: string,
    dni?: string,
    correoElectronico?: string,
    perfil?: number
  ) {
    let data = this.getLocalStorage();
    let newJson = {};
    if (data != null) {
      newJson = {
        idRows: idRows == null ? data.idRows : idRows,
        nombre: nombre == null ? data.nombre : nombre,
        segNombre: segNombre == null ? data.segNombre : segNombre,
        apellido: apellido == null ? data.apellido : apellido,
        segApellido: segApellido == null ? data.segApellido : segApellido,
        dni: dni == null ? data.dni : dni,
        correoElectronico:
          correoElectronico == null
            ? data.correoElectronico
            : correoElectronico,
        perfil: perfil == null ? data.perfil : perfil,
      };
    } else {
      newJson = {
        idRows: idRows,
        nombre: nombre,
        segNombre: segNombre,
        apellido: apellido,
        segApellido: segApellido,
        dni: dni,
        correoElectronico: correoElectronico,
        perfil: perfil,
      };
    }

    //Cifrado
    const plaintext = JSON.stringify(newJson);
    const encryptedData = CryptoJS.AES.encrypt(
      plaintext,
      encryptionKey
    ).toString();

    //Setear Localstorage
    localStorage.setItem('data', encryptedData);
  }

  getLocalStorage() {
    //descifrado
    if (localStorage.getItem('data') != null) {
      const decryptedBytes = CryptoJS.AES.decrypt(
        localStorage.getItem('data'),
        encryptionKey
      );
      const decryptedData = JSON.parse(
        decryptedBytes.toString(CryptoJS.enc.Utf8)
      );
      //console.log(decryptedData);
      return decryptedData;
    } else {
      return null;
    }
  }
}
