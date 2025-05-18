import React from 'react';

import { cn } from '@/lib/utils';

import { colorVariants, typographyVariants, weightVariants } from './config';
import { DynamicTypography } from './styles';
import { TypographyPropsType } from './types';

export const Typography = ({ variant = 'body', color, weight, children, className, ...props }: TypographyPropsType) => {
  const config = typographyVariants[variant];
  const colorClass = color ? colorVariants[color] : '';
  const weightClass = weight ? weightVariants[weight] : config.defaultWeight;

  return (
    <DynamicTypography
      variant={variant}
      className={cn(config.className, colorClass, weightClass, className)}
      {...props}>
      {children}
    </DynamicTypography>
  );
};

type TypographyComponentProps = Omit<TypographyPropsType, 'variant'>;

// Create convenience components for each variant
const H1 = (props: TypographyComponentProps) => (
  <Typography variant='h1' {...props}>
    {props.children}
  </Typography>
);

const H2 = (props: TypographyComponentProps) => (
  <Typography variant='h2' {...props}>
    {props.children}
  </Typography>
);

const H3 = (props: TypographyComponentProps) => (
  <Typography variant='h3' {...props}>
    {props.children}
  </Typography>
);

const H4 = (props: TypographyComponentProps) => (
  <Typography variant='h4' {...props}>
    {props.children}
  </Typography>
);

const Body = (props: TypographyComponentProps) => (
  <Typography variant='body' {...props}>
    {props.children}
  </Typography>
);

const Body2 = (props: TypographyComponentProps) => (
  <Typography variant='body2' {...props}>
    {props.children}
  </Typography>
);

const Caption = (props: TypographyComponentProps) => (
  <Typography variant='caption' {...props}>
    {props.children}
  </Typography>
);

const Lead = (props: TypographyComponentProps) => (
  <Typography variant='lead' {...props}>
    {props.children}
  </Typography>
);

const Highlight = (props: TypographyComponentProps) => (
  <Typography variant='highlight' color='primary' {...props}>
    {props.children}
  </Typography>
);

export { H1, H2, H3, H4, Body, Body2, Caption, Lead, Highlight };
