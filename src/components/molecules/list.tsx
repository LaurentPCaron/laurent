import React from 'react';

import { ILi } from '../atoms/li';

const List = (props: IList) => {
  const { children } = props;
  return <div className="ui list">{children}</div>;
};

interface IList {
  children: ILi;
}
export default List;
