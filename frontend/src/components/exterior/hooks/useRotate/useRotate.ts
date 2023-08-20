import { MouseEventHandler, useReducer } from 'react';
import { calculateImgIdx } from '../../utils/calculateImgIdx';

type Action = { type: 'MOUSE_DOWN'; payload: number } | { type: 'MOUSE_MOVE'; payload: number } | { type: 'MOUSE_UP' };
type State = {
  nowImgIdx: number;
  nextImgIdx: number;
  mouseX: number;
  isMouseDown: boolean;
};
const initState: State = { nowImgIdx: 0, nextImgIdx: 0, mouseX: 0, isMouseDown: false };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'MOUSE_DOWN':
      return { ...state, mouseX: action.payload, isMouseDown: true };
    case 'MOUSE_MOVE':
      return { ...state, nextImgIdx: calculateImgIdx(state.mouseX, action.payload, state.nowImgIdx) };
    case 'MOUSE_UP':
      return { ...state, nowImgIdx: state.nextImgIdx, isMouseDown: false, mouseX: 0 };
    default:
      throw new Error('자동차 외장 색상 이미지 action error');
  }
}

function useRotate() {
  const [state, dispatch] = useReducer(reducer, initState);

  const handleMouseDown: MouseEventHandler<HTMLDivElement> = (e) =>
    dispatch({ type: 'MOUSE_DOWN', payload: e.clientX });

  const handleMouseMove: MouseEventHandler<HTMLDivElement> = (e) =>
    dispatch({ type: 'MOUSE_MOVE', payload: e.clientX });

  const handleMouseUp: MouseEventHandler<HTMLDivElement> = () => dispatch({ type: 'MOUSE_UP' });

  return { state, handleMouseDown, handleMouseMove, handleMouseUp } as const;
}

export default useRotate;
