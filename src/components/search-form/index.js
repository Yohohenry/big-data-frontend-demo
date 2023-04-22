import React from 'react';

import './style.scss';

const PREFIX_CLASS = 'search-form';

export default function SearchForm() {
  return (
    <div>
      <div className={`${PREFIX_CLASS}__title`}>
        人口數、戶數按戶別及性別統計
      </div>
    </div>
  );
}
