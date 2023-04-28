import React, { useState, useEffect } from 'react';
import {
  useNavigate, useParams,
} from 'react-router-dom';
import { xml2json } from 'xml-js';

import LeftBar from '../left-bar';
import SearchForm from './search-form';
import ResultChart from '../result-chart';

import './style.scss';

const PREFIX_CLASS = 'home-page';

export default function Homepage() {
  const [data, setData] = useState();
  const [resultTitle, setResultTitle] = useState({});
  const [countyOptionsData, setCountyOptionsData] = useState();
  const params = useParams();

  const navigate = useNavigate();

  const handleFetchCounty = () => {
    const apiUrl = 'https://api.nlsc.gov.tw/other/ListCounty';
    fetch(apiUrl)
      .then((response) => response.text())
      .then((xmlResponse) => {
        const jsonResponse = xml2json(xmlResponse, {
          compact: true,
          ignoreComment: true,
          ignoreDeclaration: true,
          alwaysChildren: true,
          textKey: 'text',
        });
        setCountyOptionsData(JSON.parse(jsonResponse).countyItems.countyItem);
      })
      .catch((error) => {
        console.log('Error: ', error);
      });
  };

  const handleSearch = (year, county, town) => {
    console.log('onsearch', year, county, town);
    const apiUrl = `https://www.ris.gov.tw/rs-opendata/api/v1/datastore/ODRP019/${year}?COUNTY=${county}&TOWN=${town}`;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((json) => {
        setResultTitle({
          year,
          county,
          town,
        });
        setData(json.responseData);
      });
    navigate(`/${year}/${county}/${town}`);
  };

  useEffect(() => {
    if (params?.year && params?.county && params.town) {
      handleSearch(params?.year, params?.county, params?.town);
    }
    handleFetchCounty();
  }, []);

  return (
    <div className={PREFIX_CLASS}>
      <div className={`${PREFIX_CLASS}__leftbar`}>
        <LeftBar />
      </div>

      <div className={`${PREFIX_CLASS}__page-content`}>
        <div>

          <div className={`${PREFIX_CLASS}__title`}>
            人口數、戶數按戶別及性別統計
          </div>
          <SearchForm
            onSearch={handleSearch}
            countyOptionsData={countyOptionsData}
          />
          <div className={`${PREFIX_CLASS}__divider`}>
            <div className={`${PREFIX_CLASS}__divider-text`}>
              搜尋結果
            </div>
          </div>
        </div>
        {data
          ? (
            <ResultChart
              populationTitle={`${resultTitle.year}年 ${resultTitle.county} ${resultTitle.town}`}
              rawData={data}
            />
          )
          : null}
      </div>
    </div>
  );
}
