import css from './Button.module.css';

export const Button = ({ onClick, children }) => {
  return (
    <button type="button" className={css.button} onClick={onClick}>
      {children}
    </button>
  );
};
