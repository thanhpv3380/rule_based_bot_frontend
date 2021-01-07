import React from 'react';
import { Divider, Pagination } from 'antd';

const PaginationPanel = ({ total, current }) => {
  return (
    <Divider orientation="right" plain>
      <Pagination simple defaultCurrent={current} total={total} />
    </Divider>
  );
};

export default PaginationPanel;
