import { Fireworks, useFireworks } from 'fireworks-js/dist/react';
import { CSSProperties, useEffect } from 'react';

const Salut = () => {
  const { enabled, options, setEnabled, setOptions } = useFireworks({
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
  //  useEffect(() => {
  //     // setOptions({ sound: { enabled: !options.sound?.enabled } });
  //     // setOptions({ sound: { enabled: !options.sound?.enabled } });
  //     setOptions({ sound: { enabled: true } });
  //   }, []);
  // const toggleSound = () => {
  //   setOptions({ sound: { enabled: !options.sound?.enabled } });
  // };
  const style: CSSProperties = {
    // top: 0,
    // left: 0,
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

          width: 400,
          height: 300,
          overflow: 'hidden',
          borderRadius: 30,
        }}>
        {/* <button onClick={() => setEnabled()}>Fireworks {enabled ? 'disabled' : 'enabled'}</button> */}
        {/* <button onClick={() => toggleSound()}>Sound {options.sound?.enabled ? 'disabled' : 'enabled'}</button> */}
        <img src="/static/elbrus.jpg" alt="" />
      </div>
    </Fireworks>
  );
};

export default Salut;
