import React from 'react';
import classNames from 'classnames';

import styles from './Card.scss';

export type RenderCardTitleFn = (className: string) => React.ReactChild;
export type CardProps = {
  title?: string;
  titleContent?: JSX.Element;
  titleClassName?: string;
  alignTitleLeft?: boolean;
  contentClassName?: string;
} & React.InputHTMLAttributes<HTMLDivElement>;

class Card extends React.Component<CardProps> {
  render() {
    const { title, titleContent, className, contentClassName, titleClassName, alignTitleLeft, ...rest } = this.props;

    return (
      <div {...rest} className={classNames(styles.container, className)}>
        {title && (
          <h2 className={classNames(styles.title, titleClassName, { [styles.alignLeft]: alignTitleLeft })}>{title}</h2>
        )}
        {titleContent}
        <div className={classNames(styles.content, contentClassName)}>{this.props.children}</div>
      </div>
    );
  }
}

export default Card;
