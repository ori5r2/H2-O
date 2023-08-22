import Circle from './Circle';
import { render, screen } from '@/tests/test-util';
import { COLORS } from '@/styles/colors';

describe('Circle 컴포넌트 테스트', () => {
  it('Circle의 type===`fill`이 정상적으로 렌더링 된다.', () => {
    render(<Circle data-testid='circle-fill' type='fill' />);

    expect(screen.getByTestId('circle-fill')).toBeInTheDocument();
  });

  it('Cirlce의 type===`border`이 정상적으로 렌더링 된다.', () => {
    render(<Circle data-testid='circle-border' type='border' />);

    expect(screen.getByTestId('circle-border')).toBeInTheDocument();
  });

  it('Circle(type ===`fill`)의 color을 통해 내부 색상을 조절할 수 있다.', () => {
    render(<Circle data-testid='circle-fill' type='fill' color={COLORS.activeBlue} />);

    expect(screen.getByTestId('circle-fill')).toHaveAttribute('fill', COLORS.activeBlue);
  });

  it('Circle(type ===`border`)의 color을 통해 테두리 을 조절할 수 있다.', () => {
    render(<Circle data-testid='circle-border' type='border' color={COLORS.primary500} />);

    expect(screen.getByTestId('circle-border')).toHaveAttribute('stroke', COLORS.primary500);
  });

  it('Circle(type ===`fill`)의 기본 사이즈는 58이다.', () => {
    render(<Circle data-testid='circle-fill' type='fill' />);

    expect(screen.getByTestId('circle-fill')).toHaveAttribute('width', '46');
    expect(screen.getByTestId('circle-fill')).toHaveAttribute('height', '46');
  });

  it('Circle(type ===`border`)의 기본 사이즈는 58이다', () => {
    render(<Circle data-testid='circle-border' type='border' />);

    expect(screen.getByTestId('circle-border')).toHaveAttribute('width', '58');
    expect(screen.getByTestId('circle-border')).toHaveAttribute('height', '58');
  });

  it('Circle의 size를 통해 크기를 조절할 수 있다.', () => {
    render(<Circle data-testid='circle-fill' type='fill' size={20} />);

    expect(screen.getByTestId('circle-fill')).toHaveAttribute('width', '20');
    expect(screen.getByTestId('circle-fill')).toHaveAttribute('height', '20');
  });

  describe('Circle 컴포넌트 스냅샷 테스트', () => {
    it('Circle type===fill (원의 내부가 색상으로 채워진 컴포넌트) 스냅샷 테스트', () => {
      render(<Circle data-testid='circle-fill' type='fill' />);

      expect(screen.getByTestId('circle-fill')).toMatchSnapshot();
    });

    it('Circle type===border (원의 테두리가 색상으로 채워져 있고 내부는 투명인 컴포넌트) 스냅샷 테스트', () => {
      render(<Circle data-testid='circle-border' type='border' />);

      expect(screen.getByTestId('circle-border')).toMatchSnapshot();
    });
  });
});
