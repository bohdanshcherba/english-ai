import { colorVariants, typographyVariants, weightVariants } from './config';

export type TagVariants = keyof typeof typographyVariants;

export type ColorVariant = keyof typeof colorVariants;
export type WeightVariant = keyof typeof weightVariants;

export type TypographyPropsType = React.HTMLAttributes<HTMLParagraphElement> & {
  variant?: TagVariants;
  color?: ColorVariant;
  weight?: WeightVariant;
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
};
