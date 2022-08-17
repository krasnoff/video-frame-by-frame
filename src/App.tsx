import './App.scss';
import FramedVideo from './VideoFrameByFrame/FramedVideo';

function App() {
  return (
    <div className="App">
      <div className="videoContainer"><FramedVideo src="blender.mp4"></FramedVideo></div>
      <div>(CC) Blender Foundation | <a href="https://mango.blender.org/">mango.blender.org</a></div>
    </div>
  );
}

export default App;
