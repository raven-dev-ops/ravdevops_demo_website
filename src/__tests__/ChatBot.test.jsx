import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act as reactAct } from 'react';
import ChatBot, { CHAT_STATE_STORAGE_KEY } from '../components/ChatBot.jsx';
import { getOfflineReply } from '../utils/offlineResponder';

jest.mock('../utils/offlineResponder', () => ({
  getOfflineReply: jest.fn(() => null),
}));

// Silence ReactDOMTestUtils.act deprecation by delegating to React.act.
jest.mock('react-dom/test-utils', () => {
  const actual = jest.requireActual('react-dom/test-utils');
  const react = jest.requireActual('react');
  return { ...actual, act: react.act };
});

const actAsync = async (cb) => reactAct(async () => cb());

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
    window.localStorage.clear();
    document.cookie = '';
    getOfflineReply.mockReturnValue(null);
  });

  test('sends a message to the assistant API and renders the reply', async () => {
    const replyText = 'Hello from the assistant';

    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => ({ reply: replyText, mode: 'live' }),
    });

    await actAsync(() => render(<ChatBot defaultOpen />));

    const input = screen.getByPlaceholderText(/type your message/i);

    await actAsync(() => userEvent.type(input, 'Hello there'));
    await actAsync(() => userEvent.click(screen.getByRole('button', { name: /send/i })));

    // Verify fetch was called with the expected URL and payload
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    const [url, options] = global.fetch.mock.calls[0];
    expect(url).toBe('https://chat-assistant-backend-gw-3j4dip0k.uc.gateway.dev/api/chat');
    expect(options.method).toBe('POST');
    expect(options.headers).toEqual({ 'Content-Type': 'application/json' });

    const body = JSON.parse(options.body);
    expect(body).toHaveProperty('message', 'Hello there');
    expect(body).toHaveProperty('context');
    expect(body.context).toHaveProperty('source', 'raven-demo-website');
    expect(body.context).toHaveProperty('chatUserId');
    expect(body).toHaveProperty('chatUserId', body.context.chatUserId);
    expect(body).not.toHaveProperty('sessionId');

    await waitFor(() => expect(screen.getByText('LIVE')).toBeInTheDocument());
    // The assistant reply should eventually appear in the chat transcript.
    expect(await screen.findByText(replyText)).toBeInTheDocument();
  });

  test('persists sessionId returned by the backend across turns', async () => {
    global.fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ reply: 'First reply', mode: 'live', sessionId: 'session-123' }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ reply: 'Follow up', mode: 'live' }),
      });

    await actAsync(() => render(<ChatBot defaultOpen />));

    const input = screen.getByPlaceholderText(/type your message/i);

    await actAsync(() => userEvent.type(input, 'Hello there'));
    await actAsync(() => userEvent.click(screen.getByRole('button', { name: /send/i })));

    // Wait for the first reply so the sessionId is stored before the next turn.
    await screen.findByText('First reply');

    await actAsync(() => userEvent.type(input, 'How about now?'));
    await actAsync(() => userEvent.click(screen.getByRole('button', { name: /send/i })));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(2);
    });

    const [, options] = global.fetch.mock.calls[1];
    const body = JSON.parse(options.body);
    expect(body).toHaveProperty('sessionId', 'session-123');
  });

  test('shows an Offline badge when the assistant reports offline mode', async () => {
    const replyText = 'Cached knowledge base reply';

    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => ({ reply: replyText, mode: 'offline' }),
    });

    await actAsync(() => render(<ChatBot defaultOpen />));

    const input = screen.getByPlaceholderText(/type your message/i);

    await actAsync(() => userEvent.type(input, 'Are you online?'));
    await actAsync(() => userEvent.click(screen.getByRole('button', { name: /send/i })));

    expect(await screen.findByText('OFFLINE')).toBeInTheDocument();
    expect(await screen.findByText(replyText)).toBeInTheDocument();
  });

  test('quick reply drops a Calendly link without calling the API', async () => {
    await actAsync(() => render(<ChatBot defaultOpen />));

    const calendlyButton = await screen.findByRole('button', { name: /calendly link/i });

    await actAsync(() => userEvent.click(calendlyButton));

    expect(global.fetch).not.toHaveBeenCalled();
    expect(await screen.findByText(/calendly\.com\/ravdevops\/discovery-meeting/i)).toBeInTheDocument();
  });

  test('inline quick replies render and respond without hitting the API', async () => {
    await actAsync(() => render(<ChatBot defaultOpen />));

    expect(await screen.findByRole('button', { name: /email us/i })).toBeInTheDocument();
    expect(await screen.findByRole('button', { name: /pricing page/i })).toBeInTheDocument();

    const emailButton = await screen.findByRole('button', { name: /email us/i });

    await actAsync(() => userEvent.click(emailButton));

    expect(global.fetch).not.toHaveBeenCalled();
    expect(await screen.findByText(/business@ravdevops\.com/i)).toBeInTheDocument();
  });

  test('uses a conversational offline reply instead of a wall of text', async () => {
    getOfflineReply.mockReturnValueOnce('Here is a short offline answer about our services.');

    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => ({
        reply: 'This is a very long fallback payload that should be replaced',
        mode: 'offline',
      }),
    });

    await actAsync(() => render(<ChatBot defaultOpen />));

    const input = screen.getByPlaceholderText(/type your message/i);

    await actAsync(() => userEvent.type(input, 'What services do you offer?'));
    await actAsync(() => userEvent.click(screen.getByRole('button', { name: /send/i })));

    expect(await screen.findByText('OFFLINE')).toBeInTheDocument();
    expect(await screen.findByText(/short offline answer/i)).toBeInTheDocument();
    expect(screen.queryByText(/very long fallback payload/i)).not.toBeInTheDocument();
  });

  test('shows a fallback message when the assistant API is unreachable', async () => {
    global.fetch.mockRejectedValue(new Error('Network error'));

    await actAsync(() => render(<ChatBot defaultOpen />));

    const input = screen.getByPlaceholderText(/type your message/i);

    await actAsync(() => userEvent.type(input, 'Test connectivity'));
    await actAsync(() => userEvent.click(screen.getByRole('button', { name: /send/i })));

    const fallbackText =
      "I can still help out—tell me what you're looking for (services, pricing, or how to reach us) and I'll share details.";

    expect(await screen.findByText('OFFLINE')).toBeInTheDocument();
    expect(await screen.findByText(fallbackText)).toBeInTheDocument();
  });

  test('restores a stored sessionId and transcript on remount', async () => {
    const savedState = {
      messages: [
        {
          id: 'saved-1',
          role: 'bot',
          text: 'Earlier reply from Raven.',
          timestamp: new Date().toISOString(),
        },
      ],
      sessionId: 'session-stored',
      mode: 'live',
    };

    window.localStorage.setItem(CHAT_STATE_STORAGE_KEY, JSON.stringify(savedState));

    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => ({ reply: 'Follow up from live API', mode: 'live' }),
    });

    await actAsync(() => render(<ChatBot defaultOpen />));

    const input = screen.getByPlaceholderText(/type your message/i);

    await actAsync(() => userEvent.type(input, 'Can you pick up the thread?'));
    await actAsync(() => userEvent.click(screen.getByRole('button', { name: /send/i })));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    const [, options] = global.fetch.mock.calls[0];
    const body = JSON.parse(options.body);

    expect(body).toHaveProperty('sessionId', 'session-stored');
    expect(screen.getByText(/earlier reply from raven/i)).toBeInTheDocument();
  });
});
