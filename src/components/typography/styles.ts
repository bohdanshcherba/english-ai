import { createElement } from 'react';

import { typographyVariants } from './config';
import { TypographyPropsType } from './types';
import styled from 'styled-components';

export const DynamicTypography = styled(({ variant = 'body', children, ...props }: TypographyPropsType) =>
  createElement(typographyVariants[variant].element, props, children)
)``;
