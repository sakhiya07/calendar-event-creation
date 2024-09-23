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

  simulateDrag(0, 27, getByTestId);
  simulateDrag(27, 0, getByTestId);

  for (let i = 0; i <= 27; i++) {
    const slot = getByTestId(`day-${i}`).querySelector(
      `[data-testid="slot-0"]`
    );
    expect(slot).toHaveTextContent('Event 1');
  }
  for (let i = 0; i <= 27; i++) {
    const slot = getByTestId(`day-${i}`).querySelector(
      `[data-testid="slot-1"]`
    );
    expect(slot).toHaveTextContent('Event 2');
  }
});

test('should correctly add multiple events across various days and slots', () => {
  const { getByTestId } = render(<Calendar />);
  simulateDrag(2, 5, getByTestId);
  for (let i = 2; i <= 5; i++) {
    const slot = getByTestId(`day-${i}`).querySelector(
      `[data-testid="slot-0"]`
    );
    expect(slot).toHaveTextContent('Event 1');
  }

  simulateDrag(1, 4, getByTestId);
  for (let i = 1; i <= 4; i++) {
    const slot = getByTestId(`day-${i}`).querySelector(
      `[data-testid="slot-1"]`
    );
    expect(slot).toHaveTextContent('Event 2');
  }

  simulateDrag(2, 4, getByTestId);
  for (let i = 2; i <= 3; i++) {
    const slot = getByTestId(`day-${i}`).querySelector(
      `[data-testid="slot-2"]`
    );
    expect(slot).toHaveTextContent('Event 3');
  }

  simulateDrag(1, 2, getByTestId);
  for (let i = 1; i <= 2; i++) {
    const slot = getByTestId(`day-${i}`).querySelector(
      `[data-testid="slot-3"]`
    );
    expect(slot).toHaveTextContent('Event 4');
  }

  simulateDrag(0, 1, getByTestId);
  for (let i = 0; i <= 1; i++) {
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

  const [day1Slot0, day1Slot1, day1Slot2] = getSlots(0, [0, 1, 2]);
  const [day2Slot1, day2Slot2] = getSlots(1, [1, 2]);
  const [day3Slot2] = getSlots(2, [2]);

  simulateDrag(1, 5, getByTestId); 
  simulateDrag(2, 3, getByTestId); 

  const startElement = getByTestId('day-0');
  fireEvent.mouseDown(startElement);

  fireEvent.mouseOver(startElement);
  expect(day1Slot0).toHaveTextContent('Event 3');

  const day2 = getByTestId('day-1');
  fireEvent.mouseOver(day2);
  expect(day1Slot0).toBeEmptyDOMElement();
  expect(day1Slot1).toHaveTextContent('Event 3');
  expect(day2Slot1).toHaveTextContent('Event 3');

  const day3 = getByTestId('day-2');
  fireEvent.mouseOver(day3);
  expect(day1Slot0).toBeEmptyDOMElement();
  expect(day1Slot1).toBeEmptyDOMElement();
  expect(day2Slot1).toBeEmptyDOMElement();
  expect(day1Slot2).toHaveTextContent('Event 3');
  expect(day2Slot2).toHaveTextContent('Event 3');
  expect(day3Slot2).toHaveTextContent('Event 3');
});
