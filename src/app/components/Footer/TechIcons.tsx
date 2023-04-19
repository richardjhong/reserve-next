"use client";
import { websiteTechStack } from './FooterData';
import { Tooltip } from 'react-tooltip'

const TechIcons = () => {
  return (
    <div className="flex flex-wrap items-center justify-center w-full">
      {websiteTechStack.devicons.map((skill, i) => {
        const Icon = skill.icon;
        return (
          <div key={i}>
            <Icon
              size={28}
              className="m-2"
              data-tooltip-content={skill.tooltipMessage}
              data-tooltip-id={`skillTooltip-${i}`}
              data-place='bottom'
            />
            <Tooltip id={`skillTooltip-${i}`} />
          </div>
        );
      })}
    </div>
  )
}

export default TechIcons;