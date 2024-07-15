export enum LoginSteps {
  email,
  otp,
}

export enum PaymentCallbackParams {
  deliveryDate = 'delivery-date',
  orderNumber = 'order-number',
  deliveryStart = 'delivery-start',
  deliveryEnd = 'delivery-end',
}

export enum PaymentStatusEnum {
  Succeeded = 'payment.succeeded',
  Processing = 'payment.processing',
  RequiresPaymentMethod = 'payment.requiresPaymentMethod',
  Failed = 'payment.failed',
  Unknown = 'payment.unknownStatus',
}
