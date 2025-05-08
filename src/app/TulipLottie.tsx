'use client';

import { FC } from 'react';
import Lottie from 'lottie-react';
import tulipData from './tulip-lottie.json';

const TulipLottie: FC<{ style?: React.CSSProperties }> = ({ style }) => (
  <Lottie animationData={tulipData} style={style} />
);

export default TulipLottie;
