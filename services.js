import {decode as atob, encode as btoa} from 'base-64'

export function base64StringToNumberArray(str: string): Array<number> {
  var uint8_array = Uint8Array.from(atob(str), c => c.charCodeAt(0));
  var buffer = new ArrayBuffer(uint8_array.byteLength);
  new Uint8Array(buffer).set(uint8_array);
  return new Float64Array(buffer);
}

export function numberArrayToBase64String(arr: Array<number>): string {
  var buffer = new ArrayBuffer(arr.length*8);
  new Float64Array(buffer).set(arr);
  return btoa(String.fromCharCode.apply(null, new Uint8Array(buffer)));
}