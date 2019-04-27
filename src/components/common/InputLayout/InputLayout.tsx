import React from 'react';
import _isEmpty from 'lodash/isEmpty';
import classNames from 'classnames';

import styles from './InputLayout.scss';

export type InputLayoutProps = {
  title?: string;
  titleElements?: React.ReactChild;
  hideTitle?: boolean;
  errorMessage?: string;
  titleClassName?: string;
  additionalContent?: React.ReactNode;
  horizontalContent?: boolean;
} & React.InputHTMLAttributes<HTMLDivElement>;

class InputLayout extends React.Component<InputLayoutProps> {
  renderTitle() {
    const { titleElements, title } = this.props;

    return (
      <div className={classNames(styles.titleContainer, { [styles.empty]: !(titleElements || title) })}>
        <div className={classNames(styles.title, this.props.titleClassName)}>{titleElements || title}</div>
        {this.props.additionalContent}
      </div>
    );
  }

  render() {
    return (
      <div style={this.props.style} className={this.props.className}>
        {!this.props.hideTitle && this.renderTitle()}
        <div className={classNames(styles.content, { [styles.horizontal]: this.props.horizontalContent })}>
          {this.props.children}
        </div>
        {!_isEmpty(this.props.errorMessage) ? <div className={styles.errorMessage}>{this.props.errorMessage}</div> : ''}
      </div>
    );
  }
}

export default InputLayout;
