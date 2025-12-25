import { Event, FilterList } from "@mui/icons-material";
import { Box, ListItemText, MenuItem, MenuList, Paper, Typography } from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { enGB } from 'date-fns/locale';
// import Calendar from "react-calendar";
// import 'react-calendar/dist/Calendar.css';

export default function ActivityFilters() {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, borderRadius: 3 }}>
            <Paper sx={{ p: 3, borderRadius: 3 }}>
                <Box sx={{ width: '100%' }}>
                    <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', mb: 1, color: 'primary.main' }}>
                        <FilterList sx={{ mr: 1 }} />
                        Filters
                    </Typography>
                    <MenuList>
                        <MenuItem>
                            <ListItemText primary="All Events" />
                        </MenuItem>
                        <MenuItem>
                            <ListItemText primary="I'm Going" />
                        </MenuItem>
                        <MenuItem>
                            <ListItemText primary="I'm Hosting" />
                        </MenuItem>
                    </MenuList>
                </Box>
            </Paper>
            <Box component={Paper} sx={{ p: 3, borderRadius: 3 }} >
                <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', mb: 1, color: 'primary.main' }}>
                    <Event sx={{ mr: 1 }} />
                    Select date
                </Typography>
                {/* <Calendar /> */}
                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>
                    <DateCalendar sx={{ width: '100%', maxWidth: '100%' }}
                        dayOfWeekFormatter={(weekday) => weekday.toLocaleDateString('en-GB', { weekday: 'short' })}
                        slotProps={{
                            calendarHeader: {
                                format: 'MMMM yyyy'
                            }
                        }} />
                </LocalizationProvider>
            </Box>
        </Box>
    )
}