import NativeInttegro from './NativeInttegro.js';
import {
  decodePaymentSheetTelemetryEvent,
  decodePaymentSheetResult,
  normalizeConfiguration,
  toPaymentSheetEvent,
} from './contract.js';
import type {
  PaymentSheetConfiguration,
  PaymentSheetEvent,
  PaymentSheetEventSubscription,
  PaymentSheetResult,
  PaymentSheetTelemetryEvent,
} from './types.js';

export type {
  HexColor,
  PaymentSheetAppearance,
  PaymentSheetConfiguration,
  PaymentSheetEvent,
  PaymentSheetEventType,
  PaymentSheetFeatures,
  PaymentSheetResult,
  PaymentSheetEventSubscription,
  PaymentSheetTelemetry,
  PaymentSheetTelemetryEvent,
  PaymentSheetTelemetryEventName,
} from './types.js';

/**
 * Validates and stores the configuration for the next payment-sheet
 * presentation. This does not perform the Checkout network request.
 */
export async function initializePaymentSheet(
  configuration: PaymentSheetConfiguration
): Promise<void> {
  const normalized = normalizeConfiguration(configuration);
  await getNativeInttegro().initializePaymentSheet(JSON.stringify(normalized));
}

/**
 * Opens the native payment sheet and resolves once with its terminal result.
 * Recoverable payment-attempt failures are handled inside the sheet and do not
 * resolve this promise.
 */
export async function presentPaymentSheet(): Promise<PaymentSheetResult> {
  return decodePaymentSheetResult(
    await getNativeInttegro().presentPaymentSheet()
  );
}

/**
 * Observes typed payment lifecycle transitions for application behavior.
 * Subscribe before presenting the sheet and remove the subscription afterward.
 */
export function addPaymentSheetEventListener(
  listener: (event: PaymentSheetEvent) => void
): PaymentSheetEventSubscription {
  return getNativeInttegro().onPaymentSheetEvent((payload) => {
    const event = toPaymentSheetEvent(
      decodePaymentSheetTelemetryEvent(payload)
    );
    if (event) listener(event);
  });
}

/**
 * Observes privacy-safe transport diagnostics for an application-owned
 * telemetry pipeline. These events are not authoritative payment state.
 */
export function addPaymentSheetTelemetryListener(
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
