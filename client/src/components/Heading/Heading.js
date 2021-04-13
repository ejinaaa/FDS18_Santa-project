import PropTypes from 'prop-types';

const Heading = ({ level, className, content, ...restProps }) => {
  const Heading = `h${level}`;
  return (
    <Heading className={className} {...restProps}>
      {content}
    </Heading>
  );
};

Heading.defaultProps = {
  level: 2,
  content: '',
};
Heading.propTypes = {
  level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]).isRequired,
  content: PropTypes.string,
};

export default Heading;
