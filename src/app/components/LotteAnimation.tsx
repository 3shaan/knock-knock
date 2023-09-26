'use client'
import {Player} from '@lottiefiles/react-lottie-player'

type Props = {};


export default function LotteAnimation({}: Props) {
  return (
    <div>
      <Player src={"welcome.json"} autoplay loop />
    </div>
  );
}
