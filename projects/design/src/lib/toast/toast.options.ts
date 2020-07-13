export interface ToastOptions {
  text: string;
  type: ToastType;
}

export enum ToastType {
  'SUCCESS' = 'success',
  'ERROR' = 'error',
  'DEFAULT' = 'default',
}
