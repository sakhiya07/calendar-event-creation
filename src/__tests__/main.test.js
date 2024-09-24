import Calendar from '../components/Calendar';

import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

const simulateDrag = (startDay, endDay, getByTestId) => {
  const startElement = getByTestId(`day-${startDay}`);
  fireEvent.mouseDown(startElement);

  if (startDay > endDay) {
    for (let i = startDay; i >= endDay; i--) {
      const element = getByTestId(`day-${i}`);
      fireEvent.mouseOver(element);
    }
  } else {
    for (let i = startDay; i <= endDay; i++) {
      const element = getByTestId(`day-${i}`);
      fireEvent.mouseOver(element);
    }
  }

  const endElement = getByTestId(`day-${endDay}`);
  fireEvent.mouseUp(endElement);
};

test('should add Event 1 in slot 1 and Event 2 in slot 2 for days 1 to 28', () => {
  const { getByTestId } = render(<Calendar />);

  simulateDrag(0, 26, getByTestId);
  simulateDrag(26, 0, getByTestId);

  for (let i = 0; i <= 26; i++) {
    const slot = getByTestId(`day-${i}`).querySelector(
      `[data-testid="slot-0"]`
    );
    expect(slot).toHaveTextContent('Event 1');
  }
  for (let i = 0; i <= 26; i++) {
    const slot = getByTestId(`day-${i}`).querySelector(
      `[data-testid="slot-1"]`
    );
    expect(slot).toHaveTextContent('Event 2');
  }
  const day27slot0 = getByTestId('day-27').querySelector(
    `[data-testid="slot-0"]`
  );
  const day27slot1 = getByTestId('day-27').querySelector(
    `[data-testid="slot-1"]`
  );
  expect(day27slot0).toBeEmptyDOMElement();
  expect(day27slot1).toBeEmptyDOMElement();
});

test('should correctly add multiple events across various days and slots', () => {
  const { getByTestId } = render(<Calendar />);
  simulateDrag(3, 6, getByTestId);
  for (let i = 3; i <= 6; i++) {
    const slot = getByTestId(`day-${i}`).querySelector(
      `[data-testid="slot-0"]`
    );
    expect(slot).toHaveTextContent('Event 1');
  }

  simulateDrag(2, 5, getByTestId);
  for (let i = 2; i <= 5; i++) {
    const slot = getByTestId(`day-${i}`).querySelector(
      `[data-testid="slot-1"]`
    );
    expect(slot).toHaveTextContent('Event 2');
  }

  simulateDrag(3, 5, getByTestId);
  for (let i = 3; i <= 5; i++) {
    const slot = getByTestId(`day-${i}`).querySelector(
      `[data-testid="slot-2"]`
    );
    expect(slot).toHaveTextContent('Event 3');
  }

  simulateDrag(2, 3, getByTestId);
  for (let i = 2; i <= 3; i++) {
    const slot = getByTestId(`day-${i}`).querySelector(
      `[data-testid="slot-3"]`
    );
    expect(slot).toHaveTextContent('Event 4');
  }

  simulateDrag(1, 2, getByTestId);
  for (let i = 1; i <= 2; i++) {
    const slot = getByTestId(`day-${i}`).querySelector(
      `[data-testid="slot-4"]`
    );
    expect(slot).toHaveTextContent('Event 5');
  }
});

test('should provide live feedback when hovering over days with existing events', () => {
  const { getByTestId } = render(<Calendar />);

  const getSlots = (dayIndex, slotIndices) => {
    return slotIndices.map((slotIndex) =>
      getByTestId(`day-${dayIndex}`).querySelector(
        `[data-testid="slot-${slotIndex}"]`
      )
    );
  };

  const [day1Slot0, day1Slot1, day1Slot2] = getSlots(1, [0, 1, 2]);
  const [day2Slot1, day2Slot2] = getSlots(2, [1, 2]);
  const [day3Slot2] = getSlots(3, [2]);

  simulateDrag(2, 6, getByTestId);
  simulateDrag(3, 4, getByTestId);

  const startElement = getByTestId('day-1');
  fireEvent.mouseDown(startElement);

  fireEvent.mouseOver(startElement);
  expect(day1Slot0).toHaveTextContent('Event 3');

  const day2 = getByTestId('day-2');
  fireEvent.mouseOver(day2);
  expect(day1Slot0).toBeEmptyDOMElement();
  expect(day1Slot1).toHaveTextContent('Event 3');
  expect(day2Slot1).toHaveTextContent('Event 3');

  const day3 = getByTestId('day-3');
  fireEvent.mouseOver(day3);
  expect(day1Slot0).toBeEmptyDOMElement();
  expect(day1Slot1).toBeEmptyDOMElement();
  expect(day2Slot1).toBeEmptyDOMElement();
  expect(day1Slot2).toHaveTextContent('Event 3');
  expect(day2Slot2).toHaveTextContent('Event 3');
  expect(day3Slot2).toHaveTextContent('Event 3');
});
