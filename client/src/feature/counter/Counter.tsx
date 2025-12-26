import { observer } from "mobx-react-lite"
import { useStore } from "../../lib/hooks/useStore"
import Typography from "@mui/material/Typography";
import { Box, Button, ButtonGroup } from "@mui/material";

function Counter() {
    const { counterStore } = useStore();
    return (
        <Box display='flex' justifyContent='space-between'>
            <Box sx={{ width: '60%' }}>
                <Typography variant="h4" gutterBottom>{counterStore.title}</Typography>
                <Typography variant="h6" >The count is: {counterStore.count}</Typography>
                <ButtonGroup sx={{ mt: 2 }}>
                    <Button variant="contained" color="error" onClick={() => counterStore.decrement()}>Decrement</Button>
                    <Button variant="contained" color="success" onClick={() => counterStore.increment()}>Increment</Button>
                    <Button variant="contained" color="primary" onClick={() => counterStore.increment(5)}>Increment 5</Button>
                </ButtonGroup>
            </Box>
            <Box sx={{ width: '40%' }}>
                <Typography variant="h6" gutterBottom>Event Log (Total Events: {counterStore.eventCount})</Typography>
                <Box sx={{ maxHeight: 300, overflowY: 'auto', border: '1px solid #ccc', padding: 2, borderRadius: 1 }}>
                    {counterStore.events.map((event, index) => (
                        <Typography key={index} variant="body2">- {event}</Typography>
                    ))}
                </Box>
            </Box>
        </Box>
    )
}

const ObservedCounter = observer(Counter);
export default ObservedCounter;