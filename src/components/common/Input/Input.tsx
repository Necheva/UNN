import React, { RefObject } from 'react';
import classNames from 'classnames';

import styles from './Input.scss';

export type InputProps = {
  value: string;
  error?: boolean;

  onFocusChanged?: (focus: boolean) => any;
  onValueChanged?: (text: string) => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

type InputState = {
  cursorPosition: number;
};

class Input extends React.Component<InputProps, InputState> {
  private textInput: RefObject<HTMLInputElement>;

  constructor(props: InputProps) {
    super(props);
    this.textInput = React.createRef<HTMLInputElement>();
    this.state = {
      cursorPosition: -1,
    };
  }

  focusChanged(newValue: boolean) {
    if (this.props.onFocusChanged) {
      this.props.onFocusChanged(newValue);
    }
  }

  render() {
    const { onValueChanged, error, value, className, onFocusChanged, ...rest } = this.props;

    return (
      <div className={styles.container}>
        <input
          {...rest}
          ref={this.textInput}
          value={this.props.value}
          className={classNames(styles.input, { [styles.errorState]: this.props.error }, className)}
          onChange={e => this.handleChange(e)}
          onFocus={e => {
            if (rest.onFocus) {
              rest.onFocus(e);
            }
            this.focusChanged(true);
          }}
          onBlur={e => {
            if (rest.onBlur) {
              rest.onBlur(e);
            }
            this.focusChanged(false);
          }}
        />
        {this.props.error && <div className={styles.errorCircle}>!</div>}
      </div>
    );
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.props.onValueChanged && this.props.onValueChanged(event.target.value);
  }
}

export default Input;
