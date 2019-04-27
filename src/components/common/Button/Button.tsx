import React from 'react';
import classNames from 'classnames';

import styles from './Button.scss';

export enum ButtonTheme {
  Pelorous = 'PELOROUS',
}

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  text?: string;
  theme?: ButtonTheme;
};

class Button extends React.Component<ButtonProps> {
  getClassNameForTheme(theme: ButtonTheme) {
    switch (theme) {
      case ButtonTheme.Pelorous:
        return styles.pelorous;
      default:
        throw new Error(`Unsupported button theme ${theme}`);
    }
  }

  render() {
    const { theme = ButtonTheme.Pelorous, text, ...rest } = this.props;

    const cn = classNames(this.getClassNameForTheme(theme), { [styles.disabled]: rest.disabled }, this.props.className);

    return (
      <button {...rest} className={cn}>
        {text}
      </button>
    );
  }
}

export default Button;
