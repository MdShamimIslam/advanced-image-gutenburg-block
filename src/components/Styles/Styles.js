import React from 'react';
import { getBorderCSS, getColorsCSS, getTypoCSS } from '../../../../Components/utils/getCSS';

const Styles = ({ attributes,featureMediaURL, device="desktop" }) => {
  const { cId, handleImg,layout } = attributes;
  const { imgURL, columns, autoHeight, imgStyleOptionType,ftrImgStyleOptionType, imgStyles, captionStyles, autoFitImage,ftrAutoFitImage, imgFitOptionType,ftrImgFitOptionType, imgHoverEffect,ftrImgHoverEffect,ftrColumns,ftrAutoHeight } = handleImg;
  const {colors, typography, width, textAlign, padding, margin, horizontalAlign, verticalAlign } = captionStyles;
  const { normalBorder,ftrNormalBorder, hoverBorder,ftrHoverBorder, normalShadow,ftrNormalShadow, hoverShadow,ftrHoverShadow } = imgStyles;
  const { isInset, vOffset, hOffset, blur, color, spreed } = normalShadow;
  const mainWrapper = `#mainWrapper-${cId}`;

  const capWidth = width.desktop || '100%';
  const capTabWidth = width.tablet || capWidth;
  const capMobWidth = width.mobile || capTabWidth;

  return (
    <style>
      {`
      ${getTypoCSS('', typography)?.googleFontLink}

      ${mainWrapper} {
        ${(!imgURL && !featureMediaURL) ?
         `
          border: 1px solid #ccc;
          padding: 30px 50px;
          border-radius: 5px;
         `
         : ''
       }
       }

      ${mainWrapper} .featurePar{
        ${getBorderCSS(ftrNormalBorder)};
        box-shadow: ${ftrNormalShadow.isInset ? 'inset' : ''} ${ftrNormalShadow.hOffset} ${ftrNormalShadow.vOffset} ${ftrNormalShadow.blur} ${ftrNormalShadow.spreed} ${ftrNormalShadow.color};
        ${ftrColumns.width.desktop[layout.ftrSize] ? `width:${ftrColumns.width.desktop[layout.ftrSize]};`:""}
        height:${ftrAutoHeight ? '100%' : ftrColumns.height.desktop};
        border-radius: ${ftrImgStyleOptionType === 'rounded' ? ftrNormalBorder.radius ? ftrNormalBorder.radius : '0px':''};
        clip-path :${ftrImgStyleOptionType === 'Triangle' ? 'polygon(50% 0%, 0% 100%, 100% 100%)' :
          ftrImgStyleOptionType === 'Rhombus' ? 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' :
            ftrImgStyleOptionType === 'Octagon' ? 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)' :
              ftrImgStyleOptionType === 'square' ? 'inset(0%)' : ''}; 
         ${ftrAutoFitImage ?
          `
          object-fit: ${ftrImgFitOptionType}; 
          `
          :
          `
          object-fit: ${ftrImgStyleOptionType === 'Triangle' || ftrImgStyleOptionType === 'Octagon' || ftrImgStyleOptionType === 'Rhombus' ? 'cover' : ''}
         `
        }
      }

      ${mainWrapper} .featurePar img {
        width: 100%;
        height:100%;
        border-radius: ${ ftrImgStyleOptionType === 'Circle' && '100%'};
        
       }

      ${getTypoCSS(`${mainWrapper} .disCaption`, typography)?.styles}
      ${mainWrapper} .disCaption{
       ${getColorsCSS(colors)};

       ${(horizontalAlign.desktop === "start" && verticalAlign.desktop === "bottom") &&
       `
       ${width.desktop ? `border-radius: 0 0 0 ${normalBorder.radius}` : `border-radius: 0 0 ${normalBorder.radius} ${normalBorder.radius} ` };
       `
       };
       ${(horizontalAlign.desktop === "center" && verticalAlign.desktop === "bottom") &&
       `
       ${width.desktop ? `border-radius: 0 ` : `border-radius: 0 0 ${normalBorder.radius} ${normalBorder.radius} ` };
       `
       };
       ${(horizontalAlign.desktop === "end" && verticalAlign.desktop === "bottom") &&
       `
       ${width.desktop ? `border-radius: 0 0  ${normalBorder.radius} 0` : `border-radius: 0 0 ${normalBorder.radius} ${normalBorder.radius} ` };
       `
       };

      ${(horizontalAlign.desktop === "start" && verticalAlign.desktop === "top") &&
            `
            ${width.desktop ? `border-radius:${normalBorder.radius} 0 0 0` : `border-radius:${normalBorder.radius} ${normalBorder.radius} 0 0` };
            `
      };
      ${(horizontalAlign.desktop === "center" && verticalAlign.desktop === "top") &&
            `
            ${width.desktop ? `border-radius:0` : `border-radius:${normalBorder.radius} ${normalBorder.radius} 0 0` };
            `
      };
      ${(horizontalAlign.desktop === "end" && verticalAlign.desktop === "top") &&
            `
            ${width.desktop ? `border-radius: 0 ${normalBorder.radius}  0 0` : `border-radius:${normalBorder.radius} ${normalBorder.radius} 0 0` };
            `
      };

      ${( verticalAlign.desktop === "middle") &&
            `
            border-radius : 0;
            `
      };  
       width:${capWidth};
       text-align:${textAlign.desktop};
       padding:${padding.desktop.top} ${padding.desktop.right} ${padding.desktop.bottom} ${padding.desktop.left};
       margin:${margin.desktop.top} ${margin.desktop.right} ${margin.desktop.bottom} ${margin.desktop.left};
       position: absolute;
       height: fit-content;
       ${captionAlignment(verticalAlign,horizontalAlign,device)}

      }
      ${mainWrapper} .imgSrc img {
        
       display: block;
       width: 100%;
       height:100%;
       border-radius: ${ imgStyleOptionType === 'Circle' ? '100%' : normalBorder.radius};
       
      }
      
     ${mainWrapper} .imgSrc {
        ${columns.width.desktop[layout.size] ? `width:${columns.width.desktop[layout.size]};`:""}
        height:${autoHeight ? '100%' : columns.height.desktop}; 
        box-shadow: ${isInset ? 'inset' : ''} ${hOffset} ${vOffset} ${blur} ${spreed} ${color};
        border-radius: ${imgStyleOptionType === 'rounded' ? normalBorder.radius ? normalBorder.radius : '0px' :''};
        clip-path :${imgStyleOptionType === 'Triangle' ? 'polygon(50% 0%, 0% 100%, 100% 100%)' :
          imgStyleOptionType === 'Rhombus' ? 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' :
            imgStyleOptionType === 'Octagon' ? 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)' :
              imgStyleOptionType === 'square' ? 'inset(0%)' : ''}; 
         ${autoFitImage ?
          `
          object-fit: ${imgFitOptionType}; 
          `
          :
          `
          object-fit: ${imgStyleOptionType === 'Triangle' || imgStyleOptionType === 'Octagon' || imgStyleOptionType === 'Rhombus' ? 'cover' : ''}
         `
        }            
      }

      ${mainWrapper} .imgSrc img:hover{
         ${getBorderCSS(hoverBorder)};
        box-shadow: ${hoverShadow.isInset ? 'inset' : ''} ${hoverShadow.hOffset} ${hoverShadow.vOffset} ${hoverShadow.blur} ${hoverShadow.spreed} ${hoverShadow.color};
      }
      ${mainWrapper} .featurePar img:hover{
         ${getBorderCSS(ftrHoverBorder)};
        box-shadow: ${ftrHoverShadow.isInset ? 'inset' : ''} ${ftrHoverShadow.hOffset} ${ftrHoverShadow.vOffset} ${ftrHoverShadow.blur} ${ftrHoverShadow.spreed} ${ftrHoverShadow.color};
      }
      ${mainWrapper} .images{
        display : flex;
        justify-content : center;
        align-items : center;
        gap : 50px;
        text-align : center;
      }

      ${mainWrapper} .image-container {
          ${getBorderCSS(imgStyles.border)};
          display: flex;
          flex-direction: column;
          align-items: ${imgStyles.align.desktop}; 
         
        }
      ${mainWrapper} .ftr-image-container {
          ${getBorderCSS(imgStyles.border)};
          display: flex;
          flex-direction: column;
          align-items: ${imgStyles.ftrAlign.desktop}; 
         
        }

        ${mainWrapper} .imgChildCon {
          position: relative;
        ${getBorderCSS(normalBorder)};
        }

      ${mainWrapper} .imgChildCon img {
          transition: transform 0.5s, border 0.5s, border-radius 0.5s, box-shadow 0.5s;
          filter:${imgHoverEffect === 'blur' ? 'blur(3px)' : 'blur(0px)'}
        }

      ${mainWrapper} .imgChildCon:hover img {
          transform: ${imgHoverEffect === 'zoomIn' ? 'scaleX(1.3)' : imgHoverEffect === 'zoomOut' ? 'scaleX(0.7)' : ''};
          filter : ${imgHoverEffect === 'blur' && 'blur(0px)'}
        }
      ${mainWrapper} .ftr-imgChildCon img {
          transition: transform 0.5s, border 0.5s, border-radius 0.5s, box-shadow 0.5s;
          filter:${ftrImgHoverEffect === 'blur' ? 'blur(3px)' : 'blur(0px)'}
        }

      ${mainWrapper} .ftr-imgChildCon:hover img {
          transform: ${ftrImgHoverEffect === 'zoomIn' ? 'scaleX(1.3)' : ftrImgHoverEffect === 'zoomOut' ? 'scaleX(0.7)' : ''};
          filter : ${ftrImgHoverEffect === 'blur' && 'blur(0px)'}
        }

    @media only screen and (min-width:641px) and (max-width: 1024px){
      ${mainWrapper} .featurePar{
        ${ftrColumns.width.tablet[layout.ftrSize] ? `width:${ftrColumns.width.tablet[layout.ftrSize]};`:""}
        height:${ftrAutoHeight ? '100%' : ftrColumns.height.tablet};
       }
       ${mainWrapper} .imgSrc{
        ${columns.width.tablet[layout.size] ? `width:${columns.width.tablet[layout.size]};`:""} 
         height:${autoHeight ? '100%' : columns.height.tablet};
       }

       ${mainWrapper} .image-container {
        align-items: ${imgStyles.align.tablet}; 
       
      }
     ${mainWrapper} .ftr-image-container {
        align-items: ${imgStyles.ftrAlign.tablet}; 
      }

       ${mainWrapper} .disCaption{

       ${(horizontalAlign.tablet === "start" && verticalAlign.tablet === "bottom") &&
            `
            ${width.tablet ? `border-radius: 0 0 0 ${normalBorder.radius}` : `border-radius: 0 0 ${normalBorder.radius} ${normalBorder.radius} ` };
            `
       };
       ${(horizontalAlign.tablet === "center" && verticalAlign.tablet === "bottom") &&
            `
            ${width.tablet ? `border-radius: 0 ` : `border-radius: 0 0 ${normalBorder.radius} ${normalBorder.radius} ` };
            `
       };
       ${(horizontalAlign.tablet === "end" && verticalAlign.tablet === "bottom") &&
            `
            ${width.tablet ? `border-radius: 0 0  ${normalBorder.radius} 0` : `border-radius: 0 0 ${normalBorder.radius} ${normalBorder.radius} ` };
            `
       };

      ${(horizontalAlign.tablet === "start" && verticalAlign.tablet === "top") &&
            `
            ${width.tablet ? `border-radius:${normalBorder.radius} 0 0 0` : `border-radius:${normalBorder.radius} ${normalBorder.radius} 0 0` };
            `
      };
      ${(horizontalAlign.tablet === "center" && verticalAlign.tablet === "top") &&
            `
            ${width.tablet ? `border-radius:0` : `border-radius:${normalBorder.radius} ${normalBorder.radius} 0 0` };
            `
      };
      ${(horizontalAlign.tablet === "end" && verticalAlign.tablet === "top") &&
            `
            ${width.tablet ? `border-radius: 0 ${normalBorder.radius}  0 0` : `border-radius:${normalBorder.radius} ${normalBorder.radius} 0 0` };
            `
      };
        ${( verticalAlign.tablet === "middle") &&
              `
              border-radius : 0px;
              `
        };
        
        width:${capTabWidth};
        text-align:${textAlign.tablet};
        padding:${padding.tablet.top} ${padding.tablet.right} ${padding.tablet.bottom} ${padding.tablet.left};
        margin:${margin.tablet.top} ${margin.tablet.right} ${margin.tablet.bottom} ${margin.tablet.left};
        ${captionAlignment(verticalAlign,horizontalAlign,'tablet')}
 
       } 
    }
    @media only screen and (max-width:640px){
      ${mainWrapper} .featurePar{
        ${ftrColumns.width.mobile[layout.ftrSize] ? `width:${ftrColumns.width.mobile[layout.ftrSize]};`:""}
        height:${ftrAutoHeight ? '100%' : ftrColumns.height.mobile};
       }
       ${mainWrapper} .imgSrc{
         ${columns.width.mobile[layout.size] ? `width:${columns.width.mobile[layout.size]};`:""}
         height:${autoHeight ? '100%' : columns.height.mobile};
       }

       ${mainWrapper} .image-container {
        align-items: ${imgStyles.align.mobile}; 
       
      }
     ${mainWrapper} .ftr-image-container {
        align-items: ${imgStyles.ftrAlign.mobile}; 
      }

       ${mainWrapper} .disCaption{

        ${(horizontalAlign.mobile === "start" && verticalAlign.mobile === "bottom") &&
              `
              ${width.mobile ? `border-radius: 0 0 0 ${normalBorder.radius}` : `border-radius: 0 0 ${normalBorder.radius} ${normalBorder.radius} ` };
              `
        };
        ${(horizontalAlign.mobile === "center" && verticalAlign.mobile === "bottom") &&
              `
              ${width.mobile ? `border-radius: 0 ` : `border-radius: 0 0 ${normalBorder.radius} ${normalBorder.radius} ` };
              `
        };
        ${(horizontalAlign.mobile === "end" && verticalAlign.mobile === "bottom") &&
              `
              ${width.mobile ? `border-radius: 0 0  ${normalBorder.radius} 0` : `border-radius: 0 0 ${normalBorder.radius} ${normalBorder.radius} ` };
              `
        };
 
       ${(horizontalAlign.mobile === "start" && verticalAlign.mobile === "top") &&
             `
             ${width.mobile ? `border-radius:${normalBorder.radius} 0 0 0` : `border-radius:${normalBorder.radius} ${normalBorder.radius} 0 0` };
             `
       };
       ${(horizontalAlign.mobile === "center" && verticalAlign.mobile === "top") &&
             `
             ${width.mobile ? `border-radius:0` : `border-radius:${normalBorder.radius} ${normalBorder.radius} 0 0` };
             `
       };
       ${(horizontalAlign.mobile === "end" && verticalAlign.mobile === "top") &&
             `
             ${width.mobile ? `border-radius: 0 ${normalBorder.radius}  0 0` : `border-radius:${normalBorder.radius} ${normalBorder.radius} 0 0` };
             `
       };
        ${( verticalAlign.mobile === "middle") &&
              `
              border-radius : 0px;
              `
        };
        width:${capMobWidth};
        text-align:${textAlign.mobile};
        padding:${padding.mobile.top} ${padding.mobile.right} ${padding.mobile.bottom} ${padding.mobile.left};
        margin:${margin.mobile.top} ${margin.mobile.right} ${margin.mobile.bottom} ${margin.mobile.left};
        ${captionAlignment(verticalAlign,horizontalAlign,'mobile')}
 
       }  
    }
  
      `}
    </style>
  );
};

export default Styles;

const captionAlignment = (verticalAlign,horizontalAlign,device) => {
   return `
    ${horizontalAlign[device] === "start" ? 'left: 0;' : ''}
    ${horizontalAlign[device] === "center" ? 'left: 50%; transform: translateX(-50%);' : ''}
    ${horizontalAlign[device] === "end" ? 'right: 0;' : ''}
    ${verticalAlign[device] === "top" ? 'top: 0;' : ''}
    ${verticalAlign[device] === "middle" ? 'top: 50%; transform: translateY(-50%);' : ''}
    ${verticalAlign[device] === "bottom" ? 'bottom: 0;' : ''}
    ${horizontalAlign[device] === "center" ? verticalAlign[device] === "middle" ? "left: 50%; top: 50%; transform: translate(-50%, -50%);" : "" : ""};
  `
}
