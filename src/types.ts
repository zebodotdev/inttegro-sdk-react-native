export type HexColor = `#${string}`;

export interface PaymentSheetAppearance {
  primaryColor?: HexColor;
  backgroundColor?: HexColor;
  textColor?: HexColor;
  cornerRadius?: number;
}

export interface PaymentSheetTelemetry {
  enabled?: boolean;
  traceparent?: string;
  tracestate?: string;
}

export interface PaymentSheetConfiguration {
  orderId: string;
  returnURL?: string;
  appearance?: PaymentSheetAppearance;
  telemetry?: PaymentSheetTelemetry;
}

export type PaymentSheetResult =
  | { status: 'completed'; paymentId?: string }
  | { status: 'canceled' }
  | {
      status: 'failed';
      error: { code: string; message: string; declineCode?: string };
    };

export type PaymentSheetTelemetryEventName =
  | 'inttegro.payment_sheet.presented'
  | 'inttegro.checkout.load.started'
  | 'inttegro.checkout.load.succeeded'
  | 'inttegro.checkout.load.failed'
  | 'inttegro.payment.attempt.started'
  | 'inttegro.payment.attempt.failed'
  | 'inttegro.payment.confirmation.required'
  | 'inttegro.payment.authorization.required'
  | 'inttegro.payment.status.polling'
  | 'inttegro.payment_sheet.completed'
  | 'inttegro.payment_sheet.canceled'
  | 'inttegro.payment_sheet.failed'
  | 'inttegro.request.prepared'
  | 'inttegro.http.attempt.started'
  | 'inttegro.response.received'
  | 'inttegro.response.decoded'
  | 'inttegro.request.failed';

export interface PaymentSheetTelemetryEvent {
  flowId: string;
  sequence: number;
  name: PaymentSheetTelemetryEventName;
  timestamp: string;
  operation?:
    | 'checkout.lookup'
    | 'checkout.pay'
    | 'checkout.request_confirmation'
    | 'checkout.confirm_payment';
  httpStatusCode?: number;
  requestId?: string;
  errorType?: string;
}

export interface PaymentSheetEventSubscription {
  remove(): void;
}
