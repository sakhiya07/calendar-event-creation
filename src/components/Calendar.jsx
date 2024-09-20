import { Day } from './Day';

import { useState, useCallback } from 'react';

const days = Array.from({ length: 28 }, (_, i) => i + 1);

export default function ChartContainer() {
  const [events, setEvents] = useState({});
  const [startIndex, setStartIndex] = useState(undefined);
  const [activeIndex, setActiveIndex] = useState(undefined);

  const handleMouseDown = useCallback((event) => {
    setStartIndex(Number(event.target.closest('.day')?.dataset.entityid));
  }, []);

  const handleMouseOver = useCallback((event) => {
    setActiveIndex(Number(event.target.closest('.day')?.dataset.entityid));
  }, []);

  const handleMouseUp = useCallback(
    (event) => {
      const endIndex = Number(event.target.closest('.day')?.dataset.entityid);

      setEvents((prevEvents) => ({
        ...prevEvents,
        [`Event: ${Object.keys(prevEvents).length + 1}`]:
          startIndex < endIndex
            ? [startIndex, endIndex]
            : [endIndex, startIndex],
      }));
      setStartIndex(undefined);
      setActiveIndex(undefined);
    },
    [startIndex]
  );

  const smallIndex = startIndex < activeIndex ? startIndex : activeIndex;
  const bigIndex = startIndex < activeIndex ? activeIndex : startIndex;

  return (
    <div
      className="m-[40px] flex flex-wrap border-t border-l border-[#E5E5E5] border-solid h-[calc(100vh-80px)]"
      onMouseDown={handleMouseDown}
      onMouseOver={handleMouseOver}
      onMouseUp={handleMouseUp}
    >
      {days.map((day) => (
        <Day
          key={day}
          day={day}
          isActive={smallIndex <= day && day <= bigIndex}
          events={Object.keys(events).filter(
            (item) => events[item][0] <= day && day <= events[item][1]
          )}
        />
      ))}
    </div>
  );
}
