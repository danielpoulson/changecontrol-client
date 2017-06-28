import React from 'react';

type Props = {
  activePage: number,
  count: number,
  numPage: number,
  getPage: any
};

const Pagination = ({ activePage, count, numPage, getPage }: Props) => {
  const linkStyle = { color: '#71ABFF' };
  let pagnum = 1;

  pagnum = Math.ceil(count / numPage);
  const firstPage = activePage === 0;
  const lastPage = activePage + 1 === pagnum;
  const pagDisplay = `${activePage + 1} of ${pagnum}`;

  return (
    <nav>
      <ul className="list-inline pull-right dpPag">
        <li
          className={firstPage ? 'hidden' : 'dpHand'}
          style={linkStyle}
          onClick={() => {
            getPage(0);
          }}
        >
          <em>First</em>
        </li>
        <li
          className={firstPage ? 'hidden' : 'dpHand'}
          onClick={() => {
            getPage(activePage - 1);
          }}
        >
          <span className="glyphicon glyphicon-chevron-left" />
        </li>
        <li>{pagDisplay}</li>
        <li
          className={lastPage ? 'hidden' : 'dpHand'}
          onClick={() => {
            getPage(activePage + 1);
          }}
        >
          <span className="glyphicon glyphicon-chevron-right" />
        </li>
        <li
          className={lastPage ? 'hidden' : 'dpHand'}
          style={linkStyle}
          onClick={() => {
            getPage(pagnum - 1);
          }}
        >
          <em>Last</em>
        </li>
        <li>Records {count}</li>
      </ul>
    </nav>
  );
};

export default Pagination;
