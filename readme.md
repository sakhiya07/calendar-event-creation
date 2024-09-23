## Problem Name

Calendar Event Creation

## Problem Statement

<br>
<div style="border: 1px solid #ddd; border-radius: 5px; padding: 2px; display: inline-block;">
  <img src="https://github.com/sakhiya07/Assets/blob/main/assessments/calendar_event_creation.gif?raw=true" alt="Expected Behaviour" style="width: 400px; height: auto;"/>
</div>
<br>

Our application allows users to create events within a calendar. Each day on the calendar consists of five slots, and users can add up to five events to calendar. Users can click and drag across multiple dates to add an event that will appear in the same slot across all selected dates.


## Requirements

1. Only one event should be added per drag operation. On user hover during a drag operation, the user should receive visual feedback showing where the event will be placed across the selected dates, allowing for a clearer event creation experience.
2. The event should be finalized only when the user releases the mouse.
3. The added event should appear in the same slot across all selected dates in the range. The event should be added to the next available slot after the maximum occupied slot in the selected date range. For example, if the maximum occupied slot across the selected range is slot 2, the new event should be added to slot 3.
4. Events should be named as "Event 1," "Event 2," etc., in the order they are added.

## Instructions

1. Initially, the calendar has no events. Mock data has been provided in `src/constants/data` to give an idea of the structure and contract of the Day component.
2. Do not change in `Day` component.

## Submission Instructions

1. Clicking "Run code" will compile and run your code against sample tests, but it will not generate scores. Click on "Execution Log" to better understand the test execution.
2. Clicking "Submit code" will run your code against multiple test cases, assessing different scenarios holistically. The score will be assigned accordingly. To access the instructions, click on the "Question" button which can be found in the bottom left corner of the screen.