import { Fragment } from 'react';
import { css, useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import Accordian from './EstimateAccordian';
import { getPriceSum } from './utils';
import { Divider, Flex, HMGTag, Typography } from '@/components/common';
import type { ExteriorColorInfo, InteriorColorInfo, SelectionInfoWithImage } from '@/providers/SelectionProvider';

interface Props {
  powerTrain: SelectionInfoWithImage;
  bodyType: SelectionInfoWithImage;
  driveTrain: SelectionInfoWithImage;
  exteriorColor: ExteriorColorInfo;
  interiorColor: InteriorColorInfo;
}

function DetailEstimate({ powerTrain, bodyType, driveTrain, exteriorColor, interiorColor }: Props) {
  const { colors } = useTheme();

  return (
    <Fragment>
      <Typography as='h3' font='HeadKRMedium18' color='gray900' marginTop={20} marginBottom={12}>
        상세 견적
      </Typography>
      <Flex justifyContent='space-between' gap={70}>
        <Flex flexDirection='column'>
          <Accordian label='모델타입' totalPrice={getPriceSum(powerTrain, bodyType, driveTrain)} isExpanded>
            {powerTrain && (
              <Accordian.Detail
                type='파워트레인'
                thumbnail={powerTrain.image}
                name={powerTrain.name}
                price={powerTrain.price}
              />
            )}
            {bodyType && (
              <Accordian.Detail
                type='바디타입'
                thumbnail={bodyType.image}
                name={bodyType.name}
                price={bodyType.price}
              />
            )}
            {driveTrain && (
              <Accordian.Detail
                type='구동방식'
                thumbnail={driveTrain.image}
                name={driveTrain.name}
                price={driveTrain.price}
              />
            )}
          </Accordian>
          <Accordian
            label='색상'
            totalPrice={getPriceSum<SelectionInfoWithImage>(exteriorColor, interiorColor)}
            isExpanded
          >
            {exteriorColor && (
              <Accordian.Detail
                type='외장색상'
                colorCode={exteriorColor.colorCode}
                name={exteriorColor.name}
                price={exteriorColor.price}
              />
            )}
            {interiorColor && (
              <Accordian.Detail
                type='내장색상'
                thumbnail={interiorColor.fabricImage}
                name={interiorColor.name}
                price={interiorColor.price}
              />
            )}
          </Accordian>
          {/* TODO: 추가옵션 페이지 붙으면 적용하기 */}
          <Accordian label='추가옵션' totalPrice={43460000} isExpanded>
            <Accordian.Detail thumbnail='/images/result-external.png' type='외장' name='르블랑' price={43460000} />
            <Accordian.Detail thumbnail='/images/result-external.png' type='외장' name='르블랑' price={43460000} />
            <Accordian.Detail thumbnail='/images/result-external.png' type='외장' name='르블랑' price={43460000} />
          </Accordian>
          <Accordian label='탁송' totalPrice={0} />
          <Accordian label='할인 및 포인트' totalPrice={0} />
          <Accordian label='결제 수단' description='결제수단을 선택하고 지불조건 및 납입사항을 확인하세요.' />
          <Accordian label='면세 구분 및 등록비' description='할인/포인트 및 결제 방법 선택 후 확인 가능해요.' />
          <Accordian label='안내사항' />
        </Flex>
        <Flex flexDirection='column' gap={20}>
          <GraphContainer>
            <StyledHMGTag variant='small' />
            <Typography font='HeadKRMedium16' color='gray900' marginBottom={15}>
              르블랑으로 완성된 모든 타입의
              <br />
              <Highlight>견적 가격의 분포</Highlight>입니다.
            </Typography>
            <Divider
              css={css`
                background-color: ${colors.gray100};
              `}
              length='100%'
            />
          </GraphContainer>
          <GraphContainer>
            <StyledHMGTag variant='small' />
            <Typography font='HeadKRMedium16' color='gray900' marginBottom={15}>
              <Highlight>내 견적과 비슷한 실제 출고 견적</Highlight>들을
              <br />
              확인하고 비교해보세요.
            </Typography>
            <Typography font='TextKRRegular14' color='gray500' marginBottom={15}>
              유사 출고 견적이란, 내 견적과 해시태그 유사도가
              <br /> 높은 다른 사람들의 실제 출고 견적이에요.
            </Typography>
            <Divider
              css={css`
                background-color: ${colors.gray100};
              `}
              length='100%'
            />
          </GraphContainer>
        </Flex>
      </Flex>
    </Fragment>
  );
}

export default DetailEstimate;

const GraphContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.blueBg};
  position: relative;
  width: 347px;
  height: 349px;
  padding: 40px 16px 21px 16px;
`;

const StyledHMGTag = styled(HMGTag)`
  position: absolute;
  top: 0;
  left: 0;
`;

const Highlight = styled.span`
  color: ${({ theme }) => theme.colors.activeBlue};
`;
