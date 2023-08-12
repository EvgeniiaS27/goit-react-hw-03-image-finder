import PropTypes from 'prop-types';
import css from './Button.module.css';

export const Button = ({ onClick, children }) => {
  return (
    <button type="button" className={css.button} onClick={onClick}>
      {children}
    </button>
  );
};

Button.proppTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
};
