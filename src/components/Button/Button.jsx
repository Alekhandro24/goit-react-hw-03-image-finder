import PropTypes from 'prop-types';
import { LoadMoreBtn } from 'components/Button/Button.styled';

const Button = ({ onClick, type = 'button', children }) => {
  return (
    <LoadMoreBtn onClick={onClick} type={type}>
      {children}
    </LoadMoreBtn>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  type: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Button;
