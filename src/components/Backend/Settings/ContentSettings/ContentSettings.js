import React, { Fragment } from 'react';
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, PanelRow, SelectControl, ToggleControl, __experimentalUnitControl as UnitControl } from '@wordpress/components';
import {hoverEffectOptions, imgFitOptions, imgSizes, imgSrcOptions, imgStyleOptions } from '../../../../utils/options';
import { Device } from '../../../../../../Components/Device/Device';
import { produce } from 'immer';
import { updateData } from '../../../../utils/functions';

const ContentSettings = ({ attributes, setAttributes,device }) => {
  const { handleImg,layout} = attributes;
  const { imgSrcOptionType, displayCaption, autoHeight, autoFitImage, enableLink, enableNewTab, imgStyleOptionType,enableLinkText,imgHoverEffect, columns, imgFitOptionType,ftrImgStyleOptionType,ftrColumns,ftrAutoHeight,ftrAutoFitImage,ftrImgFitOptionType,ftrEnableLink,ftrEnableNewTab,ftrEnableLinkText,ftrImgHoverEffect,customImg,featuredImg} = handleImg;

  // update value of property
  const updateValueOfProperty = (property, value, childProp = false, child2Prop = false) => {
    const newValueOfProperty = produce(handleImg, draft => {
      if (false !== childProp && false !== child2Prop) {
        draft[property][childProp][child2Prop] = value;
      } else if (false !== childProp) {
        draft[property][childProp] = value;
      } else {
        draft[property] = value;
      }
    });
    setAttributes({ handleImg: newValueOfProperty });
  }
  // Handle change of image source type
  const handleImgSrcChange = (property,value) => {
    const changeImgValue = produce(handleImg, (draft) => {
      draft[property] = value;
      if (value === "custom") {
        draft.customImg = true;
        draft.siteLogo = false;
        draft.featuredImg = false;
      } else if (value === "logo") {
        draft.customImg = false;
        draft.siteLogo = true;
        draft.featuredImg = false;
      } else if (value === "featured") {
        draft.customImg = false;
        draft.siteLogo = false;
        draft.featuredImg = true;
      }
    });
    setAttributes({ handleImg: changeImgValue });
  };
  
  // update value of width and height property
  const updateWidthAndHeight = (property, value, childProperty) => {
    const newValueOfProperty = produce(handleImg, draft => {
      draft[property][childProperty][device] = value;
    });
    setAttributes({ handleImg: newValueOfProperty });
  }
  return (
    <Fragment>
      <InspectorControls>
        <div className='contentPan'>
          {
            customImg || featuredImg ?
            <PanelBody title={__("General Settings", "advanced-image")} initialOpen={true}>
            <div className='contentChild' style={{ marginTop: "10px" }}>
              {/* select image source type*/}
              <div>
                <p className='sourceChild'>Source</p>
                <SelectControl
                  value={imgSrcOptionType}
                  options={imgSrcOptions}
                  onChange={(v) => handleImgSrcChange("imgSrcOptionType", v)}
                />
              </div>

              {/* for custom image */}
              <div>
                {
                  imgSrcOptionType === 'custom' && (
                    <>
                      {/* image styles */}
                      <div>
                        <p className='stlChild'>Styles</p>
                        <SelectControl
                          value={imgStyleOptionType}
                          options={imgStyleOptions}
                          help={imgStyleOptionType === 'Circle' || imgStyleOptionType === 'Rhombus' || imgStyleOptionType === 'Octagon' || imgStyleOptionType === 'Triangle' ? `Please Use Equal "Height" & "Width" For Perfect ${imgStyleOptionType} Shape.` : ''}
                          onChange={(v) => updateValueOfProperty("imgStyleOptionType", v)}
                        />
                        <div style={{ marginTop: "-14px" }}>
                          <ToggleControl
                            checked={displayCaption}
                            label="Display Caption"
                            onChange={(v) => updateValueOfProperty("displayCaption", v)}
                          />
                        </div>
                      </div>
                      {/* image size */}
                      <div>
                        <p className='imgSizeChild'>Image Size</p>
                        <SelectControl
                          value={layout.size}
                          options={imgSizes}
                          onChange={(val) =>setAttributes({layout: updateData(layout,val,"size")})}
                        />
                      </div>
                      {/* Width */}
                      <div>
                        <div className='customWidth'>
                          <p className='widthChild'>Width</p>
                          <PanelRow>
                          <Device />
                          </PanelRow>
                        </div>
                        <UnitControl
                          value={columns.width[device][layout.size]}
                          onChange={(v) =>setAttributes({handleImg:updateData(handleImg,v,"columns","width",device,layout.size)})}
                            />
                      </div>
                      {/* auto height */}
                      <div style={{ marginTop: "20px" }}>

                        <ToggleControl
                          checked={autoHeight}
                          label="Auto Height"
                          onChange={(v) => updateValueOfProperty("autoHeight", v)}
                        />
                        {/* If auto height false */}
                        {
                          !autoHeight && (
                            <div style={{ marginTop: "-25px" }}>
                              <div className='customHeight'>
                                <p className='heightChild'>Height</p>
                                <PanelRow>
                                <Device />
                                </PanelRow>
                              </div>
                              <UnitControl
                                value={columns.height[device]}
                                onChange={(v) => updateWidthAndHeight("columns", v, "height")}
                              />
                            </div>
                          )
                        }
                        <div style={{ marginTop: autoHeight ? "-15px" : "" }}>
                          <ToggleControl
                            checked={autoFitImage}
                            label="Auto Fit Image"
                            onChange={(v) => updateValueOfProperty("autoFitImage", v)}
                          />
                        </div>
                      </div>
                      {/* image fit */}
                      <div>
                        {
                          autoFitImage && (
                            <div>
                              <p className='fitImgChild'>Image Fit Options</p>
                              <SelectControl
                                value={imgFitOptionType}
                                options={imgFitOptions}
                                onChange={(v) => updateValueOfProperty("imgFitOptionType", v)}
                              />
                            </div>
                          )
                        }
                        <div>
                          <ToggleControl
                            checked={enableLink}
                            label="Enable Link?"
                            onChange={(v) => updateValueOfProperty("enableLink", v)}
                          />
                          {
                            enableLink && (
                              <div style={{ marginTop: "-10px" }}>
                                <p className='enableLinkChild'>Link</p>
                                <TextControl
                                  label=""
                                  value={enableLinkText}
                                  onChange={(v) => updateValueOfProperty("enableLinkText", v)}
                                />
                                <div style={{ marginTop: "-15px" }}>
                                  <ToggleControl
                                    checked={enableNewTab}
                                    label="Open in New Tab"
                                    onChange={(v) => updateValueOfProperty("enableNewTab", v)}
                                  />
                                </div>
                              </div>
                            )
                          }
                        </div>
                      </div>
                      {/* image hover effect */}
                      <div>
                        <p className='hoverEffectChild'>Hover Effect</p>
                        <SelectControl
                          value={imgHoverEffect}
                          options={hoverEffectOptions}
                          onChange={(v) => updateValueOfProperty("imgHoverEffect", v)}
                        />

                      </div>
                    </>
                  )
                }
              </div>
              {/* for featured image */}
              <div>
              {
                  imgSrcOptionType === 'featured' && (
                    <>
                      {/* image styles */}
                      <div>
                        <p className='stlChild'>Styles</p>
                        <SelectControl
                          value={ftrImgStyleOptionType}
                          options={imgStyleOptions}
                          help={ftrImgStyleOptionType === 'Circle' || ftrImgStyleOptionType === 'Rhombus' || ftrImgStyleOptionType === 'Octagon' || ftrImgStyleOptionType === 'Triangle' ? `Please Use Equal "Height" & "Width" For Perfect ${ftrImgStyleOptionType} Shape.` : ''}
                          onChange={(v) => updateValueOfProperty("ftrImgStyleOptionType", v)}
                        />
                      </div>
                      {/* image size */}
                      <div>
                        <p className='imgSizeChild'>Image Size</p>
                        <SelectControl
                          value={layout.ftrSize}
                          options={imgSizes}
                          onChange={(val) =>setAttributes({layout: updateData(layout,val,"ftrSize")})}
                        />
                      </div>
                      {/* Width */}
                      <div>
                        <div className='customWidth'>
                          <p className='widthChild'>Width</p>
                          <PanelRow>
                            <Device 
                            onChange={(val) => updateValueOfProperty("device", val)}
                            />
                          </PanelRow>
                        </div>
                        <UnitControl
                          value={ftrColumns.width[device][layout.size]}
                          onChange={(v) =>setAttributes({handleImg:updateData(handleImg,v,"ftrColumns","width",device,layout.ftrSize)})}
                        />
                      </div>
                      {/* auto height */}
                      <div style={{ marginTop: "20px" }}>

                        <ToggleControl
                          checked={ftrAutoHeight}
                          label="Auto Height"
                          onChange={(v) => updateValueOfProperty("ftrAutoHeight", v)}
                        />
                        {/* If auto height false */}
                        {
                          !ftrAutoHeight && (
                            <div style={{ marginTop: "-25px" }}>
                              <div className='customHeight'>
                                <p className='heightChild'>Height</p>
                                <PanelRow>
                                  <Device 
                                    onChange={(val) => updateValueOfProperty("device", val)}
                                   />
                                </PanelRow>
                              </div>
                              <UnitControl
                                value={ftrColumns.height[device]}
                                onChange={(v) => updateWidthAndHeight("ftrColumns", v, "height")}
                              />
                            </div>
                          )
                        }
                        <div style={{ marginTop: ftrAutoHeight ? "-15px" : "" }}>
                          <ToggleControl
                            checked={ftrAutoFitImage}
                            label="Auto Fit Image"
                            onChange={(v) => updateValueOfProperty("ftrAutoFitImage", v)}
                          />
                        </div>
                      </div>
                      {/* image fit */}
                      <div>
                        {
                          ftrAutoFitImage && (
                            <div>
                              <p className='fitImgChild'>Image Fit Options</p>
                              <SelectControl
                                value={ftrImgFitOptionType}
                                options={imgFitOptions}
                                onChange={(v) => updateValueOfProperty("ftrImgFitOptionType", v)}
                              />
                            </div>
                          )
                        }
                        <div>
                          <ToggleControl
                            checked={ftrEnableLink}
                            label="Enable Link?"
                            onChange={(v) => updateValueOfProperty("ftrEnableLink", v)}
                          />
                          {
                            ftrEnableLink && (
                              <div style={{ marginTop: "-10px" }}>
                                <p className='enableLinkChild'>Link</p>
                                <TextControl
                                  label=""
                                  value={ftrEnableLinkText}
                                  onChange={(v) => updateValueOfProperty("ftrEnableLinkText", v)}
                                />
                                <div style={{ marginTop: "-15px" }}>
                                  <ToggleControl
                                    checked={ftrEnableNewTab}
                                    label="Open in New Tab"
                                    onChange={(v) => updateValueOfProperty("ftrEnableNewTab", v)}
                                  />
                                </div>
                              </div>
                            )
                          }
                        </div>
                      </div>
                      {/* image hover effect */}
                      <div>
                        <p className='hoverEffectChild'>Hover Effect</p>
                        <SelectControl
                          value={ftrImgHoverEffect}
                          options={hoverEffectOptions}
                          onChange={(v) => updateValueOfProperty("ftrImgHoverEffect", v)}
                        />

                      </div>
                    </>
                  )
                }
              </div>

            </div>

            </PanelBody> 
            : 
            <div className='help'>
              <img src='https://bpluginshome.b-cdn.net/wp-content/uploads/2021/07/bplugins-white.png' alt=''/>
              <h1>Need Help</h1>
            </div>
          }
          
        </div>

      </InspectorControls>

    </Fragment>
  );
};

export default ContentSettings;