export const Day = ({ day, slots }) => {
  return (
    <div
      data-entityid={day}
      className="day flex-[1_0_14%] h-1/4 border-b border-r border-[#E5E5E5] border-solid select-none relative"
    >
      <div className="w-full flex pr-2">
        <span className="ml-auto font-semibold">{day + 1}</span>
      </div>
      {slots.map((slot, index) =>
        slot === undefined ? (
          <div key={index} className="h-[30px]" />
        ) : (
          <div
            key={index}
            className="bg-[#D6EAFC] border-[1px] border-[solid] border-[#D6EAFC] mx-[4px] my-[2px] rounded-[6px] text-center"
          >
            {slot}
          </div>
        )
      )}
    </div>
  );
};
