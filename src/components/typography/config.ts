export const weightVariants = {
  thin: 'font-thin',
  extralight: 'font-extralight',
  light: 'font-light',
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
  extrabold: 'font-extrabold',
  black: 'font-black'
};

export const typographyVariants = {
  h1: {
    element: 'h1',
    className: 'text-4xl  mb-4 leading-none tracking-tight',
    defaultWeight: weightVariants.bold
  },
  h2: {
    element: 'h2',
    className: 'text-3xl mb-3 leading-none tracking-tight',
    defaultWeight: weightVariants.bold
  },
  h3: {
    element: 'h3',
    className: 'text-2xl  mb-2 leading-none tracking-tight',
    defaultWeight: weightVariants.semibold
  },
  h4: {
    element: 'h4',
    className: 'text-xl mb-2 leading-none tracking-tight',
    defaultWeight: weightVariants.semibold
  },
  body: {
    element: 'p',
    className: 'text-base',
    defaultWeight: weightVariants.normal
  },
  body2: {
    element: 'p',
    className: 'text-sm ',
    defaultWeight: weightVariants.normal
  },
  caption: {
    element: 'p',
    className: 'text-xs mb-2',
    defaultWeight: weightVariants.normal
  },
  lead: {
    element: 'p',
    className: 'text-lg mb-6',
    defaultWeight: weightVariants.medium
  },
  highlight: {
    element: 'span',
    className: 'text-primary-600',
    defaultWeight: weightVariants.semibold
  }
};

export const colorVariants = {
  default: 'text-primary',
  primary: 'text-primary',
  secondary: 'text-secondary',
  success: 'text-green-600',
  danger: 'text-error',
  warning: 'text-warning',
  info: 'text-info',
  light: 'text-gray-500',
  dark: 'text-gray-800',
  muted: 'text-gray-400',
  white: 'text-white'
};
