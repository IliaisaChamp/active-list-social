import { Fireworks, useFireworks } from 'fireworks-js/dist/react';

function Salut() {
  const { enabled, options } = useFireworks({
    initialStart: true,
    initialOptions: {
      hue: {
        min: 0,
        max: 345,
      },
      delay: {
        min: 15,
        max: 15,
      },
      rocketsPoint: 50,
      speed: 10,
      acceleration: 1.2,
      friction: 0.96,
      gravity: 1,
      particles: 90,
      trace: 3,
      explosion: 6,
      autoresize: true,
      brightness: {
        min: 50,
        max: 80,
        decay: {
          min: 0.015,
          max: 0.03,
        },
      },
      boundaries: {
        visible: false,
      },
      sound: {
        enabled: true,
        files: ['/static/sounds/explosion0.mp3', '/static/sounds/explosion1.mp3', '/static/sounds/explosion2.mp3'],
        volume: {
          min: 100,
          max: 100,
        },
      },
      mouse: {
        click: true,
        move: false,
        max: 1,
      },
    },
  });
  const style = {
    width: '100vw',
    height: '100vh',
    position: 'fixed',
    background: '#000',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  };

  return (
    <Fireworks style={style} enabled={enabled} options={options}>
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',

          width: 800,
          height: 600,
          overflow: 'hidden',
          borderRadius: 30,
        }}
      >
        <img src="/static/elbrus.jpg" alt="" />
      </div>
    </Fireworks>
  );
}

export default Salut;
