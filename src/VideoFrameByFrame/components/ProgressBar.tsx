import LinearProgress from '@mui/material/LinearProgress';
import { Variants } from "../enums/Variant";
import './ProgressBar.scss';

interface MyProps {
    value?: number;
    variant?: Variants;
    valueBuffer?: number;
}



function ProgressBar(props: MyProps) {
    return (
      <div className="wrapperProgressBar">
        <LinearProgress value={props.value} variant={props.variant} valueBuffer={props.valueBuffer} />
      </div>
    );
}

export default ProgressBar;