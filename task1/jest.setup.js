import '@testing-library/jest-dom';

// Polyfills required by react-router and other libs in Jest environment
import { TextEncoder, TextDecoder } from 'node:util';

if (!global.TextEncoder) {
  // @ts-ignore
  global.TextEncoder = TextEncoder;
}

if (!global.TextDecoder) {
  // @ts-ignore
  global.TextDecoder = TextDecoder;
}
