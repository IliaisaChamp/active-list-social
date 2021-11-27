/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import { TagCloud } from 'react-tagcloud';

export default function ({ tags }) {
  return (
    <TagCloud
      minSize={20}
      maxSize={35}
      tags={tags}
      shuffle
      disableRandomColor={false}
      className="simple-cloud"
      onClick={(tag) => console.log(tag)}
    />
  );
}
