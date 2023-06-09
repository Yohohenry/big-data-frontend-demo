import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { xml2json } from 'xml-js';
import {
  useParams,
} from 'react-router-dom';

import {
  FormControl,
  Button,
  Autocomplete,
  TextField,
} from '@mui/material';

import './style.scss';

const PREFIX_CLASS = 'search-form';

const years = [
  '106',
  '107',
  '108',
  '109',
  '110',
  '111',
];

const propTypes = {
  countyOptionsData: PropTypes.arr,
  onSearch: PropTypes.func,
};
const defaultProps = {
  countyOptionsData: [],
  onSearch: () => {},
};

function SearchForm({
  countyOptionsData,
  onSearch,
}) {
  const defaultParam = useParams();
  const [selectedYear, setSelectedYear] = useState(defaultParam?.years || '106');
  const [selectedCounty, setSelectedCounty] = useState(defaultParam?.county || null);
  const [selectedTown, setSelectedTown] = useState(defaultParam?.town || null);
  const [townOptions, setTownOptions] = useState([]);

  const countyOptions = countyOptionsData.map((county) => {
    const { countycode, countyname } = county;

    return {
      label: countyname.text,
      value: countycode.text,
    };
  });

  const handleFetchTown = useCallback((county) => {
    const apiUrl = `https://api.nlsc.gov.tw/other/ListTown1/${county?.value}`;
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
        const townOptionsData = JSON.parse(jsonResponse).townItems.townItem;

        setTownOptions(townOptionsData.map((town) => {
          const { towncode, townname } = town;

          return {
            label: townname.text,
            value: towncode.text,
          };
        }));
      })
      .catch((error) => {
        console.log('Error: ', error);
      });
  }, []);

  const handleSelectCounty = (newCountyValue) => {
    setSelectedCounty(newCountyValue);
    handleFetchTown(newCountyValue);
    setSelectedTown(null);
  };

  return (
    <div className={PREFIX_CLASS}>
      <FormControl sx={{ m: 1, minWidth: 74, minHeight: 40 }} size="small">
        <Autocomplete
          id="size-small-outlined"
          size="small"
          options={years}
          value={selectedYear}
          onChange={(event, newValue) => {
            setSelectedYear(newValue);
          }}
          renderInput={(params) => (
            <TextField {...params} label="年份" />
          )}
        />
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 165, minHeight: 40 }} size="small">
        <Autocomplete
          id="size-small-outlined"
          size="small"
          value={selectedCounty}
          options={countyOptions}
          onChange={(event, newValue) => {
            handleSelectCounty(newValue);
          }}
          renderInput={(params) => (
            <TextField {...params} label="縣/市" placeholder="請選擇 縣/市" />
          )}
        />
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 165 }} size="small">
        <Autocomplete
          id="size-small-outlined"
          size="small"
          value={selectedTown}
          options={townOptions}
          onChange={(event, newValue) => {
            setSelectedTown(newValue);
          }}
          disabled={!townOptions}
          renderInput={(params) => (
            <TextField {...params} label="區" placeholder="請選擇 區" />
          )}
        />
      </FormControl>
      <Button
        variant="contained"
        className={`${PREFIX_CLASS}__submit-button`}
        disabled={!selectedCounty || !selectedTown}
        onClick={() => onSearch(selectedYear, selectedCounty.label, selectedTown.label)}
      >
        SUBMIT
      </Button>
    </div>
  );
}

SearchForm.propTypes = propTypes;
SearchForm.defaultProps = defaultProps;

export default SearchForm;
