import styles from './FramedVideo.module.scss';
import { useLayoutEffect, useRef, useState } from 'react';

import forwardButton from './icons/forward.svg';
import backwardButton from './icons/backward.svg';

interface MyProps {
  src: string
}

function FramedVideo(props: MyProps) {
    const [isPaused, setIsPaused] = useState<boolean>(true)
    const videoComponent = useRef<HTMLVideoElement>(null);
    let frameTime = 1/ 25;

    const forward = () => {
      OneFrame(false);
    }

    const backward = () => {
      OneFrame(true);
    }

    const OneFrame = (direction: boolean) => {
      if (videoComponent.current?.paused) { //or you can force it to pause here
        if (direction) { //left arrow
            //one frame back
            videoComponent.current.currentTime = Math.max(0, videoComponent.current.currentTime - frameTime);
        } else if (!direction) { //right arrow
            //one frame forward
            //Don't go past the end, otherwise you may get an error
            videoComponent.current.currentTime = Math.min(videoComponent.current.duration, videoComponent.current.currentTime + frameTime);
        }
      }  
    }

    useLayoutEffect(() => {
      if (videoComponent.current) {
        videoComponent.current.onpause = () => {
          setIsPaused(true);
        }

        videoComponent.current.onplay = () => {
          setIsPaused(false);
        }
      }
    }, [])
  
    return (
        <figure className={styles.wrapper}>
          <video width="100%" controls ref={videoComponent}>
            <source src={props.src} type="video/mp4" />
            Your browser does not support HTML video.
          </video>
          {isPaused ?
            <div className={styles.innerDiv}>
              <div className={styles.button} onClick={() => backward()}><img alt="" src={backwardButton} width="15" /></div>
              <div className={styles.button} onClick={() => forward()}><img alt="" src={forwardButton} width="15" /></div>
            </div> : null }
        </figure>
    );
}

export default FramedVideo;