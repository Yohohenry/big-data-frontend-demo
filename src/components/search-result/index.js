import React from 'react';

import './style.scss';

const PREFIX_CLASS = 'search-result';

export default function SearchResult() {
  return (
    <div className={PREFIX_CLASS}>
      <div className={`${PREFIX_CLASS}__divider`}>
        搜尋結果
      </div>
    </div>
  );
}
