import { BlockControls, InspectorControls } from "@wordpress/block-editor";
import {
  PanelBody,
  PanelRow,
  SelectControl,
  ToolbarButton,
  ToolbarGroup
} from "@wordpress/components";
import { useEffect } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { produce } from "immer";
import React, { Fragment } from "react";
import {
  BorderControl,
  ColorsControl,
  ShadowControl,
  Typography,
} from "../../../../../../Components";
import { Device } from '../../../../../../Components/Device/Device';

import { imgAlignOptions } from "../../../../utils/options";
import { BBoxControl } from "../../../BBoxControl/BBoxControl";
import { Tab } from "../../../Panel/Tab/Tab";
import { updateData } from "../../../../utils/functions";
import { RangeControl } from "@wordpress/components";

const StyleSettings = ({ attributes, setAttributes, device }) => {
  const { handleImg } = attributes;
  const {
    customImg,
    siteLogo,
    featuredImg,
    imgSrcOptionType,
    imgStyles,
    customEditingMode,
    logoEditingMode,
    captionStyles,
  } = handleImg;
  const {
    align,
    ftrAlign,
    normalShadow,
    hoverShadow,
    ftrHoverShadow,
    hoverBorder,
    ftrHoverBorder,
    normalBorder,
    ftrNormalBorder,
    selectBorder,
    ftrSelectBorder,
    selectShadow,
    ftrSelectShadow,
    ftrNormalShadow
  } = imgStyles;
  const {
    margin,
    padding,
    colors,
    typography,
    width,
    textAlign,
    horizontalAlign,
    verticalAlign,
  } = captionStyles;
  // update value of property
  const updateValueOfStylesProperty = (
    property,
    value,
    childProp = false,
    child2Prop = false
  ) => {
    const newValueOfProperty = produce(handleImg, (draft) => {
      if (false !== childProp && false !== child2Prop) {
        draft[property][childProp][child2Prop] = value;
      } else if (false !== childProp) {
        draft[property][childProp] = value;
      } else {
        draft[property] = value;
      }
    });
    setAttributes({ handleImg: newValueOfProperty });
  };
  // update value & responsive of image styles
  const updateImgResponsiveStyles = (
    property,
    value,
    childProperty,
    device
  ) => {
    const newValueOfProperty = produce(handleImg, (draft) => {
      draft[property][childProperty][device] = value;
    });
    setAttributes({ handleImg: newValueOfProperty });
  };
  // edit image
  const toggleEditingMode = () => {
    const newValueOfProperty = produce(handleImg, (draft) => {
      if (customImg) {
        draft.customEditingMode = !customEditingMode;
        if (draft.customEditingMode) {
          draft.imageSrc = "";
          draft.imgURL = "";
        }
      }
      if (siteLogo) {
        draft.logoEditingMode = !logoEditingMode;
        if (draft.logoEditingMode) {
          draft.logoSrc = "";
          draft.logoURL = "";
        }
      }
    });
    setAttributes({ handleImg: newValueOfProperty });
  };
  // update value of width and height property
  const updateWidth = (property, value, childProperty) => {
    const newValueOfProperty = produce(handleImg, (draft) => {
      draft[property][childProperty][device] = value;
    });
    setAttributes({ handleImg: newValueOfProperty });
  };

  const updateAlign = (property, childProp, value) => {
    const newUpdateAlign = produce(handleImg, (draft) => {
      draft[property][childProp] = value;
    });
    setAttributes({ handleImg: newUpdateAlign });
  };
  // text align
  useEffect(() => {
    updateAlign("captionStyles", "activeAlign", textAlign[device]);
  }, [textAlign, device]);
  // horizontal align
  useEffect(() => {
    updateAlign(
      "captionStyles",
      "activeHorizontalAlign",
      horizontalAlign[device]
    );
  }, [horizontalAlign, device]);

  useEffect(() => {
    updateAlign("captionStyles", "activeVerticalAlign", verticalAlign[device]);
  }, [verticalAlign, device]);

  return (
    <Fragment>
      <BlockControls>
        <ToolbarGroup>
          {customImg ? (
            <ToolbarButton
              icon="edit"
              iconSize="25"
              title="Edit Custom Image"
              onClick={toggleEditingMode}
            />
          ) : (
            ""
          )}
        </ToolbarGroup>
      </BlockControls>

      <InspectorControls group="styles">
        <div className="stylePan">
          {/* image styles for custom */}
          {
            customImg || featuredImg ? (
              <div>
                {imgSrcOptionType === "custom" && (
                  <PanelBody title={__("Image Styles", "advanced-image")} initialOpen={true}>

                    <div className="styleChild" style={{ marginTop: "10px" }}>
                      {/* image align */}
                      <div>
                        <div className="imgAlign">
                          <p className="alignChild">Image Align</p>
                          <PanelRow>
                            <Device />
                          </PanelRow>
                        </div>
                        <SelectControl
                          value={align[device]}
                          options={imgAlignOptions}
                          onChange={(v) =>
                            updateImgResponsiveStyles("imgStyles", v, "align", device)
                          }
                        />
                      </div>
                      {/* border */}
                      <div style={{ marginTop: "12px" }}>
                        <p className="borChild">Border</p>
                        <div
                          style={{
                            marginTop: "-5px",
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <p
                            style={{
                              backgroundColor:
                                selectBorder === "normal" ? "#4527a4" : "#ccc",
                              color: selectBorder === "normal" ? "white" : undefined,
                              borderRadius: "0px",
                              width: "100%",
                              textAlign: "center",
                              padding: "5px 0px",
                              cursor: "pointer",
                              borderTopLeftRadius: "5px",
                            }}
                            onClick={() =>
                              updateValueOfStylesProperty(
                                "imgStyles",
                                "normal",
                                "selectBorder"
                              )
                            }
                          >
                            Normal
                          </p>
                          <p
                            style={{
                              backgroundColor:
                                selectBorder === "hover" ? "#4527a4" : "#ccc",
                              color: selectBorder === "hover" ? "white" : undefined,
                              borderRadius: "0px",
                              width: "100%",
                              textAlign: "center",
                              padding: "5px 0px",
                              cursor: "pointer",
                              borderTopRightRadius: "5px",
                            }}
                            onClick={() =>
                              updateValueOfStylesProperty(
                                "imgStyles",
                                "hover",
                                "selectBorder"
                              )
                            }
                          >
                            Hover
                          </p>
                        </div>
                        <div>
                          {selectBorder === "hover" ? (
                            <div style={{ marginTop: "-2px" }}>
                              <p style={{ marginBottom: "-28px" }}>
                                Border for Hover
                              </p>
                              <BorderControl
                                label=""
                                value={hoverBorder}
                                onChange={(val) =>
                                  updateValueOfStylesProperty(
                                    "imgStyles",
                                    val,
                                    "hoverBorder"
                                  )
                                }
                                defaults={{ radius: "0px" }}
                              />
                            </div>
                          ) : (
                            <div style={{ marginTop: "-2px" }}>
                              <p style={{ marginBottom: "-28px" }}>
                                Border for Normal
                              </p>
                              <BorderControl
                                label=""
                                value={normalBorder}
                                onChange={(val) =>
                                  updateValueOfStylesProperty(
                                    "imgStyles",
                                    val,
                                    "normalBorder"
                                  )
                                }
                                defaults={{ radius: "0px" }}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                      {/* shadow */}
                      <div className="my">
                        <p className="shadChild">Shadow</p>
                        <div
                          style={{
                            marginTop: "-2px",
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <p
                            style={{
                              backgroundColor:
                                selectShadow === "normal" ? "#4527a4" : "#ccc",
                              color: selectShadow === "normal" ? "white" : undefined,
                              borderRadius: "0px",
                              width: "100%",
                              textAlign: "center",
                              padding: "5px 0px",
                              cursor: "pointer",
                              borderTopLeftRadius: "5px",
                            }}
                            onClick={() =>
                              updateValueOfStylesProperty(
                                "imgStyles",
                                "normal",
                                "selectShadow"
                              )
                            }
                          >
                            Normal
                          </p>
                          <p
                            style={{
                              backgroundColor:
                                selectShadow === "hover" ? "#4527a4" : "#ccc",
                              color: selectShadow === "hover" ? "white" : undefined,
                              borderRadius: "0px",
                              width: "100%",
                              textAlign: "center",
                              padding: "5px 0px",
                              cursor: "pointer",
                              borderTopRightRadius: "5px",
                            }}
                            onClick={() =>
                              updateValueOfStylesProperty(
                                "imgStyles",
                                "hover",
                                "selectShadow"
                              )
                            }
                          >
                            Hover
                          </p>
                        </div>
                        <div>
                          {selectShadow === "normal" ? (
                            <div style={{ marginTop: "-2px" }}>
                              <p style={{ marginBottom: "-25px" }}>
                                Shadow for Normal
                              </p>
                              <ShadowControl
                                label=""
                                value={normalShadow}
                                onChange={(val) =>
                                  updateValueOfStylesProperty(
                                    "imgStyles",
                                    val,
                                    "normalShadow"
                                  )
                                }
                              />
                            </div>
                          ) : (
                            <div style={{ marginTop: "-2px" }}>
                              <p style={{ marginBottom: "-25px" }}>
                                Shadow for Hover
                              </p>
                              <ShadowControl
                                label=""
                                value={hoverShadow}
                                onChange={(val) =>
                                  updateValueOfStylesProperty(
                                    "imgStyles",
                                    val,
                                    "hoverShadow"
                                  )
                                }
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </PanelBody>
                )}
                {/* image styles for featured */}
                {imgSrcOptionType === "featured" && (
                  <PanelBody
                    title={__("Image Styles", "advanced-image")}
                    initialOpen={true}
                  >
                    <div className="styleChild" style={{ marginTop: "10px" }}>
                      {/* image align */}
                      <div>
                        <div className="imgAlign">
                          <p className="alignChild">Image Align</p>
                          <PanelRow>
                            <Device />
                          </PanelRow>
                        </div>
                        <SelectControl
                          value={ftrAlign[device]}
                          options={imgAlignOptions}
                          onChange={(v) =>
                            updateImgResponsiveStyles("imgStyles", v, "ftrAlign", device)
                          }
                        />
                      </div>
                      {/* border */}
                      <div style={{ marginTop: "12px" }}>
                        <p className="borChild">Border</p>
                        <div
                          style={{
                            marginTop: "-5px",
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <p
                            style={{
                              backgroundColor:
                                ftrSelectBorder === "normal" ? "#4527a4" : "#ccc",
                              color: ftrSelectBorder === "normal" ? "white" : undefined,
                              borderRadius: "0px",
                              width: "100%",
                              textAlign: "center",
                              padding: "5px 0px",
                              cursor: "pointer",
                              borderTopLeftRadius: "5px",
                            }}
                            onClick={() =>
                              updateValueOfStylesProperty(
                                "imgStyles",
                                "normal",
                                "ftrSelectBorder"
                              )
                            }
                          >
                            Normal
                          </p>
                          <p
                            style={{
                              backgroundColor:
                                ftrSelectBorder === "hover" ? "#4527a4" : "#ccc",
                              color: ftrSelectBorder === "hover" ? "white" : undefined,
                              borderRadius: "0px",
                              width: "100%",
                              textAlign: "center",
                              padding: "5px 0px",
                              cursor: "pointer",
                              borderTopRightRadius: "5px",
                            }}
                            onClick={() =>
                              updateValueOfStylesProperty(
                                "imgStyles",
                                "hover",
                                "ftrSelectBorder"
                              )
                            }
                          >
                            Hover
                          </p>
                        </div>
                        <div>
                          {ftrSelectBorder === "hover" ? (
                            <div style={{ marginTop: "-2px" }}>
                              <p style={{ marginBottom: "-28px" }}>
                                Border for Hover
                              </p>
                              <BorderControl
                                label=""
                                value={ftrHoverBorder}
                                onChange={(val) =>
                                  updateValueOfStylesProperty(
                                    "imgStyles",
                                    val,
                                    "ftrHoverBorder"
                                  )
                                }
                                defaults={{ radius: "0px" }}
                              />
                            </div>
                          ) : (
                            <div style={{ marginTop: "-2px" }}>
                              <p style={{ marginBottom: "-28px" }}>
                                Border for Normal
                              </p>
                              <BorderControl
                                label=""
                                value={ftrNormalBorder}
                                onChange={(val) =>
                                  updateValueOfStylesProperty(
                                    "imgStyles",
                                    val,
                                    "ftrNormalBorder"
                                  )
                                }
                                defaults={{ radius: "0px" }}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                      {/* shadow */}
                      <div className="my">
                        <p className="shadChild">Shadow</p>
                        <div
                          style={{
                            marginTop: "-2px",
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <p
                            style={{
                              backgroundColor:
                                ftrSelectShadow === "normal" ? "#4527a4" : "#ccc",
                              color: ftrSelectShadow === "normal" ? "white" : undefined,
                              borderRadius: "0px",
                              width: "100%",
                              textAlign: "center",
                              padding: "5px 0px",
                              cursor: "pointer",
                              borderTopLeftRadius: "5px",
                            }}
                            onClick={() =>
                              updateValueOfStylesProperty(
                                "imgStyles",
                                "normal",
                                "ftrSelectShadow"
                              )
                            }
                          >
                            Normal
                          </p>
                          <p
                            style={{
                              backgroundColor:
                                ftrSelectShadow === "hover" ? "#4527a4" : "#ccc",
                              color: ftrSelectShadow === "hover" ? "white" : undefined,
                              borderRadius: "0px",
                              width: "100%",
                              textAlign: "center",
                              padding: "5px 0px",
                              cursor: "pointer",
                              borderTopRightRadius: "5px",
                            }}
                            onClick={() =>
                              updateValueOfStylesProperty(
                                "imgStyles",
                                "hover",
                                "ftrSelectShadow"
                              )
                            }
                          >
                            Hover
                          </p>
                        </div>
                        <div>
                          {ftrSelectShadow === "normal" ? (
                            <div style={{ marginTop: "-2px" }}>
                              <p style={{ marginBottom: "-25px" }}>
                                Shadow for Normal
                              </p>
                              <ShadowControl
                                label=""
                                value={ftrNormalShadow}
                                onChange={(val) =>
                                  updateValueOfStylesProperty(
                                    "imgStyles",
                                    val,
                                    "ftrNormalShadow"
                                  )
                                }
                              />
                            </div>
                          ) : (
                            <div style={{ marginTop: "-2px" }}>
                              <p style={{ marginBottom: "-25px" }}>
                                Shadow for Hover
                              </p>
                              <ShadowControl
                                label=""
                                value={ftrHoverShadow}
                                onChange={(val) =>
                                  updateValueOfStylesProperty(
                                    "imgStyles",
                                    val,
                                    "ftrHoverShadow"
                                  )
                                }
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </PanelBody>
                )}
                {/* content styles */}
                <div className="settingStyles">
                  {imgSrcOptionType === "custom" && (
                    <PanelBody
                      title={__("Caption Styles", "advanced-image")}
                      initialOpen={true}
                    >
                      <div className="styleChild" style={{ marginTop: "10px" }}>

                        {/* color and background */}
                        <div className="colorsPar">
                          <p className="colorsChild">Colors</p>
                          <ColorsControl
                            label=""
                            value={colors}
                            onChange={(val) =>
                              updateValueOfStylesProperty(
                                "captionStyles",
                                val,
                                "colors"
                              )
                            }
                            defaults={{ color: "black", bg: "#EEEEEE" }}
                          />
                        </div>
                        {/* Width */}
                        <div className="my">
                          <div className="customWidth">
                            <p className="widthChild">Width</p>
                            <PanelRow>
                              <Device />
                            </PanelRow>
                          </div>
                          <RangeControl
                            value={width[device]}
                            allowReset
                            onChange={(v) =>
                              updateWidth("captionStyles", v, "width")
                            }
                            min={1}
                            max={300}
                          />
                        </div>

                        {/* typography */}
                        <div className="my typo">
                          <p className="typoChild">Typography</p>
                          <Typography
                            label=""
                            value={typography}
                            onChange={(val) =>
                              updateValueOfStylesProperty(
                                "captionStyles",
                                val,
                                "typography"
                              )
                            }
                            defaults={{ fontSize: 13 }}
                          />
                        </div>
                        {/* text align */}
                        <div className="my">
                          <div className="customTextAlign">
                            <p className="textAlignChild">Text Align</p>
                            <PanelRow>
                              <Device />
                            </PanelRow>
                          </div>
                          <Tab options={["left", "right", "center", "justify"]} value={captionStyles.textAlign[device]} onChange={val => setAttributes({ handleImg: updateData(handleImg, val, "captionStyles", "textAlign", device) })} />

                        </div>
                        {/* horizontal align */}
                        <div className="my">
                          <div className="customTextAlign">
                            <p className="textAlignChild">Horizontal Align</p>
                            <PanelRow>
                              <Device />
                            </PanelRow>
                          </div>
                          <Tab options={["start", "center", "end"]} value={captionStyles.horizontalAlign[device]} onChange={val => setAttributes({ handleImg: updateData(handleImg, val, "captionStyles", "horizontalAlign", device) })} />

                        </div>
                        {/* vertical align */}
                        <div className="my">
                          <div className="customTextAlign">
                            <p className="textAlignChild">Vertical Align</p>
                            <PanelRow>
                              <Device />
                            </PanelRow>
                          </div>
                          <Tab options={["top", "middle", "bottom"]} value={captionStyles.verticalAlign[device]} onChange={val => setAttributes({ handleImg: updateData(handleImg, val, "captionStyles", "verticalAlign", device) })} />

                        </div>
                        {/* margin */}
                        <div className="my">
                          <div className="margin">
                            <p className="marChild">Margin</p>
                            <PanelRow>
                              <Device />
                            </PanelRow>
                          </div>
                          <BBoxControl
                            label=""
                            values={margin[device]}
                            onChange={(val) => updateValueOfStylesProperty("captionStyles", val, "margin", device)}
                          ></BBoxControl>
                        </div>
                        {/* padding */}
                        <div className="my">
                          <div className="padding">
                            <p className="padChild">Padding</p>
                            <PanelRow>
                              <Device />
                            </PanelRow>
                          </div>
                          <BBoxControl
                            label=""
                            values={padding[device]}
                            onChange={(val) =>
                              updateValueOfStylesProperty(
                                "captionStyles",
                                val,
                                "padding",
                                device
                              )
                            }
                          ></BBoxControl>
                        </div>
                      </div>
                    </PanelBody>
                  )}
                </div>
              </div>
            )
              :
              <div className='help'>
                <img src='https://bpluginshome.b-cdn.net/wp-content/uploads/2021/07/bplugins-white.png' alt='' />
                <h1>Need Help</h1>
              </div>
          }

        </div>
      </InspectorControls>
    </Fragment>
  );
};

export default StyleSettings;
