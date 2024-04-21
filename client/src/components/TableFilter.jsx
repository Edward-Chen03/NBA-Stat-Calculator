import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function TableFilter(props) {
  const options = filterChoices.sort((a, b) => {
    // First, compare by tag
    const tagComparison = a.tag.localeCompare(b.tag);
    if (tagComparison !== 0) {
      return tagComparison;
    }
    // If tags are the same, compare by name
    return a.name.localeCompare(b.name);
  });

  return (
    <Autocomplete
      id="grouped-demo"
      options={options}
      groupBy={(option) => option.tag}
      getOptionLabel={(option) => option.name}
      sx={{ width: 300 }}
      onChange={(event, value) => props.setFilter(prev => ({
        ...prev,
        [props.id] : value,
      }))}
      renderInput={(params) => <TextField {...params} label={props.label} />}
    />
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const filterChoices = [
  { name: "ATL", tag: "team"},
  { name: "BOS", tag: "team"},
  { name: "BKN", tag: "team"},
  { name: "CHA", tag: "team"},
  { name: "CHI", tag: "team"},
  { name: "CLE", tag: "team"},
  { name: "DAL", tag: "team"},
  { name: "DEN", tag: "team"},
  { name: "DET", tag: "team"},
  { name: "GSW", tag: "team"},
  { name: "HOU", tag: "team"},
  { name: "IND", tag: "team"},
  { name: "LAC", tag: "team"},
  { name: "LAL", tag: "team"},
  { name: "MEM", tag: "team"},
  { name: "MIA", tag: "team"},
  { name: "MIL", tag: "team"},
  { name: "MIN", tag: "team"},
  { name: "NOP", tag: "team"},
  { name: "NYK", tag: "team"},
  { name: "OKC", tag: "team"},
  { name: "ORL", tag: "team"},
  { name: "PHI", tag: "team"},
  { name: "PHX", tag: "team"},
  { name: "POR", tag: "team"},
  { name: "SAC", tag: "team"},
  { name: "SAS", tag: "team"},
  { name: "TOR", tag: "team"},
  { name: "UTA", tag: "team"},
  { name: "WAS", tag: "team"},

  { name: "PTS", tag: "stat"},
  { name: "TRB", tag: "stat"},
  { name: "AST", tag: "stat"}
];
