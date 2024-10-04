import { Day } from './Day';

import { SLOTS } from '../constants/data';

const DAYS = 28;
const MAX_EVENTS_IN_DAY = 5;

const days = Array.from({ length: DAYS }, (_, i) => i);

export default function Calendar() {
  //write your code here
  return (
    <div className="flex flex-col gap-2 mx-[20px] my-[12px]">
      <span className="font-bold text-[24px]">October, 2024</span>
      <div className="flex flex-wrap border-t border-l border-[#E5E5E5] border-solid h-full">
        {days.map((day, index) => (
          <div className="flex-[1_0_14%]" key={day} onMouseDown={() => handleMouseDown(day)}
               onMouseUp={() => handleMouseUp(day)} onMouseOver={() => handleMouseOver(day)}>
            <Day key={day} day={day} slots={SLOTS[index]} />
          </div>
        ))}
      </div>
    </div>
  );
}
