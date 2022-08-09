import styles from './FramedVideo.module.scss';
import { useLayoutEffect, useRef, useState } from 'react';

import { useFormatTime } from './hooks/FormatTime';
import PlayIcon from './icons/PlayIcon';
import PauseIcon from './icons/PauseIcon';
import BackwardIcon from './icons/BackwardIcon';
import ForwardIcon from './icons/ForwardIcon';
import FullScreenIcon from './icons/FullScreenIcon';
import ExitFullScreenIcon from './icons/ExitfullScreenIcon';
import ProgressBar from './components/ProgressBar/ProgressBar';
import { Variants } from './enums/Variant';
import Volume from './components/Volume/Volume';

interface MyProps {
  src: string
}

function FramedVideo(props: MyProps) {
    const [isPaused, setIsPaused] = useState<boolean>(true);
    const [isfullscreen, setIsfullscreen] = useState<Element | null>(null);
    const [currentTimeState, setcurrentTimeState] = useState<string>('00:00');
    const [currentProgress, setcurrentProgress] = useState<number>(0);
    const [currentBuffer, setcurrentBuffer] = useState<number>(0);
    const videoComponent = useRef<HTMLVideoElement>(null);
    const container = useRef<HTMLDivElement>(null);
    const controls = useRef<HTMLDivElement>(null);
    const formatTime = useFormatTime();
    const [durationState, setDurationState] = useState<string>('00:00');
    const [playInterval, setPlayInterval] = useState<NodeJS.Timeout | undefined>(undefined);
    const [progressInterval, setProgressInterval] = useState<NodeJS.Timeout | undefined>(undefined);
    const [fullScreenDisplay, setFullScreenDisplay] = useState<NodeJS.Timeout | undefined>(undefined);

    let frameTime = 1 / 25;
    
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
        setcurrentTimeState(formatTime.format(videoComponent.current?.currentTime));
        setcurrentProgress(Math.round(videoComponent.current?.currentTime || 0) / (videoComponent.current?.duration || 100) * 100);
        if (container.current) {
          container.current.dispatchEvent(new Event('mousemove'));
        }
        
      }  
    }

    useLayoutEffect(() => {
      if (videoComponent.current) {
        videoComponent.current.onpause = () => {
          setIsPaused(true);
          clearInterval(playInterval);
          clearInterval(progressInterval);
          setPlayInterval(undefined);
          setProgressInterval(undefined);
        }

        videoComponent.current.onplay = () => {
          setIsPaused(false);
          setPlayInterval(setInterval(() => {
            setcurrentTimeState(formatTime.format(videoComponent.current?.currentTime));
          }, 1000));

          setProgressInterval(setInterval(() => {
            setcurrentProgress(Math.round((videoComponent.current?.currentTime || 0) / (videoComponent.current?.duration || 100) * 100));
            
            const buffered = (videoComponent.current?.buffered.end(0) || 100) || (videoComponent.current?.buffered.start(0) || 0);
            
            setcurrentBuffer(Math.round((buffered) / (videoComponent.current?.duration || 100) * 100));
          }, 100));
        }

        videoComponent.current.oncanplay = () => {
          setDurationState(formatTime.format(videoComponent.current?.duration));
        }
      }

      if (container.current) {
        container.current.onfullscreenchange = () => {
          setIsfullscreen(document.fullscreenElement);
          if (document.fullscreenElement === null) {
            controls.current?.removeAttribute('style');
          }
        }

        container.current.onmousemove = () => {
          if (isfullscreen) {
            clearTimeout(fullScreenDisplay);
            setFullScreenDisplay(undefined);
            controls.current?.setAttribute('style', "opacity: 1");
            setFullScreenDisplay(setTimeout(() => {
              controls.current?.removeAttribute('style');
            }, 2000));
          }
        }
      }
    }, [formatTime, playInterval, isfullscreen, fullScreenDisplay, progressInterval])

    const setFullScreen = () => {
      if (videoComponent.current?.requestFullscreen) {
        container.current?.requestFullscreen();
      } else if ((videoComponent.current as any).mozRequestFullScreen) {
        (container as any).mozRequestFullScreen(); // Firefox
      } else if ((videoComponent.current as any).webkitRequestFullscreen) {
        (videoComponent.current as any).webkitRequestFullscreen(); // Chrome and Safari
      }

    }

    const exitFullScreen = () => {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if ((document as any).mozCancelFullScreen) {
        (document as any).mozCancelFullScreen();
      } else if ((document as any).webkitCancelFullScreen) {
        (document as any).webkitCancelFullScreen();
      }

    }

    const play = () => {
      videoComponent.current?.play();
    }

    const pause = () => {
      videoComponent.current?.pause();
    }

    const handleVolumeChange = (value: number | number[]) => {
      const videoVolumeValue = typeof value === 'number' ? value / 100 : value[0] / 100;
      if (videoComponent.current) {
        videoComponent.current.volume = videoVolumeValue;
      }
    }

    return (
        <>
        <div className={styles.wrapper} ref={container}>
          <video width="100%" ref={videoComponent}>
            <source src={props.src} type="video/mp4" />
            Your browser does not support HTML video.
          </video>
          {/* controls */}
          <div id="mycontrols" className={styles.mycontrols} ref={controls}>
            {isPaused ?
            <div className={styles.button} onClick={() => play()}>
                <div className={styles.background}></div>
                <PlayIcon/>
            </div>
            : null }

            {!isPaused ?
            <div className={styles.button} onClick={() => pause()}>
                <div className={styles.background}></div>
                <PauseIcon />
            </div>
             : null }
            
            <div className={styles.button} onClick={() => backward()}>
                <div className={styles.background}></div>
                <BackwardIcon />
            </div>
            <div className={styles.button} onClick={() => forward()}>
                <div className={styles.background}></div>
                <ForwardIcon />
            </div>

            <div className={styles.time}>
              <div>{currentTimeState} / {durationState}</div>
            </div>

            <div className={styles.volume}>
              <Volume onVolumeChange={(volume: number | number[]) => {handleVolumeChange(volume)}} />
            </div>

            <div className={styles.progressBar}>
              <ProgressBar value={currentProgress} variant={Variants.buffer} valueBuffer={currentBuffer} />
            </div>

            {!isfullscreen ?
            <div className={styles.button} onClick={() => setFullScreen()}>
                <div className={styles.background}></div>
                <FullScreenIcon />
            </div>
            : null }

            {isfullscreen !== null ?
            <div className={styles.button} onClick={() => exitFullScreen()}>
                <div className={styles.background}></div>
                <ExitFullScreenIcon />
            </div>
            : null }
            
          </div>
                      
        </div>
        </>
    );
}

export default FramedVideo;