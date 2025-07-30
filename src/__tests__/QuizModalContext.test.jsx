import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QuizModalProvider, useQuizModal } from '../components/QuizModalContext';

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(() => {
  console.error.mockRestore();
});

function TestComponent() {
  const { openQuiz, closeQuiz } = useQuizModal();
  return (
    <div>
      <button onClick={() => openQuiz('code-overhaul')}>Open Quiz</button>
      <button onClick={closeQuiz}>Close Quiz</button>
    </div>
  );
}

test('openQuiz shows modal and closeQuiz hides it', async () => {
  render(
    <QuizModalProvider>
      <TestComponent />
    </QuizModalProvider>
  );

  await userEvent.click(screen.getByText('Open Quiz'));

  // Modal should appear
  await waitFor(() => {
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  await userEvent.click(screen.getByText('Close Quiz'));

  await waitFor(() => {
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
