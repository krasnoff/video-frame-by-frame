import styles from './FramedVideo.module.scss';
import { useRef } from 'react';

function FramedVideo(props: any) {
    const videoComponent = useRef<HTMLVideoElement>(null);
    let frameTime = 1/ 25;

    const forward = () => {
      OneFrame(false);
    }

    const backword = () => {
      OneFrame(true);
    }

    const OneFrame = (direction: any) => {
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
  
    return (
        <figure className="Wrapper">
          <video width="100%" controls ref={videoComponent}>
            <source src={props.src} type="video/mp4" />
            Your browser does not support HTML video.
          </video>
          <div className={styles.innerDiv}></div>
          <button onClick={() => forward()}>forward</button>
          <button onClick={() => backword()}>backword</button>
        </figure>
    );
}

export default FramedVideo;