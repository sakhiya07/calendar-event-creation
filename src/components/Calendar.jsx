import { Day } from './Day';

import { SLOTS } from '../constants/data';

const DAYS = 28;
const MAX_EVENTS_IN_DAY = 5;

const days = Array.from({ length: DAYS }, (_, i) => i);

export default function ChartContainer() {
  //write your code here
  return (
    <div className="m-[40px] flex flex-wrap border-t border-l border-[#E5E5E5] border-solid h-[calc(100vh-80px)]">
      {days.map((day, index) => (
        <Day key={day} day={day} slots={SLOTS[index]} />
      ))}
    </div>
  );
}
