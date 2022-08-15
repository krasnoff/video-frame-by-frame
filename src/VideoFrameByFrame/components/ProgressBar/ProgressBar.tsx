import LinearProgress from '@mui/material/LinearProgress';
import { useRef } from 'react';
import { Variants } from "../../enums/Variant";
import './ProgressBar.scss';

interface MyProps {
    value?: number;
    variant?: Variants;
    valueBuffer?: number;
    onProgressChange: (value: number) => void
}

function ProgressBar(props: MyProps) {
    const container = useRef<HTMLDivElement>(null);
    
    const clickHandler = (evt: any) => {
      const rect = container.current?.getBoundingClientRect();
      if (rect) {
        const x = evt.clientX - rect.left; //x position within the element.
        props.onProgressChange(x / rect.width);
      }
      
    }

    return (
      <div className="wrapperProgressBar" onMouseDown={clickHandler} ref={container}>
        <LinearProgress value={props.value} variant={props.variant} valueBuffer={props.valueBuffer} />
      </div>
    );
}

export default ProgressBar;