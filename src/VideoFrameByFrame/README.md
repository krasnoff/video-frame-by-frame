# Getting Started with the video frame by frame component

This component displays a particular version of an HTML Video element which enables the display of video with the ability to advance or reverse the movie frame by frame.

In order to install this component simply execute the following command:
```
npm i videoframebyframe
```

Here is how you implement the component in your react code

```
import './App.css';
import FramedVideo from 'videoframebyframe/FramedVideo';

function App() {
  return (
    <div className="App">
      <div className="videoContainer"><FramedVideo src="blender.mp4"></FramedVideo></div>
    </div>
  );
}

export default App;
```
Here is a screenshot of the video controller:

![Video screenshot](/screenshot.png "Video screenshot")

As you can see the frame forward and the frame backward appears on the bottom center of the screen. They appear only when the video is paused.

This component was made by Kobi Krasnoff