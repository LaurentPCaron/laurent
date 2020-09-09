import React from 'react';

export enum bulletType {
  carret = 'caret right icon',
  circle = 'circle icon',
}

const Li = (props: ILi) => {
  const { children = 'List item', icon } = props;

  return (
    <div className="item">
      <i className={icon}></i>
      <div className="content">{children}</div>
    </div>
  );
};

export interface ILi {
  children?: React.ReactNode;
  icon?: bulletType;
}

export default Li;
