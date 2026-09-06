declare module 'react-native' {
  export interface TurboModule {}

  export namespace CodegenTypes {
    interface EventSubscription {
      remove(): void;
    }

    type EventEmitter<T> = (
      listener: (event: T) => void
    ) => EventSubscription;
  }

  export const TurboModuleRegistry: {
    get<T extends TurboModule>(name: string): T | null;
    getEnforcing<T extends TurboModule>(name: string): T;
  };
}
