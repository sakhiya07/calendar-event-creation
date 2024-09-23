import { Day } from './Day';
import { useState, useCallback } from 'react';

const DAYS = 28;
const MAX_EVENTS_IN_DAY = 5;

const days = Array.from({ length: DAYS }, (_, i) => i);
const SLOTS = Array.from({ length: DAYS }, () =>
  Array(MAX_EVENTS_IN_DAY).fill(undefined)
);

export default function ChartContainer() {
  const [dayWiseSlots, setDayWiseSlots] = useState(SLOTS);
  const [startIndex, setStartIndex] = useState(undefined);
  const [eventCount, setEventCount] = useState(0);
  const [hoveredRange, setHoveredRange] = useState([]);

  const handleMouseDown = useCallback((event) => {
    const index = Number(event.target.closest('.day')?.dataset.entityid);
    setStartIndex(index);
  }, []);

  const handleMouseOver = useCallback(
    (event) => {
      if (startIndex === undefined) return;
      const activeIndex = Number(
        event.target.closest('.day')?.dataset.entityid
      );

      if (activeIndex !== undefined) {
        const range = [startIndex, activeIndex].sort((a, b) => a - b);

        let selectedDays = dayWiseSlots.slice(range[0], range[1] + 1);
        let commonSlotIndex = 0;

        selectedDays.forEach((slots) => {
          let eventExist = false;
          let availableSlot = MAX_EVENTS_IN_DAY;
          for (let i = MAX_EVENTS_IN_DAY - 1; i >= 0; i--) {
            if (
              (slots[i] === undefined ||
                slots[i] === `Event ${eventCount + 1}`) &&
              !eventExist
            ) {
              availableSlot = i;
            } else if (slots[i]) {
              eventExist = true;
            }
          }
          commonSlotIndex = Math.max(commonSlotIndex, availableSlot);
        });

        if (commonSlotIndex < MAX_EVENTS_IN_DAY) {
          const updatedSlots = dayWiseSlots.map((slots, i) => {
            if (i >= range[0] && i <= range[1]) {
              return slots.map((slot, i) =>
                i === commonSlotIndex
                  ? `Event ${eventCount + 1}`
                  : slot === `Event ${eventCount + 1}`
                  ? undefined
                  : slot
              );
            }
            return slots.map((slot) =>
              slot === `Event ${eventCount + 1}` ? undefined : slot
            );
          });

          setDayWiseSlots(updatedSlots);

          setHoveredRange([range[0], range[1]]);
        }
      }
    },
    [startIndex, dayWiseSlots, eventCount]
  );

  const handleMouseUp = useCallback(() => {
    if (hoveredRange.length) {
      setEventCount((prevCount) => prevCount + 1);
      setStartIndex(undefined);
      setHoveredRange([]);
    }
  }, [hoveredRange]);

  return (
    <div
      className="m-[40px] flex flex-wrap border-t border-l border-[#E5E5E5] border-solid h-[calc(100vh-80px)]"
      onMouseDown={handleMouseDown}
      onMouseOver={handleMouseOver}
      onMouseUp={handleMouseUp}
    >
      {days.map((day, index) => (
        <Day key={day} day={day} slots={dayWiseSlots[index]} />
      ))}
    </div>
  );
}
