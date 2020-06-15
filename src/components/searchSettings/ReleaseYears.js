import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';

import { useQuery } from '../../contexts/queryContext';

const useStyles = makeStyles(theme => ({
  yearsRoot: {
    width: '100%',
    height: '30vh',
    paddingLeft: '5%',
    paddingRight: '5%',
    border: '1px solid yellow',
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(2),
    },
  },
  yearsHeader: {
    minHeight: 95,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      '& h3': {
        fontSize: '1.75rem',
      },
    },
  },
  yearsSlider: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

const marks = [
  {
    value: 1970,
    label: '1970',
  },
  {
    value: 1980,
    label: '1980',
  },
  {
    value: 1990,
    label: '1990',
  },
  {
    value: 2000,
    label: '2000',
  },
  {
    value: 2010,
    label: '2010',
  },
  {
    value: 2020,
    label: '2020',
  },
];

export default function ReleaseYears() {
  const classes = useStyles();
  const { queryState, updateWithYears } = useQuery();

  const handleChange = (event, newValue) => {
    if (newValue !== queryState.withYears) {
      updateWithYears(newValue);
    }
  };

  return (
    <div className={classes.yearsRoot}>
      <div className={classes.yearsHeader}>
        <Typography id='years-range-slider' variant='h3' gutterBottom>
          Release Years
        </Typography>
      </div>
      <div className={classes.yearsSlider}>
        <Slider
          value={queryState.withYears}
          min={1970}
          max={2020}
          step={1}
          marks={marks}
          onChange={handleChange}
          valueLabelDisplay='on'
          aria-labelledby='years-range-slider'
        />
      </div>
    </div>
  );
}

// export default function ReleaseYears() {
//   const classes = useStyles();
//   const { state, updateWithYears } = useMovies();
//   const {
//     queryParams: { withYears },
//   } = state;
//   const allYears = Object.keys(releaseYears);
//   const isAllSelected = withYears.length === allYears.length;

//   function isSelected(id) {
//     return withYears.includes(id);
//   }

//   function toggleDecade(id) {
//     if (isSelected(id)) {
//       updateWithYears(withYears.filter(d => d !== id));
//     } else {
//       updateWithYears([...withYears, id]);
//     }
//   }

//   function selectAll() {
//     updateWithYears(allYears);
//   }

//   return (
//     <div className={classes.yearsRoot}>
//       <div className={classes.yearsHeader}>
//         <Typography variant='h3'>Release Dates</Typography>
//         <Button
//           color='secondary'
//           variant={isAllSelected ? null : 'outlined'}
//           className={classes.selectAllButton}
//           onClick={selectAll}
//           disabled={isAllSelected}
//         >
//           {isAllSelected ? 'All Selected' : 'Select All'}
//         </Button>
//       </div>

//       <div className={classes.decadeContainer}>
//         <DecadeButton
//           id='release80s'
//           label='80'
//           isSelected={isSelected('release80s')}
//           toggle={toggleDecade}
//         />
//         <DecadeButton
//           id='release90s'
//           label='90'
//           isSelected={isSelected('release90s')}
//           toggle={toggleDecade}
//         />
//         <DecadeButton
//           id='release00s'
//           label='00'
//           isSelected={isSelected('release00s')}
//           toggle={toggleDecade}
//         />
//       </div>
//     </div>
//   );
// }
