import useMeasure from 'react-use/lib/useMeasure';

import Calendar from './components/Calendar';

export default function App() {
  const [containerRef, { width }] = useMeasure();

  return (
    <div className="App" ref={containerRef}>
      {width > 520 ? (
        <Calendar />
      ) : (
        <div className="flex justify-center items-center h-screen font-bold px-2 text-center">
          Please either expand the width of the preview component or open the
          preview in a new tab.
        </div>
      )}
    </div>
  );
}
