import { Slider, Stack } from "@mui/material";
import VolumeIcon from "../../icons/VolumeIcon";
import "./Volume.scss"

function Volume() {
    const handleChange = () => {
        
    }
    
    return (
        <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
            <VolumeIcon />
            <Slider aria-label="Small" size="small" onChange={handleChange} />
        </Stack>
    );
}

export default Volume;