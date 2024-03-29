import { Slider, Stack } from "@mui/material";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import VolumeIcon from "../../icons/VolumeIcon";
import VolumeOffIcon from "../../icons/VolumeOffIcon";
import "./Volume.scss"

interface MyProps {
    onVolumeChange: (value: number | number[]) => void
}

function Volume(props: MyProps) {
    const [value, setValue] = useState<number>(100);
    const [originalvalue, setOriginalValue] = useState<number>(100);
    const sliderContainer = useRef<any>(null);
    
    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number);
    }

    useLayoutEffect(() => {
        if (sliderContainer.current) {
            sliderContainer.current.onwheel = (event: WheelEvent) => {
                if (event.deltaY > 0) {
                    if (value - 10 >= 0) {
                        setValue(value - 10);
                    } else if (value - 10 < 0) {
                        setValue(0);
                    }
                } else if (event.deltaY < 0) {
                    if (value + 10 <= 100) {
                        setValue(value + 10); 
                    }
                } 
            }
        }
    }, [sliderContainer, props, setValue, value]);

    useEffect(() => {
        props.onVolumeChange(value);
    }, [value, props]);

    const handleVolumeMute = (mute: boolean) => {
        if (mute) {
            setOriginalValue(value);
            setValue(0);
        } else {
            setValue(originalvalue);
        }
    }
    
    return (
        <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center" className="wrapper-volume">
            {value > 0 ?
                <VolumeIcon onClick={(evt: boolean) => handleVolumeMute(evt)}/>
            : null }
            {value === 0 ?
                <VolumeOffIcon className="volume-off-icon" onClick={(evt: boolean) => handleVolumeMute(evt)} />
            : null }
            <Slider aria-label="Small" size="small" onChange={handleChange} defaultValue={100} value={value} ref={sliderContainer}/>
        </Stack>
    );
}

export default Volume;