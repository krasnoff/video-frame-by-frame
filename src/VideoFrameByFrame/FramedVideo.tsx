import styles from './FramedVideo.module.scss';
import { useLayoutEffect, useRef, useState } from 'react';

import forwardButton from './icons/forward.svg';
import backwardButton from './icons/backward.svg';

interface MyProps {
  src: string
}

function FramedVideo(props: MyProps) {
    const [isPaused, setIsPaused] = useState<boolean>(true);
    const [currentTimeState, setcurrentTimeState] = useState<number | undefined>(0);
    const videoComponent = useRef<HTMLVideoElement>(null);
    const container = useRef<HTMLElement>(null);
    let frameTime = 1 / 25;
    let isFullscreen: boolean = false;
    let playInterval: NodeJS.Timeout | undefined;

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
          clearInterval(playInterval)
        }

        videoComponent.current.onplay = () => {
          setIsPaused(false);
          playInterval = setInterval(() => {
            setcurrentTimeState(videoComponent.current?.currentTime)
          }, 1000);
        }
      }
    }, [])

    const setFullScreen = () => {
      if (!isFullscreen) {
        if (videoComponent.current?.requestFullscreen) {
          videoComponent.current?.requestFullscreen();
        } else if ((videoComponent.current as any).mozRequestFullScreen) {
          (container as any).mozRequestFullScreen(); // Firefox
        } else if ((videoComponent.current as any).webkitRequestFullscreen) {
          (videoComponent.current as any).webkitRequestFullscreen(); // Chrome and Safari
        }
        isFullscreen = true;
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if ((document as any).mozCancelFullScreen) {
          (document as any).mozCancelFullScreen();
        } else if ((document as any).webkitCancelFullScreen) {
          (document as any).webkitCancelFullScreen();
        }
        isFullscreen = false;
      }
    }

    const play = () => {
      videoComponent.current?.play();
    }

    const pause = () => {
      videoComponent.current?.pause();
    }
  
    return (
        <figure className={styles.wrapper} ref={container}>
          <video width="100%" ref={videoComponent}>
            <source src={props.src} type="video/mp4" />
            Your browser does not support HTML video.
          </video>
          {isPaused ?
            <div className={styles.innerDiv}>
              <div className={styles.button} onClick={() => backward()}>
                <div className={styles.background}></div>
                <img alt="" src={backwardButton} width="15" className={styles.forward} />
              </div>
              <div className={styles.button} onClick={() => forward()}>
                <div className={styles.background}></div>
                <img alt="" src={forwardButton} width="15" className={styles.backward} />
              </div>
            </div> : null }

            <button onClick={() => setFullScreen()}>set full screen</button>
            <button onClick={() => play()} disabled={false/*videoComponent.current?.paused*/}>play</button>
            <button onClick={() => pause()} disabled={false/*videoComponent.current?.paused*/}>pause</button>
            &nbsp;video duration: {videoComponent.current?.duration}&nbsp;
            &nbsp;video current time: {currentTimeState}&nbsp;
        </figure>
        
    );
}

export default FramedVideo;