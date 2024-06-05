import React from 'react';

export const Tab = (props) => {
  const { options, onChange = () => { }, value, paddingY = 4, paddingX = 0 } = props;
  const id = Math.floor(Math.random() * 99999999);
  return (
    <>
      <style>
        {`
          .includeExclude {
            display: flex;
            justify-content: space-between;
            border: 1px solid #ccc;
            margin:8px 0px;
          }
          .isActive-include {
            background: #4527a4;
            color:#ccc;
          }
          .single-includeExclude {
            display: flex;
            width: 100%;
            justify-content: center;
            transition: background 0.2s ease-in-out;
            cursor: pointer;
            white-space:nowrap;
            border-right: 1px solid #800080;
          }
          .single-includeExclude:last-child{
            border-right:0px
          }
          .dynamic-${id}.single-includeExclude p {
              margin: 0;
              padding: ${paddingY}px ${paddingX}px;
            }
          .single-includeExclude-hover:hover {
            background: #ebebeb;
          }
          `}
      </style>
      <div className="includeExclude">
        {options?.map((option, i) => (
          <div
            key={i}
            onClick={() => onChange(option.replace(/\s/g, "").toLowerCase())}
            className={`dynamic-${id} single-includeExclude ${value === option.replace(/\s/g, "").toLowerCase()
              ? 'isActive-include'
              : 'single-includeExclude-hover'
              }`}
          >
            <p style={{ textTransform: 'capitalize' }}>{option}</p>
          </div>
        ))}
      </div>
    </>
  );
};
