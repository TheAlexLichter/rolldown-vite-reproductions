enum LoggingLevel {
  /** No logs are logged to the console. */
  none = 0,
  /** Most logs except for socket logs are logged to the console. */
  regular = 1,
  /** All logs are logged to the console, including all traffic on the WebSocket. */
  verbose = 2,
}

class Logger {
  public static loggingLevel = LoggingLevel.none;
}

class SettingsStore {
  /** Whether logging is enabled. */
  @Setting(LoggingLevel.regular, value => {
    Logger.loggingLevel = value;
  })
  public loggingLevel: LoggingLevel | undefined;

  public constructor() {
    console.log("SettingsStore constructor");
    this.browserPersistedSettings = JSON.parse(localStorage.getItem("globalSettings") || "{}");
    for (const key in this.browserPersistedSettings || {}) {
      // @ts-expect-error - This is a valid key, even if TypeScript doesn't know it
      this[key] = this.browserPersistedSettings[key as keyof SettingsStore];
    }
  }

  // - Private interface

  private browserPersistedSettings: Partial<SettingsStore>;
}

// tslint:disable:no-invalid-this
function Setting<T>(defaultValue: T, callback?: (value: T) => void) {
  return (target: SettingsStore, key: string) => {
    Object.defineProperty(target, key, {
      get: function () {
        return this.browserPersistedSettings[key] !== undefined ? this.browserPersistedSettings[key] : defaultValue;
      },
      set: function (value: T) {
        // crash is here as constructor never ran
        this.browserPersistedSettings[key] = value;
        if (callback) {
          callback(value);
        }
      },
      enumerable: true,
      configurable: true,
    });

    if (callback) {
      callback(defaultValue);
    }
  };
}

// Constructor is not called
const settings = new SettingsStore();

// Crashes with Uncaught TypeError: Cannot set properties of undefined (setting 'loggingLevel')
settings.loggingLevel = LoggingLevel.verbose;

console.log("Logger.loggingLevel", Logger.loggingLevel);

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    Works and did not crash if you see this
  </div>
`