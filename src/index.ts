import NativeInttegro from './NativeInttegro.js';
import {
  decodePaymentSheetTelemetryEvent,
  decodePaymentSheetResult,
  normalizeConfiguration,
} from './contract.js';
import type {
  PaymentSheetConfiguration,
  PaymentSheetEventSubscription,
  PaymentSheetResult,
  PaymentSheetTelemetryEvent,
} from './types.js';

export type {
  HexColor,
  PaymentSheetAppearance,
  PaymentSheetConfiguration,
  PaymentSheetResult,
  PaymentSheetEventSubscription,
  PaymentSheetTelemetry,
  PaymentSheetTelemetryEvent,
  PaymentSheetTelemetryEventName,
} from './types.js';

export async function initializePaymentSheet(
  configuration: PaymentSheetConfiguration
): Promise<void> {
  const normalized = normalizeConfiguration(configuration);
  await getNativeInttegro().initializePaymentSheet(JSON.stringify(normalized));
}

export async function presentPaymentSheet(): Promise<PaymentSheetResult> {
  return decodePaymentSheetResult(
    await getNativeInttegro().presentPaymentSheet()
  );
}

export function addPaymentSheetEventListener(
  listener: (event: PaymentSheetTelemetryEvent) => void
): PaymentSheetEventSubscription {
  return getNativeInttegro().onPaymentSheetEvent((payload) => {
    listener(decodePaymentSheetTelemetryEvent(payload));
  });
}

function getNativeInttegro() {
  if (!NativeInttegro) {
    throw new Error(
      'The Inttegro native module is not linked. Rebuild the application after installing the Inttegro SDK.'
    );
  }
  return NativeInttegro;
}
