import { memo } from 'react';
import Search from './Search/Search';

import './Main.css';

const Main = memo(() => {
  return (
    <div className="main">
      <Search />
    </div>
  );
});

export default Main;
