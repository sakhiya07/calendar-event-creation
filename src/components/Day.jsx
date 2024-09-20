export const Day = ({ day, events = [], isActive }) => {
  return (
    <div
      data-entityId={day}
      className="day flex-[1_0_14%] h-1/4 border-b border-r border-[#E5E5E5] border-solid select-none relative"
    >
      <div className="w-full flex pr-2">
        <span className="ml-auto font-semibold">{day}</span>
      </div>
      {isActive ? (
        <div className="w-full h-[15px] bg-[#51AAF2] mt-[4px] absolute bottom-[4px]"></div>
      ) : null}
      {events.length > 5 ? (
        <>
          {events.slice(0, 5).map((event) => (
            <div className="bg-[#D6EAFC] border-[1px] border-[solid] border-[#D6EAFC] m-[4px] rounded-[6px] text-center">
              {event}
            </div>
          ))}
          <div className="bg-[#D6EAFC] border-[1px] border-[solid] border-[#D6EAFC] m-[4px] rounded-[6px] text-center">{`+${
            events.length - 5
          } events`}</div>
        </>
      ) : (
        events.map((event) => (
          <div className="bg-[#D6EAFC] border-[1px] border-[solid] border-[#D6EAFC] m-[4px] rounded-[6px] text-center">
            {event}
          </div>
        ))
      )}
    </div>
  );
};
