import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// Shim Vite's import.meta.env for Jest tests.
global.importMeta = { env: {} };

import ChatBot from '../components/ChatBot.jsx';

describe('ChatBot', () => {
  beforeAll(() => {
    // JSDOM does not implement scrollIntoView; stub it to avoid errors from effects.
    if (!HTMLElement.prototype.scrollIntoView) {
      // eslint-disable-next-line no-extend-native
      HTMLElement.prototype.scrollIntoView = jest.fn();
    }
  });

  beforeEach(() => {
    jest.resetAllMocks();
    // JSDOM provides a window/document, but we ensure fetch is defined.
    global.fetch = jest.fn();
  });

  test('sends a message to the assistant API and renders the reply', async () => {
    const replyText = 'Hello from the assistant';

    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => ({ reply: replyText }),
    });

    render(<ChatBot defaultOpen />);

    const input = screen.getByPlaceholderText(/type your message/i);

    await userEvent.type(input, 'Hello there');
    await userEvent.click(screen.getByRole('button', { name: /send/i }));

    // Verify fetch was called with the expected URL and payload
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    const [url, options] = global.fetch.mock.calls[0];
    // With no assistant URL env set, ChatBot falls back to http://localhost:4000
    expect(url).toBe('http://localhost:4000/api/chat');
    expect(options.method).toBe('POST');
    expect(options.headers).toEqual({ 'Content-Type': 'application/json' });

    const body = JSON.parse(options.body);
    expect(body).toHaveProperty('message', 'Hello there');
    expect(body).toHaveProperty('context');
    expect(body.context).toHaveProperty('source', 'raven-demo-website');

    // The assistant reply should eventually appear in the chat transcript.
    expect(await screen.findByText(replyText)).toBeInTheDocument();
  });

  test('shows a fallback message when the assistant API is unreachable', async () => {
    global.fetch.mockRejectedValue(new Error('Network error'));

    render(<ChatBot defaultOpen />);

    const input = screen.getByPlaceholderText(/type your message/i);

    await userEvent.type(input, 'Test connectivity');
    await userEvent.click(screen.getByRole('button', { name: /send/i }));

    const fallbackText =
      "I'm having trouble reaching my assistant server right now, but I can still share general information from the site.";

    expect(await screen.findByText(fallbackText)).toBeInTheDocument();
  });
});
