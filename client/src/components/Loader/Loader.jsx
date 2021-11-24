import React from 'react';

const Loader = () => {
  return (
    <div>
      <img
        style={{ position: 'fixed', top: '0', left: '0', width: '100vw', height: '100vh', display: 'block', zIndex: 100 }}
        src="https://media2.giphy.com/media/3ov9jQKWfIZedOqVa0/giphy.gif?cid=790b76116a38dd75c811721322d416cdeb59456a5edc6263&rid=giphy.gif&ct=g"
        alt="Бип-бип"
      />
    </div>
  );
};

export default Loader;
