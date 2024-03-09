import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import { Stack, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';
import { grey } from '@mui/material/colors';
import { useRef } from 'react';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import { useEffect } from 'react';
import { useState } from 'react';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(id, currentSelection, theme) {
  return {
    fontWeight:
      currentSelection.indexOf(id) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultiSelect(props) {
  const {
    label,
    options,
    currentSelection,
    setCurrentSelection,
    extraStyles,
    name,
    error,
    onChange,
    disabled,
  } = props;
  const { t } = useTranslation();
  const theme = useTheme();

  // console.log("****", options);

  const chipsContainerRef = useRef(null);

  const scrollUp = () => {
    if (chipsContainerRef.current) {
      chipsContainerRef.current.scrollTop -= 30; // adjust scroll speed here
    }
  };

  const scrollDown = () => {
    if (chipsContainerRef.current) {
      chipsContainerRef.current.scrollTop += 30;
    }
  };

  const [isOverflowing, setIsOverflowing] = useState(false);

  const checkOverflow = () => {
    if (chipsContainerRef.current) {
      const { scrollHeight, clientHeight } = chipsContainerRef.current;
      setIsOverflowing(scrollHeight > clientHeight);
    }
  };

  useEffect(() => {
    checkOverflow();
  }, [currentSelection]);

  return (
    <Stack
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="flex-start"
      sx={extraStyles}
    >
      <Stack
        justifyContent="flex-end"
        alignItems="flex-end"
        sx={{ width: '100%' }}
      >
        <Typography variant="body2" color={disabled && grey[500]}>
          {t('number-being-selected', { number: currentSelection.length })}
        </Typography>
      </Stack>
      <FormControl
        sx={{ width: '100%', backgroundColor: 'white' }}
        error={error}
        disabled={disabled}
      >
        <InputLabel id="demo-multiple-chip-label">{label}</InputLabel>
        <Select
          disabled={disabled}
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={currentSelection}
          name={name}
          error={error}
          onChange={onChange}
          input={<OutlinedInput id="select-multiple-chip" label={label} />}
          renderValue={(selected) => (
            <Stack
              flexDirection="row"
              justifyContent="space-between"
              // alignItems="center"
              sx={{ width: '100%' }}
            >
              <Box
                ref={chipsContainerRef}
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 0.5,
                  overflow: 'hidden',
                  maxHeight: '100px',
                }}
              >
                {selected.map((value) => {
                  const option = options.find((n) => n.id === value);
                  return (
                    option && (
                      <Chip
                        disabled={disabled}
                        key={value}
                        label={option.label}
                        onDelete={(event) => {
                          event.preventDefault();
                          setCurrentSelection(
                            currentSelection.filter((item) => item !== value)
                          );
                        }}
                        onMouseDown={(event) => {
                          event.stopPropagation();
                        }}
                        size="small"
                      />
                    )
                  );
                })}
              </Box>
              <Box>
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-between"
                  alignItems="center"
                  height="100%"
                >
                  {isOverflowing && (
                    <KeyboardArrowUpRoundedIcon
                      sx={{ cursor: 'pointer' }}
                      onClick={scrollUp}
                      onMouseDown={(event) => {
                        event.stopPropagation();
                      }}
                    />
                  )}
                  {!disabled && (
                    <Box display="flex" alignItems="center" height="100%">
                      <CloseIcon
                        sx={{ cursor: 'pointer' }}
                        onClick={() => setCurrentSelection([])}
                        onMouseDown={(event) => {
                          event.stopPropagation();
                        }}
                      />
                    </Box>
                  )}
                  {isOverflowing && (
                    <KeyboardArrowDownRoundedIcon
                      sx={{ cursor: 'pointer' }}
                      onClick={scrollDown}
                      onMouseDown={(event) => {
                        event.stopPropagation();
                      }}
                    />
                  )}
                </Box>
              </Box>
            </Stack>
          )}
          MenuProps={MenuProps}
        >
          <MenuItem
            key="select-all"
            value="select-all"
            disabled={currentSelection.length === options.length}
            onClick={() => {
              if (currentSelection.length === options.length) {
                setCurrentSelection([]);
              } else {
                setCurrentSelection(options.map((item) => item.id));
              }
            }}
          >
            <ListItemText primary={t('select-all')} />
          </MenuItem>
          {options.map((item) => (
            <MenuItem
              key={item.id}
              value={item.id}
              style={getStyles(item.id, currentSelection, theme)}
              onClick={() => {
                if (currentSelection.indexOf(item.id) > -1) {
                  setCurrentSelection(
                    currentSelection.filter((id) => id !== item.id)
                  );
                } else {
                  setCurrentSelection([...currentSelection, item.id]);
                }
              }}
            >
              <Checkbox checked={currentSelection.indexOf(item.id) > -1} />

              <ListItemText
                primary={item.label}
                sx={{ position: 'relative', top: '2px' }}
              />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  );
}
