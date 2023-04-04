import Pagination from "react-bootstrap/Pagination";

const PaginationHelper = ({
  prev,
  prevDisabled,
  next,
  nextDisabled,
  items,
  itemClick,
  activeItem,
  first_page,
  last_page,
}) => {
  let pages = [];
  for (let i = 1; i <= items; i++) {
    pages.push(
      <Pagination.Item
        key={i}
        onClick={() => itemClick(i)}
        active={activeItem(i)}
      >
        {i}
      </Pagination.Item>
    );
  }

  return (
    <Pagination size="sm">
      <Pagination.First onClick={first_page} disabled={prevDisabled} />
      <Pagination.Prev onClick={prev} disabled={prevDisabled} />
      {pages}
      <Pagination.Next onClick={next} disabled={nextDisabled} />
      <Pagination.Last onClick={last_page} disabled={nextDisabled} />
    </Pagination>
  );
};

export default PaginationHelper;
