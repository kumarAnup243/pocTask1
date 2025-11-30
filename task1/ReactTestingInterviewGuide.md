# React Testing Library & Jest Interview Guide

This guide covers the essential concepts, common patterns, and interview questions for testing React applications using **Jest** and **React Testing Library (RTL)**.

---

## 1. Core Philosophies

### React Testing Library (RTL)
- **"The more your tests resemble the way your software is used, the more confidence they can give you."**
- Focuses on testing **behavior** from the user's perspective, not implementation details (like internal state).
- **DO:** Query elements by accessibility roles (buttons, headings) or text.
- **DON'T:** Query by CSS classes or IDs (unless absolutely necessary).

### Jest
- The test runner and assertion library.
- Provides `describe`, `test` (or `it`), `expect`, and mocking capabilities.

---

## 2. Basic Anatomy of a Test

```javascript
import { render, screen } from '@testing-library/react';
import MyComponent from './MyComponent';

test('renders the correct content', () => {
  // 1. Render the component
  render(<MyComponent />);
  
  // 2. Query the DOM (Find elements)
  const element = screen.getByText(/hello world/i);
  
  // 3. Assert (Check expectations)
  expect(element).toBeInTheDocument();
});
```

---

## 3. Querying Elements (`screen`)

There are 3 main types of queries, differing in how they handle finding (or not finding) elements.

| Type | Returns | Throws Error? | Async? | Use Case |
| :--- | :--- | :--- | :--- | :--- |
| **getBy...** | Node | **YES** (if not found or >1 found) | No | Standard query. Use when element *should* be there. |
| **queryBy...** | Node or `null` | **NO** (returns `null` if not found) | No | Use to assert an element is **NOT** present. |
| **findBy...** | Promise<Node> | **YES** (after timeout) | **YES** | Use for elements that appear **asynchronously** (e.g., after API call). |

### Priority of Queries (Best Practices)
1.  `getByRole` (Most accessible: `button`, `heading`, `textbox`, etc.)
2.  `getByLabelText` (Good for form inputs)
3.  `getByPlaceholderText`
4.  `getByText` (Good for non-interactive text)
5.  `getByTestId` (Last resort! Add `data-testid` to your HTML)

---

## 4. User Interactions (`user-event`)

Always prefer `user-event` over `fireEvent` because it simulates full user interactions (focus, blur, key presses) more accurately.

```javascript
import userEvent from '@testing-library/user-event';

test('submits form', async () => {
  const user = userEvent.setup();
  render(<MyForm />);
  
  const input = screen.getByRole('textbox');
  const button = screen.getByRole('button', { name: /submit/i });
  
  // ALL user-event actions are async!
  await user.type(input, 'Hello');
  await user.click(button);
});
```

---

## 5. Asynchronous Testing

When waiting for UI updates (like data fetching), use `findBy` or `waitFor`.

### Using `findBy` (Preferred for single elements)
```javascript
// Waits up to 1000ms (default) for element to appear
const successMessage = await screen.findByText(/success/i);
expect(successMessage).toBeInTheDocument();
```

### Using `waitFor` (For multiple assertions or non-existence)
```javascript
import { waitFor } from '@testing-library/react';

await waitFor(() => {
  expect(mockApi).toHaveBeenCalledTimes(1);
});
```

---

## 6. Mocking

### Mocking Functions (Callbacks)
```javascript
const mockHandler = jest.fn();
render(<Button onClick={mockHandler} />);
await user.click(screen.getByRole('button'));
expect(mockHandler).toHaveBeenCalledTimes(1);
```

### Mocking Modules / API Calls
Use `jest.mock` to mock entire modules or `global.fetch`.

```javascript
// Mocking global fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ data: 'fake data' }),
  })
);

// Clean up after tests
afterEach(() => {
  jest.clearAllMocks();
});
```

---

## 7. Common Interview Questions

**Q: What is the difference between `shallow` (Enzyme) and `render` (RTL)?**
A: `shallow` renders only the component, not its children. `render` in RTL renders the full tree. RTL encourages full rendering to test integration and real user behavior, avoiding implementation detail reliance.

**Q: How do you test a component that fetches data in `useEffect`?**
A: Mock the API call (e.g., `fetch` or axios), render the component, and use `await screen.findBy...` to wait for the data to appear on the screen.

**Q: When should I use `act()`?**
A: RTL wraps most helpers (render, fireEvent, userEvent) in `act` automatically. You mostly need it when testing timers or complex state updates that RTL doesn't catch automatically. If you see an "act" warning, it usually means you are asserting something before an update has finished processing (use `waitFor` or `findBy` to fix it).

**Q: How to debug a failing test?**
A: Use `screen.debug()` to print the current DOM state to the console.

---

## 8. Cheat Sheet Summary

- **Render**: `render(<App />)`
- **Debug**: `screen.debug()`
- **Click**: `await user.click(element)`
- **Type**: `await user.type(element, 'text')`
- **Find (Sync)**: `screen.getByRole('button', { name: /submit/i })`
- **Find (Async)**: `await screen.findByText(/loaded/i)`
- **Check Existence**: `expect(element).toBeInTheDocument()`
- **Check Absence**: `expect(screen.queryByText(/hidden/i)).not.toBeInTheDocument()`
