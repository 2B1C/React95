/* eslint-disable react/no-array-index-key */
import React, { forwardRef } from 'react';
import styled from '@xstyled/styled-components';

import { ModalContext } from '../Modal';
import Frame from '../Frame';
import List from '../List';

import Clock from './Clock';
import WindowButton from './WindowButton';

const Truncate = styled.span`
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  text-align: left;
`;

export type TaskBarProps = {
  list?: React.ReactElement<typeof List>;
};

const TaskBar = forwardRef<HTMLDivElement, TaskBarProps>(({ list }, ref) => {
  const [showList, toggleShowList] = React.useState(false);
  const [activeStart, toggleActiveStart] = React.useState(false);
  const { windows, activeWindow, setActiveWindow } = React.useContext(
    ModalContext,
  );

  return (
    <Frame
      position="fixed"
      bottom={0}
      left={0}
      right={0}
      display="flex"
      justifyContent="space-between"
      height={28}
      width="100%"
      padding={2}
      zIndex="taskbar"
      ref={ref}
    >
      {showList && (
        <Frame
          position="absolute"
          bottom={28}
          onClick={() => {
            toggleActiveStart(false);
            toggleShowList(false);
          }}
        >
          {list}
        </Frame>
      )}
      <WindowButton
        small
        icon="logo_32x32_4bit"
        active={activeStart}
        onClick={() => {
          toggleActiveStart(!activeStart);
          toggleShowList(!showList);
        }}
      >
        Start
      </WindowButton>

      <Frame
        boxShadow="none"
        width="100%"
        paddingLeft={0}
        ml={2}
        display="flex"
      >
        {windows &&
          windows.map(({ icon, title }, index) => (
            <WindowButton
              key={`${title}-${index}`}
              icon={icon}
              active={title === activeWindow}
              onClick={() => setActiveWindow(title)}
              small={false}
            >
              <Truncate>{title}</Truncate>
            </WindowButton>
          ))}
      </Frame>

      <Clock />
    </Frame>
  );
});

TaskBar.defaultProps = {
  list: undefined,
};

export default TaskBar;
