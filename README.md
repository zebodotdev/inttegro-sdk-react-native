# Inttegro React Native

[API reference](https://react-native.inttegro.dev/v0.1.0/) ·
[Studio guide](https://studio.inttegro.com/sdks/react-native)

Typed React Native facade for Inttegro's native payment sheet. This is an
implementation spike and is not ready to publish or use with live payments.
The current collection surface supports mobile money; card, Apple Pay, and
Google Pay are not exposed.

```ts
import {
  addPaymentSheetEventListener,
  initializePaymentSheet,
  presentPaymentSheet,
} from '@inttegro/react-native';

const telemetrySubscription = addPaymentSheetEventListener((event) => {
  // Record this with your app-owned OpenTelemetry provider or logging sink.
  recordInttegroEvent(event);
});

await initializePaymentSheet({
  orderId,
  returnURL: 'merchant-app://inttegro-return',
  telemetry: activeTraceContext, // Optional { traceparent, tracestate }.
});

try {
  const result = await presentPaymentSheet();
} finally {
  telemetrySubscription.remove();
}
```

The TurboModule exchanges versioned JSON with the native iOS and Android
artifacts. The native implementations own presentation, accessibility,
authentication, payment collection, and lifecycle state; JavaScript only
validates the public input and decodes the result.

The event subscription receives ordered, per-presentation lifecycle and
Checkout network events from native code. Inttegro does not install or own an
exporter: the host decides whether to translate them into spans, logs, or other
diagnostics. Events contain bounded status and correlation metadata, never
Order or Payment IDs, customer or payer data, payment-method details, request or
response bodies, redirect URLs, or raw error messages. `flowId` and `requestId`
should not be used as metric labels. Subscribe before presenting the sheet so
the first event is not missed.

The package includes a Codegen-compatible TurboModule that delegates to the
same native `Inttegro` artifacts used by the Flutter SDK. CocoaPods links the
iOS artifact through `InttegroReactNative.podspec`, while Gradle resolves
`com.inttegro:inttegro-android:0.1.0`.

## Requirements

- React Native 0.82 or later with the New Architecture enabled
- iOS 16 or later
- Android API 26 or later

Install the package and rebuild the native application so Codegen and native
autolinking can run. Expo applications need a development build; Expo Go cannot
load this native module. If the app has not been rebuilt, calling the facade
produces a linking error without preventing the host app from starting.
