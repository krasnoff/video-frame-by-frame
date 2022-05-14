import './App.scss';
import FramedVideo from './VideoFrameByFrame/FramedVideo';

function App() {
  return (
    <div className="App">
      <div className="videoContainer"><FramedVideo src="blender.mp4"></FramedVideo></div>
    </div>
  );
}

export default App;
