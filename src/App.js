import { Routes, Route } from 'react-router-dom';
import { Calendar } from './components/Calendar';
import { Day } from './components/Day';
import { Event } from './components/Event';
import { Observer } from './components/Observer';
import { NoMatch } from './components/NoMatch';

export function App() {
  return (
    <div id="app">
      <Routes>
        <Route path="/" element={<Calendar />}>
          <Route path="/:day" element={<Day />}>
            <Route path="/:day/:num" element={<Event />} />
          </Route>
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
      <Observer />
    </div>
  );
}
