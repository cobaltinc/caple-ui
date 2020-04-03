import React from 'react';
import classnames from 'classnames';
import ConfigContext from '../_config/ConfigContext';
import { Sky } from '@caple-ui/colors';
import './Avatar.style.scss';

export type AvatarShapeType = 'circle' | 'round' | 'square';

export interface AvatarProps {
  size?: number;
  shape?: AvatarShapeType;
  src?: string;
  placeholder?: string;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
}

export default React.forwardRef<HTMLSpanElement, AvatarProps>(({ size = 80, shape = 'round', src, placeholder, alt, className = '', style }, ref) => {
  const { useContext, useState } = React;
  const [loaded, setLoaded] = useState(false);
  const { prefix } = useContext(ConfigContext);
  const classPrefix = `${prefix}-avatar`;
  const classNames = classnames(`${classPrefix}`, `${classPrefix}--shape-${shape}`, className);

  let children = null;

  const avatarStyle: { [key: string]: any } = {
    width: size,
    height: size,
    backgroundColor: Sky,
  };

  const handleLoad = () => {
    setLoaded(true);
  };

  if (src) {
    children = (
      <img
        className={classnames(`${classPrefix}--image`, {
          [`${classPrefix}--image-loaded`]: loaded,
        })}
        onLoad={handleLoad}
        src={src}
        alt={alt}
      />
    );
  } else if (placeholder) {
    children = (
      <img
        className={classnames(`${classPrefix}--image`, {
          [`${classPrefix}--image-loaded`]: loaded,
        })}
        onLoad={handleLoad}
        src={placeholder}
        alt={alt}
      />
    );
  } else {
    children = null;
  }

  return (
    <span ref={ref} className={classNames} style={{ ...avatarStyle, ...style }}>
      {children}
    </span>
  );
});
